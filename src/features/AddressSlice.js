import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../utils";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  address: [],
};

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_API}/delivery-addresses`,
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
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (props) => {
    try {
      const {
        name,
        no_telephone,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
        detail,
      } = props;
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/delivery-addresses`,
        {
          name,
          no_telephone,
          kelurahan,
          kecamatan,
          kabupaten,
          provinsi,
          detail,
        },
        {
          headers: {
            Authorization: token(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error add address => ", error.response);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_API}/delivery-addresses/${id}`,
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

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.success = true;
        state.address = action.payload;
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(addAddress.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.success = true;
        state.address.push(action.payload);
        state.pending = false;
        state.errorMessage = "";
      })
      .addCase(deleteAddress.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.success = true;
        state.address = state.address.filter(
          (item) => item._id !== action.payload._id
        );
        state.pending = false;
        state.errorMessage = "";
      });
  },
});

export default addressSlice.reducer;
