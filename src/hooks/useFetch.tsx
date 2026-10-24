import { useEffect, useState } from "react";
import apiClient from "../api/client.api";
import { useToast } from "../contexts/ToastContext";

const useFetch = <T extends unknown>(url: string) => {
  const { showToast } = useToast();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emptyResponse, setEmptyResponse] = useState(false);

  // Fetch cars from the API
  useEffect(() => {
    apiClient
      .get(url)
      .then((response) => {
        response.data.length > 0
          ? setData(response.data)
          : setEmptyResponse(true);
        setLoading(false);
      })
      .catch(() => {
        const message = "Failed to load data. Please try again later.";
        setError(message);
        showToast("error", message);
        setLoading(false);
      });
  }, [showToast, url]);

  return { data, loading, error, emptyResponse };
};

export default useFetch;
