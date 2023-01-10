import Router from "./router/router";
import theme from "./constants/theme";
import {  ThemeProvider } from "@mui/material";
import { GlobalStyle } from "./appStyles";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Router />
    </ThemeProvider>
  );
}

export default App;
