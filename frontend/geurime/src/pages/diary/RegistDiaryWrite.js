/*
일기 등록 - 글 작성 페이지
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
  Tabs,
  Tab,
  Box,
  useStepperContext,
} from "@mui/material";
import PropTypes from "prop-types";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { useSpeechRecognition } from "react-speech-kit";
import CheckIcon from "@mui/icons-material/Check";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "components/common/Btn";
import { useNavigate, Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RegistDiary({}) {
  const navigate = useNavigate();

  // 선택 날짜 타이틀 - recoil에서 받아온 날짜로 변경 필요!!!
  const [title, setTitle] = useState(
    new Date().getMonth() + 1 + "월 " + new Date().getDate() + "일 일기"
  );

  // 탭 (직접 작성, 목소리로 작성) value
  const [tab, setTab] = useState(0);

  // 음성인식 시작
  const [startSpeech, setStartSpeech] = useState(false);

  // 음성인식 결과
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // 직접 작성한 글
  const [writing, setWriting] = useState("");

  // 직접 작성 함수
  const handleWriting = (event) => {
    setWriting(event.target.value);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성인식을 지원하지 않습니다.</span>;
  }

  // 탭 변경
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      {/* 헤더 */}
      <BackMenu
        isLeft={true}
        title={title}
        isRight="건너뛰기"
        clickRight={() => {
          navigate("/registdiary/drawing");
        }}
      ></BackMenu>
      <Container id="container">
        <Paper
          sx={{
            fontSize: "2.7vh",
            color: "#6F6F6F",
            textAlign: "center",
            padding: "4% 0% 4% 0%",
            marginBottom: "5%",
            backgroundColor: "#fff4ce",
            borderRadius: "40px",
          }}
        >
          하고 싶은 얘기가 있어?
        </Paper>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
              variant="fullWidth"
              indicatorColor="primary"
            >
              <Tab
                label="직접 작성"
                {...a11yProps(0)}
                sx={{
                  fontSize: "2.5vh",
                }}
              />
              <Tab label="목소리로 작성" {...a11yProps(1)} sx={{ fontSize: "2.5vh" }} />
            </Tabs>
          </Box>
          {/* 직접 작성 탭 */}
          <TabPanel value={tab} index={0}>
            <Paper elevation={3}>
              <TextField
                id="outlined-multiline-static"
                inputProps={{ style: { fontSize: "3vh" } }}
                sx={{ width: "100%" }}
                multiline
                rows={12}
                value={writing}
                onChange={handleWriting}
              />
            </Paper>
            <div style={{ textAlign: "right", marginTop: "5%" }}>
              <Button
                bgcolor="#fff4ce"
                onClick={() => {
                  setWriting("");
                }}
                sx={{ width: "100px", marginRight: "5%" }}
              >
                다시 쓰기
              </Button>
              <Link to="/registdiary/write" style={{ textDecoration: "none" }}>
                <Button width="100px">다음</Button>
              </Link>
            </div>
          </TabPanel>
          {/* 목소리로 작성 탭 */}
          <TabPanel value={tab} index={1}>
            <div>
              {listening ? (
                // 음성 인식 중인 상태 (음성인식 끝내기 버튼)
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <MicOffRoundedIcon
                    sx={{
                      color: "#FFA000",
                      backgroundColor: "#fff4ce",
                      fontSize: "8vh",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      SpeechRecognition.stopListening();
                      setStartSpeech(false);
                    }}
                  />
                  <Typography sx={{ fontSize: "3vh", color: "#6F6F6F" }}>끝내기</Typography>
                </div>
              ) : (
                // 음성 인식 해제된 상태 (음성인식 시작 버튼)
                <div style={{ textAlign: "center" }}>
                  <MicRoundedIcon
                    sx={{
                      color: "#FFA000",
                      backgroundColor: "#fff4ce",
                      fontSize: "8vh",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      SpeechRecognition.startListening({ continuous: true, language: "ko" });
                      setStartSpeech(true);
                    }}
                  />
                  <Typography sx={{ fontSize: "3vh", color: "#6F6F6F" }}>시작하기</Typography>
                </div>
              )}
            </div>
            <Paper elevation={3} sx={{ marginTop: "5%" }}>
              <TextField
                inputProps={{
                  style: { fontSize: "3vh", color: "#ffffff" },
                }}
                id="outlined-multiline-static"
                sx={{
                  width: "100%",
                }}
                multiline
                disabled
                rows={12}
                value={transcript}
              />
            </Paper>
            <div style={{ textAlign: "right", marginTop: "5%" }}>
              <Button
                bgcolor="#fff4ce"
                onClick={resetTranscript}
                sx={{ width: "100px", marginRight: "5%" }}
              >
                다시 쓰기
              </Button>
              <Link to="/registdiary/write" style={{ textDecoration: "none" }}>
                <Button width="100px">다음</Button>
              </Link>
            </div>
          </TabPanel>
        </Box>
      </Container>

      {/* 네비 바 */}
      <NavBar></NavBar>
    </div>
  );
}
