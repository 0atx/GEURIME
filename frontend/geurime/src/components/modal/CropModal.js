import React, { createRef, useEffect, useRef, useState } from "react";
import Button from "components/common/Btn";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Container, Slider, Grid, Paper, DialogTitle, DialogActions } from "@mui/material";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CropModal({ open, handleClose, url, updatedImage, setUpdatedImage }) {
  // 이미지
  const [image, setImage] = useState(null);
  // 크롭
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  function onImageLoad(e) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  const cropImageNow = async () => {
    try {
      // 원본 이미지
      const image = new Image();
      image.src = url;
      let origin_width = image.width;
      let origin_height = image.height;
      // 크롭할 영역을 구할 이미지
      var updated = document.getElementById("updatedImg");
      var updated_width = updated.clientWidth;
      var updated_height = updated.clientHeight;

      // console.log("원래꺼", origin_width, origin_height);
      // console.log("크롭꺼", updated_width, updated_height);

      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * (origin_width / updated_width),
        crop.y * (origin_height / updated_height),
        crop.width * (origin_width / updated_width),
        crop.height * (origin_height / updated_height),
        0,
        0,
        crop.width,
        crop.height
      );
      // console.log("크롭", crop);
      // canvas를 url로 바꾸기
      const base64Image = canvas.toDataURL("image/jpeg");
      setUpdatedImage(base64Image);
    } catch (e) {
      console.log("crop the image");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>그림 자르기</DialogTitle>
        <Container sx={{ marginTop: "10%", textAlign: "center" }}>
          <div>
            <div>
              <div>
                <ReactCrop
                  src={url}
                  // aspect={16 / 9}
                  // style={{ maxWidth: "100%" }}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                >
                  <img src={url} onLoad={onImageLoad} id="updatedImg"></img>
                </ReactCrop>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "5%", marginBottom: "5%" }}>
            <Button
              className="cropButton"
              width="40%"
              onClick={() => {
                cropImageNow();
                handleClose();
              }}
            >
              자르기
            </Button>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
