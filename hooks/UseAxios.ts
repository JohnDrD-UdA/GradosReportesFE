import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useRef, useState } from "react";

const axiosFetch = axios.create({
  baseURL: "http://localhost:8080/api/",
} as AxiosRequestConfig);

interface useAxios {
  error: string | AxiosError<unknown, any> | null;
  sendRequest: (
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
    handleResponse?: (response: AxiosResponse) => void
  ) => void;
  cancel: () => void;
}

const useAxios = (): useAxios => {
  const [error, setError] = useState<string | AxiosError | null>(null);
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  const sendRequest = useCallback(
    async (
      endpoint: string,
      requestConfig?: AxiosRequestConfig,
      handleResponse?: (response: AxiosResponse) => void
    ) => {
      let token: string | null = null;
      setError(null);

      try {
        let config = requestConfig;
        if (token) {
          config = {
            ...requestConfig,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosFetch(endpoint, {
          ...config,
          signal: controllerRef.current.signal,
        });

        if (handleResponse) {
          handleResponse(response);
        }
      } catch (error) {
        const errorObj = error as AxiosError;
        if (errorObj.response?.status !== 401) {
          if (errorObj.response) {
            const { data } = errorObj.response as AxiosResponse;
            if (data.message !== undefined) {
              setError(data.message);
            } else {
              setError("error");
            }
          } else {
            setError("error");
          }
        }
      }
    },
    []
  );

  return {
    error,
    sendRequest,
    cancel,
  };
};

export default useAxios;
