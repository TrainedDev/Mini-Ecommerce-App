import { useState } from "react";
import { ThemeContext } from "../Contexts/NewContexts";

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(null);
  return (
<ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>    
  )
}

export default ThemeProvider