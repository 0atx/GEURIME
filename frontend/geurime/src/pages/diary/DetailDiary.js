/*
일기 상세 조회 페이지
@author 조혜안
@since 2022.11.01
*/
import { useEffect, useRef, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import moment from "moment";
import "moment/locale/ko";
import "./DetailDiary.css";
import Button from "components/common/Btn.js";
import DeleteDiaryModal from "components/modal/DeleteDiaryModal";
// 날씨 이미지 import
import sunny from "assets/icon/weather/sunnyClicked.png";
import cloudy from "assets/icon/weather/cloudyClicked.png";
import rainy from "assets/icon/weather/rainyClicked.png";
import snowy from "assets/icon/weather/snowyClicked.png";
import windy from "assets/icon/weather/windyClicked.png";
// 기분 이미지 import
import happy from "assets/icon/feeling/happyClicked.png";
import sad from "assets/icon/feeling/sadClicked.png";
import surprise from "assets/icon/feeling/surpriseClicked.png";
import scary from "assets/icon/feeling/scaryClicked.png";
import angry from "assets/icon/feeling/angryClicked.png";
import AnalysisModal from "components/modal/AnalysisModal";

export default function DetailDiary() {
  // 삭제완료 모달
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // 분석결과 모달
  const [openAnalysisModal, setOpenAnalysisModal] = useState(false);

  // 일기 정보
  const [diary, setDiary] = useState({});

  const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토", "일"];
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState(""); // 요일

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // 분석 모달 닫기
  const closeAnalysisModal = () => {
    setOpenAnalysisModal(false);
  };

  // 일기장 삭제 함수
  const deleteDiary = () => {
    setOpenDeleteModal(true);
  };

  // 분석결과 함수
  const showAnalysisModal = () => {
    setOpenAnalysisModal(true);
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // 일기장 get axios 연동 필요!!!

      // 연동 후 데이터 가공
      // response.data를 "2022-11-01 16:00"에 바로 넣어주자 - 변경 필요!!!
      setYear(new Date("2022-11-01 16:00").getFullYear());
      setMonth(new Date("2022-11-01 16:00").getMonth() + 1);
      setDate(new Date("2022-11-01 16:00").getDate());
      setDays(WEEKDAY[new Date("2022-11-01 16:00").getDay()]);

      let wakeup = moment(new Date("2022-11-01 08:00")).format("A h시 mm분");
      let sleep = moment(new Date("2022-11-01 22:00")).format("A h시 mm분");

      setDiary({
        id: 1,
        title: "가족 여행 간 날",
        emotion_happy: 0.6,
        emotion_sad: 0.3,
        emotion_angry: 0.1,
        drawing_image_path: "http://placeimg.com/300/200/people",
        weather: 3,
        feeling: 0,
        wakeupTime: wakeup,
        sleepTime: sleep,
        date: "2022-11-01 16:00",
        writing:
          "오늘은 가족여행 간 날이다. 너무너무 재미있었다. 다음에 또가용 꺄잇오늘은 가족여행 간 날이다. 너무너무 재미있었다. 다음에 또가용 꺄잇오늘은 가족여행 간 날이다. 너무너무 재미있었다. 다음에 또가용 꺄잇오늘은 가족여행 간 날이다. 너무너무 재미있었다. 다음에 또가용 꺄잇",
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
        <Grid
          container
          sx={{
            border: 3,
            borderRadius: "10px",
            borderColor: "secondary.main",
            backgroundColor: "white",
          }}
        >
          {/* 날짜 */}
          <Grid
            className="kidswriting"
            item
            xs={9}
            sx={{
              borderBottom: 3,
              borderColor: "secondary.main",
              padding: "3%",
            }}
          >
            <span>{year}</span> 년 <span>{month}</span> 월 <span>{date}</span> 일{" "}
            <span>{days}</span> 요일
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              borderBottom: 3,
              borderColor: "secondary.main",
              padding: "3% 2%",
              textalign: "center",
            }}
          >
            <Grid container sx={{ alignItems: "center" }}>
              {/* 날씨 */}
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                {diary.weather === 0 && <img src={sunny} width="30vh"></img>}
                {diary.weather === 1 && <img src={cloudy} width="30vh"></img>}
                {diary.weather === 2 && <img src={rainy} width="30vh"></img>}
                {diary.weather === 3 && <img src={snowy} width="30vh"></img>}
                {diary.weather === 4 && <img src={windy} width="30vh"></img>}
              </Grid>
              {/* 기분 */}
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                {diary.feeling === 0 && <img src={happy} width="30vh"></img>}
                {diary.feeling === 1 && <img src={sad} width="30vh"></img>}
                {diary.feeling === 2 && <img src={surprise} width="30vh"></img>}
                {diary.feeling === 3 && <img src={scary} width="30vh"></img>}
                {diary.feeling === 4 && <img src={angry} width="30vh"></img>}
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            {/* 어제 잠든 시간 */}
            <Grid
              item
              className="kidswriting"
              xs={6}
              sx={{
                borderBottom: 3,
                borderRight: 3,
                borderColor: "secondary.main",
                padding: "2% 2% 2% 4%",
                textAlign: "center",
                lineHeight: "25px",
                fontSize: "1.8vh",
              }}
            >
              어제 잠든 시간
              <div>{diary.sleepTime}</div>
            </Grid>
            {/* 오늘 일어난 시간 */}
            <Grid
              item
              className="kidswriting"
              xs={6}
              sx={{
                borderBottom: 3,
                borderColor: "secondary.main",
                padding: "2% 2% 2% 4%",
                textAlign: "center",
                lineHeight: "25px",
                fontSize: "1.8vh",
              }}
            >
              오늘 일어난 시간
              <div>{diary.wakeupTime}</div>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", padding: "4% 4% 0% 4%" }}>
            <img src={diary.drawing_image_path}></img>
          </Grid>
          <Grid
            className="content"
            item
            xs={12}
            sx={{ textalign: "center", padding: "0% 6% 2% 6%" }}
          >
            <p className="notes">{diary.writing}</p>
          </Grid>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button sx={{ marginTop: "8%" }} width="20vh" onClick={showAnalysisModal}>
            분석결과 보기
          </Button>
        </div>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
      {/* 삭제 완료 모달 */}
      <DeleteDiaryModal
        open={openDeleteModal}
        handleClose={closeDeleteModal}
        diaryid={diary.id}
      ></DeleteDiaryModal>
      {/* 분석 결과 모달 */}
      <AnalysisModal
        open={openAnalysisModal}
        handleClose={closeAnalysisModal}
        happy={diary.emotion_happy}
        sad={diary.emotion_sad}
        angry={diary.emotion_angry}
      ></AnalysisModal>
    </div>
  );
}
