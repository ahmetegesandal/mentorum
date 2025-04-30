import React from "react";
import { useLayout } from "../contexts/LayoutContext";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { isMenuExpanded } = useLayout();
  const router = useRouter();

  const noLayoutPaths = [
    "/sign-in",
    "/register",
    "/404",
    "/",
    "/contact",
    "/how-to-work",
    "/mento-class",
    "/course-summaries",
    "/mlessons",
  ];

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
