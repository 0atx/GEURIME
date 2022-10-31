import React from "react";
import "./App.css";
import Router from "./Router";
import { RecoilRoot } from "recoil";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'THEHongChawangjanemo', sans-serif",
  },
  palette: {
    primary: {
      main: "#FFE082",
    },
    secondary: {
      main: "#FFCA28",
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
