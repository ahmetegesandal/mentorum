import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isMenuExpanded, setMenuExpanded] = useState(false);

    const toggleMenu = () => setMenuExpanded((prev) => !prev);

    return (
        <LayoutContext.Provider value={{ isMenuExpanded, toggleMenu }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
