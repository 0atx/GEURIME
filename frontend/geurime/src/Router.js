import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Main from "pages/home/Main";
import UserInfo from "pages/home/UserInfo";
import RegistKids from "pages/home/RegistKids";
import Gallery from "pages/gallery/Gallery";
import DetailGallery from 'pages/gallery/DetailGallery';
import DetailDrawing from 'pages/gallery/DetailDrawing';
import ModifyDrawing from 'pages/gallery/ModifyDrawing';
import ModifyDetailGallery from 'pages/gallery/ModifyDetailGallery';
import RegistDrawing from 'pages/drawing/RegistDrawing';
import Diary from 'pages/diary/Diary';
import DetailDiary from 'pages/diary/DetailDiary';
import RegistDiary from 'pages/diary/Registdiary';
import Board from 'pages/board/Board';
import DetailBoard from 'pages/board/DetailBoard';
import RegistBoard from 'pages/board/RegistBoard';
import ModifyBoard from 'pages/board/ModifyBoard';
import MyPage from 'pages/myPage/MyPage';
import ResetPass from 'pages/myPage/ResetPass';
import ModifyKidsInfo from 'pages/myPage/ModifyKidsInfo';
import ModifyUserInfo from 'pages/myPage/ModifyUserInfo';
import LoginCheck from 'pages/home/LoginCheck';

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
        <Route path="/detailgallery" element={<DetailGallery />} />
        <Route path="/detaildrawing" element={<DetailDrawing />} />
        <Route path="/modifydrawing" element={<ModifyDrawing />} />
        <Route path="/modifydetailgallery" element={<ModifyDetailGallery />} />
        <Route path="/registdrawing" element={<RegistDrawing />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/detaildiary" element={<DetailDiary />} />
        <Route path="/registdiary" element={<RegistDiary />} />
        <Route path="/board" element={<Board />} />
        <Route path="/detailboard" element={<DetailBoard />} />
        <Route path="/registboard" element={<RegistBoard />} />
        <Route path="/modifyboard" element={<ModifyBoard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/modifykidsinfo" element={<ModifyKidsInfo />} />
        <Route path="/modifyuserinfo" element={<ModifyUserInfo />} />
        <Route path="/logincheck" element={<LoginCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
