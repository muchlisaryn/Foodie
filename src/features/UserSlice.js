import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  users: [],
  user: {},
  totalResult: 0,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/user`);
    return response.data.data;
  } catch (e) {
    throw e;
  }
});

export const getOneUser = createAsyncThunk("user/getOneUser", async (props) => {
  const { id } = props;
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/user/${id}`);
    return response.data.data;
  } catch (e) {
    throw e;
  }
});

export const registerUser = createAsyncThunk("user/register", async (props) => {
  const { first_name, last_name, email, password, role } = props;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_AUTH}/register`,
      {
        first_name,
        last_name,
        email,
        password,
        role,
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (props) => {
  const { id } = props;
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/${id}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.success = true;
        state.users = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.users.push(action.payload);
        state.errorMessage = "";
      })
      .addCase(deleteUser.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        state.errorMessage = "";
      })
      .addCase(getOneUser.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.user = action.payload;
        state.errorMessage = "";
      });
  },
});

export default userSlice.reducer;
