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
import NoCommentModal from "components/modal/NoCommentModal";
import NoTitleModal from "components/modal/NoTitleModal";

export default function RegistBoard() { 
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigator = useNavigate();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const titleRef = useRef();
  const textRef = useRef();
  const boardCategories = [
    {
      value: '자유',
      label: '자유',
    },
    {
      value: '질문',
      label: '질문',
    },
    {
      value: '정보',
      label: '정보',
    },
  ];

  const [boardCategory, setBoardCategory] = useState('자유');
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();
  function changeText(e) {

  }
  function changeTitle(e) {

  }
  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };

  // 게시글 등록 함수
  const regist = async () => {
    
    let formData = new FormData();
    formData.append("imageFile", imgRef.current.files[0]);
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
    if (titleRef.current.value == 0) {
      setOpenNoTitleModal(true)
    }
    else if (textRef.current.value == 0) {
      setOpenNoCommentModal(true)
    }
    else{
    const response = await http2.post(`/boards`, formData);
    if (response.data.message == "success") {
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
      setImageUrl(reader.result);
    };
  }
  // 등록완료 모달
  const [open, setOpen] = useState(false);
  
  // 내용 모달
  const [openNoCommentModal, setOpenNoCommentModal] = useState(false);
  // 내용 없음 모달 닫기
  const closeNoCommentModal = () => {
    setOpenNoCommentModal(false);
  };

  // 제목 모달
    const [openNoTitleModal, setOpenNoTitleModal] = useState(false);
  // 제목 없음 모달 닫기
    const closeNoTitleModal = () => {
      setOpenNoTitleModal(false);
    };

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
        handleChange={handleChange}
        boardCategory={`${boardCategory}`}
        boardCategories={boardCategories}
        changeProfile={changeProfile}
        imgRef={imgRef}
        imageUrl={imageUrl}
        textRef={textRef}
        titleRef={titleRef}
        changeText={changeText}
        changeTitle={changeTitle}
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
      {/* 내용 없음 모달 */}
      <NoCommentModal
        open={openNoCommentModal}
        handleClose={closeNoCommentModal}
      ></NoCommentModal>
      {/* 제목 없음 모달 */}
      <NoTitleModal
        open={openNoTitleModal}
        handleClose={closeNoTitleModal}
      ></NoTitleModal>
    </Grid>
    )
};