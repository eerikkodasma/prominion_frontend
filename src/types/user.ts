export interface User extends UserData {
  id: number;
}

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthStoreState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const initialFormData: UserRegisterData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
};
