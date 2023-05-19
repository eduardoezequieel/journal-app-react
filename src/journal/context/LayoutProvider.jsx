import { useState } from "react";
import { LayoutContext } from ".";

export const LayoutProvider = ({ children }) => {
  const [responsiveLayout, setResponsiveLayout] = useState(false);

  const toggleResponsiveLayout = () => {
    setResponsiveLayout(!responsiveLayout);
  };

  return (
    <LayoutContext.Provider
      value={{ responsiveLayout, toggleResponsiveLayout }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
