/*
내 프로필 변경 페이지
@author 조혜안
@since 2022.11.04
*/

import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Radio,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Input,
  TextField,
} from "@mui/material";
import Btn from "components/common/Btn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { http2 } from "api/http2";
import axios from "axios";
import Modal from "components/common/Modal";
import NavBar from "components/nav/NavBar";
import { http } from "api/http";

export default function ModifyUserInfo() {
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 모달
  const [openNick, setOpenNick] = useState(false);
  const [openFam, setOpenFam] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [openBirth, setOpenBirth] = useState(false);
  const [openModify, setOpenModify] = useState(false);

  // 이미지 미리보기를 위한 함수
  function changeProfile() {
    const reader = new FileReader();
    const img = imgRef.current.files[0];

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }

  // 회원가입 axios 함수
  async function modifyUser() {
    // 닉네임 검사
    if (nickname == "") {
      setOpenNick(true);
      return;
    }
    // 가족이름 검사
    if (famname == "") {
      setOpenFam(true);
      return;
    }
    // 생년월일 검사
    if (isBirth(birth)) {
      let newBirth = birth;
      let inputYear = birth.substr(0, 4);
      newBirth =
        birth.substr(0, 4) +
        "-" +
        newBirth.substr(4, 2) +
        "-" +
        newBirth.substr(6, 2);

      // isChild 계산하기
      let today = new Date();
      let isAdult = true;
      if (Number(today.getFullYear()) - Number(inputYear) > 20) {
        isAdult = true;
      } else {
        isAdult = false;
      }

      // 사진
      let file = imgRef.current.files[0];
      let formData = new FormData();
      formData.append("imageFile", file);

      // 유저정보
      let user = {
        familyName: famname,
        isChild: !isAdult,
        nickname: nickname,
        userBirth: newBirth,
        userGender: gender,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(user)], {
          type: "application/json",
        })
      );

      if (file !== undefined) {
        changeProfile();
      }

      // axios
      const response = await http2.put(`/users/${userInfo.userId}`, formData);

      // state 갱신
      setUserInfo((info) => {
        const copyUserInfo = { ...info };
        copyUserInfo.userProfileImage = response.data.data.userProfileImage;
        copyUserInfo.userBirth = birth;
        copyUserInfo.nickname = nickname;
        copyUserInfo.familyName = famname;
        copyUserInfo.isChild = !isAdult;
        console.log(copyUserInfo);
        return { ...copyUserInfo };
      });
    }
  }

  // 생년월일 검사 함수
  function isBirth(date) {
    if (date.length < 8) {
      // 8자리가 아닌 경우 리턴
      return false;
    }

    let year = Number(date.substr(0, 4));
    let month = Number(date.substr(4, 2));
    let day = Number(date.substr(6, 2));

    let today = new Date();
    let yearNow = today.getFullYear();

    if (date.length <= 8) {
      if (1900 > year || year > yearNow) {
        // 1900년 이하 올해 이상인 경우
        return false;
      } else if (month < 1 || month > 12) {
        // 1월 미만 12월 초과인 경우
        return false;
      } else if (day < 1 || day > 31) {
        // 1일 미만 31일 초과인 경우
        return false;
      } else if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day === 31
      ) {
        // 4, 6, 9, 11월에 31일인경우
        return false;
      } else if (month === 2) {
        // 2월일 때 윤년 계산
        var isleap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        if (day > 29 || (day === 29 && !isleap)) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  const [user, setUser] = useState({});
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [nickname, setNickname] = useState("");
  const [famname, setFamname] = useState("");

  async function getMyInfo() {
    // axios 연동
    const response = await http.get(`/users/${userInfo.userId}`);

    let info = response.data.data;
    setUser(info);
    setImageUrl(info.userProfileImage);
    setGender(info.userGender);
    let str =
      info.userBirth.slice(0, 4) +
      info.userBirth.slice(5, 7) +
      info.userBirth.slice(8, 10);
    setBirth(str);
    setNickname(info.nickname);
    setFamname(info.familyName);
  }

  useEffect(() => {
    // 내 정보 가져오기
    getMyInfo();
  }, []);

  return (
    <Grid>
      {/* 헤더 */}
      <BackMenu
        isLeft
        title="내 프로필 변경"
        isRight="수정"
        clickRight={() => {
          modifyUser();
          setOpenModify(true);
        }}
      />
      <Grid id="container">
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "4vh" }}
        >
          <Grid item xs={3} sx={{ marginBottom: "1vh", textAlign: "center" }}>
            {imageUrl ? (
              <Avatar src={imageUrl} sx={{ width: 100, height: 100 }} />
            ) : (
              <AccountCircleIcon color="primary" sx={{ fontSize: 100 }} />
            )}
          </Grid>
          <Grid item xs={12} sx={{ fontSize: "2vh", color: "#FFA000" }}>
            <label htmlFor="profile">
              <div>프로필 사진 변경</div>
            </label>
            <div>
              <form method="post" encType="multipart/form-data">
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={imgRef}
                  onChange={(e) => {
                    changeProfile(e);
                  }}
                  accept="image/*"
                  id="profile"
                />
              </form>
            </div>
          </Grid>
        </Grid>
        {/* 이름 */}
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "3vh" }}
        >
          <Grid
            item
            xs={10}
            sx={{ fontSize: "2.3vh", marginBottom: "2vh", color: "#6F6F6F" }}
          >
            이름
          </Grid>
          <Grid item xs={10} sx={{ fontSize: "2.5vh" }}>
            {user.userName}
          </Grid>
        </Grid>
        {/* 성별 */}
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "3vh" }}
        >
          <Grid
            item
            xs={10}
            sx={{ fontSize: "2.3vh", marginBottom: "2vh", color: "#6F6F6F" }}
          >
            성별
          </Grid>
          <Grid item xs={10} sx={{ fontSize: "2.5vh" }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                color="secondary"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                sx={{
                  fontSize: "2.5vh",
                }}
                value={gender}
              >
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label={<Typography variant="h5">남</Typography>}
                />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label={<Typography variant="h5">여</Typography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {/* 생년월일 */}
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "4vh" }}
        >
          <Grid
            item
            xs={10}
            sx={{ fontSize: "2.3vh", marginBottom: "3vh", color: "#6F6F6F" }}
          >
            생년월일
          </Grid>
          <Grid item xs={10} sx={{ fontSize: "2.5vh" }} justifyContent="center">
            <TextField
              variant="standard"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              placeholder="ex) 19970717"
              inputProps={{
                style: {
                  fontSize: "2.5vh",
                },
              }}
            />
          </Grid>
        </Grid>
        {/* 닉네임 */}
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "3vh" }}
        >
          <Grid
            item
            xs={10}
            sx={{ fontSize: "2.3vh", marginBottom: "1vh", color: "#6F6F6F" }}
          >
            닉네임
          </Grid>
          {/* todo: 캘린더 클릭 후 닉네임 바뀌는 것 수정 필요 */}
          <Grid item xs={10}>
            <TextField
              variant="standard"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              inputProps={{
                style: {
                  fontSize: "2.5vh",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* 가족이름 */}
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "3vh" }}
        >
          <Grid
            item
            xs={10}
            sx={{ fontSize: "2.3vh", marginBottom: "1vh", color: "#6F6F6F" }}
          >
            가족 이름
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              value={famname}
              onChange={(e) => {
                setFamname(e.target.value);
              }}
              inputProps={{
                style: {
                  fontSize: "2.5vh",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* 닉네임 입력부탁 모달 */}
      <Modal
        open={openNick}
        close={() => {
          setOpenNick(false);
        }}
        onClick={() => {
          setOpenNick(false);
        }}
        text="닉네임을 입력해주세요!"
        icon="error"
      ></Modal>
      {/* 가족이름 입력부탁 모달 */}
      <Modal
        open={openFam}
        close={() => {
          setOpenFam(false);
        }}
        onClick={() => {
          setOpenFam(false);
        }}
        text="가족이름을 입력해주세요!"
        icon="error"
      ></Modal>
      {/* 회원정보 등록 실패 모달 */}
      <Modal
        open={openFail}
        close={() => {
          setOpenFail(false);
        }}
        onClick={() => {
          setOpenFail(false);
        }}
        text="회원정보 등록에 실패했습니다. 다시 입력해주세요!"
        icon="error"
      ></Modal>
      {/* 생년월일 입력부탁 모달 */}
      <Modal
        open={openBirth}
        close={() => {
          setOpenBirth(false);
        }}
        onClick={() => {
          setOpenBirth(false);
        }}
        text="올바른 생년월일을 입력해주세요!"
        icon="error"
      ></Modal>
      {/* 회원정보 수정 완료 모달 */}
      <Modal
        open={openModify}
        onClick={() => {
          setOpenModify(false);
          navigator("/settings");
        }}
        text="수정이 완료되었습니다!😀"
        icon="ok"
      ></Modal>
      {/* 하단 네비 */}
      <NavBar />
    </Grid>
  );
}
