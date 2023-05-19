import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";
import { useContext } from "react";
import { LayoutContext } from "../context";
import Swal from "sweetalert2";

export const NavBar = ({ drawerWidth = 240 }) => {
  const { toggleResponsiveLayout } = useContext(LayoutContext);
  const dispatch = useDispatch();
  const onLogout = () => {
    Swal.fire({
      title: "Log out",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startLogout());
      }
    });
  };

  const onMenuClick = () => {
    toggleResponsiveLayout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="background"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onMenuClick}
          color="secondary"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap color="inherit">
            JournalApp
          </Typography>
          <Tooltip title="Log out">
            <IconButton onClick={onLogout} color="error">
              <LogoutOutlined></LogoutOutlined>
            </IconButton>
          </Tooltip>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
