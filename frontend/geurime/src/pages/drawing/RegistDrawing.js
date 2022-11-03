import BackMenu from "components/nav/BackMenu";
import React, { useRef, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CurrentKidState } from "states/CurrentKidState";
import Btn from "components/common/Btn";
import { http2 } from "api/http2";
import RegistDrawingModal from "components/modal/RegistDrawingModal";

export default function RegistDrawing() {
  const currentKid = useRecoilValue(CurrentKidState);

  // 그림 제목 입력 객체
  const titleInput = useRef(null);

  // 등록 완료 모달
  const [open, setOpen] = useState(false);

  // 그림 보관함
  const drawingBoxes = currentKid.drawingBoxDtoList;

  const [drawingBox, setDrawingBox] = useState(currentKid.drawingBoxDtoList[0]);

  const handleChange = (event) => {
    setDrawingBox(event.target.value);
  };

  // 그림
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();

  function changeImage(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      // 화면에 읽힐 수 있는 url로 변경
      setImageUrl(reader.result);
    };
  }
  // 그림 등록 axios
  async function registDrawing() {
    // 파일 전송
    let file = imgRef.current.files[0];
    let formData = new FormData();
    formData.append("imageFile", file);

    // 그림 정보 전송(제목, 보관함)
    let drawingInfo = {
      drawingBoxId: drawingBox.drawingBoxId,
      drawingTitle: titleInput.current.value,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(drawingInfo)], { type: "application/json" })
    );

    const response = await http2.post(`/drawings`, formData);
    if (response.data.message === "success") {
      setOpen(true);
    }
  }

  return (
    <>
      <RegistDrawingModal
        open={open}
        setOpen={setOpen}
        img={setImageUrl}
        title={titleInput}
      />
      <BackMenu isLeft={true} title="그림 등록" isRight="등록" />
      <Grid
        container
        id="container"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            xs={10}
            style={{
              margin: "auto",
              width: "90vw",
              height: "90vw",
              display: "table",
            }}
          >
            <div>
              <form method="post" encType="multipart/form-data">
                <input
                  id="input"
                  hidden
                  accept="image/*"
                  type="file"
                  ref={imgRef}
                  onChange={(e) => {
                    changeImage(e);
                  }}
                />
              </form>
            </div>
            {imageUrl ? (
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <Paper
                sx={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  verticalAlign: "middle",
                  display: "table-cell",
                }}
              >
                <label htmlFor="input">
                  <AddCircleIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "4em",
                      margin: "auto",
                    }}
                  />
                </label>
              </Paper>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ marginTop: "5vh" }}
          justifyContent="center"
          alignItems="center"
        >
          {/* 보관함 */}
          <Grid item xs={3} sx={{ marginBottom: "3vh" }}>
            <Typography>보관함</Typography>
          </Grid>
          <Grid item xs={7} sx={{ marginBottom: "3vh" }}>
            <Select
              fullWidth
              value={drawingBox}
              onChange={handleChange}
              variant="standard"
              placeholder="기본 보관함"
              MenuProps={{ disablePortal: true }}
            >
              {drawingBoxes.map(function (box, i) {
                return (
                  <MenuItem key={i} value={box}>
                    {box.drawingBoxName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          {/* 제목  */}
          <Grid item xs={3}>
            <Typography>제목</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="제목을 써주세요"
              variant="standard"
              inputRef={titleInput}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-evenly" sx={{ marginTop: "5vh" }}>
          {imageUrl ? (
            <>
              {/* 그림 변경 버튼 */}
              <Grid item xs={4}>
                <Btn sx={{ width: "100%" }}>
                  <label htmlFor="input">그림 변경</label>
                </Btn>
              </Grid>

              <Grid item xs={4}>
                <Btn
                  bgcolor="#FFCA28"
                  sx={{ width: "100%" }}
                  onClick={() => {
                    registDrawing();
                  }}
                >
                  그림 등록
                </Btn>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}
