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
} from "@mui/material";
import Calendar from "react-calendar";
import "./Calendar.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "components/common/Btn";

import { diaryState } from "states/DiaryState";
import { useRecoilState } from "recoil";

export default function RegistDiary({}) {
  // 등록완료 모달
  const [open, setOpen] = useState(false);

  // 일기 제목
  const [title, setTitle] = useState("");

  // 전역에 담긴 일기 정보
  const [diaryInfo, setDiaryInfo] = useRecoilState(diaryState);

  // 등록완료 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };
  // 등록 완료 모달 열기 -- 일기 등록 api 연동 필요!!!
  const registDiary = () => {
    setOpen(true);
  };

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
                console.log(title);
              }}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "10%", marginBottom: "10%", width: "100%", display: "table" }}>
          <Paper
            sx={{
              height: "358px",
              textAlign: "center",
              verticalAlign: "middle",
              display: "table-cell",
            }}
          >
            <AddCircleIcon
              sx={{
                color: "secondary.main",
                fontSize: "3.5em",
              }}
            />
          </Paper>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button width="45%" onClick={registDiary}>
            일기 등록
          </Button>
        </div>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
      {/* 등록 완료 모달 */}
      <RegistDiaryModal open={open}></RegistDiaryModal>
    </div>
  );
}
