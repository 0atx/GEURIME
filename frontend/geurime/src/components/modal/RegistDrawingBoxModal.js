/*
그림 보관함 추가 모달
@author 여예원
@since 2022.11.04
*/

import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { CurrentKidState } from "states/CurrentKidState";
import { http } from "api/http";

export default function RegistDrawingModal(props) {
  const navigate = useNavigate();
  const boxNameInput = useRef(null);

  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);

  async function addDrawingBox() {
    const response = await http.post(`/drawings/box`, null, {
      params: {
        drawingBoxName: boxNameInput.current.value,
        kidId: currentKid.kidId,
      },
    });

    if (response.data.message === "success") {
      let copy = response.data.data;
      setCurrentKid(copy);
    }
    props.setOpen(false);
  }

  return (
    <Dialog
      open={props.open}
      maxWidth="sm"
      fullWidth
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <DialogTitle>
        <div
          style={{
            fontSize: "2.3vh",
            textAlign: "center",
          }}
        >
          보관함 추가
        </div>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          justifyContent="center"
          sx={{ marginTop: "3vh", marginBottom: "4vh" }}
        >
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="보관함 이름을 입력하세요"
              variant="standard"
              inputRef={boxNameInput}
              inputProps={{
                style: {
                  fontSize: "2.3vh",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" sx={{ marginBottom: "2vh" }}>
          <Grid item xs={5}>
            <Button
              width="100%"
              onClick={() => {
                addDrawingBox();
              }}
            >
              추가
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
