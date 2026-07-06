import { useEffect } from "react";
import { useLoading } from "../utils/LoadingContext";
import { api } from "./axios";

const AxiosInterceptor = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      setLoading(true);
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