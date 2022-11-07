import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { fontWeight } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import DetailBoard from "./DetailBoard";



export default function BoardItem({ item }) { 
  const navigator = useNavigate();
  // useEffect(() => {
  //   console.log({아이템: item})
  // }, [])
  const time = item.createTime.substring(0, 10);
  return (
    <Link
      to={"/detailboard/" + item.boardId}
      style={{  textDecoration: 'none' }}
    >
    <Paper
      style={{ margin: '3%', marginBottom: '5%' }}
      variant="outlined"
      sx={{
        borderColor: '#FFE082',
        borderWidth: 3,
        borderRadius: 3
      }}
    >
      {/* 제목 부분 */}
      <Grid
        sx={{
          margin: '4%',
          marginLeft: '5%',
          fontWeight:"bold"
        }}
      >
       [{item.boardCategory}] {item.boardTitle}
      </Grid>
      
      {/* 사진 */}
      <Grid
        container
        sx={{alignItems: 'center', display: 'flex'}}
        direction="row"
        flexWrap={'nowrap'}
      >
        <Grid
          item
          sx={{ alignItems: 'center', textAlign: 'center', margin: '3%', borderRadius: 3 }}
          xs={7}
          backgroundColor="#E1E1E1"
        >
        <img
          src={item.boardImagePath}
          loading="lazy"
          style={{ height: '14vh', width: '19vh', margin: '2%', borderRadius: 5, marginTop: '3.5%' }}
          />

      </Grid>

        <Grid
          justifyContent="center"
          sx={{ marginTop: '3%', marginLeft: '2%' }}
          xs={5}
        >
          <Grid>
            작성자 : {item.userNickname}
         </Grid>
          <Grid
            sx={{ marginTop: '6%' }}
          >
            작성일 :
            </Grid>
            <Grid
              sx={{marginTop: '3%'}}
            >
              {time}
            </Grid>
          <Grid
            sx={{ marginTop: '6%'}}
            justifyContent="center"
          >
            <Grid
                container
                direction="row"
            >
              <Grid
                sx={{marginRight: '5%'}}
              >
              <Visibility fontSize="8"/>
                  {item.boardViews}
              </Grid>
              <Grid>
              <QuestionAnswerOutlinedIcon fontSize="8" />
                {item.commentCount}
              </Grid>
          </Grid>
          </Grid>
          
        </Grid>
      </Grid>
      </Paper>
      </Link>
  )
}