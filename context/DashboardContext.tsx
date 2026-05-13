import { createContext, useState, useEffect, useContext } from "react";
import Toast from "react-native-toast-message";
import { createAuthAxios } from "../api/authAxios"; // Import the createAuthAxios function
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { refreshAccessToken, accessToken, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const authAxios = createAuthAxios();

  const fetchUserData = async () => {
    try {
      const { data } = await authAxios.get("/users/auth/users/me/");
      setUser(data);
      AsyncStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      if (error.response?.status === 401) {
        logout("Session expired. Please log in again.");
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to fetch user data.",
        });
      }
    }
  };

  const refreshUserData = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (accessToken) {
      (async () => {
        await fetchUserData();
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [accessToken]);


  return (
    <DashboardContext.Provider value={{ user, setUser, loading, refreshing, refreshUserData }}>
      {children}
    </DashboardContext.Provider>
  );
};
