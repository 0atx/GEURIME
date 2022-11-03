import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";
import NavBar from "components/nav/NavBar";
import SelectKids from "components/nav/SelectKids";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { CurrentKidState } from "states/CurrentKidState";
import { http } from "api/http";

export default function Main() {
  // 유저 state
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);

  // 클릭된 아이
  const [clicked, setClicked] = useState({
    kidId: "",
    kidName: "",
    kidProfileImage: "",
    kidBirth: "",
  });

  // 처음 로딩시 유저정보 가져오기
  async function getUserInfo() {
    const response = await http.get(`/users/${userInfo.userID}`);
    if (response.data.message === "success") {
      setUserInfo(response.data.data);
      setClicked(response.data.data.kidDtoList[0]);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  // 선택된 아이가 바뀔때마다 아이의 정보를 state에 담기
  async function getKidInfo() {
    const response = await http.get(`kids/${clicked.kidId}`);
    if (response.data.message === "success") {
      setCurrentKid(response.data.data);
    }
  }

  const mounted1 = useRef(false);
  useEffect(() => {
    if (!mounted1.current) {
      mounted1.current = true;
    } else {
      getKidInfo();
    }
  }, [clicked]);

  const [imgList, setImgList] = useState([0, 1, 2, 3, 4]);
  const navigator = useNavigate();

  return (
    <div>
      <SelectKids setClicked={setClicked} clicked={clicked} />
      <Grid
        id="container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} sx={{ fontSize: "2.5vh" }}>
          그림 갤러리
        </Grid>
        <Grid item xs={10}>
          <Masonry columns={2} spacing={2} sx={{ margin: 0 }}>
            {imgList.map(function (img, i) {
              return (
                // todo: 실제 이미지로 변경 필요
                <img
                  key={i}
                  src={`/assets/sample/${i}.png`}
                  style={{ border: "5px solid #FFCA28", borderRadius: "10px" }}
                  onClick={() => {
                    navigator("/gallery");
                  }}
                  alt="drawing"
                />
              );
            })}
          </Masonry>
        </Grid>
      </Grid>
      <NavBar />
    </div>
  );
}
