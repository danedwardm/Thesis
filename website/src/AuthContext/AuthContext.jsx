import { React, createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios-instance";
import axios from "axios";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../Firebase/firebaseConfig";
const db = getFirestore(app);

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [reports, setReports] = useState([]);
  const fetchDocuments = async () => {
    const categories = [
      "fires",
      "street light",
      "potholes",
      "floods",
      "others",
      "road incidents",
    ];

    const unsubscribeFunctions = categories.map((category) => {
      return onSnapshot(
        collection(db, `reports/${category}/reports`),
        (snapshot) => {
          const updateReports = snapshot.docs.map((doc) => ({
            id: doc.id, // Ensure you get the document ID
            ...doc.data(),
          }));

          // Set reports to include only unique reports
          setReports((prevReports) => {
            const existingIds = new Set(prevReports.map((report) => report.id));
            const newReports = updateReports.filter(
              (report) => !existingIds.has(report.id)
            );
            return [...prevReports, ...newReports]; // Append only new reports
          });
        }
      );
    });

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      // Optionally clear reports here if needed
      setReports([]); // Clear existing reports when component mounts
      const unsubscribe = await fetchDocuments();
      return unsubscribe;
    };
    fetchData().catch((error) => {
      console.error("Error in fetching documents:", error);
    });
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("api/token/", {
        username: email,
        password,
      });

      if (res.status !== 200) {
        // Check response status, not res.ok
        throw new Error("Response was not okay");
      }

      const { access, refresh, account_type } = res.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      if (
        account_type !== "superadmin" &&
        account_type !== "department_admin"
      ) {
        alert("You are not permitted to enter this site.");
        return false;
      }
      setAuthenticated(true);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        const detailMessage =
          error.response.data.detail || "Please check your credentials!";
        console.log(detailMessage);
      } else {
        console.log("Error");
      }
    }
  };

  const value = {
    onLogin: login,
    authenticated,
    reports,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
