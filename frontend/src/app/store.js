import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AuthReducer from "../features/auth/AuthSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth  : AuthReducer
  },
});
