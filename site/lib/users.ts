import { HTTP } from "./http.js";
import { Profile } from "./profiles.js";

const http = new HTTP({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

export type User = {
  id: number;
  username: string;
  profile: Profile;
};

export function searchUsers(query: string) {
  return http.get<User[]>(`/profiles/search?q=${query}`).then((res) => res.body);
}
