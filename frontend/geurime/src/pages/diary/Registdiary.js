/*
일기 등록 페이지
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";
import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import RegistDiaryModal from "components/modal/RegistDiaryModal";

export default function RegistDiary() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const registDiary = () => {
    setOpen(true);
  };

  return (
    <div>
      <BackMenu
        isLeft={true}
        title="10월 17일 일기"
        isRight="등록"
        clickRight={registDiary}
      ></BackMenu>
      <NavBar></NavBar>
      <RegistDiaryModal open={open}></RegistDiaryModal>
    </div>
  );
}
