import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios-instance";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { app } from "../Firebase/firebaseConfig";

const db = getFirestore(app);

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [departments, setDepartment] = useState([]);
  const [account_type, setAccountType] = useState("");
  const [reports, setReports] = useState([]);
  const [accountRole, setAccountRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  // Check authentication on initial load from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Example token check
    const account_type = localStorage.getItem("accountType"); // Example token check
    if (token) {
      department();
      setAccountType(account_type);
      setAuthenticated(true);
      fetchUserInfo(token);
    } else {
      setAccountType("");
      setAuthenticated(false);
    }
  }, []);

  // Function to fetch user info using the stored token
  const fetchUserInfo = async (token) => {
    try {
      const response = await axiosInstance.get("api/user/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setLoading(false); // Set loading to false after the user is fetched
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError("Failed to load user data.");
      setLoading(false); // Set loading to false even if there's an error
    }
  };

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
        async (snapshot) => {
          const updateReports = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const data = doc.data();
              // console.log(data); // Log to check if the `id` exists and is unique

              // Fetch user and worker feedback for each report
              const reportId = doc.id;
              const userFeedbackRef = collection(
                db,
                `reports/${category}/reports/${reportId}/userFeedback`
              );
              const workerFeedbackRef = collection(
                db,
                `reports/${category}/reports/${reportId}/workerFeedback`
              );

              const userFeedbackSnapshot = await getDocs(userFeedbackRef);
              const workerFeedbackSnapshot = await getDocs(workerFeedbackRef);

              const userFeedbackDescriptions = userFeedbackSnapshot.docs.map(
                (doc) => ({
                  description: doc.data().description,
                  proof: doc.data().proof,
                  submitted_at: doc.data().submited_at, // assuming 'submitted_at' is a Firestore timestamp
                })
              );
              const workerFeedbackDescriptions =
                workerFeedbackSnapshot.docs.map((doc) => ({
                  description: doc.data().description,
                  proof: doc.data().proof,
                  submitted_at: doc.data().submited_at, // assuming 'submitted_at' is a Firestore timestamp
                }));

              // Return the report along with feedback
              return {
                ...data,
                id: doc.id, // Ensure Firestore id is included
                userFeedback: userFeedbackDescriptions,
                workerFeedback: workerFeedbackDescriptions,
              };
            })
          );

          // console.log("Updated Reports:", updateReports);

          // Combine and filter reports to ensure uniqueness based on 'id'
          setReports((prevReports) => {
            const combinedReports = [...prevReports, ...updateReports];
            const uniqueReports = [
              ...new Map(
                combinedReports.map((item) => [item.id, item])
              ).values(),
            ];
            return uniqueReports;
          });
        }
      );
    });

    // Cleanup function for unsubscribing
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

  const department_admin_registration = async (
    username,
    email,
    phoneNumber,
    department,
    station,
    stationAddress,
    password,
    password_confirm
  ) => {
    try {
      const data = {
        username,
        email,
        contact_number: phoneNumber,
        department,
        station,
        station_address: stationAddress,
        password,
        password_confirm,
      };
      const res = await axiosInstance.post(
        "api/department_admin/registration/",
        data
      );

      if (!res) {
        throw new Error("Error in Department Registration");
      }
      return res;
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        console.log("Error Response:", error.response.data);
        alert(`Error: ${error.response.data.detail || "An error occurred"}`); // Customize this depending on your API error response format
      } else if (error.request) {
        // Request was made but no response was received
        console.log("Error Request:", error.request);
        alert("No response received from server. Please try again.");
      } else {
        // Something else happened in setting up the request
        console.log("Error Message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const department = async () => {
    try {
      const res = await axiosInstance.get("api/departments/");
      setDepartment((prev) => {
        const newDepartments = res.data;
        const uniqueDepartments = [
          ...prev,
          ...newDepartments.filter(
            (dep) => !prev.some((existingDep) => existingDep.id === dep.id)
          ),
        ];
        return uniqueDepartments;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onLogin = async (email, password) => {
    try {
      const res = await axiosInstance.post("api/token/", {
        username: email,
        password,
      });
      console.log("Login response:", res.data);

      const { access, refresh, account_type } = res.data;
      if (
        account_type !== "superadmin" &&
        account_type !== "department_admin" &&
        account_type !== "department_head"
      ) {
        alert("You are not permitted to enter this site.");
        return null;
      }

      // Set tokens and authentication state
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("accountType", account_type);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access}`;
      setAccountType(account_type);
      setAuthenticated(true); // Set user as authenticated
      fetchUserInfo(access);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        // Check if the error is due to invalid credentials (401 Unauthorized)
        if (error.response.status === 401) {
          alert("Invalid username or password. Please try again.");
        } else {
          const detailMessage =
            error.response.data.detail ||
            "An error occurred. Please try again.";
          alert(detailMessage);
        }
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
    <AuthContext.Provider
      value={{
        onLogin,
        onLogout,
        authenticated,
        reports,
        account_type,
        departments,
        department_admin_registration,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
