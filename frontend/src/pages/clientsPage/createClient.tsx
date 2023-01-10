import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { useProtectedPage } from "../../hooks/useProtectedPage";
import { BASE_URL } from "../../constants/baseURL";
import { goToClients } from "../../router/coordinator";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

function CreateClientPage() {
  useProtectedPage();

  const navigate = useNavigate();

  const { form, onChange } = useForm({
    name: "",
    email: "",
    phone: "",
    address: "",
    cpf: "",
  });

  const createClient = () => {
    const url = `${BASE_URL}/clients/register`;
    const header = {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    };
    const body = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      cpf: form.cpf,
    };
    axios
      .post(url, body, header)
      .then((res) => {
        alert("cliente criada");
        goToClients(navigate);
      })
      .catch((err) => {
        alert("Nao foi possivel acceder a informacao");
        console.log(err.message);
      });
  };

  /* const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    cleanFields();
  }; */

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        
    
          <TextField
            id="standard-helperText"
            label="Name"
            name={"name"}
            value={form.name}
           required
           onChange = {onChange}
            variant="standard"
          />
          <TextField
            id="standard-helperText"
            label="Email"
            name={"email"}
            value={form.email}
            required
            onChange = {onChange}
            variant="standard"
          />
          <TextField
            id="standard-helperText"
            label="Phone"
            name={"phone"}
            value={form.phone}
            required
            onChange = {onChange}
            variant="standard"
          />
          <TextField
            id="standard-helperText"
            label="Address"
            name={"address"}
            value={form.address}
            required
            onChange = {onChange}
            variant="standard"
          />
          <TextField
            id="standard-helperText"
            label="Cpf"
            name={"cpf"}
            value={form.cpf}
            required
            onChange = {onChange}
            variant="standard"
          />
          <Button onClick={()=>createClient()}>Create Client</Button>
    
    
      </Grid>
    </Container>
  );
}

export default CreateClientPage;
