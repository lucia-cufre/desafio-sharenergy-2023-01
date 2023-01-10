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
import LabelBottomNavigation from "../../components/bottomBar/bottomBar";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { BASE_URL } from "../../constants/baseURL";

import { useNavigate } from "react-router-dom";
import { goToClients, goToCreateClient } from "../../router/coordinator";
import { useForm } from "../../hooks/useForm";

function ClientsPage() {
  useProtectedPage();
  const [clients, setClients] = useState<any[]>([]);
  const [clientDetails, setClientDetails] = useState<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
  }>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    cpf: "",
  });
  const { form, onChange, setForm } = useForm({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    cpf: "",
  });

  const [seenClientInfo, setSeenClientInfo] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    setForm({
      _id: clientDetails._id,
      name: clientDetails.name,
      email: clientDetails.email,
      phone: clientDetails.phone,
      address: clientDetails.address,
      cpf: clientDetails.cpf,
    });
  }, [clientDetails]);

  const getAllClients = () => {
    const url = `${BASE_URL}/clients`;
    const header = {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    };
    axios
      .get(url, header)
      .then((res) => {
        setClients(res.data.clients);
      })
      .catch((err) => {
        alert("Nao foi possivel acceder a informacao");
        console.log(err.message);
      });
  };

  const getClientDetails = (id: string) => {
    const url = `${BASE_URL}/clients/${id}`;
    const header = {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    };
    axios
      .get(url, header)
      .then((res) => {
        console.log(clientDetails);
        setClientDetails(res.data.client);
        setSeenClientInfo(true);
      })
      .catch((err) => {
        alert("Nao foi possivel acceder a informacao");
        console.log(err.message);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editClientAction = (id: string) => {
    const url = `${BASE_URL}/clients/${id}`;
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
      .put(url, body, header)
      .then((res) => {
        setClientDetails(form);
        setEdit(false);
      })
      .catch((err) => {
        alert("Nao foi possivel acceder a informacao");
        console.log(err.message);
        console.log(localStorage.getItem("authorization"));
      });
  };

  const deleteClient = (id: string) => {
    const url = `${BASE_URL}/clients/${id}`;
    const header = {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    };
    axios
      .delete(url, header)
      .then((res) => {
        alert("cliente deletado");
        getAllClients();
        setSeenClientInfo(false);
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
        <Grid item>
          <Button onClick={() => goToCreateClient(navigate)}>
            create client
          </Button>
        </Grid>

        <Grid item>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {clients.map((c) => (
              <div key={c._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={c.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Email: {c.email}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button onClick={() => getClientDetails(c._id)}>
                    Details
                  </Button>
                </ListItem>
              </div>
            ))}
          </List>
        </Grid>
        {seenClientInfo && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={() => setSeenClientInfo(false)}>x</Button>
            <p>Name: {clientDetails.name}</p>
            <p>Email: {clientDetails.email}</p>
            <p>Phone: {clientDetails.phone}</p>
            <p>Address: {clientDetails.address}</p>
            <p>Cpf: {clientDetails.cpf}</p>
            <Button onClick={() => setEdit(true)}>Editar</Button>
            <Button onClick={() => deleteClient(clientDetails._id)}>
              Deletar
            </Button>
          </Grid>
        )}
        {edit && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="Name"
              name={"name"}
              value={form.name}
              onChange={onChange}
              variant="standard"
            />
            <TextField
              label="Email"
              name={"email"}
              value={form.email}
              onChange={onChange}
              variant="standard"
            />
            <TextField
              label="Phone"
              name={"phone"}
              value={form.phone}
              onChange={onChange}
              variant="standard"
            />
            <TextField
              label="Address"
              name={"address"}
              value={form.address}
              onChange={onChange}
              variant="standard"
            />
            <TextField
              label="Cpf"
              name={"cpf"}
              value={form.cpf}
              onChange={onChange}
              variant="standard"
            />
            <Button onClick={() => editClientAction(clientDetails._id)}>
              Ok
            </Button>
            <Button onClick={() => setEdit(false)}>Cancelar</Button>
          </Grid>
        )}

        <Grid item>
          <LabelBottomNavigation />
        </Grid>
      </Grid>
    </Container>
  );
}
export default ClientsPage;
