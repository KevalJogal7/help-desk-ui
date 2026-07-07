import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { ToastMessage, ToastSeverity, ToastState } from "../../models/common";

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: {
      reducer(state, action: { payload: ToastMessage }) {
        state.toasts.push(action.payload);
      },
      prepare(message: string, severity: ToastSeverity = "info", duration = 4000) {
        return {
          payload: {
            id: nanoid(),
            message,
            severity,
            duration,
          } satisfies ToastMessage,
        };
      },
    },
    dismissToast(state, action: { payload: string }) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, dismissToast } = toastSlice.actions;
export default toastSlice.reducer;
