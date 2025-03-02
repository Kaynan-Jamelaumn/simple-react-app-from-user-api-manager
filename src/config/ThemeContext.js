import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "./theme";

// Create a React Context to hold the theme
export const ThemeContext = createContext();


// Create a ThemeProvider component to wrap the app
export const ThemeProvider = ({ children }) => {
   // State to hold the current theme (default is lightTheme)
  const [theme, setTheme] = useState(lightTheme);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };


  // Provide the theme and toggleTheme function to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
