import { Button, Grid } from "@mui/material";
import { http } from "api/http";
import { http2 } from "api/http2";
import BackMenu from "components/nav/BackMenu";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardState } from "states/BoardState";
import BoardInputItem from "./BoardInputItem";
import { userState } from "states/UserState";

export default function ModifyBoard() {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [boardInfo, setBoardInfo] = useRecoilState(boardState);
  const [title, setTitle] = useState(boardInfo.boardTitle);
  const [text, setText] = useState(boardInfo.boardContent)
  const textRef = useRef();
  const titleRef = useRef();
  const [imageUrl, setImageUrl] = useState(boardInfo.boardImagePathList[0]);
  const [images, setImages] = useState();
  const imgRef = useRef();
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
  const [boardCategory, setBoardCategory] = useState(boardInfo.boardCategory);
  
  // const titleChange = (event) => {
  //   setTitle(event.target.value);
  //   console.log({제목: title})
  // };

  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };

  const regist = async () => {
    // setTitle(event.target.value);
    // console.log({제목: title})
    console.log('수정중')
    let formData = new FormData();
    // 이미지를 새로 등록했을 때
    if (imgRef.current.files[0]) {
      formData.append("imageFile", imgRef.current.files[0]);
      console.log({ 이미지: imgRef.current.files[0] })
    }
    // else {
    //   formData.append("imageFile", null);
    // }
    console.log({ 현재제목: titleRef.current.value })
    console.log({ 현재내용: textRef.current.value })
    console.log({ 현재카테고리: boardCategory })
    console.log({ 현재유저아이디: userInfo.userID })
    console.log({ 사진:  imgRef.current.files[0]})
    // 유저 아이디 리코일에서 가져오게 해야됨
    let request = {
      boardId: boardInfo.boardId,
      boardTitle: titleRef.current.value,
      boardContent: textRef.current.value,
      boardType: boardCategory,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );
    // 엑시오스 요청
    // 이미지 수정했을 때
    if (imgRef.current.files[0]) {
      const response = await http2.put(`/boards`, formData);
      if (response.data.message == "success") {
        console.log('수정 완료!')
        navigator(`/detailboard/${boardInfo.boardId}`);
      } else {
        alert("게시글을 수정하지 못했습니다");
        return;
      }
    }
    else {
      const response = await http.put(`/boards`, formData);
      if (response.data.message == "success") {
        console.log('수정 완료!')
        navigator(`/detailboard/${boardInfo.boardId}`);
      } else {
        alert("게시글을 수정하지 못했습니다");
        return;
      }
    }
  };

  const del = async () => {
    console.log('삭제 시도')
    console.log({ 유저아이디: userInfo.userID })
    console.log({ 게시물아이디: boardInfo.boardId})
    const response = await http.delete(`/boards`, {
      params: {
        boardId: boardInfo.boardId,
        userId: userInfo.userID
      }
    });
    if (response.data.message == "success") {
      alert('게시글을 삭제했습니다')
      navigator(`/board`);
    } else {
      alert("게시글을 삭제하지 못했습니다");
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
  function changeText(e) {
    setText(e.target.value)
  }
  
  function changeTitle(e) {
    setTitle(e.target.value)
  }

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
        navigator(`/detailboard/${boardInfo.boardId}`);
        }}
    >
    </BackMenu>
    <Grid
    id='container'
    container
    sx={{textAlign: "center", justifyContent: 'center'}}
    >
      <BoardInputItem
          // titleChange={titleChange}
        textRef={textRef}
        titleRef={titleRef}
        handleChange={handleChange} 
        changeProfile={changeProfile}
        changeTitle={changeTitle}
        changeText={changeText}
        boardCategory={boardCategory}
        boardCategories={boardCategories}
        imageUrl={imageUrl}
        imgRef={imgRef}
        text={text}
        title={title}
        ></BoardInputItem>
        {/* 버튼 */}
      <Grid
        container
        sx={{ marginTop:'5%'}}
      >
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginLeft: '10%' }}
          onClick={() => del()}
        >삭제</Button>
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginLeft: '30%'}}
          onClick={() => regist()}
        >등록</Button>
      </Grid>
    </Grid>
    </div>
  )
}