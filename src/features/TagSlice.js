import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  tag: [],
  totalResult: 0,
};

export const fetchTag = createAsyncThunk("tag/fetchTag", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/tag`);
    return response.data;
  } catch (e) {
    throw e;
  }
});

export const addTag = createAsyncThunk("tag/addTag", async (props) => {
  const { name } = props;
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/tag`, {
      name,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
});

export const deleteTag = createAsyncThunk("tag/deleteTag", async (props) => {
  const { id } = props;
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/tag/${id}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
});

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTag.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchTag.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchTag.fulfilled, (state, action) => {
        state.success = true;
        state.tag = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(addTag.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(addTag.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(addTag.fulfilled, (state) => {
        state.success = true;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(deleteTag.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.success = true;
        state.pending = false;
        state.errorMessage = "";
      });
  },
});

export default tagSlice.reducer;
