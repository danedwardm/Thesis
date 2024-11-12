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
  const [departments, setDepartment] = useState([])
  const [account_type, setAccountType] = useState("");
  const [reports, setReports] = useState([]);
  const [accountRole, setAccountRole] = useState(null);
  

  // Check authentication on initial load from localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Example token check
    const account_type = localStorage.getItem('accountType'); // Example token check
    if (token) {
      department()
      setAccountType(account_type)
      setAuthenticated(true);
    } else {
      setAccountType("")
      setAuthenticated(false);
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
  
  const department_admin_registration = async (username, email, phoneNumber, department, station, stationAddress, password, password_confirm) => {
    try {
      const data = {
        username, email, contact_number: phoneNumber, department, station, station_address: stationAddress, password, password_confirm
      };
      const res = await axiosInstance.post('api/department_admin/registration/', data);

      if (!res) {
        throw new Error("Error in Department Registration");
      }
      return res;
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        console.log("Error Response:", error.response.data);
        alert(`Error: ${error.response.data.detail || 'An error occurred'}`); // Customize this depending on your API error response format
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
}

  const department = async () => {
    try {
      const res = await axiosInstance.get('api/departments/')
      setDepartment(prev => {
        const newDepartments = res.data;
        const uniqueDepartments = [
          ...prev,
          ...newDepartments.filter(dep => !prev.some(existingDep => existingDep.id === dep.id))
        ];
        return uniqueDepartments;
      });
    } catch (error) {
      console.error(error)        
    }
}

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
      localStorage.setItem("accountType", account_type);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      setAccountType(account_type)
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
    <AuthContext.Provider value={{ onLogin, onLogout, authenticated, reports, account_type, departments, department_admin_registration }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
