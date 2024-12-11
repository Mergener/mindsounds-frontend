import { register } from "./lib/auth.js";

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = (document.getElementById("email")! as HTMLInputElement).value;
  const username = (document.getElementById("username")! as HTMLInputElement)
    .value;
  const password = (document.getElementById("password")! as HTMLInputElement)
    .value;
  const confirmPassword = (
    document.getElementById("confirmPassword")! as HTMLInputElement
  ).value;

  if (!username || !password || !confirmPassword || !email) {
    alert("Please fill out all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  register(email, username, password)
    .then(() => {
      location.href = "/home.html";
    })
    .catch((err) => {
      alert(err.message);
    });
});
