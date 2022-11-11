/*
가족 정보 클릭시 나타나는 모달
@author 여예원
@since 2022.11.10
*/

import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Avatar, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { http } from "api/http";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function FamilyInfoModal(props) {
  const [userInfo, setUserInfo] = useState([]);

  // 처음 로딩시 유저정보 가져오기
  async function getUserInfo() {
    const response = await http.get(`/users/${props.userId}`);
    if (response.data.message === "success") {
      setUserInfo(response.data.data);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getUserInfo();
    }
  }, [props.userId]);

  return (
    <Dialog
      onClose={() => {
        props.setOpen(false);
      }}
      open={props.open}
      maxWidth="sm"
      fullWidth
    >
      <Grid container justifyContent="center">
        {/* 프로필 이미지 */}
        {userInfo.userProfileImage === "" ? (
          <Grid
            item
            xs={12}
            sx={{ justifyContent: "center", textAlign: "center" }}
          >
            <AccountCircleIcon
              color="action"
              sx={{
                width: 90,
                height: 90,
                marginTop: "3vh",
                color: "#FFE082",
              }}
            />
          </Grid>
        ) : (
          <Avatar
            src={userInfo.userProfileImage}
            sx={{
              width: 90,
              height: 90,
              marginTop: "3vh",
              marginBottom: "1vh",
              border: "3px solid #FFE082",
            }}
          />
        )}

        {/* 이름 */}
        <Grid
          item
          xs={12}
          style={{
            fontSize: "2vh",
            textAlign: "center",
            marginTop: "3vh",
          }}
        >
          이름
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            fontSize: "2.3vh",
            textAlign: "center",
            marginTop: "1vh",
            marginBottom: "3vh",
          }}
        >
          {userInfo.userName} ({userInfo.nickname})
        </Grid>
        {/* 이메일 */}
        <Grid
          item
          xs={12}
          style={{
            fontSize: "2vh",
            textAlign: "center",
            marginTop: "1vh",
          }}
        >
          이메일
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            fontSize: "2.3vh",
            textAlign: "center",
            marginTop: "1vh",
            marginBottom: "3vh",
          }}
        >
          {userInfo.email}
        </Grid>
        {/* 생일 */}
        <Grid
          item
          xs={12}
          style={{
            fontSize: "2vh",
            textAlign: "center",
            marginTop: "1vh",
          }}
        >
          생일
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            fontSize: "2.3vh",
            textAlign: "center",
            marginTop: "1vh",
            marginBottom: "3vh",
          }}
        >
          {userInfo.userBirth}
        </Grid>
      </Grid>
      {/* 버튼 */}
      <Grid
        container
        justifyContent="space-evenly"
        sx={{ marginTop: "2vh", marginBottom: "3vh" }}
      >
        <Grid item xs={5}>
          <Button
            width="100%"
            onClick={() => {
              props.setOpen(false);
            }}
          >
            확인
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
