/*
날씨 알려주는 모달
@author 조혜안
@since 2022.11.09
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
// 날씨 이미지 import
import sunnyClicked from "assets/icon/weather/sunnyClicked.png";
import cloudyClicked from "assets/icon/weather/cloudyClicked.png";
import rainyClicked from "assets/icon/weather/rainyClicked.png";
import snowyClicked from "assets/icon/weather/snowyClicked.png";

export default function ShowWeatherModal({
  open,
  handleClose,
  year,
  month,
  day,
  weather,
  applyWeather,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {year}년 {month}월 {day}일 날씨
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
          }}
        >
          {weather === "맑음" && (
            <>
              <img
                style={{ boxShadow: "1px 1px 5px #c7c7c2", borderRadius: "50%" }}
                src={sunnyClicked}
                width="50%"
              />
              <div style={{ marginTop: "5%", fontSize: "2.8vh", fontWeight: "bold" }}>
                맑았어요🌞
              </div>
            </>
          )}
          {weather === "흐림" && (
            <>
              <img
                style={{ boxShadow: "1px 1px 5px #c7c7c2", borderRadius: "50%" }}
                src={cloudyClicked}
                width="50%"
              />
              <div style={{ marginTop: "5%", fontSize: "2.8vh", fontWeight: "bold" }}>
                흐렸어요⛅
              </div>
            </>
          )}
          {weather === "눈" && (
            <>
              <img
                style={{ boxShadow: "1px 1px 5px #c7c7c2", borderRadius: "50%" }}
                src={snowyClicked}
                width="50%"
              />
              <div style={{ marginTop: "5%", fontSize: "2.8vh", fontWeight: "bold" }}>
                눈이 왔어요⛄
              </div>
            </>
          )}
          {weather === "비" && (
            <>
              <img
                style={{ boxShadow: "1px 1px 5px #c7c7c2", borderRadius: "50%" }}
                src={rainyClicked}
                width="50%"
              />
              <div style={{ marginTop: "5%", fontSize: "2.8vh", fontWeight: "bold" }}>
                비가 왔어요☂
              </div>
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button
          width="100px"
          onClick={() => {
            handleClose();
            applyWeather();
          }}
        >
          선택하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
