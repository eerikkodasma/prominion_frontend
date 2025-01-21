import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthStoreState, LoginData, UserData } from "../../types/user";
import { authService } from "./authApi";
import { ALERT_TYPE } from "../alert/alertTypes";
import { setAlert } from "../alert/alertSlice";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return user && token ? JSON.parse(user) : null;
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData, { rejectWithValue, dispatch }) => {
    try {
      return await authService.loginUser(userData);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to login",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (userData: UserData, { rejectWithValue, dispatch }) => {
    try {
      return await authService.registerUser(userData);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to register with provided credentials",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: AuthStoreState = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
