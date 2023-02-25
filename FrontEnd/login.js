const userSophie = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};
async function login(objet) {
  const bearerToken = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(objet),
  })
    .then((response) => response.json())
    .then((data) => data.token);
  console.log(bearerToken);
}
const form = document.querySelector(".login-section");
const adressMail = document.getElementById("email");
const password = document.getElementById("password");
form.addEventListener("submit", (event) => {
  console.log("click");
  event.preventDefault();

  const user = {
    email: adressMail.value,
    password: password.value,
  };
  const error = document.querySelector(".error");

  if (user.email == userSophie.email && user.password == userSophie.password) {
    error.innerHTML = "";
    login(user);
    window.location.href = "index.html";
  } else {
    const messageError = document.createElement("p");
    error.innerHTML = "";
    messageError.innerText = "Erreur dans l’identifiant ou le mot de passe";
    messageError.style.color = "red";
    error.appendChild(messageError);
  }
});
