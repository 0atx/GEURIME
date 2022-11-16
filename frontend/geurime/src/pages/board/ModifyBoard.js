/*
@author 유현욱
@since 2022.11.07
*/

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
import DeleteBoardModal from "components/modal/DeleteBoardModal";
import ModifyBoardModal from "components/modal/ModifyBoardModal";
import NoCommentModal from "components/modal/NoCommentModal";
import NoTitleModal from "components/modal/NoTitleModal";

export default function ModifyBoard() {
  const navigator = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [boardInfo, setBoardInfo] = useRecoilState(boardState);
  const [title, setTitle] = useState(boardInfo.boardTitle);
  const [text, setText] = useState(boardInfo.boardContent)
  const textRef = useRef();
  const titleRef = useRef();
  const [imageUrl, setImageUrl] = useState(boardInfo.boardImagePath);
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
    {
      value: '정보',
      label: '정보',
    },
  ];
  const [boardCategory, setBoardCategory] = useState(boardInfo.boardCategory);
  
  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };

  const regist = async () => {

    let formData = new FormData();
    // 이미지를 새로 등록했을 때
    if (imgRef.current.files[0]) {
      formData.append("imageFile", imgRef.current.files[0]);
    }
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
    // 엑시오스 요청
  
    if (imgRef.current.files) {

      if (titleRef.current.value == 0) {
        setOpenNoTitleModal(true)
      }
      else if (textRef.current.value == 0) {
        setOpenNoCommentModal(true)
      }
      else{
        const response = await http2.put(`/boards/${boardInfo.boardId}`, formData);
      if (response.data.message == "success") {
        setOpen(true);
      } else {
        alert("게시글을 수정하지 못했습니다");
        return;
        }
      }
    }
    else {
      if (titleRef.current.value == 0) {
        setOpenNoTitleModal(true)
      }
      else if (textRef.current.value == 0) {
        setOpenNoCommentModal(true)
      }
      else{
        const response = await http2.put(`/boards/${boardInfo.boardId}`, formData);
      if (response.data.message == "success") {
        // console.log('수정 완료!')
        // navigator("/Board");
        setOpen(true);
      } else {
        alert("게시글을 수정하지 못했습니다");
        return;
        }
      }
    }
  };

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

  // 삭제완료 모달
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // 게시글 삭제 함수
  const deleteBoard = () => {
      setOpenDeleteModal(true);
  };
  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  
  // 수정완료 모달
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
    <div>
    <BackMenu
      isLeft={true}
      title={boardInfo.boardTitle}
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
          onClick={() => deleteBoard()}
        >삭제</Button>
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginLeft: '30%'}}
          onClick={() => regist()}
        >등록</Button>
      </Grid>
      </Grid>
      
  {/* 삭제 모달 */}
    <DeleteBoardModal
      open={openDeleteModal}
      handleClose={closeDeleteModal}
      boardId = {boardInfo.boardId}
      userId = {userInfo.userId}
    >
    </DeleteBoardModal>
  
    {/* 등록 완료 모달 */}
      <ModifyBoardModal open={open} boardId={boardInfo.boardId}></ModifyBoardModal>
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
  </div>
  )
}