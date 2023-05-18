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

export const detailProvinsi = createAsyncThunk(
  "dearah/detailProvince",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/provinsi/${id}`
      );
      return response.data;
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

export const detailKabupaten = createAsyncThunk(
  "daerah/detailKabupaten",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota/${id}`
      );
      return response.data;
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
      return response.data.kecamatan;
    } catch (error) {
      throw error;
    }
  }
);

export const detailKecamatan = createAsyncThunk(
  "daerah/detailKecamatan",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan/${id}`
      );
      return response.data;
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
      return response.data.kelurahan;
    } catch (error) {
      throw error;
    }
  }
);

export const detailKelurahan = createAsyncThunk(
  "kelurahan/detailKelurahan",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan/${id}`
      );
      return response.data;
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
      })
      .addCase(fetchKabupaten.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchKabupaten.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchKabupaten.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.kabupaten = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchKecamatan.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchKecamatan.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchKecamatan.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.kecamatan = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchKelurahan.pending, (state) => {
        state.pending = true;
        state.success = false;
        state.errorMessage = "";
      })
      .addCase(fetchKelurahan.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchKelurahan.fulfilled, (state, action) => {
        state.success = true;
        state.pending = false;
        state.kelurahan = action.payload;
        state.errorMessage = "";
      });
  },
});

export default daerahSlice.reducer;
