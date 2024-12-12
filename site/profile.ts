import { getProfile, getProfileByUsername } from "./lib/profiles.js";
import { getUser } from "./lib/users.js";

const url = new URL(window.location.href);

const profileId = url.searchParams.get("id");

async function generate() {
  const profile = await getProfile(profileId!).catch(() =>
    getProfileByUsername(profileId!)
  );

  const user = await getUser(profile.user);
  
  const profileElement = document.getElementById("profile")!;

  const usernameElement = document.createElement("h2");
  usernameElement.textContent = user.username;
  profileElement.appendChild(usernameElement);

  const imgElement = document.createElement("img");
  imgElement.src = profile.profile_picture;
  profileElement.appendChild(imgElement);

  const bioElement = document.createElement("p");
  bioElement.textContent = profile.bio;
  profileElement.appendChild(bioElement);
}

generate();
