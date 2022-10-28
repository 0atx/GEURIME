/*
@author 유현욱
@since 2022.10.28
*/
import * as React from 'react';
import { Grid } from "@mui/material";
import BackMenu from "components/nav/BackMenu";
import { useState, useEffect } from "react";
import BoardInputItem from "./BoardInputItem";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Board() { 
  const [test, setTest] = useState();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    setTest(  [{
      "boardCategory": "string",
      "boardFirstImage": "string",
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
      "boardFirstImage": "string",
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
  },[test])
  return (
    <div>
      {/* <Grid>
      <BackMenu
          isLeft={true}
          title='커뮤니티'
          isRight="+"
      >
      </BackMenu>
      </Grid> */}
      <Grid>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid>
        {test?.map((store, idx) => {
          return <BoardInputItem key={idx} item={store}/>;
        })}
      </Grid>
    {/* <div>
      <h1>{test[0].boardTitle}</h1>
    </div> */}
    </div>
  )

} 