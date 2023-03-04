const projets = await fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => data);

function afficherProjets(projets) {
  for (let projet of projets) {
    const image = document.createElement("img");
    const imageModale = document.createElement("img");
    image.src = projet.imageUrl;
    imageModale.src = projet.imageUrl;
    const titre = document.createElement("figcaption");
    titre.innerText = projet.title;
    const titreModal = document.createElement("figcaption");
    titreModal.textContent = "éditer";
    const gallery = document.querySelector(".gallery");
    const galleryModale = document.querySelector(".gallery-modale");
    const figure = document.createElement("figure");
    const figureModale = document.createElement("figure");
    const btnsupprimer = document.createElement("div");
    btnsupprimer.classList.add("btn-supprimer");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    gallery.appendChild(figure);
    galleryModale.appendChild(figureModale);

    figure.appendChild(image);
    figure.appendChild(titre);
    figureModale.appendChild(imageModale);
    figureModale.appendChild(titreModal);
    figureModale.appendChild(btnsupprimer);
    btnsupprimer.appendChild(trashIcon);
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
const xmark = document.createElement("i");
xmark.classList.add("fa-solid", "fa-xmark");
const modale = document.getElementById("modale");
modale.appendChild(xmark);

// écouter le bouton "modifier" pour afficher la modale
document.querySelector(".modifier-projets").addEventListener("click", () => {
  modale.style.display = "flex";
});

// ecouter le bouton "X" pour fermer la modale
xmark.addEventListener("click", () => {
  modale.style.display = "none";
});
