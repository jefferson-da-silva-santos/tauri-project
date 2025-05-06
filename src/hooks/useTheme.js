import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const {darkMode, setDarkMode} = useContext(ThemeContext);
  return {darkMode, setDarkMode};
}