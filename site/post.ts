import { renderPostForm } from "./components/posts.js";
import { updatePost } from "./lib/posts.js";

const url = new URL(window.location.href);
const postId = parseInt(url.searchParams.get("id")!);

const postForm = renderPostForm(document.getElementById("postForm")!);
postForm.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();
    const content = (
      document.querySelector("textarea[name=content]")! as HTMLTextAreaElement
    ).value;

    await updatePost(postId, { content });
  }
);
