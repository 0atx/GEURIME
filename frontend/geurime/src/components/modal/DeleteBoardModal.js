/*
일기 삭제 완료 모달
@author 조혜안
@since 2022.11.02
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { http } from "api/http";

export default function DeleteDiaryModal({ open, handleClose, diaryid }) {
  const navigate = useNavigate();

  // 일기 삭제
  async function deleteDiary() {
    const response = await http.delete(`/diaries/${diaryid}`);
    console.log(response.data);
    navigate(`/diary`);
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
        <Button width="100px" onClick={deleteDiary}>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
