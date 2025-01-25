import Link from "next/link";
import { useState, useCallback, memo } from "react";
import { useRouter } from "next/router";
import { useLayout } from "../contexts/LayoutContext";
import Logo from "./Logo";

const menuItems = [
    {
        key: "dashboards",
        label: "Dashboards",
        icon: "ti ti-smart-home",
        badge: { content: "5", className: "bg-danger rounded-pill" },
        subMenu: [
            { path: "/main", label: "Ana Sayfa" },
            { path: "/deneme", label: "Deneme odası" },
            { path: "/blank", label: "Boş Sayfa" },
            { path: "/slessons", label: "Ders Ara" },
            { path: "/chat", label: "Sohbet" },
        ],
    },
    {
        key: "reports",
        label: "Reports",
        icon: "ti ti-file",
        subMenu: [
            { path: "/reports-sales", label: "Sales Report" },
            { path: "/reports-analytics", label: "Analytics Report" },
        ],
    },
    {
        key: "settings",
        label: "Settings",
        icon: "ti ti-settings",
        subMenu: [
            { path: "/settings-general", label: "General Settings" },
            { path: "/settings-user", label: "User Settings" },
        ],
    },
    {
        key: "users",
        label: "Kullanıcılar",
        icon: "ti ti-users",
        subMenu: [{ path: "/users-list", label: "Kullanıcı Listesi" }],
    },
];

// Dinamik Menü Bileşeni
// eslint-disable-next-line react/display-name
const MenuItem = memo(({ item, isActive, toggleMenus, openMenus }) => {
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;

    return (
        <li className={`menu-item ${openMenus[item.key] ? "open" : ""}`}>
            <a
                href="#"
                className={`menu-link ${hasSubMenu ? "menu-toggle" : ""}`}
                onClick={hasSubMenu ? () => toggleMenus(item.key) : undefined}
            >
                <i className={`menu-icon tf-icons ${item.icon}`}></i>
                <div>{item.label}</div>
                {item.badge && (
                    <div className={`badge ms-auto ${item.badge.className}`}>
                        {item.badge.content}
                    </div>
                )}
            </a>
            {hasSubMenu && (
                <ul className={`menu-sub ${openMenus[item.key] ? "show" : ""}`}>
                    {item.subMenu.map((subItem) => (
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
});

const LayoutMenu = () => {
    const [openMenus, setOpenMenus] = useState({});
    const router = useRouter();
    const { toggleMenu } = useLayout();

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
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <Link href="/main" className="app-brand-link">
                    <Logo />
                </Link>
                <a
                    href="#"
                    className="layout-menu-toggle menu-link text-large ms-auto"
                    onClick={toggleMenu}
                >
                    <i className="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
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
                    />
                ))}
            </ul>
        </aside>
    );
};

export default LayoutMenu;
