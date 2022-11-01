/*
일기 상세 조회 페이지
@author 조혜안
@since 2022.11.01
*/
import { useEffect, useRef, useState } from "react";
import { Container, Grid } from "@mui/material";
import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import moment from "moment";
import "moment/locale/ko";
// 날씨 이미지 import
import sunny from "assets/icon/weather/sunnyClicked.png";
import cloudy from "assets/icon/weather/cloudyClicked.png";
import rainy from "assets/icon/weather/rainyClicked.png";
import snowy from "assets/icon/weather/snowyClicked.png";
import windy from "assets/icon/weather/windyClicked.png";

export default function DetailDiary() {
  // 일기 정보
  const [diary, setDiary] = useState({});

  // 일기장 삭제 함수
  const deleteDiary = () => {
    console.log("일기장 삭제");
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // 일기장 get axios 연동 필요!!!

      // 연동 후 데이터 가공

      let date = moment(new Date("2022-11-01")).format("YYYY년 MM월 D일 dd요일");
      let wakeup = moment(new Date("2022-11-01 08:00")).format("A h시 mm분");
      let sleep = moment(new Date("2022-11-01 22:00")).format("A h시 mm분");
      setDiary({
        id: 1,
        title: "가족 여행 간 날",
        emotion_happy: "60",
        emotion_sad: "20",
        emotion_angry: "20",
        drawing_image_path: "http://placeimg.com/300/200/people",
        weather: 3,
        feeling: 0,
        wakeupTime: wakeup,
        sleepTime: sleep,
        date: date,
        writing: "오늘은 가족여행 간 날이다. 너무너무 재미있었다",
      });
    }
  }, []);

  return (
    <div>
      {/* 헤더 */}
      <BackMenu
        isLeft={true}
        title={diary.title}
        isRight="삭제"
        clickRight={deleteDiary}
      ></BackMenu>
      <Container id="container">
        {/* 일기장 */}
        <Grid container sx={{ border: 1 }}>
          <Grid item xs={7} sx={{ borderBottom: 1, borderRight: 1, padding: "4%" }}>
            {diary.date}
          </Grid>
          <Grid item xs={5} sx={{ borderBottom: 1, padding: "4%" }}>
            {/* 날씨 */}
            {diary.weather === 0 && <img src={sunny} width="30%"></img>}
            {diary.weather === 1 && <img src={cloudy} width="30%"></img>}
            {diary.weather === 2 && <img src={rainy} width="30%"></img>}
            {diary.weather === 3 && <img src={snowy} width="30%"></img>}
            {diary.weather === 4 && <img src={windy} width="30%"></img>}
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: 1, padding: "2% 2% 2% 4%" }}>
            어제 잠든 시간: {diary.sleepTime}
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: 1, padding: "2% 2% 2% 4%" }}>
            오늘 일어난 시간: {diary.wakeupTime}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", padding: "4%" }}>
            <img src={diary.drawing_image_path}></img>
          </Grid>
          <Grid item xs={12} sx={{ textalign: "center", padding: "4%" }}>
            <p>{diary.writing}</p>
          </Grid>
        </Grid>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
    </div>
  );
}
