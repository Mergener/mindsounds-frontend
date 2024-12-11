import { HTTP } from "./http.js";

const http = new HTTP();

export type LoginResponse = {
  access: string;
  refresh: string;
};

export function logIn(username: string, password: string) {
  return http
    .post<LoginResponse>("/login", { username, password })
    .then((res) => {
      localStorage.setItem("authToken", res.body.access);
      return res;
    });
}

export function logOut(): void {
  localStorage.removeItem("authToken");
}

export function register(email: string, username: string, password: string) {
  return http
    .post("/register", { email, username, password })
    .then((_) => {
      return logIn(username, password);
    })
    .catch((err) => {
      throw new Error(err.body.detail);
    });
}

export function isLoggedIn(): boolean {
  const token = localStorage.getItem("authToken");
  return !!token;
}
