import axios from "axios";
import { Post, PostData } from "../../types/post";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const postService = {
  async fetchPosts() {
    const response = await api.get("/posts/");
    return response.data;
  },

  async fetchPost(id: number) {
    const response = await api.get(`/posts/${id}/`);
    return response.data;
  },

  async createPost(postData: PostData) {
    const response = await api.post("/posts/", postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async updatePost(post: Post) {
    const response = await api.put(`/posts/${post.id}/`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async deletePost(id: number) {
    const response = await api.delete(`/posts/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
};
