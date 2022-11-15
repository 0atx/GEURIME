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
import AnalysisModal from "components/modal/AnalysisModal";
import Modal from "components/common/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DetailDrawing() {
  const location = useLocation();
  const navigater = useNavigate();

  // 분석결과 모달
  const [openAnalysisModal, setOpenAnalysisModal] = useState(false);

  // 분석 모달 닫기
  const closeAnalysisModal = () => {
    setOpenAnalysisModal(false);
  };

  // 삭제 완료 모달
  const [openDelete, setOpenDelete] = useState(false);

  // url에서 그림 id 가져오기
  let id = location.pathname.substring(15, location.pathname.length + 1);
  const [drawingInfo, setDrawingInfo] = useState({
    drawingId: id,
    createTime: "",
    drawingBoxId: 0,
    drawingImagePath: "",
    drawingTitle: "",
    emotionAngry: 0,
    emotionHappy: 0,
    emotionSad: 0,
    isLike: false,
  });

  async function ModifyDrawing(copy) {
    const response = await http.put(`/drawings/${copy.drawinId}`, {
      drawingBoxId: copy.drawingBoxId,
      drawingId: copy.drawingId,
      drawingTitle: copy.drawingTitle,
      isLike: copy.isLike,
      kidId: localStorage.getItem("currentKidId"),
    });
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

  // 그림 삭제 axios 함수
  async function deleteDrawing() {
    const response = await http.delete(`/drawings/${drawingInfo.drawingId}`, {
      params: {
        kidId: localStorage.getItem("currentKidId"),
      },
    });

    if (response.data.message === "success") {
      setOpenDelete(true);
    }
  }

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
            sx={{ marginRight: "10%" }}
          >
            {/* 그림 좋아요 */}
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              {drawingInfo.isLike ? (
                <FavoriteIcon
                  sx={{ color: "#FF5252", fontSize: "3vh" }}
                  onClick={() => {
                    let copy = { ...drawingInfo };
                    copy.isLike = false;
                    setDrawingInfo(copy);
                    ModifyDrawing(copy);
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "#FF5252", fontSize: "3vh" }}
                  onClick={() => {
                    let copy = { ...drawingInfo };
                    copy.isLike = true;
                    setDrawingInfo(copy);
                    ModifyDrawing(copy);
                  }}
                />
              )}
            </Grid>
            {/* 그림 수정 */}
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <ModeEditIcon
                sx={{ color: "#9e9e9e", fontSize: "3vh" }}
                onClick={() => {
                  navigater(`/modifydrawing/${id}`);
                }}
              />
            </Grid>
            {/* 그림 삭제 */}
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <DeleteIcon
                sx={{ color: "#FFCA28", fontSize: "3vh" }}
                onClick={() => {
                  deleteDrawing();
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* 그림 정보 영역 */}
        <Grid container justifyContent="center" alignItems="center">
          {/* 보관함 */}
          <Grid item xs={3} sx={{ marginBottom: "1vh" }}>
            <Typography sx={{ fontSize: "2vh" }}>보관함</Typography>
          </Grid>
          <Grid item xs={7} sx={{ fontSize: "2vh", marginBottom: "1vh" }}>
            {drawingInfo.drawingBoxName}
          </Grid>
          {/* 날짜  */}
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "2vh" }}>날짜</Typography>
          </Grid>
          <Grid item xs={7} sx={{ fontSize: "2vh" }}>
            {drawingInfo.createTime}
          </Grid>
        </Grid>
        {/* 그림 분석 보기 버튼 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "3vh", marginBottom: "20px" }}
        >
          <Btn
            width="15vh"
            onClick={() => {
              setOpenAnalysisModal(true);
            }}
          >
            그림 분석 보기
          </Btn>
        </Grid>
      </Grid>
      <NavBar />
      {/* 분석 결과 모달 */}
      {drawingInfo.emotionHappy === null &&
      drawingInfo.emotionSad === null &&
      drawingInfo.emotionAngry === null ? (
        <Modal
          open={openAnalysisModal}
          close={closeAnalysisModal}
          onClick={closeAnalysisModal}
          text="열심히 분석 중이에요!"
          icon="wait"
        ></Modal>
      ) : (
        <AnalysisModal
          open={openAnalysisModal}
          handleClose={closeAnalysisModal}
          happy={drawingInfo.emotionHappy}
          sad={drawingInfo.emotionSad}
          angry={drawingInfo.emotionAngry}
        ></AnalysisModal>
      )}
      {/* 그림 삭제 완료 모달 */}
      <Modal
        open={openDelete}
        close={() => {
          setOpenDelete(false);
        }}
        onClick={() => {
          navigater(-1);
        }}
        text="그림 삭제가 완료되었습니다."
        icon="success"
      />
    </>
  );
}
