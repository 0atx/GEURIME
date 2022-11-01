/*
아이 등록 페이지
@author 여예원
@since 2022.11.01
*/

import React, { useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Input,
} from "@mui/material";
import Btn from "components/common/Btn";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { useRef } from "react";
import KidsInfoModal from "components/modal/KidsInfoModal";

export default function RegistKids() {
  const [open, setOpen] = useState(false); // 아이 등록 모달 관리 변수

  const [userInfo, setUserInfo] = useRecoilState(userState);

  function addKids() {
    setOpen(true);
  }

  // 프로필
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();

  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }

  // 회원 정보 등록 완료
  function registUser() {
    // state에 기본으로 1개가 들어가 있음
    if (userInfo.kidDtoList.length == 1) {
      alert("자녀를 한 명 이상 등록해주세요.");
    } else {
      alert("회원 가입이 완료되었습니다.");
    }
  }

  // todo: fontsize 변경하기
  return (
    <Grid>
      <KidsInfoModal setOpen={setOpen} open={open} />
      <BackMenu isLeft="false" title="우리 아이 정보 등록" type="registKids" clickRight={addKids} />
      <Grid id="container2" container alignItems="center">
        {userInfo.kidDtoList.length == 1 ? (
          // 아이가 없는 경우
          <Grid item xs={12} sx={{ color: "#6f6f6f", textAlign: "center", marginTop: "20%" }}>
            <Typography align="center" variant="h5">
              위쪽의 + 버튼을 눌러
            </Typography>
            <Typography align="center" variant="h5">
              아이 정보를 등록하세요!
            </Typography>
          </Grid>
        ) : (
          // 아이가 있는 경우
          <>
            <Grid item xs={12}></Grid>
          </>
        )}
        <Grid item xs={12}>
          <Btn
            onClick={() => {
              registUser();
            }}
            sx={{ marginLeft: "70%" }}
          >
            등록 완료
          </Btn>
        </Grid>
      </Grid>
    </Grid>
  );
}
