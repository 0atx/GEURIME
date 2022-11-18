import React, { useEffect, useRef } from "react";
import Kakao from "components/common/Kakao";
import Google from "components/common/Google";
import { Grid } from "@mui/material";
import easel from "assets/easel.png";
import logotext from "assets/logo/logotext.png";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import bg from "assets/background/home.png";
import top from "assets/background/topcrayon.png";
import bottom from "assets/background/bottomcrayon.png";

export default function Home() {
  // userInfo
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const params = useParams();

  let easelStyle = {
    width: "100%",
    height: "50vh",
    backgroundImage: `url(${easel})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "35vh",
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // param에 invitecode가 있을 때
      if (Object.keys(params).length !== 0) {
        // userInfo에 inviteCode 저장
        setUserInfo((info) => {
          const copyUserInfo = { ...info };
          copyUserInfo.inviteCode = params.invitecode;
          return { ...copyUserInfo };
        });
        localStorage.setItem("inviteCode", params.invitecode);
      }
    }
  }, []);

  return (
    <Grid
      container
      style={{
        minHeight: "100vh",
      }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "10vh",
          maxHight: "10vh",
          backgroundImage: `url(${top})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          marginBottom: "5vh",
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "7vh",
          maxHight: "7vh",
          fontSize: "3vh",
        }}
      >
        그림일기 도우미
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "12vh",
          maxHight: "12vh",
          fontSize: "3vh",
        }}
      >
        <img src={logotext} width="60%" alt="text" />
      </Grid>
      <Grid item xs={12} sx={easelStyle}>
        <Grid container sx={{ marginTop: "15vh" }}>
          <Grid item xs={12} sx={{ fontSize: "3vh", marginBottom: "3vh" }}>
            간편 로그인
          </Grid>
          <Grid item xs={12}>
            <Kakao />
            <Google />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "10vh",
          maxHeight: "10vh",
          backgroundImage: `url(${bottom})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          marginTop: "5vh",
        }}
      ></Grid>
    </Grid>
  );
}
