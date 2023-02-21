const userSophie = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};
function login(objet) {
  const autorisation = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(objet),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.token));
}
const adressMail = document.getElementById("email");
const password = document.getElementById("password");
const seConnecter = document.getElementById("submit");

seConnecter.addEventListener("click", (event) => {
  console.log("click");
  event.preventDefault();

  const user = {
    email: adressMail.value,
    password: password.value,
  };
  if (user.email == userSophie.email && user.password == userSophie.password) {
    console.log("ok");
    login(user);
  } else {
    console.log("vos id sont incorrectes");
  }
});
