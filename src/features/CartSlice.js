import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  cart: [],
};

const token = localStorage.getItem("auth");
console.log(token);

export const addCart = createAsyncThunk("cart/addCart", async (props) => {
  const { items, qty, price } = props;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/carts`,
      {
        items,
        qty,
        price,
      },
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

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_API}/carts`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCart = createAsyncThunk("cart/deleteCart", async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL_API}/carts/${id}`,
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addCart: (state, action) => {
    //   localStorage.setItem("cart", JSON.stringify(state.action));
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(addCart.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(addCart.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(addCart.fulfilled, (state) => {
        state.success = true;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(getCart.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(getCart.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.success = true;
        state.cart = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(deleteCart.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.success = true;
        state.cart = state.cart.filter(
          (product) => product._id !== action.payload._id
        );
        state.pending = false;
        state.errorMessage = "";
      });
  },
});

export default cartSlice.reducer;
