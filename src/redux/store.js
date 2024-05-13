import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { products } from "./slices/productsSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { user } from "./slices/userSlice";
import { cart } from "./slices/cartSlice";

const reducers = combineReducers({
  products: products.reducer,
  user: user.reducer,
  cart: cart.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    console.log("here");
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistConfig = {
  key: "counter",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
