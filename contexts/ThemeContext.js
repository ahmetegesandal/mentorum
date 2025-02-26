import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Varsayılan tema

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const head = document.head;
    const html = document.documentElement;

    // Önce eski tema CSS'lerini kaldır
    document
      .querySelectorAll("link[data-theme-style]")
      .forEach((link) => link.remove());

    // HTML etiketindeki class'ı değiştir (light-style -> dark-style)
    html.classList.remove("light-style", "dark-style");
    html.classList.add(newTheme === "dark" ? "dark-style" : "light-style");

    // Yeni tema için iki ayrı CSS dosyası ekleyelim
    const coreLink = document.createElement("link");
    coreLink.rel = "stylesheet";
    coreLink.type = "text/css";
    coreLink.dataset.themeStyle = "true"; // Temaya özel linkleri işaretlemek için
    coreLink.href =
      newTheme === "dark" ? "/styles/core-dark.css" : "/styles/core.css";

    const themeLink = document.createElement("link");
    themeLink.rel = "stylesheet";
    themeLink.type = "text/css";
    themeLink.dataset.themeStyle = "true";
    themeLink.href =
      newTheme === "dark"
        ? "/styles/theme-default-dark.css"
        : "/styles/theme-default.css";

    head.appendChild(coreLink);
    head.appendChild(themeLink);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
