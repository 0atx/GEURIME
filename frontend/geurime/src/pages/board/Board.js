/*
@author 유현욱
@since 2022.10.28
*/
import * as React from 'react';
import { Grid,TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useRef } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BoardItem from './BoardItem';
import BackMenu from 'components/nav/BackMenu';
import { http } from "api/http";
import { useNavigate } from "react-router-dom";
import NavBar from 'components/nav/NavBar';

export default function Board() { 
  const navigator = useNavigate();
  
  const [boards, setBoards] = useState([{
    "boardCategory": "질문",
    "boardFirstImage": "https://en.pimg.jp/031/716/685/1/31716685.jpg",
    "boardId": 0,
    "boardTitle": "1번글",
    "boardViews": 0,
    "commentCount": 0,
    "createTime": "2022-10-28T06:37:58.611Z",
    "updateTime": "2022-10-28T06:37:58.611Z",
    "userId": 0,
    "userNickname": "1번유저",
    "userProfileImage": "string"
  },{
    "boardCategory": "질문",
    "boardFirstImage": "https://en.pimg.jp/031/716/685/1/31716685.jpg",
    "boardId": 0,
    "boardTitle": "1번글",
    "boardViews": 0,
    "commentCount": 0,
    "createTime": "2022-10-28T06:37:58.611Z",
    "updateTime": "2022-10-28T06:37:58.611Z",
    "userId": 0,
    "userNickname": "1번유저",
    "userProfileImage": "string"
  }]);
  const [list, setList] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체
  const handleChange = (event) => {
    setList(event.target.value);
  };
  // const getData = async () => {
  //   const response = await axios.get(
  //     'http://j7a104.p.ssafy.io:8080/categories',
  //   );
  //   console.log('서버에서 카페, 드링크가져왔음.');

  const getBoard = async () => {
    const response = await http.get(`/boards`, {
      params: {
        page: 0,
        size: 10
      }
    });
    console.log({전체게시글: response.data });

    if (response.data.message == "success") {
      setBoards(response.data.data)
    } else {
      alert("게시글을 불러오지 못했습니다");
    }
  } 
  useEffect(() => {
    console.log('전체 게시글 조회')
    getBoard()

  },[])
  function searchKeyword(e) {
    if (e.key === "Enter") {
      search()
      // e.preventDefault();
      // console.log("검색");
      // searchInput.current.value = "";
    }
    // else if (e.key === 'click') {
    //   search()
    //   e.preventDefault();
    //   console.log("검색");
    //   searchInput.current.value = "";
    // }
  }

  const search = async () => {
    console.log({검색카테고리: list})
    console.log({검색어: searchInput.current.value})
    const response = await http.get(`/boards/search`, {
      params: {
        category: list,
        keyword: searchInput.current.value,
        page: 0,
        size: 10
      }
    });
    if (response.data.message == "success") {
      console.log({ 검색결과: response.data.data })
      if (response.data.data.length == 0) {
        alert('검색결과 없음')
      } else {
        setBoards(response.data.data)
      }
    } else {
      alert("게시글을 불러오지 못했습니다");
    }
  }


  return (
    <Grid
    >
    
      {/* 상단바 */}
      <Grid>
        <BackMenu
            isLeft={true}
            title='커뮤니티'
            isRight="+"
          clickRight={() => {
            navigator("/registBoard");
            }}
        >
        </BackMenu>
      </Grid>
      {/* 상단바 끝 */}
      <Grid
        id='container'
        sx={{width: '92vw', marginLeft:'3%'}}
        >

        {/* 검색바 영역 */}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          flexWrap={'nowrap'}
          marginLeft='5%'
        >
          <FormControl sx={{ height: '8vh', width: '16vh', Color: '#FFCA28', justifyContent:'center', textAlign: 'center'}} size='small'>
            <Select
              value={list}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={""}>
                <em>선택</em>
              </MenuItem>
              <MenuItem value={"전체"}>전체</MenuItem>
              <MenuItem value={"자유"}>자유</MenuItem>
              <MenuItem value={'질문'}>질문</MenuItem>
          </Select>
          </FormControl>

        <Grid
          container
          direction="row"
          style={{ padding: "2vw" }}
            justifyContent="center"
            marginLeft={'3%'}
        >

          <Grid 
            container
            direction="row"
            // justifyContent='space-between'
          >
              {/* 검색어 입력 부분 */}
              {/* <Input
                placeholder="검색어를 입력하세요..."
                onChange={(e) => {
                  setSearchKeyWord(e.target.value);
                }} // 검색 키워드 변경
                id="searchValue"
                inputRef={searchInput} // input 객체를 반환
                onKeyDown={(e) => {
                  // search(e);
                  }} // enter시 검색하는 함수
                /> */}
            <TextField
              id="standard-search"
              placeholder='검색어를 입력하세요...'
              type="search"
              variant="standard"
              inputRef={searchInput}
              onKeyUp={searchKeyword}
              sx={{ color: '##FFCA28', width: '75%' }}
            />
            
            {/* 돋보기 버튼 */}
            <IconButton
              type="button"
              sx={{ color: "#FFA000" }}
              aria-label="search"
              onClick={(e) => {
                // searchClick(e);
                search(e);
              }}
            >
              <SearchIcon/>
            </IconButton>
          </Grid>
        </Grid>
        {/* 검색바 끝 */}
      </Grid>
    <Grid
      height={'25%'}
    >
    {boards?.map((store, idx) => {
      return <BoardItem key={idx} item={store}/>;
    })}
        </Grid>
      </Grid>
      <NavBar/>
    </Grid>
  )
} 