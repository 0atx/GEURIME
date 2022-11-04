import React, { useEffect, useRef } from "react";
import Kakao from "components/common/Kakao";
import Google from "components/common/Google";
import { Grid } from "@mui/material";
import easel from "assets/easel.png";
import bottomcrayon from "assets/icon/bottomcrayon.png";
import topcrayon from "assets/icon/topcrayon.png";
import logotext from "assets/logo/logotext.png";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";

export default function Home() {
  // userInfo
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const params = useParams();

  let easelStyle = {
    margin: "5vw",
    width: "100%",
    height: "42vh",
    backgroundImage: `url(${easel})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "31vh",
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // console.log(params);
      // param에 invitecode가 있을 때
      if (Object.keys(params).length !== 0) {
        // userInfo에 inviteCode 저장
        setUserInfo((info) => {
          const copyUserInfo = { ...info };
          copyUserInfo.inviteCode = params.invitecode;
          // console.log(copyUserInfo);
          return { ...copyUserInfo };
        });
        localStorage.setItem("inviteCode", params.invitecode);
      }
    }
  }, []);

  return (
    <Grid
      container
      style={{ background: "#FFFFF8" }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {/* 상단 크레파스 */}
      <Grid item xs={12}>
        <img src={topcrayon} width="100%" alt="crayon" />
      </Grid>
      <Grid item xs={12} sx={{ fontSize: "3vh", marginTop: "4vh" }}>
        그림일기 도우미
      </Grid>
      {/* 그리미 텍스트 로고 */}
      <Grid item xs={12} sx={{ marginTop: "2vh" }}>
        <img src={logotext} width="60%" alt="text" />
      </Grid>
      {/* 이젤 */}
      <div style={easelStyle}>
        <Grid container sx={{ marginTop: "10vh" }}>
          <Grid item xs={12} sx={{ fontSize: "6vw", marginBottom: "3vh" }}>
            간편 로그인
          </Grid>
          <Grid item xs={12}>
            <Kakao />
            <Google />
          </Grid>
        </Grid>
      </div>
      {/* 하단 크레파스 */}
      <Grid item xs={12}>
        <img src={bottomcrayon} width="100%" alt="crayon" />
      </Grid>
    </Grid>
  );
}
