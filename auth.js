import { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const auth = await getAuth();
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        Cookies.set("token", "");
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      Cookies.set("token", token);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
