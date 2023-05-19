import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import {
  AddOutlined,
  AddPhotoAlternateOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeletingNote,
  startNewNote,
  startUpdatingNote,
  startUploadingFiles,
} from "../../store/journal";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export const JournalPage = () => {
  const fileInputRef = useRef();

  const dispatch = useDispatch();
  const { isLoading, active, messageSaved } = useSelector(
    (state) => state.journal
  );

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  const onSaveNote = () => {
    dispatch(startUpdatingNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    Swal.fire({
      title: "Delete note",
      text: "Are you sure you want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingNote());
      }
    });
  };

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Success", messageSaved, "success");
    }
  }, [messageSaved]);

  return (
    <JournalLayout>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>
      {active ? <NoteView /> : <NothingSelectedView />}
      <input
        type="file"
        multiple
        onChange={onFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Grid
        container
        position="fixed"
        bottom={50}
        right={50}
        gap={2}
        display="flex"
        width="min-content"
        flexWrap="nowrap"
      >
        {active && (
          <>
            <StyledIconButton
              action={onDelete}
              color="error.main"
              disabled={isLoading}
            >
              <DeleteOutlined sx={{ fontSize: 30 }} />
            </StyledIconButton>

            <StyledIconButton
              action={() => fileInputRef.current.click()}
              color="amethist.main"
              disabled={isLoading}
            >
              <AddPhotoAlternateOutlined sx={{ fontSize: 30 }} />
            </StyledIconButton>

            <StyledIconButton
              color="secondary.main"
              action={onSaveNote}
              disabled={isLoading}
            >
              <SaveOutlined sx={{ fontSize: 30 }} />
            </StyledIconButton>
          </>
        )}

        <StyledIconButton
          color="primary.main"
          disabled={isLoading}
          action={onClickNewNote}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </StyledIconButton>
      </Grid>
    </JournalLayout>
  );
};

const StyledIconButton = ({ children, action, color, disabled }) => {
  return (
    <IconButton
      size="large"
      type="button"
      onClick={action}
      disabled={disabled}
      sx={{
        color: "white",
        backgroundColor: color,
        ":hover": { backgroundColor: color, opacity: 0.8 },
        ":disabled": { backgroundColor: color },
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </IconButton>
  );
};
