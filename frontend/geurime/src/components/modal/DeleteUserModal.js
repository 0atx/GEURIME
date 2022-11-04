/*
탈퇴 모달
@author 조혜안
@since 2022.11.03
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";

export default function DeleteUserModal({ open, handleClose }) {
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
          정말로 탈퇴하실건가요? 😥
        </div>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button
          width="30vw"
          onClick={() => {
            navigate(`/`);
          }}
        >
          네
        </Button>
        <Button bgcolor="#FFCA28" width="30vw" onClick={handleClose}>
          아니요
        </Button>
      </DialogActions>
    </Dialog>
  );
}
