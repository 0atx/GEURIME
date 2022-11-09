import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarGroup, Grid, Paper } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";
import NavBar from "components/nav/NavBar";
import SelectKids from "components/nav/SelectKids";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { http } from "api/http";

export default function Main() {
  // 유저 state
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 가족 정보
  const [familyInfo, setFamilyInfo] = useState([
    {
      nickname: "예원1",
      userid: 0,
      userProfileImage: "",
    },
    {
      nickname: "예원2",
      userid: 0,
      userProfileImage: "",
    },
    {
      nickname: "예원3",
      userid: 0,
      userProfileImage: "",
    },
    {
      nickname: "예원4",
      userid: 0,
      userProfileImage: "",
    },
    {
      nickname: "예원5",
      userid: 0,
      userProfileImage: "",
    },
  ]);

  // 처음 로딩시 유저정보 가져오기
  async function getUserInfo() {
    const response = await http.get(`/users/${userInfo.userId}`);
    if (response.data.message === "success") {
      setUserInfo(response.data.data);
    }
  }

  async function getFamilyInfo() {
    const response = await http.get(`/users/family/${userInfo.userId}`);
    if (response.data.message === "success") {
      setFamilyInfo(response.data.data);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getUserInfo();
      getFamilyInfo();
    }
  }, []);

  const [imgList, setImgList] = useState([0, 1, 2, 3, 4]);
  const navigator = useNavigate();

  return (
    <div>
      <SelectKids />
      <Grid
        id="container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} sx={{ fontSize: "2.5vh", marginBottom: "1vh" }}>
          가족 정보
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: "3vh",
            width: "85%",
            background: "white",
            borderRadius: "5px",
            boxShadow: "1px 1px 3px #9e9e9e",
            padding: "1vh",
          }}
          justifyContent="center"
          alignItems="center"
        >
          {familyInfo.map(function (info, i) {
            return (
              <Grid
                item
                key={i}
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  sx={{
                    textAlign: "center",
                    width: "70px",
                  }}
                >
                  <Avatar src={info.userProfileImage} />

                  <Grid item xs={12}>
                    {info.nickname.length > 4 ? (
                      <>{info.nickname.substring(0, 3) + ".."}</>
                    ) : (
                      <>{info.nickname}</>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
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
