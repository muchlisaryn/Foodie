import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../utils";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  cart: [],
};

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
          Authorization: token(),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_API}/carts`, {
      headers: {
        Authorization: token(),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

export const updateCart = createAsyncThunk("cart/updateCart", async (props) => {
  const { qty, id } = props;
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_URL_API}/carts/${id}`,
      { qty },
      {
        headers: {
          Authorization: token(),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
});

export const deleteCart = createAsyncThunk("cart/deleteCart", async (props) => {
  const { id } = props;
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL_API}/carts/${id}`,
      {
        headers: {
          Authorization: token(),
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
  reducers: {},
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
      .addCase(addCart.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.cart.push(action.payload);
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
      })
      .addCase(updateCart.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.success = true;
        const { qty, total, id } = action.payload;
        const findCart = state.cart.find((data) => data._id === id);
        if (findCart) {
          findCart.qty = qty;
          findCart.total = total;
        }
        state.pending = false;
        state.errorMessage = "";
      });
  },
});

export default cartSlice.reducer;
