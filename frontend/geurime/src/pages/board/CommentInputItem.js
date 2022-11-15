/*
@author 유현욱
@since 2022.11.02
*/
import { Avatar, Button, Grid, TextField } from "@mui/material";
import moment from "moment";
import 'moment/locale/ko';
import { useEffect, useRef, useState } from "react";
// import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteCommentModal from "components/modal/DeleteCommentModal";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ModifyCommentModal from "components/modal/ModifyCommentModal";
import NoCommentModal from "components/modal/NoCommentModal";
import { http } from "api/http";

export default function CommentInputItem({ item, setCommentList, getComment, checkOne, setCheckOne }) {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  useEffect(() => {
    console.log({ 아이템: item })
    console.log(item.id)
  }, [])

  const [comment, setComment] = useState(item.commentContent)
  // 삭제완료 모달
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // 게시글 삭제 함수
  const deleteComment = () => {
    setOpenDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  //수정완료 모달
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const closeModifyModal = () => {
    setOpenModifyModal(false);
  };

  // 댓글 내용없음 모달
  const [openNoCommentModal, setOpenNoCommentModal] = useState(false);
  // 내용 없음 모달 닫기
  const closeNoCommentModal = () => {
    setOpenNoCommentModal(false);
  };

  // 편집 여부
  const [checkEdit, setCheckEdit] = useState(false);
  const clickEdit = () => {
    setCheckEdit(true)
    setCheckOne(true)
  }

  // 댓글 수정 로직
  const modifyComment = async () => {
    if (comment.length != 0) {
      const response = await http.put(`/comments/${item.id}`,
        {
          commentContent: comment,
          commentId: item.id,
          userId: userInfo.userId,
        }
      );
      setCheckEdit(false)
      setCheckOne(false)

      if (response.data.message == "success") {
        setOpenModifyModal(true);
        getComment()
      }
    }
    else {
      setOpenNoCommentModal(true)
    }
  }

  function changeComment(e) {
    setComment(e.target.value)
  }



  // 편집, 삭제 아이콘들
  const [toolBox, setToolBox] = useState('')
  useEffect(() => {
    if (item.commentUserId == userInfo.userId) {
      setToolBox(<>
        <Grid item xs={1.5}>
        <EditOutlinedIcon onClick={() => clickEdit()}/>
        </Grid>
        <Grid item xs={1.5}>

        <DeleteOutlineOutlinedIcon onClick={() => deleteComment()} />

        </Grid>
        </>
      )
    } else {
      <></>
    }
  },[])

  return (
    <Grid
      sx={{marginTop: '5%', alignItems:'center',}}
      container
      direction='row'
      justifyContent="space-between"
    >
      {/* 아이콘 */}
      <Grid
        item
        xs={2}
        sx={{ margin: "auto"}}
      >
        <Avatar src={item.commentUserProfile} sx={{ width: '15vw', height: '15vw' }} />
      </Grid>


      {/* 작성 내용 */}
      <Grid
        item
        sx={{ marginLeft: '3%', }}
        xs={9}
      >
        <div style={{width :'50vw'}}>{item.commentUserNickname}</div>
        <Grid container>
          {checkEdit == true && checkOne== true? 
          // 수정 안누르면 내용만 표시
          <Grid item xs={9}>
            <TextField value={comment} variant="standard" sx={{width: '55vw'}} onChange={(e) => {changeComment(e);}}/>
          </Grid>
        : (
          <Grid item xs={9}>
            {item.commentContent}
          </Grid>
          )}

        {/* 31 번째 줄에서 if 문 걸어놨음 */}
          {checkEdit == false && item.commentUserId == userInfo.userId && checkOne == false? 
            <>
            <Grid item xs={1.5}>
            <EditOutlinedIcon onClick={() => clickEdit()}/>
            </Grid>
            <Grid item xs={1.5}>
    
            <DeleteOutlineOutlinedIcon onClick={() => deleteComment()} />
    
              </Grid> </>
            :checkEdit == true && item.commentUserId == userInfo.userId && checkOne == true?  
            
            <CheckOutlinedIcon onClick={() => modifyComment()} />

              : (
                <></>
           )}
      </Grid>
        <span style={{ fontSize: 13, fontWeight: 200 }}>{moment(item.createTime).fromNow()}</span>
      </Grid>
      <DeleteCommentModal
        open={openDeleteModal}
        handleClose={closeDeleteModal}
        commentId={item.id}
        userId={userInfo.userId}
        setCommentList={setCommentList}
        getComment={getComment}
        // setCommentLen={setCommentLen}
        // commentLen={commentLen}
      >
      </DeleteCommentModal>
      <ModifyCommentModal
        open={openModifyModal}
        handleClose={closeModifyModal}
        setOpenModifyModal={setOpenModifyModal}
      >
      </ModifyCommentModal>
      {/* 내용 없음 모달 */}
      <NoCommentModal
        open={openNoCommentModal}
        handleClose={closeNoCommentModal}
      ></NoCommentModal>
  </Grid>
  )
}