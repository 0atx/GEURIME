/*
일기 수정 페이지
@author 조혜안
@since 2022.11.14
*/
import { useEffect, useRef, useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
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
import { http2 } from "api/http2";

export default function DetailDiary() {
  const params = useParams();
  const navigate = useNavigate();

  // 수정 모달
  const [modifyModal, setModifyModal] = useState(false);
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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
  async function modifyDiary() {
    // 파일 전송
    let formData = new FormData();
    formData.append("imageFile", diary.drawingImagePath);

    let info = {
      drawingId: diary.drawingId,
      drawingTitle: title,
      drawingDiary: content,
      drawingDiaryWeather: diary.drawingDiaryWeather,
      drawingDiaryFeeling: diary.drawingDiaryFeeling,
      drawingDiaryWakeUp: diary.drawingDiaryWakeUp,
      drawingDiarySleep: diary.drawingDiarySleep,
    };

    formData.append("request", new Blob([JSON.stringify(info)], { type: "application/json" }));

    const response = await http2
      .put(`/diaries/${diary.drawingId}`, formData)
      .then((response) => {
        setModifyModal(true);
      })
      .catch((error) => {
        if (error.response.data.code === "E012") {
          navigate("/norights");
        }
      });
  }

  // 일기 조회
  async function getDiary() {
    const response = await http
      .get(`/diaries/info/${params.diaryid}`)
      .then((response) => {
        const info = response.data.data;
        setDiary(info);

        // 연동 후 데이터 가공
        setYear(new Date(info.createTime).getFullYear());
        setMonth(new Date(info.createTime).getMonth() + 1);
        setDate(new Date(info.createTime).getDate());
        setDays(WEEKDAY[new Date(info.createTime).getDay()]);

        setWakeup(moment(info.drawingDiaryWakeUp).format("A h시 mm분"));
        setSleep(moment(info.drawingDiarySleep).format("A h시 mm분"));

        setTitle(info.drawingTitle);
        setContent(info.drawingDiary);
      })
      .catch((error) => {
        if (error.response.data.code === "E012") {
          navigate("/norights");
        }
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

  return (
    <div>
      {/* 헤더 */}
      <BackMenu isLeft={true} title="일기 수정" isRight="삭제" clickRight={deleteDiary}></BackMenu>
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
                {diary.drawingDiaryWeather === 0 && <img src={sunny} width="30vh"></img>}
                {diary.drawingDiaryWeather === 1 && <img src={cloudy} width="30vh"></img>}
                {diary.drawingDiaryWeather === 2 && <img src={rainy} width="30vh"></img>}
                {diary.drawingDiaryWeather === 3 && <img src={snowy} width="30vh"></img>}
                {diary.drawingDiaryWeather === 4 && <img src={windy} width="30vh"></img>}
              </Grid>
              {/* 기분 */}
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                {diary.drawingDiaryFeeling === 0 && <img src={happy} width="30vh"></img>}
                {diary.drawingDiaryFeeling === 1 && <img src={sad} width="30vh"></img>}
                {diary.drawingDiaryFeeling === 2 && <img src={surprise} width="30vh"></img>}
                {diary.drawingDiaryFeeling === 3 && <img src={scary} width="30vh"></img>}
                {diary.drawingDiaryFeeling === 4 && <img src={angry} width="30vh"></img>}
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

          <Grid item xs={12} sx={{ textAlign: "center", padding: "4% 4% 0% 4%" }}>
            <img src={diary.drawingImagePath} width="100%" style={{ borderRadius: "5%" }}></img>
          </Grid>
        </Grid>
        {/* 제목 */}
        <Grid
          container
          justifyContent="center"
          sx={{
            border: 3,
            borderRadius: "10px",
            borderColor: "secondary.main",
            backgroundColor: "white",
            alignItems: "center",
            padding: "5%",
            mt: 3,
          }}
        >
          <Grid item xs={2}>
            <Typography>제목</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="제목을 써주세요"
              variant="standard"
              //   size="small"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>내용</Typography>
          </Grid>
          <Grid item xs={10} sx={{ textalign: "center", mt: 3 }}>
            <TextField
              fullWidth
              multiline
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <div style={{ textAlign: "center" }}>
          <Button sx={{ marginTop: "8%" }} width="20vh" onClick={modifyDiary}>
            수정하기
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
      {/* 수정 모달 */}
      <Modal
        open={modifyModal}
        close={() => {
          setModifyModal(false);
        }}
        onClick={() => {
          navigate(`/diary`);
        }}
        text="수정이 완료되었습니다.😀"
        icon="ok"
      ></Modal>
    </div>
  );
}
