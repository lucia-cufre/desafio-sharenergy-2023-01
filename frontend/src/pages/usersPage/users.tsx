import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import LabelBottomNavigation from "../../components/bottomBar/bottomBar";
import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function UsersPage() {
  useProtectedPage();

  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState<any[]>([]);
  const [result, setResult] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  const getAllUsers = () => {
    const url = `https://randomuser.me/api/?page=${currentPage}&results=10&seed=abc`;

    axios
      .get(url)
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((err) => {
        alert("Nao foi possível acceder as informações.");
      });
  };

  

  //paginado

  const search = (result: string) => {
    const newList = users.filter(
      (user: any) =>
        user.name.first.toLowerCase().includes(result.toLowerCase()) ||
        user.name.last.toLowerCase().includes(result.toLowerCase()) ||
        user.email.toLowerCase().includes(result.toLowerCase()) ||
        user.login.username.toLowerCase().includes(result.toLowerCase())
    );
    setFilter(newList);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
  
        <Grid item>
          <TextField
            id="outlined-basic"
          label="Search by name, username or email"
            variant="outlined"
            onChange={(e) => setResult(e.target.value)}
            onKeyUp={() => search(result)}
            margin="normal"
          />
        </Grid>
        {filter.length > 0 && result.length > 0 ? (
          <Grid item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {filter.map((u) => (
                <div key={u.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="avatar picture" src={u.picture.thumbnail} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={u.name.first + " " + u.name.last}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Age: {u.dob.age}
                            <br />
                            Email: {u.email}
                            <br />
                            Username: {u.login.username}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </Grid>
        ) : (
          <Grid item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
              
              {users.map((u) => (
                <div key={u.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="avatar picture" src={u.picture.thumbnail} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={u.name.first + " " + u.name.last}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Age: {u.dob.age}
                            <br />
                            Email: {u.email}
                            <br />
                            Username: {u.login.username}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </Grid>
        )}
         <Stack spacing={2}>
      <Pagination count={10} page={currentPage} onChange={handleChange} />
    </Stack>
    <br/>
    <br/>
    <br/>
    <br/>
        <Grid item>
          <LabelBottomNavigation />
        </Grid>
      </Grid>
    </Container>
  );
}

export default UsersPage;
