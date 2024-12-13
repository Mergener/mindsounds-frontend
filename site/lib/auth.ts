import { HTTP } from "./http.js";

const http = new HTTP({ autoRetryLogin: false });

export type LoginResponse = {
  access: string;
  refresh: string;
};

export function getLoggedUsername(): string | null {
  return localStorage.getItem("loggedUsername");
}

export function logIn(username: string, password: string) {
  return http
    .post<LoginResponse>("/login", { username, password })
    .then((res) => {
      localStorage.setItem("authToken", res.body.access);
      localStorage.setItem("refreshToken", res.body.refresh);
      localStorage.setItem("loggedUsername", username);
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

export function refreshToken() {
  return http
    .post<LoginResponse>("/refresh-token", {
      refresh: localStorage.getItem("refreshToken"),
    })
    .then((res) => {
      localStorage.setItem("authToken", res.body.access);
      return res;
    });
}

export function isLoggedIn(): boolean {
  const token = localStorage.getItem("authToken");
  return !!token;
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("loggedUsername");
  document.location.href = "/";
}

export function makeForgotPasswordRequest() {
  return http.post("/forgot-password", {});
}

export function resetPassword(email: string) {
  return http.post("/reset-password", { email });
}

export function confirmResetPassword(
  base64uid: string,
  token: string,
  password: string
) {
  return http.post("/confirm-reset-password", {
    uid: base64uid,
    token,
    new_password: password,
  });
}
