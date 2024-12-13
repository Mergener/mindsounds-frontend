import { renderFeed } from "./components/posts.js";
import { getLoggedUsername } from "./lib/auth.js";
import { getUserPosts } from "./lib/posts.js";
import {
  followProfile,
  getFollowersCount,
  getFollowingCount,
  getProfileByIdOrUsername,
  isFollowing,
  unfollowProfile,
} from "./lib/profiles.js";

const url = new URL(window.location.href);

const profileId = url.searchParams.get("id");

const profileNameElement = document.getElementById(
  "profileName"
) as HTMLHeadingElement;

const bioElement = document.getElementById(
  "profileBio"
) as HTMLParagraphElement;

const profilePictureElement = document.getElementById(
  "profileImage"
) as HTMLImageElement;

const postsDiv = document.getElementById("profilePosts")! as HTMLDivElement;

async function generate() {
  const profile = await getProfileByIdOrUsername(profileId!);

  profileNameElement.textContent = profile.username;
  // profileAboutElement.innerHTML = `About ${profile.username}`;
  bioElement.innerHTML = profile.bio;
  profilePictureElement.src = profile.profile_picture;

  const followingAndFollowersDiv = document.getElementById(
    "profileFollowingAndFollowers"
  ) as HTMLDivElement;

  const [nFollowers, nFollowing] = await Promise.all([
    getFollowersCount(profile.id),
    getFollowingCount(profile.id),
  ]);
  followingAndFollowersDiv.innerHTML = `
    <grid>
      <a href="/follow-list.html?id=${profile.id}&type=followers">
        ${nFollowers} Followers
      </a>
      <a href="/follow-list.html?id=${profile.id}&type=following">
        ${nFollowing} Following
      </a>
    </grid>
  `;

  const posts = await getUserPosts(profile.user);

  renderFeed(postsDiv, posts);

  if (profile.username === getLoggedUsername()) {
    const profileActionsDiv = document.getElementById(
      "profileActions"
    ) as HTMLDivElement;

    const editProfileButton = document.createElement("button");
    editProfileButton.textContent = "Edit Profile";
    editProfileButton.onclick = () => {
      window.location.href = `/edit-profile.html?id=${profile.id}`;
    };

    profileActionsDiv.appendChild(editProfileButton);
  } else {
    const followButton = document.createElement("button");

    if (await isFollowing(profile.id)) {
      followButton.textContent = "Unfollow";
      followButton.onclick = async () => {
        await unfollowProfile(profile.id);
        location.reload();
      };

      followingAndFollowersDiv.appendChild(followButton);
    }
    else {
      followButton.textContent = "Follow";
      followButton.onclick = async () => {
        await followProfile(profile.id);
        location.reload();
      };

      followingAndFollowersDiv.appendChild(followButton);
    }
  }
}

generate();
