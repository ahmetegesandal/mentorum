import { useTheme } from "../contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { handleThemeChange, theme } = useTheme();

  return (
    <>
      <li>
        <a
          className={`dropdown-item ${theme === "light" ? "active" : ""}`}
          href="#"
          data-theme="light"
          onClick={() => handleThemeChange("light")}
        >
          <span className="align-middle">
            <i className="ti ti-sun ti-md me-3"></i>Light
          </span>
        </a>
      </li>
      <li>
        <a
          className={`dropdown-item ${theme === "dark" ? "active" : ""}`}
          href="#"
          data-theme="dark"
          onClick={() => handleThemeChange("dark")}
        >
          <span className="align-middle">
            <i className="ti ti-moon-stars ti-md me-3"></i>Dark
          </span>
        </a>
      </li>
      <li>
        <a
          className={`dropdown-item ${theme === "system" ? "active" : ""}`}
          href="#"
          data-theme="system"
          onClick={() =>
            handleThemeChange(
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            )
          }
        >
          <span className="align-middle">
            <i className="ti ti-device-desktop-analytics ti-md me-3"></i>System
          </span>
        </a>
      </li>
    </>
  );
};

export default ThemeSwitcher;
