import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal";
import { dateFormat } from "../../helpers";
import { LayoutContext } from "../context";

export const SidebarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const { responsiveLayout, toggleResponsiveLayout } =
    useContext(LayoutContext);
  const dateString = useMemo(() => dateFormat(date), [date]);

  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.journal.active);

  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );

  const onClickNote = () => {
    toggleResponsiveLayout();
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <ListItem disablePadding dense>
      <ListItemButton selected={activeNote?.id === id} onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container flexDirection="column">
          <ListItemText primary={newTitle} />
          <ListItemText secondary={dateString} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
