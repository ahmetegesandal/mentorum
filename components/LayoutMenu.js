import Link from "next/link";
import { useState, useCallback, memo, useContext } from "react";
import { useRouter } from "next/router";
import { useLayout } from "../contexts/LayoutContext";
import { UserContext } from "../contexts/UserContext";
import Logo from "./Logo";

const menuItems = [
  {
    key: "dashboards",
    label: "Genel",
    icon: "ti ti-smart-home",
    roles: ["admin", "parent", "teacher", "student"],
    badge: { content: "2", className: "bg-danger rounded-pill" },
    subMenu: [
      {
        path: "/main",
        label: "Ana Sayfa",
        roles: ["admin", "parent", "teacher", "student"],
      },
      {
        path: "/chat",
        label: "Sohbet",
        roles: ["admin", "parent", "teacher", "student"],
      },
      {
        path: "/slessons",
        label: "Dersler",
        roles: ["admin", "teacher", "parent", "student"],
      },
    ],
  },
  {
    key: "teachers",
    label: "Öğretmen",
    icon: "ti ti-users",
    roles: ["admin", "teacher"],
    subMenu: [
      {
        path: "/lessoncreate",
        label: "Ders İlanı Oluştur",
        roles: ["teacher"],
      },
      {
        path: "/manage-lessons",
        label: "Ders İlanları Yönet",
        roles: ["teacher"],
      },
      {
        path: "/calendar",
        label: "Takvim Yönetimi",
        roles: ["teacher"],
      },
      {
        path: "/TeacherReservations",
        label: "Rezervasyonlar",
        roles: ["teacher"],
      },
      {
        path: "/TeacherLiveClasses",
        label: "Canlı Ders Yönetimi",
        roles: ["teacher"],
      },
    ],
  },
  {
    key: "students",
    label: "Öğrenci",
    icon: "ti ti-users",
    roles: ["student"],
    subMenu: [
      {
        path: "/StudentReservations",
        label: "Rezervasyonlar",
        roles: ["student"],
      },
      {
        path: "/StudentLiveClasses",
        label: "Canlı Dersler",
        roles: ["student"],
      },
    ],
  },
  {
    key: "parents",
    label: "Veli",
    icon: "ti ti-users",
    roles: ["parent"],
    subMenu: [
      {
        path: "/StudentReservations",
        label: "Rezervasyonlar",
        roles: ["parent"],
      },
      {
        path: "/StudentLiveClasses",
        label: "Canlı Dersler",
        roles: ["parent"],
      },
      {
        path: "/my-students",
        label: "Öğrencilerim",
        roles: ["parent"],
      },
    ],
  },
  {
    key: "users",
    label: "Admin",
    icon: "ti ti-users",
    roles: ["admin"],
    subMenu: [{ path: "/users-list", label: "Kullanıcılar", roles: ["admin"] }],
  },
  {
    key: "credit",
    label: "Kredi",
    icon: "ti ti-credit-card",
    roles: ["admin", "parent", "teacher", "student"],
    subMenu: [
      {
        path: "/loadcredit",
        label: "Bakiye Yükle",
        roles: ["admin", "parent", "teacher", "student"],
      },
    ],
  },
  {
    key: "support",
    label: "Destek",
    icon: "ti ti-ticket",
    roles: ["admin", "parent", "teacher", "student"],
    subMenu: [
      {
        path: "/tickets",
        label: "Destek Talepleri",
        roles: ["parent", "teacher", "student"],
      },
      {
        path: "/ticket-add",
        label: "Destek Talebi Oluştur",
        roles: ["parent", "teacher", "student"],
      },
      {
        path: "/tickets-admin",
        label: "Tüm Destek Talepleri",
        roles: ["admin"],
      },
    ],
  },
  {
    key: "boost",
    label: "Boost",
    icon: "ti ti-calendar-up",
    roles: ["teacher"],
    subMenu: [
      {
        path: "/boosts",
        label: "Boost İşlemleri",
        roles: ["teacher"],
      },
    ],
  },
  {
    key: "notifications",
    label: "Bildirim",
    icon: "ti ti-calendar-up",
    roles: ["admin", "parent", "teacher", "student"],
    subMenu: [
      {
        path: "/notifications",
        label: "Bildirimler",
        roles: ["admin", "parent", "teacher", "student"],
      },
    ],
  },
];

const MenuItem = memo(
  ({ item, isActive, toggleMenus, openMenus, userRole }) => {
    const filteredSubMenu =
      item.subMenu?.filter((subItem) => subItem.roles.includes(userRole)) || [];
    const hasSubMenu = filteredSubMenu.length > 0;

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
  const userData = useContext(UserContext);
  const userRole = userData?.role || "guest";

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
          <Logo w={56} h={56} />
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
