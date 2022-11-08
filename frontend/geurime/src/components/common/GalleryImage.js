import React, { useState } from "react";
import { Paper, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function GalleryImage({ src, imageId, clickedDrawings, changeClicked }) {
  // 이미지의 css를 변경하기 위한 변수
  const [type, setType] = useState(null);

  function changeCSS(e) {
    changeClicked(e.target.className);

    if (clickedDrawings.includes(e.target.className)) {
      setType("");
    } else {
      setType("clicked");
    }
  }

  return (
    <>
      {type === "clicked" ? (
        <ImageListItem id={type} className={imageId}>
          <Paper elevation={0} sx={{ width: "13vh", height: "13vh" }}>
            <img
              onClick={(e) => {
                changeCSS(e);
              }}
              className={imageId}
              src={src}
              style={{
                width: "97%",
                height: "97%",
                objectFit: "cover",
                border: "2px solid #FFA000",
              }}
            />
            <ImageListItemBar
              className={imageId}
              sx={{
                background: "rgba(0,0,0,0)",
              }}
              position="top"
              actionIcon={
                <IconButton>
                  <CheckCircleIcon sx={{ color: "#FFA000" }} />
                </IconButton>
              }
            />
          </Paper>
        </ImageListItem>
      ) : (
        <ImageListItem id={type} className={imageId}>
          <Paper elevation={0} sx={{ width: "13vh", height: "13vh" }}>
            <img
              className={imageId}
              src={src}
              style={{
                width: "95%",
                height: "95%",
                objectFit: "cover",
              }}
              onClick={(e) => {
                changeCSS(e);
              }}
            />
            <ImageListItemBar
              className={imageId}
              sx={{
                background: "rgba(0,0,0,0)",
              }}
              position="top"
              actionIcon={
                <IconButton>
                  <RadioButtonUncheckedIcon />
                </IconButton>
              }
            />
          </Paper>
        </ImageListItem>
      )}
    </>
  );
}
