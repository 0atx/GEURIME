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

export default function Board() { 
  const [test, setTest] = useState();
  const [list, setList] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체
  const handleChange = (event) => {
    setList(event.target.value);
  };

  useEffect(() => {
    setTest(  [{
      "boardCategory": "string",
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
    },
    {
      "boardCategory": "string",
      "boardFirstImage": "https://en.pimg.jp/031/716/685/1/31716685.jpg",
      "boardId": 1,
      "boardTitle": "2번글",
      "boardViews": 0,
      "commentCount": 0,
      "createTime": "2022-10-28T06:37:58.611Z",
      "updateTime": "2022-10-28T06:37:58.611Z",
      "userId": 0,
      "userNickname": "2번유저",
      "userProfileImage": "string"
    }])
  },[])
  useEffect(() => {
    console.log({테스트: test})
  }, [test])
  async function search(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("검색");
      searchInput.current.value = "";
    }
  }

  return (
    <Grid>
      <Grid>
      <BackMenu
          isLeft={true}
          title='커뮤니티'
          isRight="+"
      >
      </BackMenu>
      </Grid>
      
      <Grid
        id='container'
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        flexWrap={'nowrap'}
        marginLeft='5%'
      >
      <FormControl sx={{ height: '8vh', width: '16vh', Color: '#FFCA28'}}>
        <Select
          value={list}
          onChange={handleChange}
          displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={"제목"}>
            <em>제목</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
      {/* 검색바 영역 */}
      <Grid
        container
        direction="row"
        style={{ padding: "2vw" }}
        alignItems="center"
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
              sx={{ color: '##FFCA28', width: '75%' }}
              onKeyUp={search}
          />
            {/* 검색어 삭제 버튼 */}
            {searchKeyWord == null || searchKeyWord == "" ? null : (
              <IconButton
                type="button"
                sx={{ p: "8px" }}
                aria-label="search"
                onClick={() => {
                  searchInput.current.value = null; // input 객체의 값을 비운다.
                  setSearchKeyWord(null);
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            )}
            <Grid>
            {/* 돋보기 버튼 */}
            <IconButton
              type="button"
              sx={{ color: "#FFA000" }}
              aria-label="search"
              onClick={(e) => {
                // searchClick(e);
              }}
            >
              <SearchIcon />
              </IconButton>
            </Grid>
        </Grid>
      </Grid>

    {/* <div>
      <h1>{test[0].boardTitle}</h1>
    </div> */}
      </Grid>
      <Grid
        height={'25%'}
      >
      {test?.map((store, idx) => {
        return <BoardItem key={idx} item={store}/>;
      })}
    </Grid>
    </Grid>
  )

} 