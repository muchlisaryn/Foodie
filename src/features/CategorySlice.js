import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addTag } from "./TagSlice";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  categories: [],
  totalResult: 0,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/category`);
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (props) => {
    const { name } = props;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/category`,
        {
          name,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (props) => {
    const { id } = props;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/category/${id}`
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/upadteCategory",
  async (props) => {
    const { id, name } = props;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/category/${id}`,
        {
          name,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.success = true;
        state.categories = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(addCategory.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.categories.push(action.payload);
        state.errorMessage = "";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
        state.errorMessage = "";
      })
      .addCase(updateCategory.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        const { _id, name } = action.payload;
        const findCategory = state.categories.find((data) => data._id === _id);
        if (findCategory) {
          findTag.name = name;
        }
        state.errorMessage = "";
      });
  },
});

export default categorySlice.reducer;
