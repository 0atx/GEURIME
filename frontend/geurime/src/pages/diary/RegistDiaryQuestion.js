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
import { Link, useNavigate } from "react-router-dom";
import Button from "components/common/Btn.js";
import styled from "styled-components";
// 날씨 이미지 import
import sunnyUnclicked from "assets/icon/weather/sunnyUnclicked.png";
import sunnyClicked from "assets/icon/weather/sunnyClicked.png";
import cloudyUnclicked from "assets/icon/weather/cloudyUnclicked.png";
import cloudyClicked from "assets/icon/weather/cloudyClicked.png";
import rainyUnclicked from "assets/icon/weather/rainyUnclicked.png";
import rainyClicked from "assets/icon/weather/rainyClicked.png";
import snowyUnclicked from "assets/icon/weather/snowyUnclicked.png";
import snowyClicked from "assets/icon/weather/snowyClicked.png";
import windyUnclicked from "assets/icon/weather/windyUnclicked.png";
import windyClicked from "assets/icon/weather/windyClicked.png";
// 기분 이미지 import
import happyUnclicked from "assets/icon/feeling/happyUnclicked.png";
import happyClicked from "assets/icon/feeling/happyClicked.png";
import sadUnclicked from "assets/icon/feeling/sadUnclicked.png";
import sadClicked from "assets/icon/feeling/sadClicked.png";
import surpriseUnclicked from "assets/icon/feeling/surpriseUnclicked.png";
import surpriseClicked from "assets/icon/feeling/surpriseClicked.png";
import scaryUnclicked from "assets/icon/feeling/scaryUnclicked.png";
import scaryClicked from "assets/icon/feeling/scaryClicked.png";
import angryUnclicked from "assets/icon/feeling/angryUnclicked.png";
import angryClicked from "assets/icon/feeling/angryClicked.png";

import { diaryState } from "states/DiaryState";
import { useRecoilState } from "recoil";

export default function RegistDiary({}) {
  // 현재 날짜
  const [value, setValue] = useState(new Date());
  // 선택 날짜 타이틀
  const [title, setTitle] = useState(
    new Date().getMonth() + 1 + "월 " + new Date().getDate() + "일 일기"
  );
  // 선택된 날짜 (yyyy-mm-dd 형식)
  const [date, setDate] = useState("2000-01-01");
  // 캘린더 열기
  const [calOpen, setCalOpen] = useState(false);
  // 클릭된 기분
  const [clickedFeeling, setClickedFeeling] = useState();
  // 클릭된 날씨
  const [clickedWeather, setClickedWeather] = useState();
  // 어제 잠든 시간
  const [sleepTime, setSleepTime] = useState("22:00");
  // 오늘 일어난 시간
  const [getupTime, setGetupTime] = useState("08:00");

  // 전역에 담긴 일기 정보
  const [diaryInfo, setDiaryInfo] = useRecoilState(diaryState);

  const navigate = useNavigate();
  // 다음 버튼 클릭 시
  const goWriting = () => {
    navigate("/registdiary/write");

    setDiaryInfo((diary) => {
      const copyDiary = { ...diary };
      copyDiary.dateTitle = title;
      copyDiary.feeling = clickedFeeling;
      copyDiary.weather = clickedWeather;
      copyDiary.date = date;
      copyDiary.sleepTime = date + " " + sleepTime;
      copyDiary.getupTime = date + " " + getupTime;

      console.log(copyDiary);
      return { ...copyDiary };
    });
  };

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
    setDate(date);
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
      font-size: 2.3vh;
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
              {clickedFeeling === 0 ? (
                <img src={happyClicked} width="90%" />
              ) : (
                <img
                  src={happyUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedFeeling(0);
                  }}
                />
              )}
              <Typography>기쁨</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedFeeling === 1 ? (
                <img src={sadClicked} width="90%" />
              ) : (
                <img
                  src={sadUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedFeeling(1);
                  }}
                />
              )}
              <Typography>슬픔</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedFeeling === 2 ? (
                <img src={surpriseClicked} width="90%" />
              ) : (
                <img
                  src={surpriseUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedFeeling(2);
                  }}
                />
              )}
              <Typography>놀람</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedFeeling === 3 ? (
                <img src={scaryClicked} width="90%" />
              ) : (
                <img
                  src={scaryUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedFeeling(3);
                  }}
                />
              )}
              <Typography>공포</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedFeeling === 4 ? (
                <img src={angryClicked} width="90%" />
              ) : (
                <img
                  src={angryUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedFeeling(4);
                  }}
                />
              )}
              <Typography>화남</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        {/* 날씨 질문 */}
        <StyledPaper elevation={0}>
          <StyledTypography>오늘 날씨는 어땠어?</StyledTypography>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={2.4}>
              {clickedWeather === 0 ? (
                <img src={sunnyClicked} width="90%" />
              ) : (
                <img
                  src={sunnyUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedWeather(0);
                  }}
                />
              )}
              <Typography>맑음</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedWeather === 1 ? (
                <img src={cloudyClicked} width="90%" />
              ) : (
                <img
                  src={cloudyUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedWeather(1);
                  }}
                />
              )}
              <Typography>흐림</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedWeather === 2 ? (
                <img src={rainyClicked} width="90%" />
              ) : (
                <img
                  src={rainyUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedWeather(2);
                  }}
                />
              )}
              <Typography>비</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedWeather === 3 ? (
                <img src={snowyClicked} width="90%" />
              ) : (
                <img
                  src={snowyUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedWeather(3);
                  }}
                />
              )}
              <Typography>눈</Typography>
            </Grid>
            <Grid item xs={2.4}>
              {clickedWeather === 4 ? (
                <img src={windyClicked} width="90%" />
              ) : (
                <img
                  src={windyUnclicked}
                  width="90%"
                  onClick={() => {
                    setClickedWeather(4);
                  }}
                />
              )}
              <Typography>바람</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        {/* 잠든 시간  질문 */}
        <StyledPaper elevation={0}>
          <StyledTypography>어제 잠든 시간은 몇 시였어?</StyledTypography>
          <div style={{ textAlign: "center" }}>
            <TextField
              id="time"
              type="time"
              value={sleepTime}
              onChange={(e) => {
                setSleepTime(e.target.value);
              }}
              inputProps={{
                style: { color: "#FFA000" },
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
                style: { color: "#FFA000" },
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
          </div>
        </StyledPaper>
        <div style={{ textAlign: "right" }}>
          <Button width="100px" onClick={goWriting}>
            다음
          </Button>
        </div>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
    </div>
  );
}
