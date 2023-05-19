import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { SidebarItem } from "./SidebarItem";
import { useBrowserWidth } from "../../hooks";
import { LayoutContext } from "../context";

export const SideBar = ({ drawerWidth }) => {
  const { responsiveLayout, toggleResponsiveLayout } =
    useContext(LayoutContext);
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  const width = useBrowserWidth();

  const isTemporarySidebar = useMemo(() => width <= 600, [width]);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        ModalProps={{ onBackdropClick: toggleResponsiveLayout }}
        variant={isTemporarySidebar ? "temporary" : "permanent"}
        open={responsiveLayout}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List disablePadding>
          {notes.length === 0 && (
            <Typography variant="body1" textAlign="center" p={2}>
              Looks empty here, create a new note!
            </Typography>
          )}
          {notes.map((note) => (
            <SidebarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
