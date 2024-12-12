import { Profile } from "../lib/profiles.js";
import { User } from "../lib/users.js";

export function renderMention(parent: HTMLElement, user: User) {
  const mentionElement = document.createElement("a");
  mentionElement.href = `/profile?id=${user.id}`;
  mentionElement.textContent = user.username;
  parent.appendChild(mentionElement);
  return mentionElement;
}

export function renderProfilePicture(parent: HTMLElement, profile: Profile) {
  const imgElement = document.createElement("img");
  imgElement.src = profile.profile_picture;
  parent.appendChild(imgElement);
  return imgElement;
}