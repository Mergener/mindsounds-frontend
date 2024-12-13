import { renderMiniProfile } from "./components/profiles.js";
import { searchUsers } from "./lib/users.js";

const url = new URL(window.location.href);

const search = url.searchParams.get("q");

searchUsers(search!).then((users) => {
  const searchResults = document.getElementById("searchResults")!;

  users.forEach((user) => {
    renderMiniProfile(searchResults, user.profile);
  });
});

document.getElementById('back')!.onclick = () => {
  window.history.back();
}
