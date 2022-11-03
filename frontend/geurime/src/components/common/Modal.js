/*
common 컴포넌트 - 모달
@author 조혜안
@since 2022.11.03
*/

import * as React from "react";
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";

export default function Modal({ open, close, text, onClick }) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
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
