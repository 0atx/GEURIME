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
import { Container } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DrawingModal({
  open,
  handleClose,
  canvasRef,
  startDrawing,
  finishDrawing,
  drawing,
}) {
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              직접 그리기
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              저장
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <canvas
            id="canvas"
            ref={canvasRef}
            width="390vw"
            height="800vh"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={drawing}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={drawing}
          />
          <Button onClick={clearCanvas}>전부 지우기</Button>
        </Container>
      </Dialog>
    </div>
  );
}
