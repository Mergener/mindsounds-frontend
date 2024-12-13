import { Profile } from "../lib/profiles.js";

export function getProfileLinkTag(username: string, displayText?: string) {
  return `<a href="/profile?id=${username}">${displayText ?? username}</a>`;
}

export function renderProfileLink(parent: HTMLElement, username: string) {
  parent.innerHTML += getProfileLinkTag(username);
}

export function renderProfilePicture(
  parent: HTMLElement,
  profile: Profile,
  imageSize: {
    width: number;
    height: number;
  } = { width: 100, height: 100 }
) {
  const imgElement = document.createElement("img");
  imgElement.className = "profilePicture";
  imgElement.src = profile.profile_picture;
  imgElement.width = imageSize.width;
  imgElement.height = imageSize.height;
  parent.appendChild(imgElement);
  return imgElement;
}

export function renderMiniProfile(parent: HTMLElement, profile: Profile) {
  const container = document.createElement("div");
  container.className = "mini-profile";

  renderProfilePicture(container, profile, { width: 50, height: 50 });

  renderProfileLink(container, profile.username);

  parent.appendChild(container);
  return container;
}
