/*
게시글 삭제 완료 모달
@author 유현욱
@since 2022.11.08
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { http } from "api/http";

export default function DeleteBoardModal ({ open, handleClose, boardId, userId}) {
  const navigate = useNavigate();

  // 게시글 삭제
  async function deleteBoard() {
    const response = await http.delete(`/boards/${boardId}`, {
      params: {
        userId: userId
      }
    });
    navigate(`/board`);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
          }}
        >
          정말로 삭제하시겠습니까? 😥
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button width="100px" onClick={deleteBoard}>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
