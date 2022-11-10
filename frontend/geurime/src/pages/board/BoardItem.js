/*
@author 유현욱
@since 2022.10.28
*/
import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import { fontWeight } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import DetailBoard from "./DetailBoard";

export default function BoardItem({ item }) {
  const navigator = useNavigate();
  // useEffect(() => {
  //   console.log({아이템: item})
  // }, [])
  const time = item.createTime.substring(0, 10);

  const year = item.createTime.substring(2, 4);
  const month = item.createTime.substring(5, 7);
  const day = item.createTime.substring(8, 10);

  const date = year + "." + month + "." + day;

  return (
    <Grid
      onClick={() => {
        navigator(`/detailboard/${item.boardId}`);
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          borderColor: "#FFE082",
          borderWidth: 3,
          borderRadius: 3,
          marginBottom: "2vh",
          backgroundColor: "rgba(0,0,0,0)",
        }}
      >
        <Grid container sx={{ padding: "2vh" }}>
          {/* 제목 부분 */}
          <Grid
            item
            xs={12}
            sx={{
              fontWeight: "bold",
              fontSize: "2.3vh",
            }}
          >
            [{item.boardCategory}]
            {item.boardTitle.length > 13 ? (
              <> {item.boardTitle.substring(0, 12)}..</>
            ) : (
              <> {item.boardTitle}</>
            )}
          </Grid>
          <Grid
            container
            sx={{ marginTop: "2vh" }}
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              {item.userNickname.length > 6 ? (
                <>작성자: {item.userNickname.substring(0, 5)}..</>
              ) : (
                <>작성자: {item.userNickname}</>
              )}
            </Grid>
            <Grid item xs={5.5} sx={{ textAlign: "right" }}>
              작성일: {date}
            </Grid>
          </Grid>

          {/* 사진 */}
          <Grid container sx={{ marginTop: "2vh" }} alignItems="center">
            <Grid item xs={12}>
              <img
                src={item.boardImagePath}
                loading="lazy"
                style={{
                  height: "18vh",
                  width: "100%",
                  borderRadius: 5,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sx={{ marginTop: "1vh" }}>
                  <Grid container alignItems="center" justifyContent="flex-end">
                    <Visibility
                      sx={{
                        fontSize: "2vh",
                        marginRight: "3%",
                        color: "#6f6f6f",
                      }}
                    />
                    <div style={{ marginRight: "5%" }}>{item.boardViews}</div>
                    <CommentIcon
                      sx={{
                        fontSize: "2vh",
                        marginRight: "3%",
                        color: "#6f6f6f",
                      }}
                    />
                    <div>{item.commentCount}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
