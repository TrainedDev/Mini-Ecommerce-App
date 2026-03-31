import { useState } from "react";

import { UserContext } from "../Contexts/NewContexts";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const [authUser, setAuthUser] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, authUser, setAuthUser }}>
      {children}
    </UserContext.Provider>
  );
};
