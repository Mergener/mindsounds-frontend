import { renderMiniProfile } from "./components/profiles.js";
import {
  getFollowers,
  getFollowing,
  getProfileByIdOrUsername,
} from "./lib/profiles.js";

const url = new URL(window.location.href);

const profileId = url.searchParams.get("id");
const type = url.searchParams.get("type");

async function generate() {
  const followListDiv = document.getElementById(
    "followList"
  )! as HTMLDivElement;
  const title = document.getElementById("title")! as HTMLHeadingElement;

  const profile = await getProfileByIdOrUsername(profileId!);

  if (type === "followers") {
    title.textContent = `Followers of ${profile.username}`;
    const followers = await getFollowers(profile.id);
    followers.body.forEach((follower) => {
      renderMiniProfile(followListDiv, follower.follower.profile);
    });
  } else if (type === "following") {
    title.textContent = `People followed by ${profile.username}`;
    const following = await getFollowing(profile.id);
    following.body.forEach((following) => {
      renderMiniProfile(followListDiv, following.user.profile);
    });
  }

  const backButton = document.getElementById("back") as HTMLButtonElement;
  backButton.onclick = () => {
    location.href = `/profile?id=${profile.id}`;
  };
}

generate();
