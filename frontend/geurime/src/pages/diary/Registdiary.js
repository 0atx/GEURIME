/*
일기 등록 페이지
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";
import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import RegistDiaryModal from "components/modal/RegistDiaryModal";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";
import Button from "components/common/Btn.js";

export default function RegistDiary({}) {
  // 등록완료 모달
  const [open, setOpen] = useState(false);
  // 현재 날짜
  const [value, setValue] = useState(new Date());
  // 선택 날짜 타이틀
  const [title, setTitle] = useState(
    new Date().getMonth() + 1 + "월 " + new Date().getDate() + "일 일기"
  );
  // 캘린더 열기
  const [calOpen, setCalOpen] = useState(false);

  // 등록완료 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };
  // 등록 완료 모달 열기
  const registDiary = () => {
    setOpen(true);
  };

  // 캘린더 날짜 변경
  const onChange = function (e) {
    setValue(e);
  };

  // 캘린더 열기
  const openCal = () => {
    setCalOpen(true);
  };

  // 날짜 변경
  const changeDate = () => {
    const year = value.getFullYear();
    let month = value.getMonth() + 1;
    let day = value.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let date = year + "-" + month + "-" + day;
    console.log(date);
    setTitle(month + "월 " + day + "일 일기");
    setCalOpen(false);
  };

  return (
    <div>
      {/* 캘린더 모달 */}
      <Dialog onClose={handleClose} open={calOpen}>
        {/* <DialogTitle>일기를 등록할 날짜를 선택해주세요!</DialogTitle> */}
        <Calendar
          onChange={(e) => {
            onChange(e);
          }}
          calendarType="Hebrew" // 일요일시작
          // 날짜의 일을 빼는 코드
          formatDay={(locale, date) => moment(date).format("DD")}
          value={value}
        ></Calendar>
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
      {/* 헤더 */}
      <BackMenu
        type="registDiary"
        isLeft={true}
        title={title}
        clickTitle={openCal}
        isRight="등록"
        clickRight={registDiary}
      ></BackMenu>
      {/* 네비 바 */}
      <NavBar></NavBar>
      {/* 등록 완료 모달 */}
      <RegistDiaryModal open={open}></RegistDiaryModal>
    </div>
  );
}
