import { confirmResetPassword } from "./lib/auth.js";

const confirmResetPasswordForm = document.getElementById("confirmResetPasswordForm")!;

confirmResetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = new URL(decodeURIComponent(location.href));

  const token = url.searchParams.get("t");
  const uid = url.searchParams.get("u");

  const passwordElement = document.getElementById("password")! as HTMLInputElement;
  const confirmPasswordElement = document.getElementById("confirmPassword")! as HTMLInputElement;

  const password = passwordElement.value;
  const confirmPassword = confirmPasswordElement.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  await confirmResetPassword(uid!, token!, password);
  alert("Password reset successfully!");
  location.href = "/";
});