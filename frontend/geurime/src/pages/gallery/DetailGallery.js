/*
각 갤러리 상세 조회 페이지
@author 여예원
@since 2022.11.04
*/

import NavBar from "components/nav/NavBar";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "states/UserState";
import { CurrentKidState } from "states/CurrentKidState";
import { Grid, Link, Paper, Typography, Menu, MenuItem } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { http } from "api/http";
import { Masonry } from "@mui/lab";

export default function DetailGallery() {
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);
  const location = useLocation();
  const boxId = location.pathname.substring(15, location.pathname.length + 1);
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
    if (boxId == 0) {
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

  return (
    <>
      {boxId == 0 ? (
        // 좋아요한 보관함인 경우 수정, 삭제 버튼 없음
        <BackMenu
          isLeft={true}
          title={`${boxInfo.drawingBoxName} (${boxInfo.dtoList.length})`}
        />
      ) : (
        // 좋아요 외 보관함
        <BackMenu
          isLeft={true}
          title={`${boxInfo.drawingBoxName} (${boxInfo.dtoList.length})`}
          type="detailGallery"
        />
      )}
      <Grid id="container">
        <Container>
          <Masonry
            columns={3}
            spacing={1}
            sx={{ alignItems: "center", margin: 0 }}
          >
            {boxInfo.dtoList.map(function (item, i) {
              return (
                <Paper
                  elevation={0}
                  key={i}
                  onClick={() => {
                    navigater(`/detaildrawing/${item.drawingId}`);
                  }}
                  sx={{ width: "14vh", height: "14vh" }}
                >
                  <img
                    src={item.drawingImagePath}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Paper>
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
