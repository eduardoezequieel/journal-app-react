import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const NothingSelectedView = () => {
  const { displayName } = useSelector((state) => state.auth);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="background.main"
      sx={{
        minHeight: "calc(100vh - 110px)",

        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: "primary" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary" variant="h5" textAlign="center">
          Welcome {displayName}, select a note <br /> or create a new one to
          start.
        </Typography>
      </Grid>
    </Grid>
  );
};
