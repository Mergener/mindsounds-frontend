import {
  getProfileByIdOrUsername,
  updateProfile,
  updateProfilePictureWithFormData,
} from "./lib/profiles.js";

const url = new URL(window.location.href);

const profileId = url.searchParams.get("id")!;

console.log({ profileId });

getProfileByIdOrUsername(profileId).then((profile) => {
  const bioInput = document.getElementById("bio") as HTMLInputElement;

  bioInput.value = profile.bio;

  const editBioForm = document.getElementById("editBioForm") as HTMLFormElement;
  editBioForm.addEventListener("click", async (e) => {
    e.preventDefault();
    const bio = bioInput.value;
    await updateProfile(profile.id, { bio });
    location.href = `/profile.html?id=${profile.id}`;
  });

  const editProfilePictureForm = document.getElementById(
    "editProfilePictureForm"
  ) as HTMLFormElement;

  editProfilePictureForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = document.getElementById(
      "editProfilePictureForm"
    ) as HTMLFormElement;
    const formData = new FormData(form);
    await updateProfilePictureWithFormData(formData);
    location.href = `/profile.html?id=${profile.id}`;
  });

  const cancelButton = document.getElementById("cancel") as HTMLButtonElement;
  cancelButton.onclick = () => {
    location.href = `/profile.html?id=${profile.id}`;
  };
});
