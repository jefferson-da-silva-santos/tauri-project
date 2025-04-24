import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import NotyContext from "./NotyContext";
import axios from "axios";
import { User } from "./types";
import { AuthContext } from "./AuthContext";
import React from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const notyf = useContext(NotyContext);

  const loadingStoreData = () => {
    const storedUser = localStorage.getItem("@Auth:user") || "";
    const token = localStorage.getItem("@Auth:token") || "";
    const tokenExpiration = localStorage.getItem("@Auth:tokenExpiration") || "";

    if (!storedUser && !token && !tokenExpiration) {
      return;
    }

    const expirationDate = new Date(tokenExpiration);
    const currentDate = new Date();

    if (expirationDate > currentDate) {
      setUser(JSON.parse(storedUser ? storedUser : ""));
      return;
    }
    notyf.error("Sua sessão expirou!");
    signOut();
  };

  useEffect(() => {
    loadingStoreData();
  }, []);

  const signIn = async (url, values, isLogin) => {
    try {
      setLoadingSignIn(true);
      const response = await axios.post(url, values);
      const data = response.data;
      if (isLogin) {
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        localStorage.setItem("@Auth:token", data.token);
        localStorage.setItem("@Auth:user", JSON.stringify(data.user));
        localStorage.setItem(
          "@Auth:tokenExpiration",
          expirationDate.toISOString()
        );
      }
      notyf.success(data.message);
      setUser(data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      if (error.response) {
        if (error.response.status !== 401) {
          notyf.error(
            "Ocorreu um erro inesperado. Tente novamente mais tarde."
          );
          return;
        }
        notyf.error(error.response.data.message);
      } else if (error.request) {
        notyf.error(
          "Não foi possível conectar ao servidor. Verifique sua conexão."
        );
      } else {
        notyf.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        console.error("Erro Axios:", error);
      }
    } finally {
      setLoadingSignIn(false);
      resetForm();
    }
  };

  const signOut = () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:tokenExpiration");
    setUser(null);
    axios.defaults.headers.common["Authorization"] = undefined;
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signIn, signOut, loadingSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;