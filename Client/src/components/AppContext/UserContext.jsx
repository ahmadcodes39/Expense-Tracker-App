import { createContext, useContext, useState } from "react";

// Use PascalCase for Context name
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id:"",
    name: "",
    email: "",
    token:""
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming user context
export const useUser = () => {
  return useContext(UserContext);
};
