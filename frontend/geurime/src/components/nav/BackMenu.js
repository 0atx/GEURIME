/*
BackMenu 헤더
속성 : isLeft(Boolean), title(String), isRight(String), clickRight(오른쪽클릭 함수)
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

export default function BackMenu({ isLeft, title, isRight, clickRight }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        color="transparent"
        style={{
          position: "fixed",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Grid
            container
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            {/* isLeft */}
            <Grid item sx={{ textAlign: "center" }} xs={2}>
              {isLeft === true && <KeyboardArrowLeftRoundedIcon></KeyboardArrowLeftRoundedIcon>}
            </Grid>
            {/* title */}
            <Grid item sx={{ textAlign: "center" }} xs={8}>
              <span
                style={{
                  fontSize: "23px",
                }}
              >
                {title}
              </span>
            </Grid>
            {/* isRight */}
            <Grid item sx={{ textAlign: "center" }} xs={2}>
              <span
                style={{
                  fontSize: "20px",
                  color: "#ffa000",
                }}
                onClick={clickRight}
              >
                {isRight}
              </span>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
