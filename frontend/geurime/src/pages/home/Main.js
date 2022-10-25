import React, { useState } from "react";
import { Grid, Paper, Avatar } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [imgList, setImgList] = useState([0, 1, 2, 3, 4]);
  const navigator = useNavigate();

  return (
    <div id="container">
      <Grid container justifyContent="center">
        <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "2vh" }}>
          그림 갤러리
        </Grid>
        <Grid item xs={10}>
          <Masonry columns={2} spacing={2} sx={{ margin: 0 }}>
            {imgList.map(function (img, i) {
              return (
                // todo: 실제 이미지로 변경 필요
                <img
                  src={`/assets/sample/${i}.png`}
                  style={{ border: "5px solid #FFCA28", borderRadius: "10px" }}
                  onClick={() => {
                    navigator("/gallery");
                  }}
                />
              );
            })}
          </Masonry>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "2vh" }}>
          우리 가족 정보
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={10} sx={{ borderRadius: "10px" }} variant="outlined">
            {/* todo: 실제 가족 정보로 변경 필요 */}
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
