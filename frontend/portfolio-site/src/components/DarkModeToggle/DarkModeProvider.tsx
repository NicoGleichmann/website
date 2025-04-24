// src/components/DarkModeToggle/DarkModeProvider.tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  
  type DarkModeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
  };
  
  const DarkModeContext = createContext<DarkModeContextType>({
    darkMode: true,
    toggleDarkMode: () => {},
  });
  
  export const useDarkMode = () => useContext(DarkModeContext);
  
  export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(() => {
      const stored = localStorage.getItem("darkMode");
      return stored === null ? true : stored === "true";
    });
  
    useEffect(() => {
      document.body.classList.toggle("dark", darkMode);
      localStorage.setItem("darkMode", String(darkMode));
    }, [darkMode]);
  
    const toggleDarkMode = () => setDarkMode((prev) => !prev);
  
    return (
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    );
  };
  