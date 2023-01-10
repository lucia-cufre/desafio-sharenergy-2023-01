import React, { useState } from "react";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import LabelBottomNavigation from "../../components/bottomBar/bottomBar";
import TextField from "@mui/material/TextField/TextField";

function CatsPage() {
  useProtectedPage();
  let [url, setUrl] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const search = (statusCode: string) => {
    const newCatUrl = "https://http.cat/" + statusCode;
    setUrl(newCatUrl);
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Search by statusCode"
            type="text"
            variant="outlined"
            onChange={(e) => setStatusCode(e.target.value)}
            onKeyUp={() => search(statusCode)}
            margin="normal"
          />
        </Grid>

        {statusCode.length > 0 ? <img width={400} src={url} alt="al"></img> : undefined}
        <Grid item>
          <LabelBottomNavigation />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CatsPage;
