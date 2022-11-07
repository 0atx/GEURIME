import { Avatar, Grid, IconButton } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function CommentInputItem({ item }) {

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const [createTime, setCreateTime] = useState(<span style={{ fontSize: 13, fontWeight: 200 }}>시간 불러오는중...</span>)

  // 시간계산 마저 하기
  
  // useEffect(() => {
  //   // let a = item.createTime.split(' ');
  //   // console.log({ 수정중: a })
  //   // setCreateTime(a[0].split('-'))
  //   // setCreateDate(a[1])
  //   console.log({ 현재시간: nowTime });
  //   console.log({ 작성시간: item.createTime })
  //   console.log({계산중: nowTime.moment.diff(item.createTime)})
  //   // if (new Date(nowTime).getDate() == date) {
  //   //   setCreateTime(<text style={{ fontSize: 13, fontWeight: 200 }}>{year}년 {month}월 {date}일</text>)
  //   // }
  //   if (parseInt(item.createTime - nowTime) > -60000) {
  //     setCreateTime(<text style={{ fontSize: 13, fontWeight: 200 }}>{year}년 {month}월 {date}일</text>)
  //   }
  //   else { 
  //     if (new Date(nowTime).getDate()) {

  //     }
  //    }
  // }, [date])

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {

      setYear(new Date(item.createTime).getFullYear());
      setMonth(new Date(item.createTime).getMonth() + 1);
      setDate(new Date(item.createTime).getDate());
    }
    // if {
    //   const nowDate = detailDate(new Date(detailPost.createdAt));
    // }
  }, [])
  
  // const detailDate = (a) => {
	// 	const milliSeconds = new Date() - a;
	// 	const seconds = milliSeconds / 1000;
	// 	if (seconds < 60) return `방금 전`;
	// 	const minutes = seconds / 60;
	// 	if (minutes < 60) return `${Math.floor(minutes)}분 전`;
	// 	const hours = minutes / 60;
	// 	if (hours < 24) return `${Math.floor(hours)}시간 전`;
  //   const days = hours / 24;
  //   if (hours >= 24) return (
  //     setYear(new Date(item.createTime).getFullYear());
  //     setMonth(new Date(item.createTime).getMonth() + 1);
  //     setDate(new Date(item.createTime).getDate());)
	// 	// if (days < 7) return `${Math.floor(days)}일 전`;
	// 	// const weeks = days / 7;
	// 	// if (weeks < 5) return `${Math.floor(weeks)}주 전`;
	// 	// const months = days / 30;
	// 	// if (months < 12) return `${Math.floor(months)}개월 전`;
	// 	// const years = days / 365;
	// 	// return `${Math.floor(years)}년 전`;
	// };
  
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
          <div>{item.commentUserNickname}</div>
          <div>{item.commentContent}</div>
          <span style={{ fontSize: 13, fontWeight: 200 }}>{year}년 {month}월 {date}일</span>
        {createTime}
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