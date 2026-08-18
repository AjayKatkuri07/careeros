import { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../utils/storage.js";
import { mockUsers } from "../data/mockUsers.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getItem("user"));

  useEffect(() => {
    if (user) {
      setItem("user", user);
      setItem("auth", true);
    } else {
      removeItem("user");
      removeItem("auth");
    }
  }, [user]);

  function login(email, password) {
    const allUsers = [...mockUsers, ...(getItem("registeredUsers") || [])];

    const matchedUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      return { success: false, message: "Invalid email or password." };
    }

    const { password: _password, ...userWithoutPassword } = matchedUser;
    setUser(userWithoutPassword);
    return { success: true };
  }

  function register(newUser) {
    const allUsers = [...mockUsers, ...(getItem("registeredUsers") || [])];
    const alreadyExists = allUsers.some((u) => u.email === newUser.email);

    if (alreadyExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    const registeredUsers = getItem("registeredUsers") || [];
    setItem("registeredUsers", [...registeredUsers, newUser]);

    const { password: _password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}