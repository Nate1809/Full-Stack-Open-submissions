import { createSlice } from "@reduxjs/toolkit";

// Initial state matching your current notification structure
const initialState = {
  message: null,
  isError: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.isError = action.payload.isError
    },

    clearNotification: (state) => {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotificationWithTimeout = (message, isError = false) => {
  return async (dispatch) => {
    // Your implementation here
    dispatch(setNotification({ message, isError }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
