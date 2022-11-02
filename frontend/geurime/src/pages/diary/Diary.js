/*
그림일기장 페이지
@author 조혜안
@since 2022.10.28
*/
import BackMenu from "components/nav/BackMenu";
import { useState, useRef } from "react";
import { Container, Grid, Paper, InputBase, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import NavBar from "components/nav/NavBar";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Diary() {
  // 검색
  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체

  // 일기 목록 - 실제 데이터로 변경 필요!!!
  const [diaries, setDiaries] = useState([
    {
      id: 1,
      date: "2022-10-20",
      image: "assets/sample/0.png",
      title: "에버랜드 간 날",
    },
    {
      id: 2,
      date: "2022-10-21",
      image: "assets/sample/1.png",
      title: "롯데월드 간 날",
    },
    {
      id: 3,
      date: "2022-10-22",
      image: "assets/sample/2.png",
      title: "서울랜드 간 날",
    },
    {
      id: 4,
      date: "2022-10-23",
      image: "assets/sample/3.png",
      title: "한강 간 날",
    },
    {
      id: 5,
      date: "2022-10-24",
      image: "assets/sample/4.png",
      title: "설악산 간 날",
    },
  ]);

  // 일기장 날짜로 검색하는 함수 -- 실제 데이터 연동 변경필요!!!
  async function search(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("검색");
      searchInput.current.value = "";
    }
  }
  // 일기장 날짜로 검색하는 함수(클릭) -- 실제 데이터 연동 변경필요!!!
  async function searchClick(e) {
    e.preventDefault();
    console.log("검색");
    searchInput.current.value = "";
  }

  return (
    <div>
      {/* 헤더 */}
      <BackMenu isLeft={true} title="그림 일기장"></BackMenu>
      <div id="container">
        {/* 검색바 영역 */}
        <Grid
          container
          direction="row"
          style={{ padding: "2vw" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={10}>
            <Paper
              elevation={0}
              component="form"
              id="search"
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "24px",
                backgroundColor: "#F5F5F5",
              }}
            >
              {/* 검색어 입력 부분 */}
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="날짜(YYYY-MM-DD) 또는 제목으로 검색하세요"
                onChange={(e) => {
                  setSearchKeyWord(e.target.value);
                }} // 검색 키워드 변경
                id="searchValue"
                inputRef={searchInput} // input 객체를 반환
                onKeyDown={(e) => {
                  // search(e);
                }} // enter시 검색하는 함수
              />
              {/* 검색어 삭제 버튼 */}
              {searchKeyWord == null || searchKeyWord == "" ? null : (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => {
                    searchInput.current.value = null; // input 객체의 값을 비운다.
                    setSearchKeyWord(null);
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
              )}
              {/* 돋보기 버튼 */}
              <IconButton
                type="button"
                sx={{ p: "10px", color: "#FFA000", mr: 2 }}
                aria-label="search"
                onClick={(e) => {
                  // searchClick(e);
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        {/* 일기 리스트 */}
        <Container sx={{ marginTop: "3%" }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {diaries.map((diary, i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <Link to={"/detaildiary/" + diary.id} style={{ textDecoration: "none" }}>
                  <Paper elevation={3}>
                    <div style={{ padding: "5%" }}>
                      <Typography>{moment(diary.date).format("YYYY.MM.D")}</Typography>

                      <img
                        src={diary.image}
                        width="100%"
                        height="100px"
                        style={{
                          marginTop: "3%",

                          border: "3px solid #FFCA28",
                          borderRadius: "5px",
                        }}
                      ></img>
                      <Typography>제목: {diary.title}</Typography>
                    </div>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* 네비바 */}
        <NavBar></NavBar>
      </div>
    </div>
  );
}
