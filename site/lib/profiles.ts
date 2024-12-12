import { HTTP } from "./http.js";

const http = new HTTP({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  user: number;
  bio: string;
  profile_picture: string;
};

export function getProfile(id: string) {
  return http.get<Profile>(`/profiles/${id}`).then((res) => res.body);
}

export function getProfileByUsername(username: string) {
  return http
    .get<Profile>(`/profiles/by-username/${username}`)
    .then((res) => getProfile(res.body.id));
}
