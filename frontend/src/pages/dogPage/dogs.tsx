import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Grid } from "@mui/material";
import LabelBottomNavigation from "../../components/bottomBar/bottomBar";
import { useProtectedPage } from "../../hooks/useProtectedPage";

function DogsPage() {
  useProtectedPage();
  const [dogImage, setDogImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getDogImage();
  }, []);

  const getDogImage = () => {
    const url = "https://random.dog/woof";

    axios
      .get(url)
      .then((res) => {
        setDogImage(res.data);
      })
      .catch((err) => {
        alert("Nao foi possível acceder as informações.");
      });
  };

  const search = (dogImage: string) => {
    getDogImage();
    const newDogUrl = "https://random.dog/" + dogImage;
    setUrl(newDogUrl);
  };

  return (
    <Container>
     
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={() => search(dogImage)}>Look this dog!</Button>
          {url.length > 0 ? (
            <img
              width={400}
              src={url}
              alt="Hey! I'm taking a shower, come back later. UAf, UAf"
            ></img>
          ) : (
            <p>Press the button for see a cute dog!</p>
          )}
        <Grid item>
          <LabelBottomNavigation />
        </Grid>
        </Grid>
 
    </Container>
  );
}

export default DogsPage;
