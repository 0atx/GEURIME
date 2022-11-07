/*
그림 상세보기 페이지
@author 여예원
@since 2022.11.07
*/

import { http } from "api/http";
import BackMenu from "components/nav/BackMenu";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Select } from "@mui/material";
import NavBar from "components/nav/NavBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Btn from "components/common/Btn";
import ModifyDrawing from "./ModifyDrawing";

export default function DetailDrawing() {
  const location = useLocation();
  const navigater = useNavigate();

  let id = location.pathname.substring(15, location.pathname.length + 1);
  const [drawingInfo, setDrawingInfo] = useState({
    drawingId: id,
    createTime: "",
    drawingBoxid: 0,
    drawingImagePath: "",
    drawingTitle: "",
    emotionAngry: 0,
    emotionHappy: 0,
    emotionSad: 0,
    isLike: false,
  });

  async function ModifyDrawing(copy) {
    console.log(copy);
    const response = await http.put(``);
  }

  async function getDrawingInfo() {
    const response = await http.get(`/drawings/${id}`);
    setDrawingInfo(response.data.data);
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getDrawingInfo();
    }
  }, []);

  return (
    <>
      <BackMenu isLeft={true} title={`제목: ${drawingInfo.drawingTitle}`} />
      <Grid id="container" container>
        {/* 그림 영역 */}
        <Grid container justifyContent="center">
          <Grid
            item
            xs={10}
            style={{ margin: "auto", width: "90vw", height: "90vw" }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${drawingInfo.drawingImagePath})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          {/* 아이콘 영역 */}
          <Grid
            container
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{ marginRight: "30px" }}
          >
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              {drawingInfo.isLike ? (
                <FavoriteIcon
                  sx={{ color: "#FF5252" }}
                  onClick={() => {
                    let copy = { ...drawingInfo };
                    copy.isLike = false;
                    setDrawingInfo(copy);
                    ModifyDrawing(copy);
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "#FF5252" }}
                  onClick={() => {
                    let copy = { ...drawingInfo };
                    copy.isLike = true;
                    setDrawingInfo(copy);
                    ModifyDrawing(copy);
                  }}
                />
              )}
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <ModeEditIcon
                sx={{ color: "#9e9e9e" }}
                onClick={() => {
                  navigater(`/modifydrawing/${id}`);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* 그림 정보 영역 */}
        <Grid container justifyContent="center" alignItems="center">
          {/* 보관함 */}
          <Grid item xs={3}>
            <Typography>보관함</Typography>
          </Grid>
          <Grid item xs={7}>
            {drawingInfo.drawingBoxName}
          </Grid>
          {/* 날짜  */}
          <Grid item xs={3}>
            <Typography>날짜</Typography>
          </Grid>
          <Grid item xs={7}>
            {drawingInfo.createTime}
          </Grid>
        </Grid>
        {/* 그림 분석 보기 버튼 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Btn width="130px">그림 분석 보기</Btn>
        </Grid>
      </Grid>
      <NavBar />
    </>
  );
}
