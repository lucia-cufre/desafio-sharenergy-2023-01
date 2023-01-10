import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatsPage from "../pages/catPage/cats";
import ClientsPage from "../pages/clientsPage/clients";
import CreateClientPage from "../pages/clientsPage/createClient";
import DogsPage from "../pages/dogPage/dogs";
import ErrorPage from "../pages/errorPage/error";
import LoginPage from "../pages/loginPage/login";
import UsersPage from "../pages/usersPage/users";

const router = () => {
    return (
      <BrowserRouter>
        <Routes>
        <Route path={"/"} element={<LoginPage />} />
          <Route path={"/users"} element={<UsersPage />} />
          <Route path={"/cats"} element={<CatsPage />} />
          <Route path={"/dogs"} element={<DogsPage />} />
          <Route path={"/clients"} element={<ClientsPage />} />
          <Route path={"/clients/create"} element={<CreateClientPage />} />
     
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default router;