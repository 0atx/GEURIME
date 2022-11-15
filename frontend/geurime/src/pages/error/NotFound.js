import { Typography, Grid } from "@mui/material";
import Button from "components/common/Btn.js";
import error from "assets/icon/404.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      alignItems="center"
      sx={{ width: "100vw", height: "100vh", backgroundColor: "#FFFFF8", textAlign: "center" }}
    >
      <Grid item xs={12}>
        <img src={error} width="230vh"></img>
        <Typography variant="h5" sx={{ margin: "5% 10% 10% 10%" }}>
          요청하신 페이지를
          <br /> 찾을 수 없습니다.
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

export default NotFound;
