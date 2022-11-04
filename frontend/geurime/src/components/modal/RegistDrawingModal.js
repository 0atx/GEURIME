/*
그림 등록 완료 모달
@author 여예원
@since 2022.11.04
*/

import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegistDrawingModal(props) {
  const navigate = useNavigate();

  return (
    <Dialog open={props.open} maxWidth="sm" fullWidth>
      <DialogContent>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
            marginTop: "3vh",
            marginBottom: "3vh",
          }}
        >
          그림 등록이 완료되었습니다.
        </div>
      </DialogContent>
      <Grid
        container
        justifyContent="space-evenly"
        sx={{ marginBottom: "3vh" }}
      >
        <Grid item xs={5}>
          <Button
            width="100%"
            onClick={() => {
              props.img(null);
              props.title.current.value = null;
              props.setOpen(false);
            }}
          >
            하나 더 등록하기
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            width="100%"
            bgcolor="#FFCA28"
            onClick={() => {
              navigate(`/gallery`);
            }}
          >
            갤러리로 이동
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
