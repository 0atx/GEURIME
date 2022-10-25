import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Btn from "components/common/Btn";

export default function RegistKids() {
  const [kids, setKids] = useState([]);

  return (
    <Grid id="container">
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
        <Btn onClick={{}} sx={{ marginBottom: "5vh", marginTop: "3vh", marginRight: "1vh" }}>
          다음
        </Btn>
      </Grid>
    </Grid>
  );
}
