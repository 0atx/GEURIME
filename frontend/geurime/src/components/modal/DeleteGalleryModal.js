/*
갤러리 삭제 모달
@author 여예원
@since 2022.11.07
*/

import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "api/http";
import Modal from "components/common/Modal";
import { useState } from "react";

export default function RegistDrawingModal(props) {
  const navigate = useNavigate();

  const [resultModal, setResultModal] = useState(false);

  async function deleteGallery(type) {
    const response = await http.delete(`drawings/box`, {
      params: {
        drawingBoxId: props.id,
        isDelete: type,
        kidId: localStorage.getItem("currentKidId"),
      },
    });

    if (response.data.data === "삭제실패") {
      setResultModal(true);
      props.setOpen(false);
    } else {
      navigate("/gallery");
    }
  }

  return (
    <>
      <Modal
        open={resultModal}
        close={() => {
          setResultModal(false);
        }}
        onClick={() => {
          setResultModal(false);
        }}
        text="기본/일기 보관함은 삭제할 수 없습니다."
        icon="error"
      />
      <Dialog
        open={props.open}
        maxWidth="sm"
        fullWidth
        onClose={() => {
          props.setOpen(false);
        }}
      >
        <DialogContent>
          <div
            style={{
              fontSize: "2vh",
              textAlign: "center",
              marginTop: "3vh",
              marginBottom: "3vh",
            }}
          >
            그림 보관함을 삭제할까요?
          </div>
        </DialogContent>
        {/* <Grid
        container
        sx={{ marginBottom: "3vh" }}
        justifyContent="center"
        textAlign="center"
      >
        <Grid item xs={10}>
          (* 그림까지 삭제하려면,
        </Grid>
        <Grid item xs={10}>
          왼쪽 버튼을 눌러주세요)
        </Grid>
      </Grid> */}

        <Grid
          container
          justifyContent="space-evenly"
          sx={{ marginBottom: "3vh" }}
        >
          <Grid item xs={5}>
            <Button
              width="100%"
              onClick={() => {
                deleteGallery(true);
              }}
            >
              그림까지 삭제
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              width="100%"
              bgcolor="#FFCA28"
              onClick={() => {
                deleteGallery(false);
              }}
            >
              보관함만 삭제
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
