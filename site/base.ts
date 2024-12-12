import { isLoggedIn } from "./lib/auth.js";
import { processPathName } from "./lib/utils.js";

const allowedLoggedOutPages = ["/login", "/register", "/welcome"];

if (!isLoggedIn()) {
  if (location.pathname === "/") {
    location.href = "/welcome";
  } else if (
    !allowedLoggedOutPages.includes(processPathName(location.pathname))
  ) {
    alert("You must be logged in to view this page.");
    location.href = "/welcome";
  }
} else {
  if (location.pathname === "/") {
    location.href = "/home.html";
  }
}
