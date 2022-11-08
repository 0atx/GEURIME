/*
@author 유현욱
@since 2022.11.04
*/

import { Button, Grid } from "@mui/material";
import { http2 } from "api/http2";
import { useRef, useState } from "react";
import BoardInputItem from "./BoardInputItem";
import { useNavigate } from "react-router-dom";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import RegistBoardModal from "components/modal/RegistBoardModal";

export default function RegistBoard() { 
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigator = useNavigate();
  const [title, setTitle] = useState();
  const titleRef = useRef();
  const [text, setText] = useState();
  const textRef = useRef();
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
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();

  // const titleChange = (event) => {
  //   setTitle(event.target.value);
  // };

  // const textChange = (event) => {
  //   setText(event.target.value);
  // };
  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };

  // 게시글 등록 함수
  const regist = async () => {
    
    let formData = new FormData();
    formData.append("imageFile", imgRef.current.files[0]);
    console.log({이미지: imgRef.current.files[0]})
    console.log({ 제목: titleRef.current.value })
    console.log({ 내용: textRef.current.value })
    // 유저 아이디 리코일에서 가져오게 해야됨
    let request = {
      userId: userInfo.userId,
      boardTitle: titleRef.current.value,
      boardContent: textRef.current.value,
      boardCategory: boardCategory,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );
    // 엑시오스 요청
    console.log('등록중')
    console.log({ 폼데이터: formData })
    if (titleRef.current.value == 0) {
      alert('제목을 입력해주세요')
    }
    else if (textRef.current.value == 0) {
      alert('내용을 입력해주세요')
    }
    else{
    const response = await http2.post(`/boards`, formData);
    if (response.data.message == "success") {
      console.log('등록 완료!')
      // navigator("/Board");
      setOpen(true);
    } else {
      alert("게시글을 등록하지 못했습니다");
      return;
      }
    }
  }


  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      // 화면에 읽힐 수 있는 url로 변경
      setImageUrl(reader.result);
    };
  }
  // 등록완료 모달
  const [open, setOpen] = useState(false);
  

  return (
    <Grid
    id='container'
      container
      
    sx={{textAlign: "center", justifyContent: 'center'}}
    >
    <BackMenu
      isLeft={true}
      title='게시글 등록'
      isRight="등록"
      clickRight={() => {
        regist();
        }}
    >
    </BackMenu>
      <BoardInputItem
        // titleChange={titleChange}
        // textChange={textChange}
        handleChange={handleChange}
        boardCategory={boardCategory}
        boardCategories={boardCategories}
        changeProfile={changeProfile}
        imgRef={imgRef}
        imageUrl={imageUrl}
        textRef={textRef}
        titleRef={titleRef}
      ></BoardInputItem>
      <Grid
      sx={{marginTop: '5%'}}>
        <Button
        variant="contained"
          sx={{ width: '40vw', borderRadius: 5 }}
          onClick={() => { regist(); }}
        >게시글 등록</Button>
      </Grid>
      {/* 등록 완료 모달 */}
      <RegistBoardModal open={open}></RegistBoardModal>
    </Grid>
    )
};