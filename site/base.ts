import { isLoggedIn } from "./lib/auth.js";

const allowedLoggedOutPages = [
  "/login.html",
  "/register.html",
  "/welcome.html",
];

if (!isLoggedIn()) {
  if (location.pathname === "/") {
    location.href = "/welcome.html";
  } else if (!allowedLoggedOutPages.includes(location.pathname)) {
    alert("You must be logged in to view this page.");
    location.href = "/welcome.html";
  }
} else {
  if (location.pathname === "/") {
    location.href = "/home.html";
  }
}
