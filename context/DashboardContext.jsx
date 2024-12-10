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
  const authAxios = createAuthAxios(); // Create the authAxios instance

  const fetchUserData = async () => {
    // why were you defining the authAxios inside a non-global function??

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserData();
    } else {
      setLoading(false); // If no access token, stop loading
    }
  }, [accessToken]);
  console.log(user, "fukinguser");

  return (
    <DashboardContext.Provider value={{ user, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};
