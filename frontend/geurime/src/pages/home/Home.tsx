import React from "react" 
import Kakao from "components/common/Kakao"
import Google from "components/common/Google"
import { Grid } from "@mui/material"
import easel from "assets/easel.png"

export default function Home() {

  let easelStyle = {
    margin: "5vw",
    width: "100%",
    height: "40vh",
    backgroundImage: `url(${easel}) noRepeat center`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "31vh",
  }
  return (
    <Grid container style={{background: "#FFFFF8"}} justifyContent="center"
      alignItems="center" textAlign="center">
      {/* 상단 크레파스 */}
      <Grid item xs={12}>
        <img src="assets/icon/topcrayon.png" width="100%" alt="crayon"/>
      </Grid>
      <Grid item xs={12} sx={{fontSize: "10vw", marginTop: "4vh"}}>그림일기 도우미</Grid>
      <Grid item xs={12} sx={{fontSize: "10vw", marginTop: "2vh"}}>
        <img src="assets/logo/logotext.png" width="60%" />
      </Grid>
      <div style={easelStyle}>
        간편 로그인
        <Kakao />
        <Google />
      </div>
      {/* 하단 크레파스 */}
      <Grid item xs={12}>
        <img src="assets/icon/bottomcrayon.png" width="100%" alt="crayon"/>
      </Grid>
    </Grid>
    )
}