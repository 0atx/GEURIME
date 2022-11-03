/*
일기 등록 - 그림 업로드 페이지
@author 조혜안
@since 2022.10.31
*/
import { useState, useEffect, useRef, Suspense } from "react";
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
} from "@mui/material";
import Calendar from "react-calendar";
import "./Calendar.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "components/common/Btn";
import { http2 } from "api/http2";

import { diaryState } from "states/DiaryState";
import { useRecoilState } from "recoil";

export default function RegistDiary({}) {
  // 등록완료 모달
  const [open, setOpen] = useState(false);

  // 일기 제목
  const [title, setTitle] = useState("");

  // 전역에 담긴 일기 정보
  const [diaryInfo, setDiaryInfo] = useRecoilState(diaryState);

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

  // 등록 완료 모달 열기
  async function registDiary() {
    // 사진
    let file = imgRef.current.files[0];
    // console.log(file);
    let formData = new FormData();
    formData.append("imageFile", file);

    let info = {
      kidId: 37, // kidId 변경 필요!!!
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
      // 그림분석 api 연동 필요!!!
    } else {
    }
    setOpen(true);
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
          <Grid
            item
            style={{
              marginTop: "10%",
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
            {imageUrl ? (
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
        {imageUrl ? (
          <div style={{ textAlign: "center" }}>
            {/* 그림 변경 버튼 */}
            <Button sx={{ marginRight: "5%" }} width="30%">
              <label htmlFor="input">그림 변경</label>
            </Button>

            <Button bgcolor="#FFCA28" width="30%" onClick={registDiary}>
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
    </div>
  );
}
