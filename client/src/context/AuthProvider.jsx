import { createContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { badCredentials } from "../utils/badCredentials";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/user/profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/candidate/candidateList")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        setCandidates(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data) => {
    axiosClient
      .post("/user/login", data)
      .then((response) => {
        setUser(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 350);
      })
      .catch((error) => {
        badCredentials()
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .get("/user/logout")
      .then((response) => {
        setUser(null);
      })
      .catch((error) => {
      });
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          login,
          logout,
          user,
          candidates,
          isLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
