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

export function getUser(id: number) {
  return http.get<User>(`/users/${id}`).then((res) => res.body);
}
