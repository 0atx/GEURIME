/*
BackMenu 헤더
속성 : type(String), isLeft(Boolean), title(String), clickTitle(타이틀클릭 함수), isRight(String), clickRight(오른쪽클릭 함수)
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function BackMenu({
  type,
  isLeft,
  title,
  clickTitle,
  isRight,
  clickRight,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        style={{
          background: "#FFFFFF",
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
              {isLeft === true && (
                <KeyboardArrowLeftRoundedIcon
                  onClick={() => {
                    // 뒤로 가기
                    navigate(-1);
                  }}
                ></KeyboardArrowLeftRoundedIcon>
              )}
            </Grid>
            {/* title */}
            <Grid item sx={{ textAlign: "center" }} xs={8}>
              <span onClick={clickTitle}>
                {title}
                {type === "registDiary" && (
                  <ArrowDropDownRoundedIcon></ArrowDropDownRoundedIcon>
                )}
              </span>
            </Grid>
            {/* isRight */}
            <Grid item sx={{ fontSize: "1.8vh", textAlign: "center" }} xs={2}>
              <div
                style={{
                  color: "#ffa000",
                }}
                onClick={clickRight}
              >
                {isRight}
                {type === "registKids" && <AddIcon></AddIcon>}
                {type === "detailGallery" && <MenuIcon></MenuIcon>}
              </span>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
