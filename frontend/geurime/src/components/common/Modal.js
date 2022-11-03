/*
common 컴포넌트 - 모달
속성
- open (모달 여는 state)
- close (바깥 영역 클릭 시 함수)
- text (모달 텍스트)
- onClick (확인 클릭 시 함수)
- icon (ok, error)
@author 조혜안
@since 2022.11.03
*/

import * as React from "react";
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
// icon
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Modal({ open, close, text, onClick, icon }) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <div style={{ marginBottom: "5%", textAlign: "center" }}>
          {icon === "error" && <ErrorOutlineIcon sx={{ color: "#FFE082", fontSize: "10vh" }} />}
          {icon === "ok" && <TaskAltIcon sx={{ color: "#FFE082", fontSize: "10vh" }} />}
        </div>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button width="100px" onClick={onClick}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
