const userSophie = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};
async function login(objet) {
  const token = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(objet),
  })
    .then((response) => response.json())
    .then((data) => data.token);
  console.log(token);
}
const form = document.querySelector(".login-section");
const adressMail = document.getElementById("email");
const password = document.getElementById("password");
const seConnecter = document.getElementById("submit");

form.addEventListener("submit", (event) => {
  console.log("click");
  event.preventDefault();

  const user = {
    email: adressMail.value,
    password: password.value,
  };
  if (user.email == userSophie.email && user.password == userSophie.password) {
    login(user);
  } else {
    const error = document.querySelector(".error");
    const messageError = document.createElement("p");
    messageError.innerText = "Erreur dans l’identifiant ou le mot de passe";
    messageError.style.color = "red";
    error.appendChild(messageError);
  }
});
