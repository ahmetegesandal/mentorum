

const ThemeSwitcher = () => {


    return (
        <>
            <li>
                <a
                    className="dropdown-item"
                    href=""
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
                    className="dropdown-item"
                    href=""
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
                    className="dropdown-item"
                    href=""
                    data-theme="system"
                >
                  <span className="align-middle">
                    <i className="ti ti-device-desktop-analytics ti-md me-3"></i>
                    System
                  </span>
                </a>
            </li>
        </>
    );
};

export default ThemeSwitcher;
