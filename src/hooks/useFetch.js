import { useState, useEffect } from "react";
const api_key = import.meta.env.VITE_API_KEY;
export const useFetch = (endpoint, city, handleDataLoading, unit) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetch(
        `${endpoint}?q=${city}&appid=${api_key}&units=${unit}`
      );
      const data = await apiResponse.json();
      if (apiResponse.ok) {
        setData(data);
        setIsError(false);
        setError(null);
      } else {
        setData(null);
        setIsError(true);
        setError(data);
      }
    };
    try {
      handleDataLoading(true);
      fetchData();
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("NetworkError")
      ) {
        console.error("Internet connection lost");
      } else if (
        error instanceof Error &&
        error.message === "Failed to fetch"
      ) {
        console.error("Network error occurred");
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      handleDataLoading(false);
    }
  }, [city, unit]);
  return { data, isError, error };
};
