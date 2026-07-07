import { store } from "../store/index";
import { showToast } from "../store/slices/toastSlice";

export const toast = {
  success: (message: string, duration?: number) =>
    store.dispatch(showToast(message, "success", duration)),

  error: (message: string, duration?: number) =>
    store.dispatch(showToast(message, "error", duration)),

  warning: (message: string, duration?: number) =>
    store.dispatch(showToast(message, "warning", duration)),

  info: (message: string, duration?: number) =>
    store.dispatch(showToast(message, "info", duration)),
};
