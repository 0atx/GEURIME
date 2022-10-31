/*
일기 등록 - 기분, 날씨, 잠든 시간, 일어난 시간 질문 페이지
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
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "components/common/Btn.js";
import styled from "styled-components";
import img1 from "assets/icon/default_profile.png";

export default function RegistDiary({}) {
  // 현재 날짜
  const [value, setValue] = useState(new Date());
  // 선택 날짜 타이틀
  const [title, setTitle] = useState(
    new Date().getMonth() + 1 + "월 " + new Date().getDate() + "일 일기"
  );
  // 캘린더 열기
  const [calOpen, setCalOpen] = useState(false);
  // 어제 잠 든 시간
  const [sleepTime, setSleepTime] = useState("22:00");
  // 오늘 일어난 시간
  const [getupTime, setGetupTime] = useState("08:00");

  // 캘린더 모달 닫기
  const handleClose = () => {
    setCalOpen(false);
  };

  // 캘린더 날짜 변경
  const onChange = function (e) {
    setValue(e);
  };

  // 캘린더 열기
  const openCal = () => {
    setCalOpen(true);
  };

  // 날짜 변경
  const changeDate = () => {
    const year = value.getFullYear();
    let month = value.getMonth() + 1;
    let day = value.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let date = year + "-" + month + "-" + day;
    console.log(date);
    setTitle(month + "월 " + day + "일 일기");
    setCalOpen(false);
  };

  // Paper css
  const StyledPaper = styled(Paper)`
    && {
      padding: 8% 3% 8% 3%;
      margin-bottom: 5%;
      background-color: #fff4ce;
      border-radius: 20px;
    }
  `;

  // Typography css
  const StyledTypography = styled(Typography)`
    && {
      text-align: center;
      margin-bottom: 5%;
      font-size: 2.8vh;
    }
  `;

  return (
    <div>
      {/* 캘린더 모달 */}
      <Dialog onClose={handleClose} open={calOpen}>
        {/* <DialogTitle>일기를 등록할 날짜를 선택해주세요!</DialogTitle> */}
        <Calendar
          onChange={(e) => {
            onChange(e);
          }}
          calendarType="Hebrew" // 일요일시작
          showNeighboringMonth={false} // 이전, 다음 달 없애는 코드
          minDetail="month" // 최소 선택을 월 단위로 하는 코드
          maxDetail="month" // 최대 선택을 월 단위로 하는 코드
          // 날짜의 일을 빼는 코드
          formatDay={(locale, date) => moment(date).format("DD")}
          value={value}
        ></Calendar>
        <DialogActions sx={{ marginBottom: "10px" }}>
          <Button
            onClick={() => {
              setCalOpen(false);
            }}
          >
            취소
          </Button>
          <Button onClick={changeDate}>확인</Button>
        </DialogActions>
      </Dialog>

      {/* 헤더 */}
      <BackMenu type="registDiary" isLeft={true} title={title} clickTitle={openCal}></BackMenu>
      <Container id="container">
        {/* 기분 질문 */}
        <StyledPaper elevation={0}>
          <StyledTypography>오늘 하루는 어땠어?</StyledTypography>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
          </Grid>
        </StyledPaper>
        {/* 날씨 질문 */}
        <StyledPaper elevation={0}>
          <StyledTypography>오늘 날씨는 어땠어?</StyledTypography>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
            <Grid item xs={2.4}>
              <img src={img1} />
            </Grid>
          </Grid>
        </StyledPaper>
        {/* 잠든 시간  질문 */}
        <StyledPaper elevation={0}>
          <StyledTypography>어제 잠 든 시간은 몇 시였어?</StyledTypography>
          <div style={{ textAlign: "center" }}>
            <TextField
              id="time"
              type="time"
              value={sleepTime}
              onChange={(e) => {
                setSleepTime(e.target.value);
              }}
              inputProps={{
                style: { fontSize: "2.3vh", color: "#FFA000" },
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
          </div>
        </StyledPaper>
        {/* 일어난 시간 질문 */}
        <StyledPaper elevation={0}>
          <StyledTypography>오늘 일어난 시간은 몇 시였어?</StyledTypography>
          <div style={{ textAlign: "center" }}>
            <TextField
              id="time"
              type="time"
              value={getupTime}
              onChange={(e) => {
                setGetupTime(e.target.value);
              }}
              inputProps={{
                style: { fontSize: "2.3vh", color: "#FFA000" },
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
          </div>
        </StyledPaper>
        <Link to="/registdiary/write" style={{ textDecoration: "none" }}>
          <Button width="100px">다음</Button>
        </Link>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
    </div>
  );
}
