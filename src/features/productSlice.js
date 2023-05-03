import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: false,
  success: false,
  errorMessage: "",
  products: [],
  totalResult: 0,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/products`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (props) => {
    const { name, description, price, discount, category, tags } = props;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/products`,
        {
          name,
          description,
          price,
          discount,
          category,
          tags,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (props) => {
    const {} = props;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/products`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
