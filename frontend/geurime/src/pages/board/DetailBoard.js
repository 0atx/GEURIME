/*
@author 유현욱
@since 2022.11.02
*/

import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { http } from "api/http";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CommentIcon from "@mui/icons-material/Comment";
import CommentInputItem from "./CommentInputItem";
import NavBar from "components/nav/NavBar";
import BackMenu from "components/nav/BackMenu";
import { boardState } from "states/BoardState";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import moment from "moment";
import 'moment/locale/ko';
import sampleImage from "assets/boardSample.png";


import NoCommentModal from "components/modal/NoCommentModal";

export default function DetailBoard() { 
  const navigater = useNavigate();
  const location = useLocation()
  const [commentList, setCommentList] = useState([
   
    ])  
  const [board, setBoard] = useState({
    boardCategory: "",
    boardCommentDtoList: [],
    boardContent: "",
    boardId: 1,
    boardImagePathList: [],
    boardTitle: "",
    boardViews: 0,
    createTime: "2022-10-27 09:55:05",
    updateTime: "2022-10-27 09:55:05",
    writerId: 0,
    writerNickname: "",
    writerProfile: ''
  })
  
  const [user, setUser] = useState({
    userProfile: 'https://geurime-a506.s3.ap-northeast-2.amazonaws.c…86a5a%5Chome%5Cubuntu%5Cstatic%5CsunnyClicked.png'
  })

  const [boardInfo, setBoardInfo] = useRecoilState(boardState);
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 네브바 우측용
  const [rightNav, setRightNav] = useState('')
  useEffect(() => {
    if (boardInfo.writerId == userInfo.userId) {
      setRightNav('편집')
    } else {
      setRightNav('')
    }
  },[boardInfo])
  
  
  const navigator = useNavigate();
  // 페이지 들어왔을때 엑시오스 요청
  const getDetail = async () => {
    const boardid = location.pathname.slice(13,);
    const response = await http
      .get(`/boards/${boardid}`)
      .then((res) => {
        setBoard(res.data.data)
        setBoardInfo(res.data.data)
      })
      .catch((error) => {
          navigater("/norights");

      });
  }

  let [check, setCheck] = useState(false);
  useEffect(() => { 
    if (check == false){
      setCheck(true)
    }
    else{
      getDetail();
    }
    
  }, [check])
  
  const [comment, setComment] = useState()
  
  useEffect(() => {
    setCommentLen(commentList.length)
  }, [commentList])
  useEffect(() => {
    if (userInfo.userProfileImage == '') {
      getUserInfo()
    }

  }, [userInfo])
  async function getUserInfo() {
    const response = await http.get(`/users/${userInfo.userId}`);
    if (response.data.message === "success") {
      setUserInfo(response.data.data);
    }
  }

  const commentRef = useRef(null);
  
  // 댓글 모달
  const [openNoCommentModal, setOpenNoCommentModal] = useState(false);
  // 댓글 내용 없음 모달 닫기
  const closeNoCommentModal = () => {
    setOpenNoCommentModal(false);
  };
  // 댓글 개수
  const [commentLen, setCommentLen] = useState(0)
  
  // 댓글 불러오기
  useEffect(() => {
    getComment()
  }, [board])

  const getComment = async () => {
    const boardid = location.pathname.slice(13,);
    const response = await http.get(`/comments/${boardid}`);
    if (response.data.message == "success") {
      setCommentList(response.data.data)
    } else {
      alert("댓글을 불러오지 못했습니다");
    }
  }

    // 편집 댓글이 하나인지 여부
    const [checkOne, setCheckOne] = useState(false);
  
  function commentKeyword(e) {
    if (e.key === "Enter") {

      postComment()
    }
  }

  const postComment = async () => {
    // commentUserId 리코일에서 가져오기
    const boardid = location.pathname.slice(13,);
    if (commentRef.current.value != 0) { 
    const response = await http.post(`/comments`, 
      {
        boardId: boardid,
        commentContent: commentRef.current.value,
        commentUserId: userInfo.userId,
      }
    );

      if (response.data.message == "success") {
        if (commentRef.current.value !== 0) {
          commentRef.current.value = "";
          getComment()
        }
      }

      else {
        alert("댓글을 등록하지 못했습니다");
      }
    }
    else {
      setOpenNoCommentModal(true)
    }
  } 
  
  return (
  <div
  id='container'
  >
    <BackMenu
            isLeft={true}
            title={`${board.boardCategory} 게시판`}
            isRight={rightNav}
            clickRight={() => {
              navigator("/modifyBoard");
             }}
        >
    </BackMenu>
    <Grid
      sx={{width: '95vw', marginLeft: '2%'}}>
      <Grid
        sx={{
        marginRight: '4%',
        marginLeft: '5%',
        fontWeight:"bold",
        fontSize: '4.8vw'
        }}
         >
         제목:  { board.boardTitle }
      </Grid>
      <Grid
          item
          sx={{marginLeft: '5%', marginTop: '3%'}}
          >
              작성자 : {board.writerNickname}
      </Grid>
      {/* <Paper
        variant="outlined"
        sx={{
        alignItems: 'center', textAlign: 'center', margin: '3%', borderRadius: 3,
        borderColor: '#FFE082', borderWidth: 5}}
        xs={7}  
      >
      {board.boardImagePath == null ? (
          // 그림 업로드 안한 경우
          <>
            <img
              src={sampleImage}
              loading="lazy"
              style={{ height: '21vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '3.5%' }}
            />
          </>
        ) : (
          // 그림 업로드 한 경우
          <>
            <img
              src={board.boardImagePath}
              loading="lazy"
              style={{ height: '21vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '3.5%' }}
            />
          </>
        )}
      </Paper> */}
     <Paper
          variant="outlined"
          sx={{ marginTop:'3%',  backgroundColor: 'rgba(0,0,0,0)', borderRadius: 2, borderColor: '#FFE082', borderWidth: 2.5,  minHeight : '18vh', width:'94%', marginLeft:'3%'}}
      >
      <Grid
        sx={{alignItems: 'center', textAlign: 'center', margin: '3%', borderRadius: 3}}  
      >
      {board.boardImagePath == null ? (
          // 그림 업로드 안한 경우
          <>
            <img
              src={sampleImage}
              loading="lazy"
              style={{ height: '18vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '1%' }}
            />
          </>
        ) : (
          // 그림 업로드 한 경우
          <>
            <img
              src={board.boardImagePath}
              loading="lazy"
              style={{ height: '18vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '1%' }}
            />
          </>
        )}
      </Grid>
        <Grid item sx={{marginTop:'1%', marginBottom:'3%', marginLeft: '5%', backgroundColor: 'rgba(0,0,0,0)'}}>

          {board.boardContent.split("\n").map((line, idx) => {
            return <div key={idx}>
              <span>
                {line}
                <br />
              </span>
            </div>
          })}
        </Grid>
      </Paper>
      {/* 작성자, 뷰 */}
      <Grid
        container
        direction='row'
        sx={{ justifyContent: 'space-between', marginTop: '3%'}}
      >
        <Grid container alignItems="center" justifyContent="flex-end" sx={{marginRight: '5%' }}>
          <Visibility
            sx={{
              fontSize: "2vh",
              marginRight: "3%",
              color: "#6f6f6f",
            }}
          />
          <div style={{ marginRight: "3%" }}>{board.boardViews}</div>
          <CommentIcon
            sx={{
              fontSize: "2vh",
              marginRight: "3%",
              color: "#6f6f6f",
            }}
          />
          <div>{commentLen}</div>
        </Grid>
      </Grid>
     
      {/* 유저 아이디, 사진정보 리코일에서 가져오기 */}
    <Grid
      sx={{marginTop: '5%', marginLeft: '3%',alignItems: 'center'}}
      container
      direction='row'
    >
      {/* 아이콘 */}
      <Grid
      >
        <Avatar src={userInfo.userProfileImage} sx={{ width: '15vw', height: '15vw' }} />
      </Grid>
     {/* 작성 내용 */}
      <Grid
          item
        sx={{marginLeft:'5%',marginRight:'5%', justifyContent: 'space-between'}}
      >
          <TextField placeholder="댓글을 등록하세요..." variant="standard" sx={{width: '57vw'}} inputRef={commentRef} onKeyUp={commentKeyword}/>
          <Button onClick={postComment}>확인</Button>
     </Grid>
    </Grid>
    {/* 댓글 */}
    <Grid
    >
          {commentList.map((store) => {
            return <CommentInputItem key={store.id} item={store} setCommentList={setCommentList} getComment={getComment} setCheckOne={setCheckOne} checkOne={checkOne} />;
          })}

    </Grid>
      

    </Grid> 
    <NavBar />
    {/* 댓글 모달 */}
    <NoCommentModal
      open={openNoCommentModal}
      handleClose={closeNoCommentModal}
    ></NoCommentModal>
  </div>
  )
}