import React, { useState } from "react";
import { BooleanContext } from "../Contexts/NewContexts";

const BooleanProvider = ({ children }) => {
  const [boolVal, setBoolVal] = useState({ authCard: false, registerCard: false });

  return (
    <BooleanContext.Provider value={{ boolVal, setBoolVal }}>
      {children}
    </BooleanContext.Provider>
  );
};

export default BooleanProvider;
