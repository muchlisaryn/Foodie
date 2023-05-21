import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  order: {},
  orders: {},
  invoice: {},
};

export const order = createAsyncThunk("order/orders", async (props) => {
  try {
    const { delivery_fee, delivery_address, token } = props;
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/orders`,
      { delivery_fee, delivery_address },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

export const getOrder = createAsyncThunk(
  "order/getOrders",
  async ({ token }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/orders`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(order.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(order.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(order.fulfilled, (state, action) => {
        state.success = true;
        state.order = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(getOrder.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.success = true;
        state.orders = action.payload;
        state.pending = false;
        state.errorMessage = "";
      });
  },
});

export default orderSlice.reducer;
