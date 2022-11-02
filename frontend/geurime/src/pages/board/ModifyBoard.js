import { Button, Grid } from "@mui/material";
import { http } from "api/http";
import { useState } from "react";
import BoardInputItem from "./BoardInputItem";

export default function ModifyBoard() { 
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
  return (
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
      <Grid>
        <Button
        variant="contained"
          sx={{ width: '40vw', borderRadius: 5 }}
          onClick={regist}
        >게시글 등록</Button>
      </Grid>
    </Grid>
  )
}