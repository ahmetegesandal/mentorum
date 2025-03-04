import Link from "next/link";
import { useState, useCallback, memo, useContext } from "react";
import { useRouter } from "next/router";
import { useLayout } from "../contexts/LayoutContext";
import { UserContext } from "../contexts/UserContext";
import Logo from "./Logo";

// Menü öğeleri ve yetkilendirme rolleri
const menuItems = [
  {
    key: "dashboards",
    label: "Dashboards",
    icon: "ti ti-smart-home",
    roles: ["admin", "user"],
    badge: { content: "5", className: "bg-danger rounded-pill" },
    subMenu: [
      { path: "/main", label: "Ana Sayfa", roles: ["admin", "user"] },
      { path: "/deneme", label: "Deneme odası", roles: ["admin", "user"] },
      { path: "/blank", label: "Boş Sayfa", roles: ["admin", "user"] },
      { path: "/slessons", label: "Ders Ara", roles: ["user"] },
      { path: "/chat", label: "Sohbet", roles: ["admin", "user"] },
      { path: "/calendar", label: "Takvim", roles: ["admin", "user"] },
      { path: "/slessons", label: "Dersler", roles: ["admin", "user"] },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: "ti ti-settings",
    roles: ["admin"],
    subMenu: [
      {
        path: "/settings-general",
        label: "General Settings",
        roles: ["admin"],
      },
      { path: "/settings-user", label: "User Settings", roles: ["admin"] },
    ],
  },

  {
    key: "reports",
    label: "Reports",
    icon: "ti ti-file",
    roles: ["admin"],
    subMenu: [
      {
        path: "/reports-sales",
        label: "Sales Report",
        roles: ["admin"],
      },
      {
        path: "/reports-analytics",
        label: "Analytics Report",
        roles: ["admin"],
      },
    ],
  },
  {
    key: "users",
    label: "Admin",
    icon: "ti ti-users",
    roles: ["admin"],
    subMenu: [
      { path: "/users-list", label: "Kullanıcı Listesi", roles: ["admin"] },
    ],
  },
];

// Dinamik Menü Bileşeni
const MenuItem = memo(
  ({ item, isActive, toggleMenus, openMenus, userRole }) => {
    // Kullanıcının rolüne uygun alt menüleri filtrele
    const filteredSubMenu =
      item.subMenu?.filter((subItem) => subItem.roles.includes(userRole)) || [];
    const hasSubMenu = filteredSubMenu.length > 0;

    // Eğer bu menü kullanıcının rolüne uygun değilse veya alt menülerde hiçbir şey kalmadıysa, gizle
    if (!item.roles.includes(userRole) || (!hasSubMenu && item.subMenu)) {
      return null;
    }

    return (
      <li className={`menu-item ${openMenus[item.key] ? "open" : ""}`}>
        <a
          href="#"
          className={`menu-link ${hasSubMenu ? "menu-toggle" : ""}`}
          onClick={hasSubMenu ? () => toggleMenus(item.key) : undefined}
        >
          <i className={`menu-icon tf-icons ${item.icon}`}></i>
          <div>{item.label}</div>
        </a>
        {hasSubMenu && (
          <ul className={`menu-sub ${openMenus[item.key] ? "show" : ""}`}>
            {filteredSubMenu.map((subItem) => (
              <li
                key={subItem.path}
                className={`menu-item ${
                  isActive(subItem.path) ? "active" : ""
                }`}
              >
                <Link href={subItem.path} className="menu-link">
                  <div>{subItem.label}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
);

const LayoutMenu = () => {
  const [openMenus, setOpenMenus] = useState({});
  const router = useRouter();
  const { toggleMenu } = useLayout();
  const userData = useContext(UserContext); // Kullanıcı verisini al
  const userRole = userData?.role || "guest"; // Eğer rol yoksa "guest" olarak varsay

  const toggleMenus = useCallback((menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  }, []);

  const isActive = useCallback(
    (path) => router.pathname === path,
    [router.pathname]
  );

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <Link href="/main" className="app-brand-link">
          <Logo />
        </Link>
        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto"
          onClick={toggleMenu}
        >
          <i className="ti ti-x d-block d-xl-none ti-md align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            isActive={isActive}
            toggleMenus={toggleMenus}
            openMenus={openMenus}
            userRole={userRole}
          />
        ))}
      </ul>
    </aside>
  );
};

export default LayoutMenu;
