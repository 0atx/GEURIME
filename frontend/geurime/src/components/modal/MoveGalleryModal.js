/*
보관함 사진 이동 모달
@author 여예원
@since 2022.11.08
*/

import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Grid, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CurrentKidState } from "states/CurrentKidState";
import { useState } from "react";
import { http } from "api/http";
import Modal from "components/common/Modal";

export default function MoveGalleryModal(props) {
  const currentKid = useRecoilValue(CurrentKidState);
  const navigate = useNavigate();

  const [moveResultOpen, setMoveResultOpen] = useState(false);

  // 그림 보관함

  // 선택한 그림 보관함
  const [drawingBox, setDrawingBox] = useState(currentKid.drawingBoxDtoList[0]);

  const handleChange = (event) => {
    setDrawingBox(event.target.value);
  };

  // 현재 선택된 아이의 그림 보관함 리스트
  const [drawingBoxes, setDrawingBoxes] = useState(currentKid.drawingBoxDtoList);

  // 보관함 리스트 중 그림일기 보관함을 제외
  for (let i = 0; i < drawingBoxes.length; i++) {
    if (drawingBoxes[i].drawingBoxName === "그림일기 보관함") {
      let copy = [...drawingBoxes];
      copy.splice(i, 1);
      setDrawingBoxes(copy);
    }
  }

  async function moveDrawings() {
    const response = await http.put(`/drawings/migration`, {
      drawingBoxId: drawingBox.drawingBoxId,
      drawingIdList: props.list,
    });

    if (response.data.message === "success") {
      setMoveResultOpen(true);
      props.setOpen(false);
    }
  }

  return (
    <>
      <Modal
        open={moveResultOpen}
        close={() => {
          setMoveResultOpen(false);
        }}
        onClick={() => {
          navigate(`/detailgallery/${drawingBox.drawingBoxId}`);
        }}
        text="이동이 완료되었습니다."
        icon="success"
      />
      <Dialog
        open={props.open}
        maxWidth="sm"
        fullWidth
        onClose={() => {
          setDrawingBox(currentKid.drawingBoxDtoList[0]);
          props.setOpen(false);
        }}
      >
        <DialogContent>
          <div
            style={{
              fontSize: "2vh",
              textAlign: "center",
              marginTop: "3vh",
              marginBottom: "2vh",
            }}
          >
            이동할 보관함을 선택해주세요.
          </div>
        </DialogContent>
        <Grid container justifyContent="center" sx={{ marginBottom: "3vh" }}>
          <Grid item xs={12} sx={{ marginBottom: "5vh", textAlign: "center" }}>
            <Select
              sx={{
                width: "70%",
              }}
              value={drawingBox}
              onChange={handleChange}
              variant="standard"
              placeholder="기본 보관함"
              MenuProps={{ disablePortal: true }}
            >
              {drawingBoxes.map(function (box, i) {
                return (
                  <MenuItem key={i} value={box}>
                    {box.drawingBoxName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              width="40%"
              onClick={() => {
                moveDrawings();
              }}
            >
              이동
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
