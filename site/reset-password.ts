import { resetPassword } from "./lib/auth.js";

const resetPasswordForm = document.getElementById("resetPasswordForm")!;
resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailElement = document.getElementById("email")! as HTMLInputElement;
  const email = emailElement.value;
  await resetPassword(email);
  resetPasswordForm.parentElement!.innerHTML =
    "Password reset email sent. Check your inbox and follow the instructions.";
});
