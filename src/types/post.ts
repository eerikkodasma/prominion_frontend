import { User } from "./user";

export interface Post extends PostData {
  id: number;
}

export interface PostData {
  author: User;
  published_at: string;
  title: string;
  description: string;
  content: string;
}

export interface PostStoreState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

export interface PostFormData {
  published_at: string;
  title: string;
  description: string;
  content: string;
}

export const initialPostData: PostFormData = {
  published_at: "",
  title: "",
  description: "",
  content: "",
};

export enum POST_CRUD {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
