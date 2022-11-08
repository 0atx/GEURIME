/*
일기 등록 - 그림 업로드 페이지
@author 조혜안
@since 2022.10.31
*/
import React, { useState, useEffect, useRef, Suspense } from "react";
import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import RegistDiaryModal from "components/modal/RegistDiaryModal";
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Paper,
  Typography,
  TextField,
  IconButton,
  Slide,
  AppBar,
  Toolbar,
} from "@mui/material";
import Calendar from "react-calendar";
import "./Calendar.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "components/common/Btn";
import { http2 } from "api/http2";
import CloseIcon from "@mui/icons-material/Close";
import { diaryState } from "states/DiaryState";
import { useRecoilState } from "recoil";
import { http } from "api/http";
import DrawingModal from "components/modal/DrawingModal";
import { CurrentKidState } from "states/CurrentKidState";
import CanvasDraw from "react-canvas-draw";
import BrushIcon from "@mui/icons-material/Brush";
import Btn from "@mui/material/Button";
import PaletteIcon from "@mui/icons-material/Palette";
import GestureIcon from "@mui/icons-material/Gesture";

export default function RegistDiary({}) {
  // 그리기 풀 모달 transition
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  // 등록완료 모달
  const [open, setOpen] = useState(false);
  // 직접 그리기 모달
  const [openDrawing, setOpenDrawing] = useState(false);

  const closeDrawing = () => {
    setOpenDrawing(false);
  };

  // 일기 제목
  const [title, setTitle] = useState("");

  // 전역에 담긴 일기 정보
  const [diaryInfo, setDiaryInfo] = useRecoilState(diaryState);
  // 현재 아이 정보
  const [kidInfo, setKidInfo] = useRecoilState(CurrentKidState);
  // 이미지 업로드
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();

  function changeImage(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];

    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      // 화면에 읽힐 수 있는 url로 변경
      setImageUrl(reader.result);
    };
  }

  // 그림 분석하기
  async function analyzeDrawing(id) {
    const response = await http.get(`/ai/${id}`);
    // console.log("분석한다");
    console.log(response.data);
  }

  // base64를 이미지 파일로 바꿔주는 함수
  function dataURLtoFile(dataurl, fileName) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  // 등록 완료 모달 열기
  async function registDiary() {
    let file;
    if (isDrawing) {
      // 직접 그린 그림 전송
      // url을 파일로 변경 후 formdata에 넣는다.
      // file = dataURLtoFile(imageUrl, "image.png");
      file = dataURLtoFile(canvas, "image.png");
    } else {
      // 파일 전송
      file = imgRef.current.files[0];
    }

    console.log("이거야?", file);
    let formData = new FormData();
    formData.append("imageFile", file);

    let info = {
      kidId: kidInfo.kidId,
      drawingTitle: title,
      drawingDiary: diaryInfo.writing,
      createTime: diaryInfo.date,
      drawingDiaryWeather: diaryInfo.weather,
      drawingDiaryFeeling: diaryInfo.feeling,
      drawingDiaryWakeUp: diaryInfo.getupTime,
      drawingDiarySleep: diaryInfo.sleepTime,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(info)], {
        type: "application/json",
      })
    );

    console.log(info);
    const response = await http2.post(`/diaries`, formData);
    console.log("이거야이거");
    console.log(response.data);

    if (response.data.message == "success") {
      analyzeDrawing(response.data.data.drawingId);
    } else {
    }
    setOpen(true);
  }

  const [canvas, setCanvas] = useState();

  // 직접 그리기 state
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasDraw = useRef(null);
  // 직접 그린 그림 업로드
  function loadDrawing() {
    canvasDraw.current.loadSaveData(localStorage.getItem("savedDrawing"));
  }

  return (
    <div>
      {/* 헤더 */}
      <BackMenu
        isLeft={true}
        title={diaryInfo.dateTitle}
        isRight="등록"
        clickRight={registDiary}
      ></BackMenu>
      <Container id="container">
        <Paper
          elevation={3}
          sx={{
            fontSize: "2vh",
            color: "#6F6F6F",
            textAlign: "center",
            padding: "4% 0% 4% 0%",
            marginBottom: "5%",
            backgroundColor: "#fff4ce",
            borderRadius: "40px",
          }}
        >
          그림을 올려봐요!
        </Paper>
        {/* 제목 */}
        <Grid container sx={{ alignItems: "center", pl: 5, pr: 5 }}>
          <Grid item xs={2}>
            <Typography>제목</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="제목을 써주세요"
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            {/* 직접 그리기 버튼 */}
            <Btn
              sx={{
                marginTop: "10%",
                color: "#ffa000",
              }}
              onClick={() => {
                setOpenDrawing(true);
                setIsDrawing(true);
                localStorage.setItem(
                  "savedDrawing",
                  JSON.stringify({ lines: [], width: 354.90000000000003, height: 337.6 })
                );
              }}
            >
              <GestureIcon />
              &nbsp;직접 그리기
            </Btn>
            {/* <Button
              width="30%"
              sx={{
                marginTop: "10%",
              }}
              onClick={() => {
                setOpenDrawing(true);
                setIsDrawing(true);
              }}
            >
              <BrushIcon />
              그리기
            </Button> */}
          </Grid>
          <Grid
            item
            sx={{
              marginTop: "2%",
              marginBottom: "10%",
              width: "90vw",
              height: "90vw",
              display: "table",
            }}
          >
            <div>
              <form method="post" encType="multipart/form-data">
                <input
                  id="input"
                  hidden
                  accept="image/*"
                  type="file"
                  ref={imgRef}
                  onChange={(e) => {
                    changeImage(e);
                  }}
                />
              </form>
            </div>
            {/* {localStorage.getItem("savedDrawing")} */}
            {/* {JSON.stringify(canvasDraw)} */}
            {isDrawing ? (
              // 직접 그린 그림 canvas
              <Paper elevation={3}>
                <CanvasDraw
                  loadTimeOffset={40}
                  disabled
                  hideGrid
                  canvasWidth={window.innerWidth * 0.91}
                  canvasHeight={window.innerHeight * 0.45}
                  ref={canvasDraw}
                  saveData={localStorage.getItem("savedDrawing")}
                />
              </Paper>
            ) : imageUrl ? (
              <label htmlFor="input">
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
              </label>
            ) : (
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  display: "table-cell",
                }}
              >
                <label htmlFor="input">
                  <AddCircleIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "4em",
                    }}
                  />
                </label>
              </Paper>
            )}
          </Grid>
        </Grid>

        {localStorage.getItem("savedDrawing") !== null || imageUrl ? (
          <div style={{ textAlign: "center" }}>
            {/* 그림 변경 버튼 */}
            <Button
              sx={{ marginRight: "5%" }}
              width="40%"
              onClick={() => {
                setIsDrawing(false);
              }}
            >
              <label htmlFor="input">그림 변경</label>
            </Button>

            <Button bgcolor="#FFCA28" width="40%" onClick={registDiary}>
              일기 등록
            </Button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Button bgcolor="#FFCA28" width="45%" onClick={registDiary}>
              일기 등록
            </Button>
          </div>
        )}
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
      {/* 등록 완료 모달 */}
      <RegistDiaryModal open={open}></RegistDiaryModal>
      {/* 직접 그리기 모달 */}
      <DrawingModal
        open={openDrawing}
        handleClose={() => {
          setOpenDrawing(false);
          loadDrawing();
        }}
        setCanvas={setCanvas}
      ></DrawingModal>
    </div>
  );
}
