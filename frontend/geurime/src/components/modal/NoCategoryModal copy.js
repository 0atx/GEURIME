/*
카테고리 없음 모달
@author 유현욱
@since 2022.11.15
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


export default function NoCategoryModal({ open, handleClose }) {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
          }}
        >
          카테고리를 선택해주세요 😥
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button
          width="100px"
          onClick={() => {
            handleClose()
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
