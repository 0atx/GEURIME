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
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import diaryPaper from "assets/diaryPaper.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CropModal({ open, handleClose, url }) {
  const [srcImg, setSrcImg] = useState(null);
  //save the image that used to be crop
  const [image, setImage] = useState(null);
  //change the aspect ratio of crop tool as you preferred
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  //save the resulted image
  const [result, setResult] = useState(null);

  const handleImage = async (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
  };

  async function getCroppedImg(image, crop, fileName) {
    console.log("크롭", crop);

    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setResult(base64Image);
      console.log(result);
    } catch (e) {
      console.log("crop the image");
    }
  }

  //   const getCroppedImg = async () => {
  //     try {
  //       const canvas = document.createElement("canvas");
  //       const scaleX = image.naturalWidth / image.width;
  //       const scaleY = image.naturalHeight / image.height;
  //       canvas.width = crop.width;
  //       canvas.height = crop.height;
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(
  //         image,
  //         crop.x * scaleX,
  //         crop.y * scaleY,
  //         crop.width * scaleX,
  //         crop.height * scaleY,
  //         0,
  //         0,
  //         crop.width,
  //         crop.height
  //       );

  //       const base64Image = canvas.toDataURL("image/jpeg", 1);
  //       setResult(base64Image);
  //       console.log(result);
  //     } catch (e) {
  //       console.log("crop the image");
  //     }
  //   };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              그림 자르기
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: "10%" }}>
          <div>
            {url}
            <div>
              <div>
                <ReactCrop
                  style={{ maxWidth: "100%" }}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                >
                  <img src={url}></img>
                </ReactCrop>
                <Button
                  className="cropButton"
                  onClick={() => {
                    getCroppedImg(image, crop, "newFile.jpeg");
                  }}
                >
                  crop
                </Button>
              </div>
              {result}
              {result && (
                <div>
                  <img src={result} alt="cropped image" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
