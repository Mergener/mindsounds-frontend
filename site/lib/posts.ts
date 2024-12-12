import { HTTP } from "./http.js";
import { User } from "./users.js";

const http = new HTTP({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

export type Post = {
  id: number;
  created_at: string;
  updated_at: string;
  content: string;
  author: User;
};

export async function getFeed() {
  const feed = await http.get<Post[]>("/posts/feed").then((res) => res.body);
  return feed;
}

export function getUserPosts(username: string) {
  console.log(username)
  return http.get<Post[]>("/posts").then((res) => res.body);
}

export function updatePost(postId: number, post: Pick<Post, "content">) {
  return http.put<Post>(`/posts/${postId}`, post).then((res) => res.body);
}

export function createPost(post: Pick<Post, "content">) {
  return http.post<Post>("/posts", post).then((res) => res.body);
}

export function deletePost(postId: number) {
  return http.delete(`/posts/${postId}`);
}
