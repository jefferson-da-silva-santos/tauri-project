import { useState } from "react";
import api from "../api/api";

const useApi = (endpoint = null, method = "GET") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestAPI = async (requestBody = null, end = endpoint ) => {
    setLoading(true);
    try {
      const config = {
        method,
        url: endpoint ? endpoint : end,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      };

      // Para DELETE, evitar passar o corpo da requisição
      if (method !== 'DELETE' && requestBody) {
        config.data = requestBody;
      }

      const response = await api(config);
      setData(response.data);
      return response.data;
    } catch (error) {
      setError(error.message || "Erro desconhecido");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, requestAPI };
};

export default useApi;
