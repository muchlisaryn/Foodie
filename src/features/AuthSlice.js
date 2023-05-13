import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  user: {},
  auth: localStorage.getItem("auth"),
  role: {},
};

export const login = createAsyncThunk("auth/login", async (props) => {
  const { email, password } = props;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_AUTH}/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const logout = createAsyncThunk("auth/logout", async (token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_AUTH}/logout`,
      token,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getToken = createAsyncThunk("auth/getToken", async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_AUTH}/me`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.success = true;
        state.user = localStorage.setItem("auth", action.payload.token);
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(getToken.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(getToken.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.errorMessage = "";
      })
      .addCase(logout.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.success = true;
        state.pending = false;
        localStorage.removeItem("auth");
        state.role = {};
        state.user = {};
        state.errorMessage = "";
      });
  },
});

export default authSlice.reducer;
