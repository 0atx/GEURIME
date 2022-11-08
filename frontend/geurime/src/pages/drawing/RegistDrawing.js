/*
그림 등록 페이지
@author 여예원
@since 2022.11.04
*/
import BackMenu from "components/nav/BackMenu";
import React, { useRef, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CurrentKidState } from "states/CurrentKidState";
import Btn from "components/common/Btn";
import { http2 } from "api/http2";
import RegistDrawingModal from "components/modal/RegistDrawingModal";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { http } from "api/http";

export default function RegistDrawing() {
  const currentKid = useRecoilValue(CurrentKidState);

  // 그림 제목 입력 객체
  const titleInput = useRef(null);

  // 등록 완료 모달
  const [open, setOpen] = useState(false);

  // 그림 보관함
  const [drawingBoxes, setDrawingBoxes] = useState(
    currentKid.drawingBoxDtoList
  );

  for (let i = 0; i < drawingBoxes.length; i++) {
    if (drawingBoxes[i].drawingBoxName === "그림일기 보관함") {
      let copy = [...drawingBoxes];
      console.log(i);
      copy.splice(i, 1);
      setDrawingBoxes(copy);
    }
  }

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

  // 이미지 회전 함수
  function rotateImage() {
    let temp = new Image();
    temp.src = imageUrl;
    temp.onload = () => {
      let canvas = document.getElementById("canvas");
      let canvasContext = canvas.getContext("2d");

      canvas.width = temp.height;
      canvas.height = temp.width;

      canvasContext.rotate(Math.PI / 2);

      canvasContext.drawImage(temp, 0, temp.height * -1);

      let dataURI = canvas.toDataURL("image/jpeg");
      // 회전한 url로 변경
      setImageUrl(dataURI);
    };
  }

  // base64를 이미지 파일로 바꿔주는 함수
  function dataURLtoFile(dataurl, fileName) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }
  // 그림 등록 axios
  async function registDrawing() {
    // 파일 전송
    // url을 파일로 변경 후 formdata에 넣는다.
    let file = dataURLtoFile(imageUrl, "image.png");
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
      console.log(response.data.data);
      analysisDrawing(response.data.data.drawingId);
      setOpen(true);
    }
  }

  // 그림 분석 AI를 요청하는 axios
  async function analysisDrawing(id) {
    const response = http.get(`ai/${id}`);
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
        id="container2"
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
              <>
                <Paper
                  id="img"
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
                <canvas id="canvas" style={{ display: "none" }} />
                {/* 회전 버튼 */}
                <IconButton
                  onClick={() => {
                    rotateImage();
                  }}
                  sx={{ fontSize: "2vh", marginLeft: "75%" }}
                >
                  회전
                  <RotateRightIcon sx={{ fontSize: "3vh" }} />
                </IconButton>
              </>
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
