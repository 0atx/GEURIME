/*
게시글 수정 완료 모달
@author 유현욱
@since 2022.11.08
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";

export default function ModifyBoardModal({ open, boardId }) {
  const navigator = useNavigate();

  return (
    <Dialog open={open}>
      <DialogContent>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
          }}
        >
          게시글 수정이 완료되었습니다 😆
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button
          width="100px"
          onClick={() => {
            navigator(`/detailboard/${boardId}`);
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
