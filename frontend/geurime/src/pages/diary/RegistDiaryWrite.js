/*
일기 등록 - 글 작성 페이지
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
import Button from "components/common/Btn.js";
import styled from "styled-components";
// timepicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TimePicker from "react-time-picker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { CalendarPicker, koKR } from "@mui/x-date-pickers";
import koLocale from "date-fns/locale/bg";
// three.js
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

export default function RegistDiary({}) {
  // 선택 날짜 타이틀 - recoil에서 받아온 날짜로 변경 필요!!!
  const [title, setTitle] = useState(
    new Date().getMonth() + 1 + "월 " + new Date().getDate() + "일 일기"
  );

  const navigate = useNavigate();

  return (
    <div>
      <Container id="container">
        {/* 헤더 */}
        <BackMenu
          isLeft={true}
          title={title}
          isRight="건너뛰기"
          clickRight={() => {
            navigate("/registdiary/drawing");
          }}
        ></BackMenu>
      </Container>
      {/* 네비 바 */}
      <NavBar></NavBar>
    </div>
  );
}
