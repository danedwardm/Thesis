import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios-instance";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../Firebase/firebaseConfig";

const db = getFirestore(app);

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [reports, setReports] = useState([]);
  const [accountRole, setAccountRole] = useState(null);
  

  // Check authentication on initial load from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("accountRole"); // Retrieve account role

    if (token) {
      setAuthenticated(true); // User is authenticated if accessToken exists
      setAccountRole(storedRole); // Set the account role in state
      console.log("Account role on initial load:", storedRole); // Log role to console
    }
  }, []);

  const fetchDocuments = async () => {
    const categories = [
      "fires",
      "street lights",
      "potholes",
      "floods",
      "others",
      "road accident",
    ];

    const unsubscribeFunctions = categories.map((category) => {
      return onSnapshot(
        collection(db, `reports/${category}/reports`),
        (snapshot) => {
          const updateReports = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(data); // Log to check if the `id` exists and is unique
            return {
              ...data,
              id: doc.id, // Ensure that the Firestore `id` is being used for uniqueness
            };
          });

          // Combine and filter reports to ensure uniqueness based on `id`
          setReports((prevReports) => {
            const combinedReports = [...prevReports, ...updateReports];
            const uniqueReports = [
              ...new Map(combinedReports.map((item) => [item.id, item])).values(),
            ];
            return uniqueReports;
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
      const unsubscribe = await fetchDocuments();
      return unsubscribe;
    };
    fetchData().catch((error) => {
      console.error("Error in fetching documents:", error);
    });
  }, []);

  const onLogin = async (email, password) => {
    try {
      const res = await axiosInstance.post("api/token/", {
        username: email,
        password,
      });

      const { access, refresh, account_type } = res.data;
      if (account_type !== "superadmin" && account_type !== "department_admin" && account_type !== "department_head") {
        alert("You are not permitted to enter this site.");
        return null;
      }

      // Set tokens and authentication state
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("accountRole", account_type); // Store role in local storage
      setAuthenticated(true);
      setAccountRole(account_type); // Set role in state
      console.log("Account role on login:", account_type); // Log role to console
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      setAuthenticated(true); // Set user as authenticated
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

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setAuthenticated(false); // Set user as not authenticated
  };

  return (
    <AuthContext.Provider value={{ onLogin, onLogout, authenticated, reports }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
