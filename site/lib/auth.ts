import { HTTP } from "./http"

export function logIn(username: string, password: string): Promise<void> {
    return new HTTP().post("/login", { username, password }).then((response) => {
        localStorage.setItem("authToken", (response as any).token);
    });
}

export function logOut(): void {
    localStorage.removeItem("authToken");
}

export function register(email: string, username: string, password: string) {
    return new HTTP().post("/register", { email, username, password });
}

export function isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
}

