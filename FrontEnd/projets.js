const projets = await fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log(error));
console.log(projets);
// Afficher les projets à la page d'accueil
function afficherProjets(projets) {
  for (let projet of projets) {
    const image = document.createElement("img");
    image.src = projet.imageUrl;

    const titre = document.createElement("figcaption");
    titre.innerText = projet.title;

    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");

    figure.classList.add("figureGallery");
    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(titre);
  }
}
afficherProjets(projets);

// // Trier les projets
function trierLesProjets() {
  // Bouton "TOUS" pour afficher tous les projets
  const btnTous = document.querySelector(".Tous");
  btnTous.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projets);
  });
  // Bouton "Objets" pour afficher uniquement les objets
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
  // écouter le bouton "modifier" pour afficher la modale
  const modale = document.getElementById("modale");
  document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", () => {
      modale.style.display = "flex";
      document.querySelector(".gallery-modale").innerHTML = "";
      afficherProjetsDansModale();
    });
  });
}
afficherBtnModifier();

//Afficher les projets dans la modale
async function afficherProjetsDansModale() {
  for (let projet of projets) {
    const btnsupprimer = document.createElement("div");
    const imageModale = document.createElement("img");
    const titreModal = document.createElement("figcaption");
    const galleryModale = document.querySelector(".gallery-modale");
    const figureModale = document.createElement("figure");
    const trashIcon = document.createElement("i");

    imageModale.src = projet.imageUrl;

    titreModal.textContent = "éditer";

    figureModale.classList.add("figureModale");
    btnsupprimer.classList.add("btn-supprimer");

    trashIcon.classList.add("fa-solid", "fa-trash-can");
    galleryModale.appendChild(figureModale);
    figureModale.appendChild(imageModale);
    figureModale.appendChild(titreModal);
    figureModale.appendChild(btnsupprimer);
    btnsupprimer.appendChild(trashIcon);

    // supprimer un projet au click
    btnsupprimer.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(projet);
      deleteProject(projet.id);
      removeObject(projets, projet.id);
    });
  }
  // Afficher l'icone "X" dans la modale
  const xMark = document.createElement("i");
  xMark.classList.add("fa-solid", "fa-xmark");
  const modale = document.getElementById("modale");
  modale.appendChild(xMark);

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
  }).catch((error) => console.log(error));
}
// La fonction qui enlève un projet de la liste
function removeObject(tableau, id) {
  const objWithIndex = tableau.findIndex((obj) => obj.id == id);
  console.log(objWithIndex);
  if (objWithIndex > -1) {
    tableau.splice(objWithIndex, 1);
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(tableau);
    document.querySelector(".gallery-modale").innerHTML = "";
    afficherProjetsDansModale(tableau);
  }
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
    console.log(image);
    // prevenir l'utilisateur si l'image dépasse 4MO
    const maxSizeBytes = 4000000;
    if (image.size > maxSizeBytes) {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.style.display = "block";
      errorMessage.innerHTML = "<p> votre image est supérieur à 4 Mo </p>";
    } else {
      document.querySelector(".error-message").style.display = "none";
      // localStorage.setItem("imageUrl", image);
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
  // changer la couleur du bouton lorsque
  // tous les champs sont remplis
  const formulaire = document.getElementById("ajout-projet");
  formulaire.addEventListener("change", () => {
    changeBtnColor();
  });
}
afficherFormulaire();

// création d'une fonction qui envoie le nouveau projet vers l'API
function nouveauProjet() {
  const titre = document.querySelector(".section-titre input");
  const select = document.getElementById("categorie");
  const formulaire = document.getElementById("ajout-projet");
  const inputFile = document.querySelector("#file");
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (event) => {
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
        .then((resp) => resp.json())
        .then((data) => {
          projets.push(data);
          document.querySelector(".gallery").innerHTML = "";
          afficherProjets(projets);
          document.querySelector(".gallery-modale").innerHTML = "";
          afficherProjetsDansModale(projets);
          alert("Votre projet a été ajouté");
        })
        .catch((err) => console.log(err));
    }
    event.preventDefault();
  });
}
nouveauProjet();

function changeBtnColor() {
  const titre = document.querySelector(".section-titre input");
  const select = document.getElementById("categorie");
  const inputFile = document.querySelector("#file");
  if (
    titre.value !== "" &&
    select.value !== "" &&
    inputFile.files[0] !== undefined
  ) {
    document.getElementById("submit").style.backgroundColor = "#1d6154";
  } else {
    document.getElementById("submit").style.backgroundColor = "#a7a7a7";
  }
}
