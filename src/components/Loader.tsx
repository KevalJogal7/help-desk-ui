import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "../utils/LoadingContext";

const Loader = () => {
  const { loading } = useLoading();

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