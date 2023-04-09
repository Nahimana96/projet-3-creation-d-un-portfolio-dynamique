const form = document.querySelector(".login-section");
const adressMail = document.getElementById("email");
const password = document.getElementById("password");
// création d'une fonction qui permet
// de connecter l'administrateur si les identifiants sont correctes
function connectAdministrator() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
      email: adressMail.value,
      password: password.value,
    };
    const error = document.querySelector(".error");
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        localStorage.setItem("code", response.status);
        response.json().then((data) => {
          console.log(localStorage.getItem("code"));
          if (localStorage.getItem("code") == 200) {
            error.innerHTML = "";
            localStorage.setItem("UserId", user.email);
            localStorage.setItem("token", data.token);
            window.location = "index.html";
          } else {
            const messageError = document.createElement("p");
            error.innerHTML = "";
            messageError.innerText =
              "Erreur dans l’identifiant ou le mot de passe";
            messageError.style.color = "red";
            error.appendChild(messageError);
          }
        });
      })
      .catch((error) => console.log(error));
  });
}
connectAdministrator();
