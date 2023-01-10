import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/baseURL";
import { useForm } from "../../hooks/useForm";
import { goToUsers } from "../../router/coordinator";
import { useEffect, useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const { form, onChange, cleanFields, setForm } = useForm({
    username: "",
    password: "",
  });

  useEffect(() => {
    setForm({
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    });
  }, []);

  const submitLogin = () => {
    const url = `${BASE_URL}/login`;
    const body = {
      username: form.username,
      password: form.password,
    };

    axios
      .post(url, body)
      .then((res) => {
        localStorage.setItem("authorization", res.data.token);
        goToUsers(navigate);
        if (remember) {
          localStorage.setItem("username", form.username);
          localStorage.setItem("password", form.password);
        }
      })
      .catch((err: any) => {
        alert("Credencias invalidas.");
        console.log(err.message);
      });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    cleanFields();
  };

  return (
    <Container>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
        <Grid item xs={2} marginTop="5vh">
          <img width={300} 
        src="https://www.sharenergy.com.br/wp-content/uploads/2022/12/logo_color.png"
        alt="Logo da sharenergy"
      ></img>
      </Grid>
      </Grid>
      <form onSubmit={submit}>
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={6} md={4}>
            <TextField
              name={"username"}
              value={form.username}
              onChange={onChange}
              placeholder="@username"
              type="name"
              fullWidth
              margin={"normal"}
              id="outlined-required"
              label="Username"
              required
            />
            <TextField
              name={"password"}
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              type="password"
              margin={"normal"}
              fullWidth
              id="outlined-required-password"
              label="Senha"
              required
            />
            <input type="checkbox" onClick={() => setRemember(true)} />
            <label>Remember me</label>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={6} md={8}>
            <Button
              onClick={submitLogin}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
export default LoginPage;
