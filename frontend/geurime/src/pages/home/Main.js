import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  AvatarGroup,
  Grid,
  Paper,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";
import NavBar from "components/nav/NavBar";
import SelectKids from "components/nav/SelectKids";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { CurrentKidState } from "states/CurrentKidState";
import { http } from "api/http";
import FamilyInfoModal from "components/modal/FamilyInfoModal";
import { ResponsivePie } from "@nivo/pie";
import drawing from "assets/icon/drawing.png";

const Piechart = ({ happy, sad, angry }) => {
  const handle = {
    padClick: (data) => {
      console.log(data);
    },

    legendClick: (data) => {
      console.log(data);
    },
  };

  return (
    <div style={{ width: "300px", height: "250px", margin: "0 auto" }}>
      <ResponsivePie
        data={[
          { id: "행복😆", value: happy },
          { id: "우울😥", value: sad },
          { id: "폭력😡", value: angry },
        ]}
        margin={{ right: 80, bottom: 50, left: 80, top: 0 }}
        innerRadius={0.5}
        padAngle={1.8}
        cornerRadius={8}
        colors={["#A9D5C7", "#F7BF87", "#FFB3B3"]} // 커스터하여 사용할 때
        // colors={{ scheme: "pastel1" }} // nivo에서 제공해주는 색상 조합 사용할 때
        // borderWidth={2}
        arcLabel={(d) => `${d.value}개`}
        // arcLabel={(d) => `${((d.value / (happy + sad + angry)) * 100).toFixed(0)}%`}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }} // pad 색상에 따라감
        arcLabelsSkipAngle={10}
        theme={{
          labels: {
            text: {
              fontSize: 14,
              fill: "#000000",
            },
          },
          legends: {
            text: {
              fontSize: 12,
              fill: "#000000",
            },
          },
        }}
        onClick={handle.padClick}
        motionConfig="wobbly"
        transitionMode="pushIn"
        legends={[
          {
            anchor: "bottom", // 위치
            direction: "row", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 6, // chart와 X 간격
            translateY: 15, // chart와 Y 간격
            itemsSpacing: 0, // item간 간격
            itemWidth: 80, // item width
            itemHeight: 18, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 1, // item opacity
            symbolSize: 18, // symbol (색상 표기) 크기
            symbolShape: "circle", // symbol (색상 표기) 모양
            effects: [
              {
                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                on: "hover",
                style: {
                  itemTextColor: "olive",
                },
              },
            ],
            onClick: handle.legendClick, // legend 클릭 이벤트
          },
        ]}
      />
    </div>
  );
};

export default function Main() {
  // 유저 state
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // 자녀 state
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);

  // 가족 정보
  const [familyInfo, setFamilyInfo] = useState([
    {
      nickname: "",
      userId: 0,
      userProfileImage: "",
    },
  ]);

  // 차트 연, 월 select
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  // 가입년도부터 현재년도까지의 배열
  const [years, setYears] = useState([]);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // 자녀의 감정 데이터
  const [happy, setHappy] = useState(null);
  const [sad, setSad] = useState(null);
  const [angry, setAngry] = useState(null);

  const handleYear = (e) => {
    setYear(e.target.value);
    getEmotion(month, e.target.value);
  };
  const handleMonth = (e) => {
    setMonth(e.target.value);
    getEmotion(e.target.value, year);
  };

  const [familyInfoOpen, setFamilyInfoOpen] = useState(false);
  const [clickedId, setClickedId] = useState(userInfo.userId);

  // 자녀의 감정 통계 조회
  async function getEmotion(month, year) {
    const response = await http.get(`/kids/emotion/${currentKid.kidId}`, {
      params: {
        MM: month,
        yyyy: year,
      },
    });

    console.log(month, year, response.data.data);

    if (response.data.message === "success") {
      setHappy(response.data.data.happy);
      setSad(response.data.data.sad);
      setAngry(response.data.data.angry);
    }
  }

  // 처음 로딩시 유저정보 가져오기
  async function getUserInfo() {
    const response = await http.get(`/users/${userInfo.userId}`);
    if (response.data.message === "success") {
      setUserInfo(response.data.data);

      // 가입년도부터 현재년도까지의 배열
      let createYear = response.data.data.createDate.substring(0, 4);
      for (let i = parseInt(createYear); i <= new Date().getFullYear(); i++) {
        years.push(i);
      }
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

      getEmotion(month, year);
    }
  }, [currentKid]);

  const [imgList, setImgList] = useState(currentKid.sampleImageList);
  const navigator = useNavigate();

  return (
    <div>
      <SelectKids setImgList={setImgList} />
      <Grid id="container" container justifyContent="center" alignItems="center">
        {/* 그림 갤러리 */}
        <Grid item xs={12} sx={{ fontSize: "2.3vh", marginBottom: "1vh" }}>
          <div style={{ textAlign: "center" }}>그림 갤러리</div>
        </Grid>
        <Grid
          container
          sx={{
            textAlign: "center",
            marginBottom: "2vh",
            width: "85%",
            border: "3px dashed #FFCA28",

            marginTop: "1.5vh",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ marginTop: "1.5vh" }}>
            <Container>
              <Masonry columns={2} spacing={1} sx={{ margin: 0 }}>
                {imgList.length === 0 ? (
                  <>
                    {[0, 1, 2, 3].map(function (img, i) {
                      return (
                        <img
                          key={i}
                          src={`/assets/sample/${i}.png`}
                          style={
                            {
                              // border: "5px solid #FFCA28",
                              // boxShadow: "1px 1px 3px #6f6f6f",
                            }
                          }
                          onClick={() => {
                            navigator("/gallery");
                          }}
                          alt="drawing"
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    {imgList.map(function (img, i) {
                      return (
                        <img
                          key={i}
                          src={img}
                          style={
                            {
                              // border: "5px solid #FFCA28",
                              // boxShadow: "1px 1px 3px #6f6f6f",
                            }
                          }
                          onClick={() => {
                            navigator("/gallery");
                          }}
                          alt="drawing"
                        />
                      );
                    })}
                  </>
                )}
              </Masonry>
            </Container>
          </Grid>
        </Grid>
        {/* 감정 통계 */}
        <Grid item xs={12} sx={{ fontSize: "2.3vh", marginBottom: "1vh" }}>
          <div style={{ textAlign: "center" }}>{currentKid.kidName}의 감정 분석</div>
        </Grid>
        <Grid
          container
          sx={{
            textAlign: "center",
            marginBottom: "3vh",
            width: "85%",
            border: "3px dashed #FFCA28",
            padding: "1vh",
            marginTop: "1.5vh",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={4}>
            {/* 년도 */}
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={year}
                onChange={handleYear}
              >
                {years.map((data, i) => (
                  <MenuItem value={data} key={i}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            년
          </Grid>
          {/* 월 */}
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={month}
                onChange={handleMonth}
                MenuProps={{
                  disablePortal: true,
                  PaperProps: { sx: { maxHeight: 200 } },
                }}
              >
                {months.map((data, i) => (
                  <MenuItem value={data} key={i}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            월
          </Grid>
          {happy == 0 && sad == 0 && angry == 0 ? (
            <div style={{ padding: "5%" }}>
              <img src={drawing} width="150vh" style={{ marginTop: "10%", marginBottom: "10%" }} />
              <Typography>등록한 그림이 없어요😥</Typography>
            </div>
          ) : (
            <Piechart happy={happy} sad={sad} angry={angry} />
          )}
          <Grid item xs={12} sx={{ marginBottom: "3%" }}>
            보건복지상담센터 ☎ 129
          </Grid>
        </Grid>
        {/* 가족 정보 */}
        <Grid item xs={12} sx={{ fontSize: "2.3vh", marginBottom: "1vh" }}>
          <div style={{ textAlign: "center" }}>{userInfo.familyName}</div>
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: "3vh",
            width: "85%",
            border: "3px dashed #FFCA28",
            padding: "1vh",
            marginTop: "1.5vh",
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
      </Grid>
      <NavBar />
      {/* 가족 정보 모달 */}
      <FamilyInfoModal userId={clickedId} open={familyInfoOpen} setOpen={setFamilyInfoOpen} />
    </div>
  );
}
