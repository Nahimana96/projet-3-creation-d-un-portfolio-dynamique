const projets = await fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => data);

// Afficher les projets à la page d'accueil
function afficherProjets(projets) {
  for (let projet of projets) {
    const image = document.createElement("img");
    image.src = projet.imageUrl;

    const titre = document.createElement("figcaption");
    titre.innerText = projet.title;

    const gallery = document.querySelector(".gallery");

    const figure = document.createElement("figure");

    gallery.appendChild(figure);

    figure.appendChild(image);
    figure.appendChild(titre);
  }
}

// Trier les projets
function trierLesProjets() {
  afficherProjets(projets);
  const btnTous = document.querySelector(".Tous");

  // Bouton "TOUS" pour afficher tous les projets
  btnTous.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projets);
  });
  // Bouton "Objtes" pour afficher uniquement les objets
  const btnObjets = document.querySelector(".Objets");
  btnObjets.addEventListener("click", () => {
    const objets = projets.filter((projet) => {
      return projet.category.id == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(objets);
  });

  // Bouton "Appartements" pour afficher uniquement les appartements
  const btnAppartements = document.querySelector(".Appartements");
  btnAppartements.addEventListener("click", () => {
    const appartements = projets.filter((projet) => {
      return projet.category.id == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(appartements);
  });

  // Bouton "Hôtels & restaurant"
  const btnHotelRestaurant = document.querySelector(".Hotels-restaurants");
  btnHotelRestaurant.addEventListener("click", () => {
    const hotelRestaurant = projets.filter((projet) => {
      return projet.category.id == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(hotelRestaurant);
  });
}
trierLesProjets();

// Création d'une fonction qui verifie si l'utilisateur est connecté
// afin d'afficher des nouvelles fonctionnalités
function afficherBtnModifier() {
  const lien = document.getElementById("login");
  if (localStorage.getItem("UserId").length > 0) {
    document.querySelector(".modifier-image").style.display = "block";
    document.querySelector(".modifier-projets").style.display = "block";
    lien.textContent = "logout";
  }
  // supprimer toutes les clés dans le localStorage lorsque l'utilisateur se déconnecte "logout"
  lien.addEventListener("click", () => {
    localStorage.clear();
  });
}
afficherBtnModifier();

//Afficher les projets dans la modale
function afficherProjetsDansModale() {
  for (let projet of projets) {
    const imageModale = document.createElement("img");
    imageModale.src = projet.imageUrl;

    const titreModal = document.createElement("figcaption");
    titreModal.textContent = "éditer";

    const galleryModale = document.querySelector(".gallery-modale");

    const figureModale = document.createElement("figure");
    const btnsupprimer = document.createElement("div");
    btnsupprimer.classList.add("btn-supprimer");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    galleryModale.appendChild(figureModale);
    figureModale.appendChild(imageModale);
    figureModale.appendChild(titreModal);
    figureModale.appendChild(btnsupprimer);
    btnsupprimer.appendChild(trashIcon);

    // supprimer un projet au click
    btnsupprimer.addEventListener("click", (e) => {
      e.preventDefault();
      deleteProject(projet.id);
    });
  }
  // supprimer tous les projets
  const supprimerTout = document.querySelector(".supprimer");
  supprimerTout.addEventListener("click", (e) => {
    e.preventDefault();
    deleteAllProjects();
  });
  // Afficher l'icone "X" dans la modale
  const xMark = document.createElement("i");
  xMark.classList.add("fa-solid", "fa-xmark");
  const modale = document.getElementById("modale");
  modale.appendChild(xMark);

  // écouter le bouton "modifier" pour afficher la modale
  document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", () => {
      modale.style.display = "flex";
      document.querySelector(".gallery-modale").innerHTML = "";
      afficherProjetsDansModale();
    });
  });
  // fermer la modale lorsqu'on clique sur "X" et en dehors de la modale
  xMark.addEventListener("click", () => {
    modale.style.display = "none";
  });
  document.querySelector("main").addEventListener("click", (e) => {
    const tagName = e.target.tagName;
    const ajouterProjet = document.getElementById("ajout-projet");
    if (tagName === "SECTION" || tagName === "IMG" || tagName === "ARTICLE") {
      modale.style.display = "none";
      ajouterProjet.style.display = "none";
    }
  });
}
afficherProjetsDansModale();

// création d'une fonction qui supprime un projet
function deleteProject(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  }).then((response) => {
    console.log(response.status);
  });
}

// Afficher le formulaire pour ajouter des nouveaux projets
function afficherFormulaire() {
  // ecouter le bouton "ajouter une photo" dans la modale
  const createProjet = document.querySelector(".creer-projet");
  createProjet.addEventListener("click", () => {
    ajouterProjet.style.display = "flex";
  });
  // Ajouter une image au clic sur le boutton input[type="file"]
  const ajoutPhoto = document.querySelector(".ajouter-photo");
  const inputFile = document.querySelector("#file");
  const imgArea = document.querySelector(".img-area");
  ajoutPhoto.addEventListener("click", () => {
    inputFile.click();
  });
  // récuperer les données de l'image choisie
  inputFile.addEventListener("change", () => {
    const image = inputFile.files[0];

    // prevenir l'utilisateur si l'image dépasse 4MO
    const maxSizeBytes = 4000000;
    if (image.size > maxSizeBytes) {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "<p> votre image est supérieur à 4 Mo </p>";
    } else {
      document.querySelector(".error-message").style.display = "none";
      localStorage.setItem("imageUrl", image);
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result;
        const img = document.createElement("img");
        img.src = imgUrl;
        imgArea.appendChild(img);
      };
      reader.readAsDataURL(image);
      const changePhoto = document.querySelector(".ajouter-photo");
      changePhoto.textContent = "changer la photo";
    }
  });
  // fermer le formulaire avec l'icône "X-mark"
  const ajouterProjet = document.getElementById("ajout-projet");
  const xMark2 = document.querySelector(".xmark2");
  xMark2.addEventListener("click", () => {
    ajouterProjet.style.display = "none";
    modale.style.display = "none";
  });
  // revenir vers la modale avec l'icone "<-"
  const fleche = document.querySelector(".fa-arrow-left");
  fleche.addEventListener("click", () => {
    ajouterProjet.style.display = "none";
  });
}
afficherFormulaire();

// création d'une fonction qui envoie le nouveau projet vers l'API
async function nouveauProjet() {
  const titre = document.querySelector(".section-titre input");
  const select = document.getElementById("categorie");
  const formulaire = document.getElementById("ajout-projet");
  const inputFile = document.querySelector("#file");
  formulaire.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formulaire);
    formData.append("image", inputFile.files[0]);
    formData.append("title", titre.value);
    formData.append("category", select.selectedIndex);
    if (inputFile.files[0] === undefined) {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "<p> Veillez insérer l'image du projet </p>";
    } else {
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
  });
}
nouveauProjet();
