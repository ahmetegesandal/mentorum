import React from "react";
import { useLayout } from "../contexts/LayoutContext";
import { useRouter } from "next/router"; // useRouter'ı ekliyoruz

const Layout = ({ children }) => {
    const { isMenuExpanded } = useLayout(); // LayoutContext'ten bilgi alın
    const router = useRouter(); // Router'ı kullanıyoruz

    const noLayoutPaths = ["/sign-in", "/register", "/404", "/"];

    if (noLayoutPaths.includes(router.pathname)) {
        return <>{children}</>;
    }

    return (
        <div
            className={`layout-wrapper layout-content-navbar ${
                isMenuExpanded ? "layout-menu-expanded" : "layout-compact"
            }`}
        >
            <div className="layout-container">{children}</div>
        </div>
    );
};

export default Layout;
