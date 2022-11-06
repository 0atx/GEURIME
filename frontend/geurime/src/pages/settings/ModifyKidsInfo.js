/*
자녀 프로필 수정 페이지
@author 조혜안
@since 2022.11.04
*/
import Button from "components/common/Btn.js";
import BackMenu from "components/nav/BackMenu";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  Avatar,
  Input,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  MenuItem,
  Select,
  ListItemAvatar,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { http2 } from "api/http2";
import { useRef, useState } from "react";
import Btn from "components/common/Btn";
import Modal from "components/common/Modal";

import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import NavBar from "components/nav/NavBar";
import { http } from "api/http";
import KidsInfoModal from "components/modal/KidsInfoModal";

export default function ModifyKidsInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const kidsNameInput = useRef(null); // 아이이름
  const kidsBirthInput = useRef(null); // 생년월일
  const [kidsGender, setKidsGender] = useState(null); // 성별

  // 모달
  const [openRegist, setOpenRegist] = useState(false);
  const [openKidName, setOpenKidName] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [openBirth, setOpenBirth] = useState(false);

  // 프로필
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();

  // 프로필 미리보기
  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }

  // 수정 axios 연동 필요!!!
  async function modifyKid() {
    // 닉네임 검사
    if (kidsNameInput.current.value == "") {
      setOpenKidName(true);
      return;
    }
    // 생년월일 검사
    if (isBirth(kidsBirthInput.current.value)) {
      let birth = kidsBirthInput.current.value;
      birth =
        birth.substr(0, 4) +
        "-" +
        birth.substr(4, 2) +
        "-" +
        birth.substr(6, 2);

      // 파일 전송
      let file = imgRef.current.files[0];
      let formData = new FormData();
      formData.append("imageFile", file);

      // 아이 정보 전송
      //todo: 아이 성별 추가 필요

      let kidsInfo = {
        familyId: userInfo.familyId,
        kidBirth: birth,
        kidName: kidsNameInput.current.value,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(kidsInfo)], { type: "application/json" })
      );

      const response = await http2.post(`/kids`, formData);

      let kidInfo = response.data.data;

      if (response.data.message === "success") {
        let copy = { ...userInfo };
        let copyKid = [...userInfo.kidDtoList];
        copyKid.push({
          kidBirth: kidInfo.kidBirth,
          kidProfileImage: kidInfo.kidProfileImage,
          kidName: kidsNameInput.current.value,
          kidid: kidInfo.kidId,
        });
        copy.kidDtoList = copyKid;
        setUserInfo(copy);
        setImageUrl("");
      } else {
        setOpenFail(true);
      }

      // axios
    } else {
      setOpenBirth(true);
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

  // 아이들 전체 정보
  const [kidsList, setKidsList] = useState([]);
  // 선택한 아이의 value값
  const [selectKid, setSelectKid] = useState(0);
  // 선택한 아이의 정보
  const [selectKidInfo, setSelectKidInfo] = useState({});
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");

  // 아이 선택 시
  const handleChange = (e) => {
    setSelectKid(e.target.value);

    setImageUrl(kidsList[e.target.value].kidProfileImage);
    setName(kidsList[e.target.value].kidName);
    // setGender(kidsList[e.target.value].) // 젠더가 업네...?
    let str =
      kidsList[e.target.value].kidBirth.slice(0, 4) +
      kidsList[e.target.value].kidBirth.slice(5, 7) +
      kidsList[e.target.value].kidBirth.slice(8, 10);
    setBirth(str);
  };

  async function getUserInfo() {
    const response = await http.get(`/users/${userInfo.userId}`);
    // console.log(response.data);
    let info = response.data.data;
    setKidsList(info.kidDtoList);
    setSelectKidInfo(info.kidDtoList[0]);

    setImageUrl(info.kidDtoList[0].kidProfileImage);
    setName(info.kidDtoList[0].kidName);
    // setGender(info.kidDtoList[0].) // 젠더가 업네...?
    let str =
      info.kidDtoList[0].kidBirth.slice(0, 4) +
      info.kidDtoList[0].kidBirth.slice(5, 7) +
      info.kidDtoList[0].kidBirth.slice(8, 10);
    setBirth(str);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Grid>
      {/* 헤더 */}
      <BackMenu
        isLeft
        type="registKids"
        title="아이 프로필 변경"
        clickRight={() => {
          setOpenRegist(true);
        }}
      />
      <Grid id="container">
        <div style={{ textAlign: "center", marginBottom: "8%" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={selectKid}
              onChange={handleChange}
              inputProps={{ "aria-label": "Without label" }}
              MenuProps={{ disablePortal: true }}
            >
              {kidsList.map((kid, i) => (
                <MenuItem key={i} value={i}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <ListItemAvatar>
                        <Avatar src={kid.kidProfileImage}></Avatar>
                      </ListItemAvatar>
                    </Grid>
                    {kid.kidName}
                  </Grid>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ marginBottom: "3vh" }}
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
            sx={{ fontSize: "2.3vh", marginBottom: "1vh", color: "#6F6F6F" }}
          >
            이름
          </Grid>
          {/* todo: 캘린더 클릭 후 이름 바뀌는 것 수정 필요 */}
          <Grid item xs={10}>
            <TextField
              variant="standard"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              inputProps={{
                style: {
                  fontSize: "2.5vh",
                },
              }}
            />
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
          <Grid item xs={10} sx={{ fontSize: "2.3vh" }} justifyContent="center">
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
          <Grid item xs={10} sx={{ fontSize: "2.3vh" }}>
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
                  fontSize: "2.3vh",
                }}
                value={gender}
              >
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label={<Typography variant="h6">남</Typography>}
                />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label={<Typography variant="h6">여</Typography>}
                />
              </RadioGroup>
            </FormControl>
            <Grid
              container
              justifyContent="center"
              textAlign="center"
              sx={{ marginTop: "4vh" }}
            >
              <Btn
                width="30%"
                onClick={() => {
                  modifyKid();
                }}
              >
                수정
              </Btn>
            </Grid>
          </Grid>
          {/* 아이 등록 모달 */}
          <KidsInfoModal
            open={openRegist}
            setOpen={setOpenRegist}
          ></KidsInfoModal>
          {/* 아이이름 입력부탁 모달 */}
          <Modal
            open={openKidName}
            close={() => {
              setOpenKidName(false);
            }}
            onClick={() => {
              setOpenKidName(false);
            }}
            text="아이 이름을 입력해주세요!"
            icon="error"
          ></Modal>
          {/* 아이 등록실패 모달 */}
          <Modal
            open={openFail}
            close={() => {
              setOpenFail(false);
            }}
            onClick={() => {
              setOpenFail(false);
            }}
            text="아이 등록에 실패했습니다."
            icon="error"
          ></Modal>
          {/* 올바른 생년월일 입력 부탁 모달 */}
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
        </Grid>
      </Grid>
      {/* 하단 네비 */}
      <NavBar />
    </Grid>
  );
}
