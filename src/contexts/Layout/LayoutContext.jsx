import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarVisibleByOver, setSidebarVisibleByOver] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const toggleSidebar = (state) => {
    setSidebarVisible((prevVisible) => (!state ? state : !prevVisible));
  };

  const toggleSidebarByOver = (state) => {
    if (state === sidebarVisibleByOver) return;
    setSidebarVisibleByOver(state);
  };

  return (
    <LayoutContext.Provider
      value={{
        sidebarVisible,
        toggleSidebar,
        setSelectedMenu,
        selectedMenu,
        toggleSidebarByOver,
        sidebarVisibleByOver,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
