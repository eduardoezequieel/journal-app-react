import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";
import { LayoutProvider } from "../context";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <LayoutProvider>
        <SideBar drawerWidth={drawerWidth} />
        <NavBar drawerWidth={drawerWidth} />
      </LayoutProvider>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
