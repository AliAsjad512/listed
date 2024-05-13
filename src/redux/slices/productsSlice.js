// import axios from "axios";

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   status: "idle",
//   error: null,
// };


// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await axios.get("https://fakestoreapi.com/products");
//     return response.data;
//   }
// );

// export const products = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     addProduct(state, action) {
//       state.items.push(action.payload);
//     },
//     resetProducts(state) {
//       return initialState;
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchProducts.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Set state items to the fetched products\
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addProduct, resetProducts } = products.actions;

// export const selectAllProducts = (state) => state.products.items;
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data.map(product => ({ ...product, addedToCart: false }));
    // Modify the response to include addedToCart property initialized as false
  }
);

export const products = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action) {
      const { id } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.addedToCart = true; // Update the addedToCart property to true
      }
    },
    resetProducts(state) {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProduct, resetProducts } = products.actions;

export const selectAllProducts = (state) => state.products.items;
