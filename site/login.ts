import { logIn } from "./lib/auth.js";

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = (document.getElementById("username")! as HTMLInputElement).value;
  const password = (document.getElementById("password")! as HTMLInputElement).value;
  
  if (!username || !password) {
    alert("Please enter a username and password.");
    return;
  }

  logIn(username, password).then(() => {
    location.href = "/home.html";
  }).catch((err) => {
    alert(err.message);
  });
});
