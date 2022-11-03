/*
아이 정보 등록 모달
@author 여예원
@since 2022.11.01
*/

import React from "react";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { http2 } from "api/http2";
import { useRef, useState } from "react";
import Btn from "components/common/Btn";

import { useRecoilState } from "recoil";
import { userState } from "states/UserState";

export default function KidsInfoModal(props) {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const kidsNameInput = useRef(null); // 아이이름
  const kidsBirthInput = useRef(null); // 생년월일
  const [kidsGender, setKidsGender] = useState(null); // 성별

  // 프로필
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();

  // 프로필 미리보기
  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }
  // todo: axios 체크하기
  async function registKid() {
    // 닉네임 검사
    if (kidsNameInput.current.value == "") {
      alert("아이 이름을 입력해주세요.");
      return;
    }
    // 생년월일 검사
    if (isBirth(kidsBirthInput.current.value)) {
      let birth = kidsBirthInput.current.value;
      birth = birth.substr(0, 4) + "-" + birth.substr(4, 2) + "-" + birth.substr(6, 2);
      console.log(userInfo.familyId);
      console.log(imgRef.current.files[0]);

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

      // 등록 성공 하면 userInfo 의 kids 배열 업데이트
      // todo: response로 온 이미지url 넣기
      if (response.data.message == "success") {
        let copy = { ...userInfo };
        let copyKid = [...userInfo.kidDtoList];
        copyKid.push({
          kidBirth: birth,
          kidName: kidsNameInput.current.value,
        });
        copy.kidDtoList = copyKid;
        setUserInfo(copy);
        setImageUrl("");
        props.setOpen(false);
      } else {
        alert("아이 등록에 실패하였습니다.");
      }

      // axios
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
      } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
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
    <>
      <Dialog
        onClose={() => {
          props.setOpen(false);
        }}
        open={props.open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent>
          <Grid container textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={12}>
              아이 정보 입력
            </Grid>
          </Grid>
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={5} sx={{ marginBottom: "1vh", textAlign: "center" }}>
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
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={10} sx={{ fontSize: "2.3vh", marginBottom: "1vh", color: "#6F6F6F" }}>
              이름
            </Grid>
            {/* todo: 캘린더 클릭 후 이름 바뀌는 것 수정 필요 */}
            <Grid item xs={10}>
              <Input
                inputRef={kidsNameInput}
                inputProps={{
                  style: {
                    fontSize: "2.3vh",
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* 생년월일 */}
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "4vh" }}>
            <Grid item xs={10} sx={{ fontSize: "2.3vh", marginBottom: "3vh", color: "#6F6F6F" }}>
              생년월일
            </Grid>
            <Grid item xs={10} sx={{ fontSize: "2.3vh" }} justifyContent="center">
              <Input
                inputRef={kidsBirthInput}
                placeholder="ex) 20100717"
                inputProps={{
                  style: {
                    fontSize: "2.3vh",
                  },
                }}
              />
            </Grid>
          </Grid>
          {/* 성별 */}
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={10} sx={{ fontSize: "2.3vh", marginBottom: "2vh", color: "#6F6F6F" }}>
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
                    setKidsGender(e.target.value);
                  }}
                  sx={{
                    fontSize: "2.3vh",
                  }}
                  value={kidsGender}
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
              <Grid container justifyContent="center" textAlign="center" sx={{ marginTop: "4vh" }}>
                <Btn
                  onClick={() => {
                    registKid();
                  }}
                >
                  등록
                </Btn>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
