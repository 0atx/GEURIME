/*
갤러리
@author 여예원
@since 2022.11.04
*/
import NavBar from "components/nav/NavBar";
import BackMenu from "components/nav/BackMenu";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { CurrentKidState } from "states/CurrentKidState";
import {
  Grid,
  Link,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import RegistDrawingBoxModal from "components/modal/RegistDrawingBoxModal";
import { useEffect, useRef, useState } from "react";
import { http } from "api/http";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Favorite } from "@mui/icons-material";

export default function Gallery() {
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);
  const [boxes, setBoxes] = useState([]);

  // 좋아요 보관함 그림 정보
  const [likeBox, setLikeBox] = useState([]);

  const navigater = useNavigate();

  // 보관함 추가 관리 모달
  const [open, setOpen] = useState(false);

  function modalOpen() {
    setOpen(true);
  }

  // 좋아요 보관함 가져오는 axios 함수
  async function getLikeBox() {
    const response = await http.get(`/drawings/like/${currentKid.kidId}`);
    setLikeBox(response.data.data);
  }
  // 아이의 정보를 가져오는 axios 함수
  async function getKidInfo() {
    const response = await http.get(`/kids/${currentKid.kidId}`);
    setCurrentKid(response.data.data);
    setBoxes(response.data.data.drawingBoxDtoList);
  }

  const [loading, setLoading] = useState(true);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setLoading(true);
      setTimeout(() => {
        getKidInfo();
        getLikeBox();
        setLoading(false);
      }, 1000);
    }
  }, [open]);

  return (
    <Grid>
      <BackMenu title={`${currentKid.kidName}의 갤러리`} type="registKids" clickRight={modalOpen} />
      <Grid id="container">
        <RegistDrawingBoxModal open={open} setOpen={setOpen} />
        <Container>
          {loading ? (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 3, md: 4 }}
              textAlign="center"
            >
              {[0, 1, 2, 3].map((item, i) => (
                <Grid item xs={6} sm={4} md={2}>
                  <Skeleton
                    key={i}
                    sx={{ borderRadius: "20px" }}
                    variant="rectangular"
                    width="20vh"
                    height="20vh"
                  />
                  <Typography sx={{ marginTop: "1vh" }} variant="body1">
                    <Skeleton />
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 3, md: 4 }}
              textAlign="center"
            >
              {likeBox.length !== 0 ? (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={2}
                  onClick={() => {
                    navigater("/detailgallery/0");
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      width: "20vh",
                      height: "20vh",
                      borderRadius: "20px",
                    }}
                  >
                    <ImageListItem
                      style={{
                        width: "20vh",
                        height: "20vh",
                        borderRadius: "20px",
                      }}
                    >
                      <img
                        src={likeBox[0].drawingImagePath}
                        width="100%"
                        height="100%"
                        style={{
                          borderRadius: "20px",
                          objectFit: "cover",
                        }}
                      />
                      <ImageListItemBar
                        sx={{
                          background: "rgba(0,0,0,0)",
                        }}
                        position="top"
                        actionIcon={
                          <IconButton sx={{ color: "#FF5252" }}>
                            <FavoriteIcon sx={{ fontSize: "30px" }} />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  </Paper>
                  <Typography sx={{ marginTop: "1vh" }} variant="body1">
                    좋아요 보관함 ({likeBox.length})
                  </Typography>
                </Grid>
              ) : null}
              {boxes.map((box, i) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={2}
                  key={i}
                  onClick={() => {
                    navigater(`/detailgallery/${box.drawingBoxId}`);
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      width: "20vh",
                      height: "20vh",
                      borderRadius: "20px",
                    }}
                  >
                    {box.drawingCount === 0 ? (
                      <img
                        src="assets/sample/1.png"
                        width="100%"
                        height="100%"
                        style={{
                          borderRadius: "20px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={box.thumbnailImage}
                        width="100%"
                        height="100%"
                        style={{
                          borderRadius: "20px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Paper>
                  <Typography sx={{ marginTop: "1vh" }} variant="body1">
                    {box.drawingBoxName.length > 8 ? (
                      <>{box.drawingBoxName.substring(0, 7) + ".."}</>
                    ) : (
                      <>{box.drawingBoxName}</>
                    )}
                    ({box.drawingCount})
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        {/* 하단 네비 */}
        <NavBar />
      </Grid>
    </Grid>
  );
}
