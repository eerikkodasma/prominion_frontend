import axios from "axios";
import { LoginData, UserData } from "../../types/user";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/auth/`,
});

export const authService = {
  async loginUser(userData: LoginData) {
    const response = await api.post("login/", userData);
    return response.data;
  },

  async registerUser(userData: UserData) {
    const response = await api.post("register/", userData);
    return response.data;
  },
};
