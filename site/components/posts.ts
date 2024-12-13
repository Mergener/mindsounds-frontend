import { getLoggedUsername } from "../lib/auth.js";
import { deletePost, Post } from "../lib/posts.js";
import {
  renderProfileLink,
  renderProfilePicture,
  getProfileLinkTag,
} from "./profiles.js";

function processPostContentMentions(content: string): string {
  const matches = content.match(/@(\w+)/g);
  if (!matches) return content;

  matches.forEach((match) => {
    const username = match.slice(1);
    content = content.replace(
      match,
      getProfileLinkTag(username, `@${username}`)
    );
  });

  return content;
}

export function renderPost(parent: HTMLElement, post: Post): HTMLDivElement {
  const postElement = document.createElement("div");

  postElement.className = "post";

  renderProfilePicture(postElement, post.author.profile);
  postElement.appendChild(document.createElement("br"));
  renderProfileLink(postElement, post.author.username);

  postElement.innerHTML += `
    <p>${new Date(post.created_at).toLocaleString()}</p>
    <h2><p>${processPostContentMentions(post.content)}</p></h2>
    `;

  if (post.author.username === getLoggedUsername()) {
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
    <textarea name="content" placeholder="What's on your mind?"></textarea>
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
