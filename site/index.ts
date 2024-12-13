import { createPost, getFeed } from "./lib/posts.js";
import { renderFeed, renderPostForm } from "./components/posts.js";

async function refreshFeed() {
  const feed = await getFeed();
  const feedElement = document.getElementById("feed")!;
  feedElement.innerHTML = "";
  renderFeed(feedElement, feed);
}

const postForm = renderPostForm(document.getElementById("postForm")!)!;

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = (
    document.querySelector("textarea[name=content]")! as HTMLTextAreaElement
  ).value;

  await createPost({ content });

  await refreshFeed();
});

refreshFeed();
