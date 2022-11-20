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

import { diaryState } from "states/DiaryState";
import { useRecoilState, useRecoilValue } from "recoil";

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

  // 전역에 담긴 일기 정보
  const [diaryInfo, setDiaryInfo] = useRecoilState(diaryState);

  // 탭 (직접 작성, 목소리로 작성) value
  const [tab, setTab] = useState(0);

  // 음성인식 시작
  const [startSpeech, setStartSpeech] = useState(false);
  // 음성인식 결과
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // 음성인식 작성한 글
  const [speech, setSpeech] = useState("");

  // 음성인식 작성 함수
  const handleSpeech = (event) => {
    setSpeech(event.target.value);
  };
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

  // 직접 작성 후 다음 버튼 클릭 시
  const addWriting = () => {
    navigate("/registdiary/drawing");

    setDiaryInfo((diary) => {
      const copyDiary = { ...diary };
      copyDiary.writing = writing;
      return { ...copyDiary };
    });
  };

  // 목소리로 작성 후 다음 버튼 클릭 시
  const addTranscript = () => {
    navigate("/registdiary/drawing");

    setDiaryInfo((diary) => {
      const copyDiary = { ...diary };
      copyDiary.writing = speech;
      return { ...copyDiary };
    });
  };

  return (
    <div>
      {/* 헤더 */}
      <BackMenu
        isLeft={true}
        title={diaryInfo.dateTitle}
        isRight="건너뛰기"
        clickRight={() => {
          navigate("/registdiary/drawing");
        }}
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
          하고 싶은 얘기가 있어?
        </Paper>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
              variant="fullWidth"
              textColor="secondary"
              indicatorColor="primary"
            >
              <Tab label="직접 작성" {...a11yProps(0)} />
              <Tab label="목소리로 작성" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {/* 직접 작성 탭 */}
          <TabPanel value={tab} index={0}>
            <Paper elevation={3}>
              <TextField
                id="outlined-multiline-static"
                inputProps={{ style: { fontSize: "2.5vh", lineHeight: "3vh" } }}
                sx={{ width: "100%" }}
                color="primary"
                focused
                multiline
                rows={12}
                value={writing}
                onChange={handleWriting}
              />
            </Paper>
            {/* 다시쓰기, 다음 버튼 */}
            <div style={{ textAlign: "right", marginTop: "10%" }}>
              <Button
                bgcolor="#fff4ce"
                onClick={() => {
                  setWriting("");
                }}
                sx={{ width: "100px", marginRight: "5%" }}
              >
                다시 쓰기
              </Button>

              <Button width="100px" onClick={addWriting}>
                다음
              </Button>
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
                      fontSize: "6vh",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      SpeechRecognition.stopListening();
                      setStartSpeech(false);
                      // setSpeech(speech + transcript);
                      let txtArea = document.getElementById("text");
                      let txtValue = txtArea.value; // 기존에 입력된 문자값 전체
                      let selectPos = txtArea.selectionStart; // 커서 위치 앞 문자 공백 0부터 카운터 하여 숫자 반환
                      let beforeTxt = txtValue.substring(0, selectPos); // 기존텍스트부터 ~ 커서[시작점] 까지의 문자
                      let afterTxt = txtValue.substring(txtArea.selectionEnd, txtValue.length); // 커서[끝지점]부터~ 기존텍스트 까지의문자

                      txtArea.value = beforeTxt + transcript + afterTxt; // 커스에 문자 추가하여 전체 조합
                      selectPos = selectPos + transcript.length;
                      txtArea.selectionStart = selectPos; // 커서 시작점을 추가 삽입된 텍스트 이후로 지정
                      txtArea.selectionEnd = selectPos; // 커서 끝지점을 추가 삽입된 텍스트 이후로 지정
                      setSpeech(txtArea.value);
                    }}
                  />
                  <Typography sx={{ fontSize: "2vh", color: "#6F6F6F" }}>끝내기</Typography>
                </div>
              ) : (
                // 음성 인식 해제된 상태 (음성인식 시작 버튼)
                <div style={{ textAlign: "center" }}>
                  <MicRoundedIcon
                    sx={{
                      color: "#FFA000",
                      backgroundColor: "#fff4ce",
                      fontSize: "6vh",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      resetTranscript();
                      SpeechRecognition.startListening({ continuous: true, language: "ko" });
                      setStartSpeech(true);
                    }}
                  />
                  <Typography sx={{ fontSize: "2vh", color: "#6F6F6F" }}>시작하기</Typography>
                </div>
              )}
            </div>
            <Paper elevation={3} sx={{ marginTop: "5%" }}>
              <TextField
                inputProps={{ style: { fontSize: "2vh", lineHeight: "3vh" } }}
                id="outlined-multiline-static"
                placeholder="음성인식이 나타나는 영역이에요."
                sx={{
                  width: "100%",
                }}
                multiline
                rows={2}
                disabled
                value={transcript}
              />
            </Paper>

            <Paper elevation={3} sx={{ marginTop: "5%" }}>
              <TextField
                inputProps={{
                  style: { fontSize: "2.5vh", lineHeight: "3vh" },
                }}
                id="text"
                color="primary"
                focused
                sx={{
                  width: "100%",
                }}
                multiline
                rows={12}
                value={speech}
                onChange={handleSpeech}
              />
            </Paper>
            {/* 다시쓰기, 다음 버튼 */}
            <div style={{ textAlign: "right", marginTop: "10%" }}>
              <Button
                bgcolor="#fff4ce"
                onClick={handleSpeech}
                sx={{ width: "100px", marginRight: "5%" }}
              >
                다시 쓰기
              </Button>

              <Button width="100px" onClick={addTranscript}>
                다음
              </Button>
            </div>
          </TabPanel>
        </Box>
      </Container>

      {/* 네비 바 */}
      <NavBar></NavBar>
    </div>
  );
}
