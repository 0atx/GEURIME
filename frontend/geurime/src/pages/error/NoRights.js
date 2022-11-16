import { Typography, Grid } from "@mui/material";
import Button from "components/common/Btn.js";
import norights from "assets/icon/norights.png";
import { useNavigate } from "react-router-dom";

const NoRights = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      alignItems="center"
      sx={{ width: "100vw", height: "100vh", backgroundColor: "#FFFFF8", textAlign: "center" }}
    >
      <Grid item xs={12}>
        <img src={norights} width="230vh"></img>
        <Typography variant="h5" sx={{ margin: "5% 10% 10% 10%" }}>
          접근할 수 없는
          <br /> 페이지입니다.
        </Typography>
        <Button
          width="25vh"
          onClick={() => {
            navigate("/main");
          }}
        >
          메인페이지로 이동하기
        </Button>
      </Grid>
    </Grid>
  );
};

export default NoRights;
