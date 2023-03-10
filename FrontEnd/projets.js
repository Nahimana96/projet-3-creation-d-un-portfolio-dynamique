const projets = await fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => data);

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

    // supprimer les projets
    // trashIcon.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   deleteWork(projet.id);
    // });
  }
}
afficherProjets(projets);
const btnTous = document.querySelector(".Tous");
btnTous.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = "";
  afficherProjets(projets);
});

const btnObjets = document.querySelector(".Objets");
btnObjets.addEventListener("click", () => {
  const objets = projets.filter((projet) => {
    return projet.category.id == 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  afficherProjets(objets);
});
const btnAppartements = document.querySelector(".Appartements");
btnAppartements.addEventListener("click", () => {
  const appartements = projets.filter((projet) => {
    return projet.category.id == 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  afficherProjets(appartements);
});
const btnHotelRestaurant = document.querySelector(".Hotels-restaurants");
btnHotelRestaurant.addEventListener("click", () => {
  const hotelRestaurant = projets.filter((projet) => {
    return projet.category.id == 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  afficherProjets(hotelRestaurant);
});

// Création d'une fonction qui verifie si l'utilisateur est connecté
const lien = document.getElementById("login");
function afficherBtnModifier() {
  if (localStorage.getItem("UserId").length > 0) {
    document.querySelector(".modifier-image").style.display = "block";
    document.querySelector(".modifier-projets").style.display = "block";
    lien.textContent = "logout";
  }
}
afficherBtnModifier();

//écouter le bouton logout
lien.addEventListener("click", () => {
  localStorage.clear();
});

// Afficher l'icone "X" dans la modale
const xMark = document.createElement("i");
xMark.classList.add("fa-solid", "fa-xmark");
const modale = document.getElementById("modale");
modale.appendChild(xMark);

// écouter le bouton "modifier" pour afficher la modale
document.querySelector(".modifier-projets").addEventListener("click", () => {
  modale.style.display = "flex";
  document.querySelector(".gallery-modale").innerHTML = "";
  afficherProjetsDansModale();
});

// ecouter le bouton "X" pour fermer la modale
xMark.addEventListener("click", () => {
  modale.style.display = "none";
});

// Ajouter un projet

const ajoutPhoto = document.querySelector(".ajouter-photo");
const inputFile = document.querySelector("#file");
const imgArea = document.querySelector(".img-area");
ajoutPhoto.addEventListener("click", () => {
  inputFile.click();
});
// récuperer les données de l'image choisie
inputFile.addEventListener("change", () => {
  const image = inputFile.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const imgUrl = reader.result;
    const img = document.createElement("img");
    localStorage.setItem("imageUrl", imgUrl);
    img.src = imgUrl;
    imgArea.appendChild(img);
  };
  reader.readAsDataURL(image);
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
// ecouter le bouton "ajouter une photo" dans la modale
const createProjet = document.querySelector(".creer-projet");
createProjet.addEventListener("click", () => {
  ajouterProjet.style.display = "flex";
});

// création d'une fonction qui supprime un projet

function deleteWork(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  }).then((response) => console.log(response.status));
}

// création d'une fonction qui ajoute un projet
const titre = document.querySelector(".section-titre input");
const select = document.getElementById("categorie");

const formulaire = document.getElementById("ajout-projet");
formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  const imgAjouter = document.querySelector(".img-area img");
  const work = {
    id: select.selectedIndex,
    title: titre.value,
    imageUrl: imgAjouter.src,
    categoryId: select.value,
    userId: select.selectedIndex,
  };
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      accept: "application/json",
      "content-type": "multipart/form-data",
    },
    body: JSON.stringify(work),
  })
    // .then((response) => response.json())
    .then((data) => console.log(data.status))
    .catch((err) => console.log(err));
});
