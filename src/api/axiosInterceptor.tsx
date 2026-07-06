import { useEffect } from "react";
import { useLoading } from "../utils/LoadingContext";
import { api } from "./axios";
import { authStorage } from "../services/storage.service";

const AxiosInterceptor = () => {
  const { setLoading } = useLoading();
  const token = authStorage.getAccessToken();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      setLoading(true);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);

  return null;
};

export default AxiosInterceptor;