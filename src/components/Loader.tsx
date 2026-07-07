import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../store/hooks";

const Loader = () => {
  const loading = useAppSelector((state) => state.loading.loading);

  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;