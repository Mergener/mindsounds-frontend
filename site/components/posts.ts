import { getLoggedUsername } from "../lib/auth.js";
import { deletePost, Post } from "../lib/posts.js";
import { renderMention, renderProfilePicture } from "./profiles.js";

function processPostContentMentions(content: string): string {
  return content.replace(/@(\w+)/g, "<a href='/profile?id=$1'>@$1</a>");
}

export function renderPost(parent: HTMLElement, post: Post): HTMLDivElement {
  const postElement = document.createElement("div");

  renderProfilePicture(postElement, post.author.profile);
  postElement.appendChild(document.createElement("br"));
  renderMention(postElement, post.author);

  postElement.innerHTML += `
    <p><a href="/post?id=${post.id}">${new Date(post.created_at).toLocaleString()}</a></p>
    <p>${processPostContentMentions(post.content)}</p>
    `;

  if (post.author.username === getLoggedUsername()) {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
      window.location.href = `/post?id=${post.id}`;
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      deletePost(post.id);
      postElement.remove();
    };

    postElement.appendChild(deleteButton);
  }

  parent.appendChild(postElement);
  return postElement!;
}

export function renderPostForm(parent: HTMLElement): HTMLFormElement {
  const formElement = document.createElement("form");
  formElement.innerHTML = `
    <textarea name="content"></textarea>
    <button type="submit">Post</button>
  `;
  parent.appendChild(formElement);
  return formElement!;
}

export function renderFeed(parent: HTMLElement, posts: Post[]): HTMLElement {
  for (const post of posts) {
    const postElement = renderPost(parent, post);
    postElement.appendChild(document.createElement("br"));
  }

  return parent;
}
