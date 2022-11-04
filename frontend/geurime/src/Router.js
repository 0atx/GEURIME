import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Main from "pages/home/Main";
import UserInfo from "pages/home/UserInfo";
import RegistKids from "pages/home/RegistKids";
import Gallery from "pages/gallery/Gallery";
import DetailGallery from "pages/gallery/DetailGallery";
import DetailDrawing from "pages/gallery/DetailDrawing";
import ModifyDrawing from "pages/gallery/ModifyDrawing";
import ModifyDetailGallery from "pages/gallery/ModifyDetailGallery";
import RegistDrawing from "pages/drawing/RegistDrawing";
import Diary from "pages/diary/Diary";
import DetailDiary from "pages/diary/DetailDiary";
import RegistDiaryQuestion from "pages/diary/RegistDiaryQuestion";
import RegistDiaryWrite from "pages/diary/RegistDiaryWrite";
import RegistDiaryDrawing from "pages/diary/RegistDiaryDrawing";
import Board from "pages/board/Board";
import DetailBoard from "pages/board/DetailBoard";
import RegistBoard from "pages/board/RegistBoard";
import ModifyBoard from "pages/board/ModifyBoard";
import Settings from "pages/settings/Settings";
import ResetPass from "pages/settings/ResetPass";
import ModifyKidsInfo from "pages/settings/ModifyKidsInfo";
import ModifyUserInfo from "pages/settings/ModifyUserInfo";
import LoginCheck from "pages/home/LoginCheck";
import Components from "pages/home/Components";

function Router() {
  // const url = window.location.href;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/registkids" element={<RegistKids />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/detailgallery/:galleryid" element={<DetailGallery />} />
        <Route path="/detaildrawing/:drawingid" element={<DetailDrawing />} />
        <Route path="/modifydrawing" element={<ModifyDrawing />} />
        <Route path="/modifydetailgallery" element={<ModifyDetailGallery />} />
        <Route path="/registdrawing" element={<RegistDrawing />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/detaildiary/:diaryid" element={<DetailDiary />} />
        <Route path="/registdiary/question" element={<RegistDiaryQuestion />} />
        <Route path="/registdiary/write" element={<RegistDiaryWrite />} />
        <Route path="/registdiary/drawing" element={<RegistDiaryDrawing />} />
        <Route path="/board" element={<Board />} />
        <Route path="/detailboard/:boardid" element={<DetailBoard />} />
        <Route path="/registboard" element={<RegistBoard />} />
        <Route path="/modifyboard" element={<ModifyBoard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/modifykidsinfo" element={<ModifyKidsInfo />} />
        <Route path="/modifyuserinfo" element={<ModifyUserInfo />} />
        <Route path="/logincheck" element={<LoginCheck />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
