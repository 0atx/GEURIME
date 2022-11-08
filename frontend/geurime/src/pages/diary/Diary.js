/*
그림일기장 페이지
@author 조혜안
@since 2022.10.28
*/
import BackMenu from "components/nav/BackMenu";
import { useState, useRef, useEffect } from "react";
import { Container, Grid, Paper, InputBase, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import NavBar from "components/nav/NavBar";
import { Link } from "react-router-dom";
import moment from "moment";
import { http } from "api/http";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { CurrentKidState } from "states/CurrentKidState";

export default function Diary() {
  // userInfo
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // kidsInfo
  const [kidInfo, setKidInfo] = useRecoilState(CurrentKidState);

  // 검색
  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체

  // 일기 목록
  const [diaries, setDiaries] = useState([]);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getDiaries();
    }
  }, []);

  // 자녀의 그림일기 전체조회
  async function getDiaries() {
    const response = await http.get(`/diaries/${kidInfo.kidId}`);
    console.log(kidInfo);
    console.log(response.data.data);
    setDiaries(response.data.data);
  }

  // 일기장 날짜로 검색하는 함수
  async function search(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let keyword = searchKeyWord;
      keyword = keyword.trim();

      const response = await http.get(`/diaries/title`, {
        params: {
          keyword: keyword,
          kidId: kidInfo.kidId,
        },
      });
      if (response.data.message === "success") {
        setDiaries(response.data.data);
      }

      // searchInput.current.value = "";
    }
  }
  // 일기장 날짜로 검색하는 함수(클릭)
  async function searchClick(e) {
    e.preventDefault();
    let keyword = searchKeyWord;
    keyword = keyword.trim();

    const response = await http.get(`/diaries/title`, {
      params: {
        keyword: keyword,
        kidId: kidInfo.kidId,
      },
    });
    if (response.data.message === "success") {
      setDiaries(response.data.data);
    }

    // searchInput.current.value = "";
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
                placeholder="제목을 검색하세요"
                onChange={(e) => {
                  setSearchKeyWord(e.target.value);
                }} // 검색 키워드 변경
                id="searchValue"
                inputRef={searchInput} // input 객체를 반환
                onKeyDown={(e) => {
                  search(e);
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
                  searchClick(e);
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
                <Link to={"/detaildiary/" + diary.drawingId} style={{ textDecoration: "none" }}>
                  <Paper elevation={3}>
                    <div style={{ padding: "5%" }}>
                      <img
                        src={diary.drawingImagePath}
                        width="100%"
                        height="120px"
                        style={{
                          marginTop: "3%",
                          border: "3px solid #FFCA28",
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                      ></img>
                      {diary.drawingTitle.length >= 9 ? (
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontFamily: "THEHongChawangjanemo",
                            fontSize: "2.5vh",
                            lineHeight: "3vh",
                          }}
                        >
                          {diary.drawingTitle.substr(0, 9)}...
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontFamily: "THEHongChawangjanemo",
                            fontSize: "2.5vh",
                            lineHeight: "3vh",
                          }}
                        >
                          {diary.drawingTitle}
                        </Typography>
                      )}
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontFamily: "THEHongChawangjanemo",
                          fontSize: "2.2vh",
                        }}
                      >
                        {moment(diary.createTime).format("YYYY년 M월 D일")}
                      </Typography>
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
