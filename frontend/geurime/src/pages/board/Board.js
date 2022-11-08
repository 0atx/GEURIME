/*
@author 유현욱
@since 2022.10.28
*/
import * as React from 'react';
import { Grid,TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useRef } from "react";
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BoardItem from './BoardItem';
import BackMenu from 'components/nav/BackMenu';
import { http } from "api/http";
import { useNavigate } from "react-router-dom";
import NavBar from 'components/nav/NavBar';
import NoSearchModal from 'components/modal/NoSearchModal';

export default function Board() { 
  const navigator = useNavigate();


  // 게시판 데이터
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
  }]);
  const [category, setCategory] = useState(''); // 카테고리 변수명
  // const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체
  // 카테고리 변경시 할당
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // 전체 게시글 조회 axios
  const getBoard = async () => {
    const response = await http.get(`/boards`, {
      params: {
        page: 0,
        size: 10
      }
    });

    if (response.data.message == "success") {
      setBoards(response.data.data)
    } else {
      alert("게시글을 불러오지 못했습니다");
    }
  }

  // 전체 게시글 불러오기
  useEffect(() => {
    getBoard()
  }, [])

  function searchKeyword(e) {
    if (e.key === "Enter") {
      search()
    }
  }
  
  // 검색 axios
  const search = async () => {

    const response = await http.get(`/boards/search`, {
      params: {
        category: category,
        keyword: searchInput.current.value,
        page: 0,
        size: 10
      }
    });
    if (response.data.message == "success") {
      console.log({ 검색결과: response.data.data })
      if (response.data.data.length == 0) {
        setOpenNoSearchModal(true);
      } else {
        setBoards(response.data.data)
      }
    } else {
      alert("게시글을 불러오지 못했습니다");
    }
  }

  const [openNoSearchModal, setOpenNoSearchModal] = useState(false);
  // 검색결과없음 모달 닫기
  const closeNoSearchModal = () => {
    setOpenNoSearchModal(false);
  };
  
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
              value={category}
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
          >
            {/* 검색어 입력 부분 */}
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
      <NavBar />
  <NoSearchModal
    open={openNoSearchModal}
    handleClose={closeNoSearchModal}
  >
  </NoSearchModal>
    </Grid>
  )
} 