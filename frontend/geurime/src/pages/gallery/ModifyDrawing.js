/*
그림 수정 페이지
@author 여예원
@since 2022.11.07
*/

import { http } from "api/http";
import BackMenu from "components/nav/BackMenu";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import NavBar from "components/nav/NavBar";
import Btn from "components/common/Btn";
import Modal from "components/common/Modal";

import { useRecoilValue } from "recoil";
import { CurrentKidState } from "states/CurrentKidState";

export default function ModifyDrawing() {
  const navigater = useNavigate();
  const location = useLocation();

  // 수정 완료 모달
  const [openModify, setOpenModify] = useState(false);
  // 삭제 완료 모달
  const [openDelete, setOpenDelete] = useState(false);

  // 현재 등록된 아이
  const currentKid = useRecoilValue(CurrentKidState);

  // 그림 보관함
  const [drawingBoxes, setDrawingBoxes] = useState(
    currentKid.drawingBoxDtoList
  );

  // 그림일기 보관함 삭제 함수
  for (let i = 0; i < drawingBoxes.length; i++) {
    if (drawingBoxes[i].drawingBoxName === "그림일기 보관함") {
      let copy = [...drawingBoxes];
      copy.splice(i, 1);
      setDrawingBoxes(copy);
    }
  }
  // 보관함 선택시 값 바꾸는 함수
  const handleChange = (event) => {
    setDrawingBox(event.target.value);
  };

  const [drawingBox, setDrawingBox] = useState(drawingBoxes[0]);
  // 그림 id
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

  // 그림 정보 가져오는 axios 함수
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

  // 그림 수정 axios 함수
  async function modifyDrawing() {
    const response = await http.put(`drawings`, {
      drawingBoxId: drawingBox.drawingBoxId,
      drawingId: drawingInfo.drawingId,
      drawingTitle: document.getElementById("drawingTitle").value,
      isLike: drawingInfo.isLike,
      kidId: currentKid.kidId,
    });

    if (response.data.message === "success") {
      setOpenModify(true);
    }
  }

  // 그림 삭제 axios 함수
  async function deleteDrawing() {
    const response = await http.delete(`/drawings`, {
      params: {
        drawingId: drawingInfo.drawingId,
        kidId: currentKid.kidId,
      },
    });

    if (response.data.message === "success") {
      setOpenDelete(true);
    }
  }

  return (
    <>
      <BackMenu isLeft={true} title="그림 수정" />
      <Grid id="container" container>
        <Modal
          open={openModify}
          close={() => {
            setOpenModify(false);
          }}
          onClick={() => {
            navigater("/gallery");
          }}
          text="그림 수정이 완료되었습니다."
          icon="success"
        />
        <Modal
          open={openDelete}
          close={() => {
            setOpenModify(false);
          }}
          onClick={() => {
            navigater("/gallery");
          }}
          text="그림 삭제가 완료되었습니다."
          icon="success"
        />
        {/* 그림 영역 */}
        <Grid container justifyContent="center" sx={{ marginTop: "0.5vh" }}>
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
        </Grid>
        {/* 그림 정보 영역 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "6vh" }}
        >
          {/* 날짜  */}
          <Grid item xs={3} sx={{ marginBottom: "3vh" }}>
            <Typography>날짜</Typography>
          </Grid>
          <Grid item xs={7} sx={{ marginBottom: "3vh" }}>
            {drawingInfo.createTime}
          </Grid>
          {/* 제목  */}
          <Grid item xs={3} sx={{ marginBottom: "3vh" }}>
            <Typography>제목</Typography>
          </Grid>
          <Grid item xs={7} sx={{ marginBottom: "3vh" }}>
            <TextField
              fullWidth
              id="drawingTitle"
              placeholder={drawingInfo.drawingTitle}
              variant="standard"
            />
          </Grid>
          {/* 보관함 */}
          <Grid item xs={3}>
            <Typography>보관함</Typography>
          </Grid>
          <Grid item xs={7}>
            <Select
              fullWidth
              value={drawingBox}
              onChange={handleChange}
              variant="standard"
              placeholder="기본 보관함"
              MenuProps={{
                disablePortal: true,
                PaperProps: { sx: { maxHeight: 150 } },
              }}
            >
              {drawingBoxes.map(function (box, i) {
                return (
                  <MenuItem key={i} value={box}>
                    {box.drawingBoxName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        {/* 그림 수정 및 삭제 버튼 */}
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ marginTop: "7vh" }}
        >
          <Grid item xs={4}>
            <Btn
              width="130px"
              onClick={() => {
                deleteDrawing();
              }}
            >
              그림 삭제
            </Btn>
          </Grid>
          <Grid item xs={4}>
            <Btn
              bgcolor="#FFCA28"
              width="130px"
              onClick={() => {
                modifyDrawing();
              }}
            >
              그림 수정
            </Btn>
          </Grid>
        </Grid>
      </Grid>
      <NavBar />
    </>
  );
}
