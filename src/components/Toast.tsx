import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { dismissToast } from "../store/slices/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);

  return (
    <>
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={toast.duration ?? 4000}
          onClose={() => dispatch(dismissToast(toast.id))}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ top: 24 + index * 72 }} // stack toasts vertically
        >
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => dispatch(dismissToast(toast.id))}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Toast;
