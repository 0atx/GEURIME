import React from "react";
import "./App.css";
import Router from "./Router";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'THEHongChawangjanemo', sans-serif",
  },
  palette: {
    primary: {
      main: "#FFE082",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
