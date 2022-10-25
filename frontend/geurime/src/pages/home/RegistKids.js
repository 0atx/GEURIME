import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Btn from "components/common/Btn";

export default function RegistKids() {
  const [kids, setKids] = useState([]);

  return (
    <Grid container alignItems="center">
      <Grid item sx={{ background: "red", textAlign: "center", height: "90vh", width: "100vw" }}>
        {kids.length == 0 ? (
          <>
            <Typography align="center" variant="h5">
              위쪽의 + 버튼을 눌러
            </Typography>
            <Typography align="center" variant="h5">
              아이 정보를 등록하세요!
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Btn sx={{ marginBottom: "5vh", marginTop: "3vh", marginRight: "1vh" }}>다음</Btn>
      </Grid>
    </Grid>
  );
}
