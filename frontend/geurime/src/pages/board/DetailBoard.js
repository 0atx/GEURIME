import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { http } from "api/http";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CommentInputItem from "./CommentInputItem";
import NavBar from "components/nav/NavBar";
import BackMenu from "components/nav/BackMenu";
import { boardState } from "states/BoardState";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import moment from "moment";

export default function DetailBoard( ) { 
  const location = useLocation()
  const [commentDtoList, setCommentDtoList] = useState([
    { 'commentId': 1, 'commentUserId': 20, 'commentUserProfile': 'https://geurime-a506.s3.ap-northeast-2.amazonaws.c…86a5a%5Chome%5Cubuntu%5Cstatic%5CsunnyClicked.png', 'commentUserNickname': '해안', 'createTime': '2022-11-03 14:41:00', 'updateTime': null },
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
    if (boardInfo.writerId == userInfo.userID) {
      setRightNav('편집')
    } else {
      setRightNav('')
    }
  },[boardInfo])
  
  const navigator = useNavigate();
  // 페이지 들어왔을때 엑시오스 요청
  const getDetail = async () => {
    console.log({ 페이지id: location.pathname.slice(13,) })
    const boardid = location.pathname.slice(13,);
    const response = await http.get(`/boards/${boardid}`);
    if (response.data.message == "success") {
      setBoard(response.data.data)
      setBoardInfo(response.data.data)
      setCommentDtoList(response.data.data.boardCommentDtoList)
    } else {
      alert("게시글을 불러오지 못했습니다");
    }
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
    console.log({ 보드아이템: commentDtoList })
    console.log({유저정보: userInfo})
    console.log({댓글: comment})
  }, [commentDtoList])

  // const [commentText, setCommentText] = useState();
  const commentRef = useRef(null);

    // const onReset = (e) => {
    // setText("");
    // };

  const postComment = async () => {
    // commentUserId 리코일에서 가져오기
    const boardid = location.pathname.slice(13,);
    console.log({ 현재댓글: commentRef.current.value });
    if (commentRef.current.value != 0) { 
    const response = await http.post(`/comments`, 
      {
        boardId: boardid,
        commentContent: commentRef.current.value,
        commentUserId: userInfo.userID,
      }
    );

      if (response.data.message == "success") {
        if (commentRef.current.value !== 0) {
          setCommentDtoList([...commentDtoList, {
            commentUserNickname: userInfo.nickName,
            commentContent: commentRef.current.value,
            commentUserId: userInfo.userID,
            commentUserProfile: userInfo.userProfileImage,
            createTime: moment().format('YYYY-MM-DD HH:mm:ss')
          }])
          commentRef.current.value = "";
        }
      }

      else {
        alert("댓글을 등록하지 못했습니다");
      }
    }
    else {
      alert('댓글 내용을 입력해주세요')
    }
  } 
  
  return (
    <div>
    <BackMenu
            isLeft={true}
            title={'['+ board.boardCategory +'] ' + board.boardTitle}
            isRight={rightNav}
            clickRight={() => {
              navigator("/modifyBoard");
            }}
        >
    </BackMenu>
    <Grid id="container"
      sx={{width: '95vw', marginLeft: '2%'}}>
      <Grid
        sx={{
        marginRight: '4%',
        marginLeft: '5%',
        fontWeight:"bold"
        }}
         >
          [{board.boardCategory}] {board.boardTitle}
      </Grid>
      <Paper
        variant="outlined"
        sx={{
        alignItems: 'center', textAlign: 'center', margin: '3%', borderRadius: 3,
        borderColor: '#FFE082', borderWidth: 5}}
        xs={7}  
      >
        <img
          src={board.boardImagePathList[0]}
          loading="lazy"
          style={{ height: '21vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '3.5%' }}
          />
      </Paper>

      {/* 작성자, 뷰 */}
      <Grid
        container
        direction='row'
        sx={{ justifyContent: 'space-between' }}
      >
        
        <Grid
          item
          sx={{marginLeft: '5%', marginTop: '1%'}}
          >
              작성자 : {board.writerNickname}
        </Grid>
        
        <Grid
          item
          xs={3.5}
          sx={{ marginTop: '1%'}}
        >
          <Grid
          container
          direction='row'
          >
              <Grid
                    sx={{marginRight: '10%'}}
                  >
                  <Visibility fontSize="8"/>
                      {board.boardViews}
              </Grid> 
              <Grid>
                  <QuestionAnswerOutlinedIcon fontSize="8" />
                    {board.boardCommentDtoList.length}
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper
          variant="outlined"
          sx={{ marginTop:'3%', borderBlockColor: '#FFE082', borderRadius: 2, borderColor: '#FFE082', borderWidth: 2.5,  height: '18vh', width:'94%',marginLeft:'3%'}}
      >
        <Grid sx={{marginTop:'2.5%', marginLeft: '3%'}}>{board.boardContent}</Grid>
          
      </Paper>


      {/* 유저 아이디, 사진정보 리코일에서 가져오기 */}
      <Grid
      sx={{marginTop: '5%', marginLeft: '3%',alignItems: 'center'}}
      container
      direction='row'
    >
      {/* 아이콘 */}
      <Grid
          item
      >
        <Avatar src={userInfo.userProfileImage} sx={{ width: '15vw', height: '15vw' }} />
      </Grid>
     {/* 작성 내용 */}
      <Grid
          item
        sx={{marginLeft:'5%', justifyContent: 'space-between'}}
      >
          <TextField placeholder="댓글을 등록하세요..." variant="standard" sx={{width: '57vw'}} inputRef={commentRef} />
          <Button onClick={postComment}>확인</Button>
     </Grid>
    </Grid>
      {/* 댓글 */}
      <Grid
      >
      {commentDtoList?.map((store, idx) => {
        return <CommentInputItem key={idx} item={store}/>;
      })}

      </Grid>
      

      </Grid> 
      <NavBar/>
      </div>
  )
}