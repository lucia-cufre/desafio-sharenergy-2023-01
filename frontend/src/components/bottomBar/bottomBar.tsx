import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import GroupIcon from "@mui/icons-material/Group";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import PetsIcon from "@mui/icons-material/Pets";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import {
  goToCats,
  goToClients,
  goToDogs,
  goToUsers,
} from "../../router/coordinator";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(() => goToUsers(navigate));

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ position: "fixed", bottom: 0}} elevation={3}>
        <BottomNavigation
          showLabels
          sx={{ width: 400 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Users"
            value={() => goToUsers(navigate)}
            icon={<GroupIcon />}
          />
          <BottomNavigationAction
            label="Cats"
            value={() => goToCats(navigate)}
            icon={<EmojiNatureIcon />}
          />
          <BottomNavigationAction
            label="Dogs"
            value={() => goToDogs(navigate)}
            icon={<PetsIcon />}
          />
          <BottomNavigationAction
            label="Clients"
            value={() => goToClients(navigate)}
            icon={<AssignmentIndIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Grid>
  );
}
