/*
갤러리 수정 페이지
@author 여예원
@since 2022.11.08
*/

import NavBar from "components/nav/NavBar";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { CurrentKidState } from "states/CurrentKidState";
import {
  Grid,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { http } from "api/http";
import { Masonry } from "@mui/lab";
import GalleryImage from "components/common/GalleryImage";
import MoveGalleryModal from "components/modal/MoveGalleryModal";

export default function ModifyDetailGaller() {
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);
  const location = useLocation();
  const boxId = location.pathname.substring(21, location.pathname.length + 1);
  const [boxInfo, setBoxInfo] = useState({
    drawingBoxName: "",
    dtoList: [
      {
        drawingId: 0,
        drawingImagePath: "",
      },
    ],
  });

  const navigater = useNavigate();

  // 그림 보관함의 정보를 가져오는 함수
  async function getDrawingBoxInfo() {
    if (boxId === 0) {
      const response = await http.get(`/drawings/like/${currentKid.kidId}`);
      let copy = { ...boxInfo };
      copy.drawingBoxName = "좋아요한 보관함";
      copy.dtoList = response.data.data;
      setBoxInfo(copy);
    } else {
      const response = await http.get(`/drawings/box/${boxId}`, {
        params: {
          kidId: currentKid.kidId,
        },
      });
      setBoxInfo(response.data.data);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getDrawingBoxInfo();
    }
  }, []);

  // 이미지 클릭 관리 변수 및 함수
  const [clickedDrawings, setClickedDrawings] = useState([]);
  function changeClicked(id) {
    // 이미 클릭된 태그인 경우
    if (clickedDrawings.includes(id)) {
      let copy = [...clickedDrawings];
      let index = copy.indexOf(id);
      copy.splice(index, 1);
      setClickedDrawings(copy);
    } else {
      let copy = [...clickedDrawings];
      copy.push(id);
      setClickedDrawings(copy);
    }
  }

  // 보관함 이동 함수
  const [moveGalleryOpen, setMoveGalleryOpen] = useState(false);
  function moveDrawingBox() {
    setMoveGalleryOpen(true);
  }

  return (
    <>
      <BackMenu
        isLeft={true}
        title={`${boxInfo.drawingBoxName} (${boxInfo.dtoList.length})`}
        isRight="이동"
        clickRight={moveDrawingBox}
      />
      <MoveGalleryModal
        list={clickedDrawings}
        open={moveGalleryOpen}
        setOpen={setMoveGalleryOpen}
      />
      <Grid id="container">
        <Container sx={{ alignItems: "center" }}>
          <Masonry columns={3} spacing={1} sx={{ alignItems: "center", margin: 0 }}>
            {boxInfo.dtoList.map(function (item, i) {
              return (
                <GalleryImage
                  key={i}
                  src={item.drawingImagePath}
                  imageId={item.drawingId.toString()}
                  clickedDrawings={clickedDrawings}
                  changeClicked={changeClicked}
                />
              );
            })}
          </Masonry>
        </Container>
        {/* 하단 네비 */}
        <NavBar />
      </Grid>
    </>
  );
}
