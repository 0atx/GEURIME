import { Button, Grid, Paper } from "@mui/material";
import { http } from "api/http";
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CommentInputItem from "./CommentInputItem";

export default function DetailBoard( ) { 
  const location = useLocation()
  const [commentDtoList, setCommentDtoList] = useState([
    { 'commentId': 1, 'commentUserId': 20, 'commentUserProfile': 'https://geurime-a506.s3.ap-northeast-2.amazonaws.c…86a5a%5Chome%5Cubuntu%5Cstatic%5CsunnyClicked.png', 'commentUserNickname': '해안', 'createTime': '2022-11-03 14:41:00', 'updateTime': null },
    { 'commentId': 2, 'commentUserId': 20, 'commentUserProfile': 'https://geurime-a506.s3.ap-northeast-2.amazonaws.c…86a5a%5Chome%5Cubuntu%5Cstatic%5CsunnyClicked.png', 'commentUserNickname': '해안', 'createTime': '2022-11-03 14:41:01', 'updateTime': null}
    ])
  const [commentDtoList2, setCommentDtoList2] = useState([
    { commentId: 1, commentUserId: 20, commentUserProfile: 'https://geurime-a506.s3.ap-northeast-2.amazonaws.c…86a5a%5Chome%5Cubuntu%5Cstatic%5CsunnyClicked.png', commentUserNickname: '해안', createTime: '2022-11-03 14:41:00', updateTime: null },
    { commentId: 2, commentUserId: 20, commentUserProfile: 'https://geurime-a506.s3.ap-northeast-2.amazonaws.c…86a5a%5Chome%5Cubuntu%5Cstatic%5CsunnyClicked.png', commentUserNickname: '해안', createTime: '2022-11-03 14:41:01', updateTime: null}
    ])
  const [board, setBoard] = useState({
    boardCategory: "자유",
    boardCommentDtoList: [],
    boardContent: "아기가 운동하고 그림을 그렸어요!",
    boardId: 1,
    boardImagePathList: [],
    boardTitle: "현욱아기 탄생",
    boardViews: 23,
    createTime: "2022-10-27 09:55:05",
    updateTime: "2022-10-27 09:55:05",
    writerId: 1,
    writerNickname: "프로틴사랑",
    writerProfile: ''
  })
  
  const navigator = useNavigate();
  const getDetail = async () => {
    console.log({ 페이지id: location.pathname.slice(13,) })
    const boardid = location.pathname.slice(13,);
    const response = await http.get(`/boards/${boardid}`);
    if (response.data.message == "success") {
      setBoard(response.data.data)
      setCommentDtoList(response.data.data.boardCommentDtoList)
    } else {
      alert("게시글을 불러오지 못했습니다");
    }
  }

  useEffect(() => { 
    getDetail();
  }, [])
  useEffect(() => {
    console.log({ 보드아이템: commentDtoList })
  }, [board])


  
  return (
<Grid>
  <Grid
    sx={{
      margin: '4%',
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
          src={board.boardImagePathList}
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
        sx={{marginLeft: '5%', marginTop: '2.5%'}}
        >
            작성자 : {board.writerNickname}
        </Grid>
        
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
          <Grid
            
          >
              <QuestionAnswerOutlinedIcon fontSize="8" />
                {board.boardCommentDtoList.length}
          </Grid>
        </Grid>
    </Grid>
      <Paper
          variant="outlined"
          sx={{  borderBlockColor: '#FFE082', borderRadius: 2, borderColor: '#FFE082', borderWidth: 2.5,  height: '18vh', width:'90%',marginLeft:'5%'}}
      >
        <Grid sx={{marginTop:'2.5%', marginLeft: '3%'}}>{board.boardContent}</Grid>
          
      </Paper>

      {/* 버튼 */}
      <Grid
        sx={{ marginTop:'3%', textAlign:'center'}}
      >
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginRight: '12%' }}
          onClick={() => { console.log('hi')}}
        >삭제</Button>
        <Button
        variant="contained"
          sx={{ width: '25vw', borderRadius: 5, marginLeft: '12%'}}
          onClick={() => { console.log('hi')}}
        >등록</Button>
      </Grid>

      {/* 댓글 */}
      <Grid
      >
        {/* {JSON.stringify(board.boardCommentDtoList)} */}
        {/* {commentDtoList.map((store, idx) => {
          return <CommentInputItem key={idx} item={store}/>;
        })} */}
        {JSON.stringify(commentDtoList2)}

      {/* {board.boardCommentDtoList?.map((store, idx) => {
        return <CommentInputItem key={idx} item={store}/>;
      })} */}
    </Grid>
</Grid>
  )
}