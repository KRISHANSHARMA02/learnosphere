"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.post("/api/getUser", {
            email: session.user.email, // ✅ only send email
          });

          setUser(response.data.user);
          setRole(response.data.role);
        } catch (error) {
          console.error(
            "Error fetching user data:",
            error.response?.data?.message || error.message
          );
          setUser(null);
          setRole(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <UserContext.Provider value={{ user, role, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use in components
export const useUser = () => useContext(UserContext);
