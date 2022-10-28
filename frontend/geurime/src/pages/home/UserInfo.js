import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  TextField,
  Avatar,
  Dialog,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import Btn from "components/common/Btn";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
// 달력
import Calendar from "react-calendar";
import "pages/diary/Calendar.css";
import moment from "moment";

export default function UserInfo() {
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 닉네임
  const nickNameInput = useRef(null);
  const [nickNameValue, setNickNameValue] = useState();

  //가족이름
  const familyNameInput = useRef(null);
  const [familyNameValue, setFamilyNameValue] = useState();

  // 생일
  const birthInput = useRef();
  const [birthValue, setBirthValue] = useState();
  const [today, setToday] = useState();
  // 캘린더 열기
  const [calOpen, setCalOpen] = useState(false);
  // 캘린더 날짜 변경
  function onChange(e) {
    setToday(e);
  }

  function changeDate() {
    birthInput.current.value = dateFormat();
    console.log(birthInput.current.value);
    setBirthValue(birthInput.current.value);
  }

  function dateFormat() {
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let year = today.getFullYear();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  }

  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }

  function registUser() {
    console.log(userInfo);
    //todo: 사진 전송 변경 필요
    // const formdata = new FormData();
    // formdata.append("img", images[0]);
    // const config = {
    //   Headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // const reesponse = axios.post('url', formdata, config);
    // navigator("/registkids");
  }

  const StyledTextField = styled(TextField)(() => ({
    "& fieldset": {
      borderRadius: "40px",
      height: "7vh",
    },
    "& label.Mui-focused": {
      color: "#FFCA28",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFCA28",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFCA28",
      },
    },
  }));
  // todo: axios
  return (
    <Grid id="container">
      {/* 캘린더 모달 */}
      <Dialog
        onClose={() => {
          setCalOpen(false);
        }}
        open={calOpen}
      >
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
          value={today}
        />
        <DialogActions sx={{ marginBottom: "10px" }}>
          <Btn
            onClick={() => {
              changeDate();
              console.log(nickNameValue);
              console.log(familyNameValue);
              setCalOpen(false);
            }}
          >
            확인
          </Btn>
        </DialogActions>
      </Dialog>
      <BackMenu isLeft="false" title="정보 입력"></BackMenu>
      <Grid
        container
        justifyContent="center"
        textAlign="center"
        sx={{ marginBottom: "3vh", marginTop: "9vh" }}
      >
        <Grid item xs={3} sx={{ marginBottom: "1vh", textAlign: "center" }}>
          {imageUrl ? (
            <Avatar src={imageUrl} sx={{ width: 100, height: 100 }} />
          ) : (
            <AccountCircleIcon color="action" sx={{ fontSize: 100 }} />
          )}
        </Grid>
        <Grid item xs={12} sx={{ fontSize: "2.7vh", color: "#FFA000" }}>
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
          sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}
        >
          이름
        </Grid>
        <Grid item xs={10} sx={{ fontSize: "2.7vh" }}>
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
          sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}
        >
          성별
        </Grid>
        <Grid item xs={10} sx={{ fontSize: "2.7vh" }}>
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
                fontSize: "3vh",
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
          sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}
        >
          닉네임
        </Grid>
        {/* todo: 캘린더 클릭 후 닉네임 바뀌는 것 수정 필요 */}
        <Grid item xs={10}>
          <StyledTextField
            size="small"
            inputRef={nickNameInput}
            InputProps={{ style: { fontSize: "3vh" } }}
          />
        </Grid>
      </Grid>
      {/* 생년월일 */}
      <Grid
        container
        justifyContent="center"
        textAlign="center"
        sx={{ marginBottom: "3vh" }}
      >
        <Grid
          item
          xs={10}
          sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}
        >
          생년월일
        </Grid>
        <Grid item xs={10}>
          <StyledTextField
            size="small"
            inputRef={birthInput}
            onClick={() => {
              setNickNameValue(nickNameInput.current.value);
              setFamilyNameValue(familyNameInput.current.value);
              setCalOpen(true);
            }}
            value={birthValue}
            InputProps={{ style: { fontSize: "3vh" } }}
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
          sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}
        >
          가족 이름
        </Grid>
        <Grid item xs={10}>
          <StyledTextField
            size="small"
            inputRef={familyNameInput}
            InputProps={{ style: { fontSize: "3vh" } }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Btn
          onClick={() => {
            registUser();
          }}
          sx={{ marginBottom: "3vh", marginTop: "2vh", marginRight: "3vh" }}
        >
          다음
        </Btn>
      </Grid>
    </Grid>
  );
}
