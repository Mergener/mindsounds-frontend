import { HTTP } from "./http.js";
import { User } from "./users.js";

const http = new HTTP({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

export type Profile = {
  id: number;
  created_at: string;
  updated_at: string;
  user: number;
  username: string;
  bio: string;
  profile_picture: string;
};

export type Follower = {
  user: User;
  follower: User;
};

export function getProfile(id: number) {
  return http.get<Profile>(`/profiles/${id}`).then((res) => res.body);
}

export function getProfileByUsername(username: string) {
  return http
    .get<Profile>(`/profiles/by-username/${username}`)
    .then((res) => getProfile(res.body.id));
}

export function getProfileByIdOrUsername(idOrUsername: number | string) {
  if (typeof idOrUsername === "number") {
    return getProfile(idOrUsername);
  }

  const number = parseInt(idOrUsername as string);
  if (!isNaN(number)) {
    return getProfile(number);
  }

  return getProfileByUsername(idOrUsername);
}

export function updateProfile(
  profileId: number,
  profile: Partial<Pick<Profile, "bio" | "profile_picture">>
) {
  return http
    .patch<Profile>(`/profiles/${profileId}`, profile)
    .then((res) => res.body);
}

export function updateProfilePictureWithFormData(formData: FormData) {
  return http
    .postMultipart(`/profiles/upload-profile-picture`, formData)
    .then((res) => res.body);
}

export function followProfile(profileId: number) {
  return http.post(`/profiles/${profileId}/follow`, {});
}

export function unfollowProfile(profileId: number) {
  return http.post(`/profiles/${profileId}/unfollow`, {});
}

export function getFollowers(profileId: number) {
  return http.get<Follower[]>(`/profiles/${profileId}/followers`);
}

export function getFollowing(profileId: number) {
  return http.get<Follower[]>(`/profiles/${profileId}/following`);
}

export function getFollowersCount(profileId: number) {
  return http
    .get<{ followers_count: number }>(`/profiles/${profileId}/followers-count`)
    .then((res) => res.body.followers_count);
}

export function getFollowingCount(profileId: number) {
  return http
    .get<{ following_count: number }>(`/profiles/${profileId}/following-count`)
    .then((res) => res.body.following_count);
}

export function isFollowing(profileId: number) {
  return http
    .get<{ is_following: boolean }>(`/profiles/is-following/${profileId}`)
    .then((res) => res.body.is_following);
}
