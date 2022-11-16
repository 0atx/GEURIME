/*
일기 상세 조회 페이지
@author 조혜안
@since 2022.11.01
*/
import { useEffect, useRef, useState } from "react";
import { Container, Grid, IconButton, Typography } from "@mui/material";
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
import { http } from "api/http";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "components/common/Modal";
import { useRecoilState } from "recoil";
import { registState } from "states/RegistState";

// 캡처
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default function DetailDiary() {
  const params = useParams();
  const navigate = useNavigate();

  // 삭제완료 모달
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // 분석결과 모달
  const [openAnalysisModal, setOpenAnalysisModal] = useState(false);
  // 분석진행중 모달
  const [openStillModal, setStillModal] = useState(false);

  // 일기 정보
  const [diary, setDiary] = useState({});

  const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토", "일"];
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState(""); // 요일

  const [wakeup, setWakeup] = useState("");
  const [sleep, setSleep] = useState("");

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

  // 일기장 수정 함수
  const modifyDiary = () => {
    navigate(`/modifydetaildiary/${params.diaryid}`);
  };

  // 분석결과 함수
  const showAnalysisModal = () => {
    setOpenAnalysisModal(true);
  };

  // 일기 조회
  async function getDiary() {
    const response = await http.get(`/diaries/info/${params.diaryid}`);
    const info = response.data.data;
    getBase64(info.drawingImagePath).then((a) => {
      info.drawingImagePath = a;
    });

    setDiary(info);
    console.log(info);

    // 연동 후 데이터 가공
    setYear(new Date(info.createTime).getFullYear());
    setMonth(new Date(info.createTime).getMonth() + 1);
    setDate(new Date(info.createTime).getDate());
    setDays(WEEKDAY[new Date(info.createTime).getDay()]);

    setWakeup(moment(info.drawingDiaryWakeUp).format("A h시 mm분"));
    setSleep(moment(info.drawingDiarySleep).format("A h시 mm분"));
  }

  async function getBase64(url) {
    const data = await fetch(url);
    const blob = await data.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getDiary();
    }
  }, []);

  // 분석 완료 여부 정보
  const [registInfo, setRegistInfo] = useRecoilState(registState);
  // 분석 완료시 정보 저장
  useEffect(() => {
    getDiary();
  }, [registInfo]);

  // 일기장 캡처 함수
  const cardRef = useRef();

  function capture() {
    const card = cardRef.current;
    domtoimage.toBlob(card).then((blob) => {
      saveAs(blob, "diary.png");
    });
  }

  return (
    <div>
      {/* 헤더 */}
      <BackMenu
        isLeft={true}
        title={diary.drawingTitle}
        isRight="수정"
        clickRight={modifyDiary}
      ></BackMenu>
      <Container id="container">
        {/* 일기장 */}
        <Grid
          ref={cardRef}
          id="diary"
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
            <span>{year}</span> 년 <span>{month}</span> 월 <span>{date}</span>{" "}
            일 <span>{days}</span> 요일
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
                {diary.drawingDiaryWeather === 0 && (
                  <img src={sunny} width="30vh"></img>
                )}
                {diary.drawingDiaryWeather === 1 && (
                  <img src={cloudy} width="30vh"></img>
                )}
                {diary.drawingDiaryWeather === 2 && (
                  <img src={rainy} width="30vh"></img>
                )}
                {diary.drawingDiaryWeather === 3 && (
                  <img src={snowy} width="30vh"></img>
                )}
                {diary.drawingDiaryWeather === 4 && (
                  <img src={windy} width="30vh"></img>
                )}
              </Grid>
              {/* 기분 */}
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                {diary.drawingDiaryFeeling === 0 && (
                  <img src={happy} width="30vh"></img>
                )}
                {diary.drawingDiaryFeeling === 1 && (
                  <img src={sad} width="30vh"></img>
                )}
                {diary.drawingDiaryFeeling === 2 && (
                  <img src={surprise} width="30vh"></img>
                )}
                {diary.drawingDiaryFeeling === 3 && (
                  <img src={scary} width="30vh"></img>
                )}
                {diary.drawingDiaryFeeling === 4 && (
                  <img src={angry} width="30vh"></img>
                )}
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
              <div>{sleep}</div>
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
              <div>{wakeup}</div>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ textAlign: "center", padding: "4% 4% 0% 4%" }}
          >
            <img
              src={diary.drawingImagePath}
              width="100%"
              style={{ borderRadius: "5%" }}
            ></img>
          </Grid>
          <Grid
            className="content"
            item
            xs={12}
            sx={{ textalign: "center", padding: "0% 6% 2% 6%" }}
          >
            <p className="notes">{diary.drawingDiary}</p>
          </Grid>
        </Grid>
        <div style={{ textAlign: "center" }}>
          {registInfo.state == false ? (
            <Button
              sx={{ marginTop: "8%" }}
              width="20vh"
              onClick={showAnalysisModal}
            >
              분석결과 보기
            </Button>
          ) : (
            <Button
              bgcolor="#D4D4D4"
              sx={{ marginTop: "8%" }}
              width="20vh"
              onClick={showAnalysisModal}
            >
              분석중입니다..
            </Button>
          )}

          <Button
            sx={{ marginTop: "8%" }}
            width="15vh"
            onClick={capture}
            bgcolor="#FFCA28"
          >
            다운로드
          </Button>
        </div>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
      {/* 삭제 완료 모달 */}
      <DeleteDiaryModal
        open={openDeleteModal}
        handleClose={closeDeleteModal}
        diaryid={diary.drawingId}
      ></DeleteDiaryModal>
      {/* 분석 결과 모달 */}
      {registInfo.state == true ? (
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
          happy={diary.emotionHappy}
          sad={diary.emotionSad}
          angry={diary.emotionAngry}
        ></AnalysisModal>
      )}
    </div>
  );
}
