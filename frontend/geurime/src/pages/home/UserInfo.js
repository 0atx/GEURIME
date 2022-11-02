import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Radio,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Input,
} from "@mui/material";
import Btn from "components/common/Btn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { http2 } from "api/http2";
import axios from "axios";

export default function UserInfo() {
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 닉네임
  const nickNameInput = useRef(null);

  //가족이름
  const familyNameInput = useRef(null);

  // 생년월일
  const birthYearInput = useRef(null);

  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      // 화면에 읽힐 수 있는 url로 변경
      setImageUrl(reader.result);
    };
  }
  // todo: 이미지 파일 더미 수정하기
  async function registUser() {
    // 닉네임 검사
    if (nickNameInput.current.value == "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    // 가족이름 검사
    if (familyNameInput.current.value == "") {
      alert("가족이름을 입력해주세요.");
      return;
    }
    // 생년월일 검사
    if (isBirth(birthYearInput.current.value)) {
      let birth = birthYearInput.current.value;
      birth =
        birth.substr(0, 4) +
        "-" +
        birth.substr(4, 2) +
        "-" +
        birth.substr(6, 2);
      // todo: isChild 계산하기
      // axios

      // 사진
      let file = imgRef.current.files[0];
      console.log(file);
      let formData = new FormData();
      formData.append("imageFile", file);

      // 유저정보
      // todo: nickNname 으로 변경하기
      let user = {
        familyName: familyNameInput.current.value,
        isChild: true,
        nickname: nickNameInput.current.value,
        userBirth: birth,
        userGender: userInfo.userGender,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(user)], {
          type: "application/json",
        })
      );

      const response = await http2.post(`/users/${userInfo.userID}`, formData);

      // 성공하면 state에 가족 아이디를 저장
      if (response.data.message == "success") {
        let copy = { ...userInfo };
        copy.familyId = response.data.data.familyId;
        setUserInfo(copy);
        navigator("/registkids");
      } else {
        alert("회원 정보 등록에 실패했습니다. 다시 입력해주세요.");
      }
    } else {
      alert("올바른 생년월일을 입력하세요.");
      return;
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
        (month == 4 || month == 6 || month == 9 || month == 11) &&
        day == 31
      ) {
        // 4, 6, 9, 11월에 31일인경우
        return false;
      } else if (month == 2) {
        // 2월일 때 윤년 계산
        var isleap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        if (day > 29 || (day == 29 && !isleap)) {
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
  return (
    <Grid>
      <BackMenu isLeft="false" title="정보 입력" />
      <Grid id="container2">
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
              <AccountCircleIcon color="action" sx={{ fontSize: 100 }} />
            )}
          </Grid>
          <Grid item xs={12} sx={{ fontSize: "2vh", color: "#FFA000" }}>
            <label for="profile">
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
                  accept="img/*"
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
            sx={{ fontSize: "2.5vh", marginBottom: "2vh", color: "#6F6F6F" }}
          >
            이름
          </Grid>
          <Grid item xs={10} sx={{ fontSize: "2.5vh" }}>
            {userInfo.userName}
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
            sx={{ fontSize: "2.5vh", marginBottom: "2vh", color: "#6F6F6F" }}
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
                  let copy = { ...userInfo };
                  copy.userGender = e.target.value;
                  setUserInfo(copy);
                }}
                sx={{
                  fontSize: "2.5vh",
                }}
                value={
                  userInfo.userGender == "F"
                    ? "F"
                    : userInfo.userGender == "M"
                    ? "M"
                    : null
                }
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
            sx={{ fontSize: "2.5vh", marginBottom: "3vh", color: "#6F6F6F" }}
          >
            생년월일
          </Grid>
          <Grid item xs={10} sx={{ fontSize: "2.5vh" }} justifyContent="center">
            <Input
              inputRef={birthYearInput}
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
            sx={{ fontSize: "2.5vh", marginBottom: "1vh", color: "#6F6F6F" }}
          >
            닉네임
          </Grid>
          {/* todo: 캘린더 클릭 후 닉네임 바뀌는 것 수정 필요 */}
          <Grid item xs={10}>
            <Input
              inputRef={nickNameInput}
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
            sx={{ fontSize: "2.5vh", marginBottom: "1vh", color: "#6F6F6F" }}
          >
            가족 이름
          </Grid>
          <Grid item xs={10}>
            <Input
              inputRef={familyNameInput}
              inputProps={{
                style: {
                  fontSize: "2.5vh",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Btn
            onClick={() => {
              registUser();
            }}
            sx={{ marginBottom: "2vh", marginTop: "1.5vh", marginRight: "3vh" }}
          >
            다음
          </Btn>
        </Grid>
      </Grid>
    </Grid>
  );
}
