import { Avatar, Grid } from "@mui/material";
import { useEffect, useState } from "react";

export default function CommentInputItem({item}) { 
  const [createDate, setCreateDate] = useState(item.createTime);
  const [createTime, setCreateTime] = useState(item.createTime);
  useEffect(() => {
    let a = item.createTime.split(' ');
    console.log({수정중: a})
    setCreateTime(a[0].split('-'))
    setCreateDate(a[1])
  }, [])
  return (
    <Grid
      sx={{marginTop: '5%', marginLeft: '3%'}}
      container
      direction='row'
    >
      {/* 아이콘 */}
      <Grid
        item
      >
        <Avatar src={item.commentUserProfile} sx={{ width: '15vw', height: '15vw' }} />
      </Grid>
      {/* 작성 내용 */}
      <Grid
        sx={{marginLeft:'3%'}}
      >
        <div>{item.commentUserNickname}</div>
        <div>{item.commentContent}</div>
        <div>{item.createTime[0]}</div>
      </Grid>
    </Grid>
    )
}