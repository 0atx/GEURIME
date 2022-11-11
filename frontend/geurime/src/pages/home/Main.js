import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarGroup, Grid, Paper } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";
import NavBar from "components/nav/NavBar";
import SelectKids from "components/nav/SelectKids";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { http } from "api/http";
import FamilyInfoModal from "components/modal/FamilyInfoModal";

export default function Main() {
  // 유저 state
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 가족 정보
  const [familyInfo, setFamilyInfo] = useState([
    {
      nickname: "",
      userId: 0,
      userProfileImage: "",
    },
  ]);

  const [familyInfoOpen, setFamilyInfoOpen] = useState(false);
  const [clickedId, setClickedId] = useState(0);

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
      <Grid id="container" container justifyContent="center" alignItems="center">
        {/* 가족 정보 */}
        <Grid item xs={10} sx={{ fontSize: "2.5vh", marginBottom: "1vh" }}>
          {userInfo.familyName}
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
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    textAlign: "center",
                    width: "70px",
                  }}
                  onClick={() => {
                    setClickedId(info.userId);
                    setFamilyInfoOpen(true);
                  }}
                >
                  <Avatar sx={{ marginTop: "5px" }} src={info.userProfileImage} />

                  <Grid
                    item
                    xs={12}
                    sx={{
                      marginTop: "3px",
                    }}
                  >
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
        {/* 그림 갤러리 */}
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
      {/* 가족 정보 모달 */}
      <FamilyInfoModal userId={clickedId} open={familyInfoOpen} setOpen={setFamilyInfoOpen} />
    </div>
  );
}
