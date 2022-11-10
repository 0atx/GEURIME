/*
@author 유현욱
@since 2022.11.02
*/
import { Avatar, Grid, IconButton } from "@mui/material";
import moment from "moment";
import 'moment/locale/ko';
import { useEffect, useRef, useState } from "react";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function CommentInputItem({ item }) {

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const [createTime, setCreateTime] = useState(<span style={{ fontSize: 13, fontWeight: 200 }}>시간 불러오는중...</span>)

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {

      setYear(new Date(item.createTime).getFullYear());
      setMonth(new Date(item.createTime).getMonth() + 1);
      setDate(new Date(item.createTime).getDate());
    }
  }, [])
  
  return (
    <Grid
      sx={{marginTop: '5%', marginLeft: '3%', alignItems:'center'}}
      container
      direction='row'
    >
      {/* 아이콘 */}
      <Grid
        item
      >
        <Avatar src={item.commentUserProfile} sx={{ width: '15vw', height: '15vw' }} />
      </Grid>
      <Grid
        item
      >
      <Grid
          container
          sx={{ alignItems: 'center' }}
      >
      {/* 작성 내용 */}
        <Grid
          item
          sx={{ marginLeft: '3%' }}
          xs={10}
        >
          <div style={{width : '50vw'}}>{item.commentUserNickname}</div>
          <div>{item.commentContent}</div>
            <span style={{ fontSize: 13, fontWeight: 200 }}>{moment(item.createTime).fromNow()}</span>
      
        </Grid>
      {/* 편집 버튼 */}
        {/* <Grid
            item
            sx={{ justifyContent: 'flex-end'}}
        >
          <IconButton color="primary" component="label" onClick={''}>
            <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
          </IconButton>   
            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>

        </Grid> */}
        </Grid>
      </Grid>
    </Grid>
    )
}