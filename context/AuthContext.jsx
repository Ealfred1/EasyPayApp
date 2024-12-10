// import { createContext, useState, useEffect, useCallback } from "react";
// import axiosInstance from "../api/axios";
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(
//     localStorage.getItem("accessToken") || null
//   );
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const navigate = useNavigate();

//   // Refresh access token using the refresh token
//   const refreshAccessToken = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         const { data } = await axiosInstance.post("/users/auth/jwt/refresh/", {
//           refresh: refreshToken,
//         });
//         setAccessToken(data.access);
//         localStorage.setItem("accessToken", data.access);
//         return data.access;
//       }
//     } catch (error) {
//       handleTokenError(error);
//       return null;
//     }
//   };

//   // Refresh token every 4 hours
//   const scheduleTokenRefresh = useCallback(() => {
//     const refreshInterval = setInterval(async () => {
//       const newToken = await refreshAccessToken();
//       if (newToken) setAccessToken(newToken);
//     }, 4 * 60 * 60 * 1000); // Every 4 hours

//     return () => clearInterval(refreshInterval);
//   }, []);

//   // Initial token setup or when the user returns to the page
//   useEffect(() => {
//     const checkAndRefreshToken = async () => {
//       const refreshToken = localStorage.getItem("refreshToken");
//       const storedAccessToken = localStorage.getItem("accessToken");

//       if (!storedAccessToken && refreshToken) {
//         // If no access token but refresh token exists, request a new access token
//         const newAccessToken = await refreshAccessToken();
//         if (newAccessToken) {
//           setAccessToken(newAccessToken);
//           scheduleTokenRefresh(); // Schedule refresh every 4 hours
//         } else {
//           logout();
//         }
//       } else if (storedAccessToken) {
//         setAccessToken(storedAccessToken);
//         scheduleTokenRefresh();
//       }
//     };

//     checkAndRefreshToken();
//   }, [scheduleTokenRefresh]);

//   // Function to initialize or refresh token on page load
//   useEffect(() => {
//     const initializeToken = async () => {
//       if (!accessToken) {
//         await refreshAccessToken();
//       }
//     };
//     initializeToken();
//   }, [accessToken, refreshAccessToken]);

//   // Register user
//   const register = async (userData) => {
//     try {
//       const response = await axiosInstance.post("/users/register/", userData);
//       setUser(response.data);
//       setOtpSent(true);
//       toast.success("Registration successful! OTP sent to your email.");
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   // Verify OTP and log in user
//   const verifyOtp = async (email, otp) => {
//     try {
//       const response = await axiosInstance.post("/users/verify-otp/", {
//         email,
//         otp,
//       });
//       setUser(response.data);
//       setOtpVerified(true);
//       toast.success("Verification Successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "OTP verification failed.");
//     }
//   };

//   // Log in user (JWT Authentication)
//   const loginUser = async (username, password) => {
//     try {
//       const { data } = await axiosInstance.post("/users/auth/jwt/create/", {
//         username,
//         password,
//       });
//       setAccessToken(data.access);
//       localStorage.setItem("accessToken", data.access);
//       localStorage.setItem("refreshToken", data.refresh);
//       // toast.success('Login successful!');
//       scheduleTokenRefresh();
//       navigate("/dashboard");
//     } catch (error) {
//       handleError(error);
//       throw error;
//     }
//   };

//   // Resend OTP
//   const resendOtp = async (email) => {
//     try {
//       await axiosInstance.post("/users/resend-otp/", { email });
//       toast.success("OTP resent to your email.");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to resend OTP.");
//     }
//   };

//   // Log out user and clear tokens
//   const logout = ({ message }) => {
//     setAccessToken(null);
//     setUser(null);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     navigate("/");
//     // message ? toast.info(message) : toast.info('Logged out successfully!');
//   };

//   // Handle Errors
//   const handleError = (error) => {
//     const errors = error.response?.data || {};
//     if (errors.email) {
//       toast.error(errors.email[0]);
//     } else if (errors.username) {
//       toast.error(errors.username[0]);
//     } else if (error.response?.status === 401) {
//       // toast.error(error.response.data.detail);
//     }
//   };

//   // Handle token refresh error
//   const handleTokenError = (error) => {
//     console.error("Token refresh error:", error);
//     setAccessToken(null);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     toast.error("Session expired. Please log in again.");
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         accessToken,
//         otpSent,
//         otpVerified,
//         register,
//         verifyOtp,
//         loginUser,
//         refreshAccessToken,
//         resendOtp,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../api/axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigation = useNavigation();

  // Refresh access token using the refresh token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        const { data } = await axiosInstance.post("/users/auth/jwt/refresh/", {
          refresh: refreshToken,
        });
        setAccessToken(data.access);
        await AsyncStorage.setItem("accessToken", data.access);
        return data.access;
      }
    } catch (error) {
      handleTokenError(error);
      return null;
    }
  };

  // Refresh token every 4 hours
  const scheduleTokenRefresh = useCallback(() => {
    const refreshInterval = setInterval(async () => {
      const newToken = await refreshAccessToken();
      if (newToken) setAccessToken(newToken);
    }, 4 * 60 * 60 * 1000); // Every 4 hours

    return () => clearInterval(refreshInterval);
  }, []);

  // Initial token setup or when the user returns to the app
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const storedAccessToken = await AsyncStorage.getItem("accessToken");

      if (!storedAccessToken && refreshToken) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          scheduleTokenRefresh();
        } else {
          logout();
        }
      } else if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        scheduleTokenRefresh();
      }
    };

    checkAndRefreshToken();
  }, [scheduleTokenRefresh]);

  // Register user
  const register = async (userData) => {
    try {
      const response = await axiosInstance.post("/users/register/", userData);
      console.log(response);

      setUser(response.data);
      setOtpSent(true);
      Toast.show({
        type: "success",
        text1: "Registration successful!",
        text2: "OTP sent to your email.",
      });
    } catch (error) {
      console.log("n");

      handleError(error);
    }
  };

  // Verify OTP and log in user
  const verifyOtp = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/users/verify-otp/", {
        email,
        otp,
      });
      setUser(response.data);
      setOtpVerified(true);
      Toast.show({
        type: "success",
        text1: "Verification Successful!",
      });
      // navigation.navigate("Dashboard");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.error || "OTP verification failed.",
      });
    }
  };

  // Log in user (JWT Authentication)
  const loginUser = async (username, password) => {
    try {
      const { data } = await axiosInstance.post("/users/auth/jwt/create/", {
        username,
        password,
      });
      setAccessToken(data.access);
      await AsyncStorage.setItem("accessToken", data.access);
      await AsyncStorage.setItem("refreshToken", data.refresh);
      scheduleTokenRefresh();

      router.replace("/mainSidescreens");
    } catch (error) {
      console.log(error, "stypid");

      handleError(error);
      throw error;
    }
  };

  // Resend OTP
  const resendOtp = async (email) => {
    console.log(email, "lo");

    try {
      await axiosInstance.post("/users/resend-otp/", {
        email: email,
      });
      Toast.show({
        type: "success",
        text1: "OTP resent to your email.",
      });
    } catch (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to resend OTP.",
      });
      throw new Error("fuckup");
    }
  };

  // Log out user and clear tokens
  const logout = () => {
    setAccessToken(null);
    setUser(null);
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");
    navigation.navigate("login");
    Toast.show({
      type: "info",
      text1: "Logged out successfully!",
    });
  };

  // Handle Errors
  const handleError = (error) => {
    const errors = error.response?.data || {};
    console.log(errors);

    if (errors.email) {
      Toast.show({
        type: "error",
        text1: errors.email[0],
      });
    } else if (errors.username || errors.first_name || errors.last_name) {
      console.log("normal");
      Toast.show({
        type: "error",
        text1: "There is an error with your Fullname or Username",
      });
      return;
    } else if (errors.password) {
      Toast.show({
        type: "error",
        text1: errors.password[0],
      });
    } else if (errors.phone_number) {
      Toast.show({
        type: "error",
        text1: errors.phone_number[0],
      });
    } else if (error.response?.status === 401) {
      Toast.show({
        type: "error",
        text1: error.response.data.detail,
      });
    }
  };

  // Handle token refresh error
  const handleTokenError = (error) => {
    console.error("Token refresh error:", error);
    setAccessToken(null);
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");
    Toast.show({
      type: "error",
      text1: "Session expired. Please log in again.",
    });
    navigation.navigate("login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        otpSent,
        otpVerified,
        register,
        verifyOtp,
        loginUser,
        refreshAccessToken,
        resendOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
