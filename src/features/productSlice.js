import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  products: [],
  detail: {},
  totalResult: 0,
};

export const queryProduct = createAsyncThunk(
  "product/queryProduct",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_API}/products`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDetailProduct = createAsyncThunk(
  "product/fetchDetailProduct",
  async (props) => {
    const { id } = props;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_API}/products/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (props) => {
    const { photo, name, description, price, category, tags, discount } = props;
    console.log("ini tags", tags);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    tags?.map((item) => formData.append("tags[]", item));
    formData.append("image_url", photo);
    formData.append("discount", discount);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (props) => {
    const { id, name, description, price, discount, status, category } = props;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_API}/products/${id}`,
        { name, description, price, discount, status, category }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (props) => {
    const { id } = props;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_API}/products/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.success = true;
        state.products = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(queryProduct.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(queryProduct.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(queryProduct.fulfilled, (state, action) => {
        state.success = true;
        state.products = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(addProduct.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.success = true;
        state.products.push(action.payload);
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(updateProduct.pending, (state) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        const { _id, name, description, price, status, category } =
          action.payload;
        const findProduct = state.products.find((data) => data._id === _id);
        if (findProduct) {
          findProduct.name = name;
          findProduct.description = description;
          findProduct.price = price;
          findProduct.status = status;
          findProduct.category = category;
        }
        state.errorMessage = "";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
        state.errorMessage = "";
      })
      .addCase(fetchDetailProduct.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchDetailProduct.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error;
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.detail = action.payload;
        state.errorMessage = "";
      });
  },
});

export default productSlice.reducer;
