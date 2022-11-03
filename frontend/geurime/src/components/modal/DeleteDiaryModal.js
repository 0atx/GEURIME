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

export default function DeleteDiaryModal({ open, handleClose, diaryid }) {
  const navigate = useNavigate();

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
        <Button
          width="100px"
          onClick={() => {
            // 삭제 axios 연동 필요!!! -- diaryid를 지우면 됨!

            navigate(`/diary`);
          }}
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
