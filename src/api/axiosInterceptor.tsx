import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setLoading } from "../store/slices/loadingSlice";
import { api } from "./axios";
import { authStorage } from "../services/storage.service";

const AxiosInterceptor = () => {
  const dispatch = useAppDispatch();
  const token = authStorage.getAccessToken();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      dispatch(setLoading(true));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        dispatch(setLoading(false));
        return response;
      },
      (error) => {
        dispatch(setLoading(false));
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);

  return null;
};

export default AxiosInterceptor;