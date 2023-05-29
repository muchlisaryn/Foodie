import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../utils";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  error: false,
  order: {},
  orders: [],
  allOrders: [],
  invoice: {},
};

export const order = createAsyncThunk("order/orders", async (props) => {
  try {
    const { delivery_fee, delivery_address } = props;
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/orders`,
      { delivery_fee, delivery_address },
      {
        headers: {
          Authorization: token(),
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
});

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_API}/allOrders`,
      {
        headers: {
          Authorization: token(),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return error.response;
  }
});

export const buyNow = createAsyncThunk("order/buyNow", async (props) => {
  try {
    const { items, delivery_fee, delivery_address } = props;
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/orders/buy-now`,
      { delivery_fee, delivery_address, items },
      {
        headers: {
          Authorization: token(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("ini error", error.response);
  }
});

export const getOrder = createAsyncThunk("order/getOrders", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_API}/orders`,
      {
        headers: {
          Authorization: token(),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const getInvoice = createAsyncThunk(
  "order/getInvoice",
  async ({ order_id }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_API}/invoice/${order_id}`,
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
  }
);

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL_API}/orders/${id}`,
      {
        headers: {
          Authorization: token(),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

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
        state.error = true;
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
      .addCase(getOrder.rejected, (state) => {
        state.error = true;
        state.pending = false;
        state.success = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.success = true;
        state.orders = action.payload;
        state.pending = false;
        state.error = false;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.error = true;
        state.pending = false;
        state.success = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.success = true;
        state.allOrders = action.payload;
        state.pending = false;
        state.error = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.error = true;
        state.pending = false;
        state.success = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.success = true;
        state.allOrders = state.allOrders.filter(
          (item) => item._id !== action.payload._id
        );
        state.pending = false;
        state.error = false;
      })
      .addCase(getInvoice.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(getInvoice.rejected, (state) => {
        state.error = true;
        state.pending = false;
        state.success = false;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.success = true;
        state.invoice = action.payload;
        state.pending = false;
        state.error = false;
      });
  },
});

export default orderSlice.reducer;
