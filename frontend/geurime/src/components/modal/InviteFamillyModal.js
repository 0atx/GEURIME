/*
가족 초대 모달
@author 조혜안
@since 2022.11.04
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { DialogTitle, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { useEffect, useRef, useState } from "react";

export default function ({ open, close }) {
  // userInfo
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const [isCopied, setIsCopied] = useState(false);
  const link = useRef();

  const copyTextUrl = () => {
    if (!isCopied) {
      //   console.log(link.current.value);
      navigator.clipboard.writeText(link.current.value);
      setIsCopied(true);
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>가족 초대하기</DialogTitle>
      <DialogContent>
        <div
          style={{
            fontSize: "2vh",
            textAlign: "center",
            marginBottom: "10%",
          }}
        >
          링크를 공유하여 가족을 초대해보세요!
        </div>
        <div
          style={{
            textAlign: "center",
            // marginBottom: "5%",
          }}
        >
          <TextField
            sx={{ width: "50vw" }}
            inputRef={link}
            InputProps={{
              readOnly: true,
            }}
            value={`https://k7a506.p.ssafy.io/invite/${userInfo.inviteCode}`}
            variant="standard"
          />
          <Button
            sx={{ marginLeft: "5%" }}
            onClick={() => {
              copyTextUrl();
            }}
          >
            복사
          </Button>
        </div>
        {isCopied && <Typography sx={{ fontSize: "1.6vh" }}>링크가 복사되었습니다!</Typography>}
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button bgcolor="#FFCA28" width="100px" onClick={close}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
