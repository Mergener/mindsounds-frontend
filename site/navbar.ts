import { getLoggedUsername, isLoggedIn } from "./lib/auth.js";

const navbar = document.getElementById("navbar")!;

type NavbarItem = {
  text: string;
  href: string;
};

const loggedIn = isLoggedIn();

const navbarItems: NavbarItem[] = loggedIn
  ? [
      { text: "Home", href: "/" },
      { text: "Profile", href: `/profile?id=${getLoggedUsername()}` },
      { text: "Logout", href: "/logout" },
    ]
  : [
      { text: "Login", href: "/login" },
      { text: "Register", href: "/register" },
    ];

navbar.innerHTML = `
  <ul class="navbarItems">
    ${navbarItems
      .map(
        (item) => `
          <li>
            <a href="${item.href}">${item.text}</a>
          </li>
        `
      )
      .join("")}
  </ul>`;

if (loggedIn) {
  navbar.innerHTML += `
  <form action="/search" method="GET" class="search-container">
    <input 
      type="text" 
      name="q" 
      id="userSearch" 
      placeholder="Search for users..." 
      class="searchBar" 
      required 
    >
    <button type="submit" class="searchButton">Search</button>
  </form>`;
}
