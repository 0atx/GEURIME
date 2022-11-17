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
import white from "assets/white.png";
import paper from "assets/diaryPaper.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DrawingModal({ open, handleClose, setCanvas }) {
  useEffect(() => {
    // 펜 두께, 색깔 초기화
    setColor("black");
    setBrushRadius(5);
  }, [open]);

  const canvasRef = useRef(null);

  const [color, setColor] = useState("black");
  const [brushRadius, setBrushRadius] = useState(5);

  // 전부 지우기
  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  // 그림 저장
  function saveDrawing() {
    localStorage.setItem("savedDrawing", canvasRef.current.getSaveData());
    setCanvas(canvasRef.current.getDataURL());
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
        <Container sx={{ marginTop: "10%" }}>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
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
            <Grid item xs={12} sx={{ mt: 1, mb: 4 }}>
              <Paper elevation={3} sx={{ display: "inline-block" }}>
                <CanvasDraw
                  id="canvas"
                  ref={canvasRef}
                  canvasWidth={window.innerWidth * 0.92}
                  canvasHeight={window.innerWidth * 0.92}
                  // catenaryColor={"#FFCA28"}
                  hideGrid
                  enablePanAndZoom
                  brushColor={color}
                  brushRadius={brushRadius}
                  lazyRadius={0}
                  // onChange={() => console.log("onChange")}
                />
              </Paper>
            </Grid>

            <Grid
              container
              alignItems="center"
              sx={{ backgroundColor: "#FFF3D0", padding: "3%", borderRadius: "20px" }}
            >
              {/* 펜 두께 */}
              <Grid item xs={2} sx={{ mb: 1 }}>
                <p>펜 두께</p>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  mb: 1,
                  pl: 2,
                  pr: 2,
                }}
              >
                <Slider
                  color="secondary"
                  step={5}
                  min={1}
                  max={50}
                  defaultValue={5}
                  aria-label="Default"
                  // valueLabelDisplay="auto"
                  onChange={(e) => {
                    setBrushRadius(e.target.value);
                  }}
                />
              </Grid>
              {/* 색깔 */}
              <Grid item xs={2} sx={{ mb: 1, mt: 1 }}>
                <p>색깔</p>
              </Grid>

              <Grid
                item
                xs={10}
                sx={{
                  mt: 1,
                  textAlign: "center",
                  pl: 2,
                }}
              >
                <CirclePicker
                  width="100%"
                  circleSize={23}
                  // circleSpacing={10}
                  colors={[
                    "#f44e3b",
                    "#fe9200",
                    "#fcdc00",
                    "#dbdf00",
                    "#a4dd00",
                    "#68ccca",
                    "#03a9f4",
                    "#aea1ff",
                    "#fda1ff",
                    "#f06292",
                    "#194D33",
                    "#0C797D",
                    "#0062B1",
                    "#653294",
                    "#AB149E",
                    "#ff5722",
                    "#795548",
                    "#8b572a",
                    "#969696",
                    "#000000",
                    "#ffffff",
                  ]}
                  color={color}
                  onChange={(color) => {
                    console.log(color);
                    setColor(color.hex);
                  }}
                ></CirclePicker>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              textAlign="center"
              sx={{ marginTop: "15%", marginBottom: "10%" }}
            >
              <Button
                width="40%"
                onClick={() => {
                  saveDrawing();
                  handleClose();
                }}
              >
                그림 올리기
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
