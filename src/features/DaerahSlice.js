import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  province: [],
  kabupaten: [],
  kecamatan: [],
  kelurahan: [],
};

export const fetchProvinsi = createAsyncThunk(
  "dearah/fetchProvince",
  async () => {
    try {
      const response = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
      );
      return response.data.provinsi;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchKabupaten = createAsyncThunk(
  "daerah/fetchKabupaten",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
      );
      return response.data.kota_kabupaten;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchKecamatan = createAsyncThunk(
  "daerah/fetchKecamatan",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchKelurahan = createAsyncThunk(
  "kelurahan/fetchKelurahan",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const daerahSlice = createSlice({
  name: "daerah",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProvinsi.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchProvinsi.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchProvinsi.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.province = action.payload;
        state.errorMessage = "";
      });
  },
});

export default daerahSlice.reducer;
