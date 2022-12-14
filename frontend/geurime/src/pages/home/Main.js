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
import paper from "assets/galleryPaper.png";
import Skeleton from "@mui/material/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

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
          { id: "νλ³΅π", value: happy },
          { id: "μ°μΈπ₯", value: sad },
          { id: "ν­λ ₯π‘", value: angry },
        ]}
        margin={{ right: 80, bottom: 50, left: 80, top: 0 }}
        innerRadius={0.5}
        padAngle={1.8}
        cornerRadius={8}
        colors={["#A9D5C7", "#F7BF87", "#FFB3B3"]} // μ»€μ€ν°νμ¬ μ¬μ©ν  λ
        // colors={{ scheme: "pastel1" }} // nivoμμ μ κ³΅ν΄μ£Όλ μμ μ‘°ν© μ¬μ©ν  λ
        // borderWidth={2}
        arcLabel={(d) => `${d.value}κ°`}
        // arcLabel={(d) => `${((d.value / (happy + sad + angry)) * 100).toFixed(0)}%`}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }} // pad μμμ λ°λΌκ°
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
            anchor: "bottom", // μμΉ
            direction: "row", // item κ·Έλ €μ§λ λ°©ν₯
            justify: false, // κΈμ¨, μμκ° κ°κ²© justify μ μ© μ¬λΆ
            translateX: 6, // chartμ X κ°κ²©
            translateY: 15, // chartμ Y κ°κ²©
            itemsSpacing: 0, // itemκ° κ°κ²©
            itemWidth: 80, // item width
            itemHeight: 18, // item height
            itemDirection: "left-to-right", // item λ΄λΆμ κ·Έλ €μ§λ λ°©ν₯
            itemOpacity: 1, // item opacity
            symbolSize: 18, // symbol (μμ νκΈ°) ν¬κΈ°
            symbolShape: "circle", // symbol (μμ νκΈ°) λͺ¨μ
            effects: [
              {
                // μΆκ° ν¨κ³Ό μ€μ  (hoverνλ©΄ textColorλ₯Ό oliveλ‘ λ³κ²½)
                on: "hover",
                style: {
                  itemTextColor: "olive",
                },
              },
            ],
            onClick: handle.legendClick, // legend ν΄λ¦­ μ΄λ²€νΈ
          },
        ]}
      />
    </div>
  );
};

export default function Main() {
  const navigate = useNavigate();

  // μ μ  state
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // μλ state
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);

  // κ°μ‘± μ λ³΄
  const [familyInfo, setFamilyInfo] = useState([
    {
      nickname: "",
      userId: 0,
      userProfileImage: "",
    },
  ]);

  // μ°¨νΈ μ°, μ select
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  // κ°μλλλΆν° νμ¬λλκΉμ§μ λ°°μ΄
  const [years, setYears] = useState([]);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // μλμ κ°μ  λ°μ΄ν°
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

  // μλμ κ°μ  ν΅κ³ μ‘°ν
  async function getEmotion(month, year) {
    const response = await http
      .get(`/kids/emotion/${currentKid.kidId}`, {
        params: {
          MM: month,
          yyyy: year,
        },
      })
      .then((response) => {
        if (response.data.message === "success") {
          setHappy(response.data.data.happy);
          setSad(response.data.data.sad);
          setAngry(response.data.data.angry);
        }
      })
      .catch((error) => {
        if (error.response.data.code === "E012") {
          navigate("/norights");
        }
      });
  }

  // μ²μ λ‘λ©μ μ μ μ λ³΄ κ°μ Έμ€κΈ°
  async function getUserInfo() {
    const response = await http
      .get(`/users/${userInfo.userId}`)
      .then((response) => {
        if (response.data.message === "success") {
          setUserInfo(response.data.data);

          // κ°μλλλΆν° νμ¬λλκΉμ§μ λ°°μ΄
          let createYear = response.data.data.createDate.substring(0, 4);
          // console.log({ κ°μ₯μ€λλ: createYear });
          let yearArr = [];
          for (
            let i = new Date().getFullYear();
            i >= parseInt(createYear);
            i--
          ) {
            // if (years.indexOf(i) == -1) {
            //   console.log({ μ°λ: i });
            // }
            yearArr.push(i);
          }
          setYears(yearArr);
        }
      })
      .catch((error) => {
        if (error.response.data.code === "E012") {
          navigate("/norights");
        }
      });
  }

  async function getFamilyInfo() {
    const response = await http
      .get(`/users/family/${userInfo.userId}`)
      .then((response) => {
        if (response.data.message === "success") {
          setFamilyInfo(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.data.code === "E012") {
          navigate("/norights");
        }
      });
  }

  const [imgList, setImgList] = useState(currentKid.sampleImageList);
  const navigator = useNavigate();

  const [loading, setLoading] = useState(true);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setLoading(true);
      setTimeout(() => {
        AOS.init();

        getUserInfo();
        getFamilyInfo();

        getEmotion(month, year);
        setLoading(false);
      }, 1000);
    }
  }, [currentKid]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      AOS.init();
    }
  }, [imgList]);

  return (
    <div>
      <SelectKids setImgList={setImgList} />
      {loading ? (
        // μ€μΌλ ν€
        <Grid
          id="container"
          container
          justifyContent="center"
          alignItems="center"
        >
          {/* κ·Έλ¦Ό κ°€λ¬λ¦¬ */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              textAlign: "center",
              marginBottom: "2vh",
              width: "85%",
            }}
          >
            {[0, 1, 2, 3].map((data, i) => (
              <Grid
                key={i}
                item
                xs={6}
                md={3}
                sx={{
                  display: "grid",
                  marginTop: "1.5vh",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Skeleton variant="rectangular" width="18vh" height="18vh" />
              </Grid>
            ))}
          </Grid>
          {/* κ°μ  ν΅κ³ */}
          <Grid
            item
            xs={12}
            sx={{ fontSize: "2.3vh", margin: "1vh 25% 1vh 25%" }}
          >
            <Typography variant="h3">
              <Skeleton />
            </Typography>
          </Grid>
          <Grid container alignItems="center" justifyContent="center">
            <Skeleton variant="rectangular" width="38vh" height="38vh" />
          </Grid>
          {/* κ°μ‘± μ λ³΄ */}
          <Grid
            item
            xs={12}
            sx={{ fontSize: "2.3vh", margin: "1vh 25% 1vh 25%" }}
          >
            <Typography variant="h3">
              <Skeleton />
            </Typography>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Skeleton variant="rectangular" width="38vh" height="10vh" />
          </Grid>
        </Grid>
      ) : (
        <Grid
          id="container"
          container
          justifyContent="center"
          alignItems="center"
        >
          {/* κ·Έλ¦Ό κ°€λ¬λ¦¬ */}
          <Grid
            container
            sx={{
              textAlign: "center",
              marginBottom: "2vh",
              width: "85%",
            }}
          >
            {imgList.length === 0 ? (
              <>
                {[0, 1, 2, 3].map(function (img, i) {
                  return (
                    <Grid
                      item
                      key={i}
                      xs={6}
                      md={3}
                      sx={{ marginTop: "1.5vh" }}
                    >
                      <img
                        data-aos="zoom-in"
                        data-aos-delay={i * 200}
                        src={`/assets/sample/${i}.png`}
                        style={{
                          width: "18vh",
                          height: "18vh",
                          objectFit: "cover",
                          backgroundColor: "#ffffff",
                          backgroundSize: "contain",
                          padding: "5%",
                          backgroundImage: `url(${paper})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "top center",
                          // boxShadow: "1px 1px 3px #6f6f6f",
                        }}
                        onClick={() => {
                          navigator("/gallery");
                        }}
                        alt="drawing"
                      />
                    </Grid>
                  );
                })}
              </>
            ) : (
              <>
                {imgList.map(function (img, i) {
                  return (
                    <Grid
                      item
                      key={i}
                      xs={6}
                      md={3}
                      sx={{ marginTop: "1.5vh" }}
                    >
                      <img
                        data-aos="zoom-in"
                        data-aos-delay={i * 200}
                        src={img}
                        style={{
                          width: "18vh",
                          height: "18vh",
                          objectFit: "cover",
                          backgroundColor: "#ffffff",
                          backgroundSize: "contain",
                          padding: "5%",
                          backgroundImage: `url(${paper})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "top center",
                          // boxShadow: "1px 1px 3px #6f6f6f",
                        }}
                        onClick={() => {
                          navigator("/gallery");
                        }}
                        alt="drawing"
                      />
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
          {/* κ°μ  ν΅κ³ */}
          <Grid
            item
            xs={12}
            sx={{ fontSize: "2.3vh", marginBottom: "1vh", marginTop: "1vh" }}
          >
            <div style={{ textAlign: "center" }}>
              {currentKid.kidName}μ κ°μ  λΆμ
            </div>
          </Grid>
          <Grid
            container
            sx={{
              textAlign: "center",
              marginBottom: "2vh",
              width: "85%",
              border: "3px dashed #FFCA28",
              padding: "1vh",
              marginTop: "1.5vh",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={4}>
              {/* λλ */}
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
              λ
            </Grid>
            {/* μ */}
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
              μ
            </Grid>
            {happy == 0 && sad == 0 && angry == 0 ? (
              <div style={{ padding: "5%" }}>
                <img
                  src={drawing}
                  width="150vh"
                  style={{ marginTop: "10%", marginBottom: "10%" }}
                />
                <Typography>λ±λ‘ν κ·Έλ¦Όμ΄ μμ΄μπ₯</Typography>
              </div>
            ) : (
              <Piechart happy={happy} sad={sad} angry={angry} />
            )}
            <Grid item xs={12} sx={{ marginBottom: "3%" }}>
              <Typography sx={{ color: "#6F6F6F" }}>
                β λ³΄κ±΄λ³΅μ§μλ΄μΌν° β 129
              </Typography>
            </Grid>
          </Grid>
          {/* κ°μ‘± μ λ³΄ */}
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
                    <Avatar
                      sx={{ marginTop: "5px" }}
                      src={info.userProfileImage}
                    />

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
      )}

      <NavBar />
      {/* κ°μ‘± μ λ³΄ λͺ¨λ¬ */}
      <FamilyInfoModal
        userId={clickedId}
        open={familyInfoOpen}
        setOpen={setFamilyInfoOpen}
      />
    </div>
  );
}
