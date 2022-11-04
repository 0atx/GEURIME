import { Button, Grid } from "@mui/material";
import { http } from "api/http";
import BackMenu from "components/nav/BackMenu";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { boardState } from "states/BoardState";
import BoardInputItem from "./BoardInputItem";

export default function ModifyBoard() { 
  const [boardInfo, setBoardInfo] = useRecoilState(boardState);
  const [title, setTitle] = useState();
  const boardCategories = [
    // {
    //   value: 'USD',
    //   label: '$',
    // },
    {
      value: '자유',
      label: '자유',
    },
    {
      value: '질문',
      label: '질문',
    },
  ];
  const [boardCategory, setBoardCategory] = useState('자유');
  const titleChange = (event) => {
    setTitle(event.target.value);
    console.log({제목: title})
  };

  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };

  const regist = async () => {
    // setTitle(event.target.value);
    // console.log({제목: title})
    console.log('등록중') 
    // const response = await http.post(`/boards`, {
    //   params: {

    //   }
    // });
    // console.log({전체게시글: response.data });

    // if (response.data.message == "success") {

    // } else {
    //   alert("게시글을 등록하지 못했습니다");
    // }
  };
  useEffect(() => {
    console.log({디테일정보: boardInfo})
  },[])
  return (
    <div>
    <BackMenu
      isLeft={true}
      title="제목"
      isRight="완료"
    clickRight={() => {
      navigator("/modifyBoard");
      }}
    >
    </BackMenu>
    <Grid
    id='container'
    container
    sx={{textAlign: "center", justifyContent: 'center'}}
    >
      <BoardInputItem
        titleChange={titleChange}
        handleChange={handleChange}
        boardCategory={boardCategory}
        boardCategories={boardCategories}
        ></BoardInputItem>
        {/* 버튼 */}
      <Grid
        container
        sx={{ marginTop:'5%'}}
      >
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginLeft: '10%' }}
          onClick={() => { console.log('hi')}}
        >삭제</Button>
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginLeft: '30%'}}
          onClick={() => { console.log('hi')}}
        >등록</Button>
      </Grid>
    </Grid>
    </div>
  )
}