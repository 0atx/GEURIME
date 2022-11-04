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
import { Grid, Link, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import RegistDrawingBoxModal from "components/modal/RegistDrawingBoxModal";
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);
  const [boxes, setBoxes] = useState(currentKid.drawingBoxDtoList);
  const navigater = useNavigate();

  // 보관함 추가 관리 모달
  const [open, setOpen] = useState(false);

  function modalOpen() {
    setOpen(true);
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setBoxes(currentKid.drawingBoxDtoList);
    }
  }, [currentKid]);

  return (
    <>
      <BackMenu
        title={`${currentKid.kidName}의 그림 갤러리`}
        type="registKids"
        clickRight={modalOpen}
      />
      <Grid id="container">
        <RegistDrawingBoxModal open={open} setOpen={setOpen} />
        <Container>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
            textAlign="center"
          >
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
                  {box.drawingBoxName} ({box.drawingCount})
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* 하단 네비 */}
        <NavBar />
      </Grid>
    </>
  );
}
