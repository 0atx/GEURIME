import React, { useState } from "react";
import { Grid, Typography, Dialog } from "@mui/material";
import Btn from "components/common/Btn";
import BackMenu from "components/nav/BackMenu";

export default function RegistKids() {
  const [kids, setKids] = useState([]); // 아이 담을 변수
  const [open, setOpen] = useState(false); // 아이 등록 모달 관리 변수

  function addKids() {
    setOpen(true);
    console.log("click");
  }

  // 아이 등록 모달 닫기 함수
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid id="container">
      <Dialog onClose={handleClose} open={open}>
        ㅎㅇ
      </Dialog>
      <BackMenu
        isLeft="false"
        title="우리 아이 정보 등록"
        type="registKids"
        clickRight={addKids}
      />
      <Grid
        direction="row"
        container
        alignItems="center"
        sx={{
          textAlign: "center",
          height: "80vh",
          width: "100vw",
        }}
      >
        {kids.length == 0 ? (
          <Grid item xs={12} sx={{ color: "#6f6f6f" }}>
            <Typography align="center" variant="h5">
              위쪽의 + 버튼을 눌러
            </Typography>
            <Typography align="center" variant="h5">
              아이 정보를 등록하세요!
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Btn
          onClick={{}}
          sx={{ marginBottom: "3vh", marginTop: "3vh", marginRight: "3vh" }}
        >
          등록 완료
        </Btn>
      </Grid>
    </Grid>
  );
}
