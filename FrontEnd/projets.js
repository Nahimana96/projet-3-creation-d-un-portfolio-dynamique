async function afficherProjets() {
  const projets = await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => data);

  for (let projet of projets) {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = projet.imageUrl;
    const titre = document.createElement("figcaption");
    titre.innerText = projet.title;

    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(titre);
  }
}

afficherProjets();
