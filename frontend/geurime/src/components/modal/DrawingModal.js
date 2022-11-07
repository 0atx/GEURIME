import React, { createRef, useEffect, useRef, useState } from "react";
import Button from "components/common/Btn";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Container, Slider, Grid, Paper } from "@mui/material";
import CanvasDraw from "react-canvas-draw";
import { CirclePicker } from "react-color";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DrawingModal({ open, handleClose }) {
  const canvasRef = useRef(null);

  const [color, setColor] = useState("black");
  const [brushRadius, setBrushRadius] = useState(5);

  // 전부 지우기
  const clearCanvas = () => {
    // console.log(canvasRef.current);
    canvasRef.current.clear();
  };

  // 그림 저장
  function saveDrawing() {
    localStorage.setItem("savedDrawing", canvasRef.current.getSaveData());
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              직접 그리기
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <p>펜 두께</p>
              <Slider
                step={5}
                min={0}
                max={50}
                defaultValue={5}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(e) => {
                  setBrushRadius(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <CirclePicker
                width="100%"
                colors={[
                  "#D0021B", // 빨
                  "#F5A623", // 주
                  "#F8E71C", // 노
                  "#008B02", // 초
                  "#004DCF", // 파
                  "#5300EB", // 남
                  "#9013FE", // 보
                  "#03A9F4",
                  "#8bc34a",
                  "#cddc39",
                  "#ffeb3b",
                  "#ffc107",
                  "#BD10E0",
                  "#8B572A", // 갈
                  "#9B9B9B", // 회
                  "#000000", // 검
                ]}
                color={color}
                onChange={(color) => {
                  console.log(color);
                  setColor(color.hex);
                }}
              ></CirclePicker>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Paper elevation={3}>
                <CanvasDraw
                  ref={canvasRef}
                  canvasWidth={window.innerWidth * 0.91}
                  canvasHeight={window.innerHeight * 0.5}
                  catenaryColor={"#FFCA28"}
                  hideGrid
                  enablePanAndZoom
                  brushColor={color}
                  brushRadius={brushRadius}
                  lazyRadius={0}

                  // onChange={() => console.log("onChange")}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2, textAlign: "right" }}>
              <UndoRoundedIcon
                sx={{ mr: 1, fontSize: "3.5vh" }}
                color="secondary"
                onClick={() => {
                  canvasRef.current.undo();
                }}
              />
              <DeleteRoundedIcon
                sx={{ fontSize: "3.5vh" }}
                color="secondary"
                onClick={clearCanvas}
              />
            </Grid>
            <Grid container justifyContent="center" textAlign="center">
              <Button
                width="40%"
                onClick={() => {
                  saveDrawing();
                  handleClose();
                }}
              >
                저장하기
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
