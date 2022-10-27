/*
일기 등록 페이지
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";
import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import RegistDiaryModal from "components/modal/RegistDiaryModal";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Calendar from "components/nav/Calendar.js";
import Button from "components/common/Btn.js";

export default function RegistDiary() {
  const [open, setOpen] = useState(false);

  // 캘린더 열기
  const [calOpen, setCalOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // 등록 완료 모달 열기
  const registDiary = () => {
    setOpen(true);
  };

  // 캘린더 열기
  const openCal = () => {
    setCalOpen(true);
  };

  // 날짜 변경
  const changeDate = () => {
    console.log("날짜 바꿔바꿔");
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={calOpen}>
        {/* <DialogTitle>일기를 등록할 날짜를 선택해주세요!</DialogTitle> */}
        <Calendar></Calendar>
        <DialogActions sx={{ marginBottom: "10px" }}>
          <Button
            onClick={() => {
              setCalOpen(false);
            }}
          >
            취소
          </Button>
          <Button onClick={changeDate}>확인</Button>
        </DialogActions>
      </Dialog>
      <BackMenu
        isLeft={true}
        title="10월 17일 일기 🖋🖊🖌🖍"
        clickTitle={openCal}
        isRight="등록"
        clickRight={registDiary}
      ></BackMenu>
      <NavBar></NavBar>
      <RegistDiaryModal open={open}></RegistDiaryModal>
    </div>
  );
}
