import React, { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

// Custom hook for fetching data
const useDataGetPrivate = (apiUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(apiUrl);
        setData(response.data);
      } catch (error) {
        setError(error);
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [apiUrl]);

  return { data, loading, error };
};

export default useDataGetPrivate;
