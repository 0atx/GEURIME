import React, { useRef, useState } from "react";
import { Grid, TextField, Avatar } from "@mui/material";
import Btn from "components/common/Btn";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const [imageUrl, setImageUrl] = useState("assets/logo/onlylogo.png");
  const imgRef = useRef();
  const [images, setImages] = useState();
  const navigator = useNavigate();

  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }

  function registUser() {
    //todo: axios 연동 필요
    // const formdata = new FormData();
    // formdata.append("img", images[0]);

    // const config = {
    //   Headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };

    // const reesponse = axios.post('url', formdata, config);

    console.log("click");

    navigator("/registkids");
  }

  const StyledTextField = styled(TextField)(() => ({
    "& fieldset": {
      borderRadius: "40px",
      height: "5vh",
    },
    "& label.Mui-focused": {
      color: "#FFCA28",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFCA28",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFCA28",
      },
    },
  }));
  // todo: axios
  return (
    <Grid id="container">
      <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "5vh" }}>
        <Grid item xs={3} sx={{ marginBottom: "3vh", textAlign: "center" }}>
          {imageUrl ? (
            <Avatar src={imageUrl} sx={{ width: 100, height: 100 }} />
          ) : (
            <AccountCircleIcon color="action" sx={{ fontSize: 100 }} />
          )}
        </Grid>
        <Grid item xs={12} sx={{ fontSize: "3vh", color: "#FFA000" }}>
          <label for="profile">
            <div>프로필 사진 변경</div>
          </label>
          <div>
            <form method="post" enctype="multipart/form-data">
              <input
                style={{ display: "none" }}
                type="file"
                ref={imgRef}
                onChange={(e) => {
                  changeProfile(e);
                }}
                accept="img/*"
                id="profile"
              />
            </form>
          </div>
        </Grid>
      </Grid>
      {/* 이름 */}
      <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
        <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}>
          이름
        </Grid>
        <Grid item xs={10} sx={{ fontSize: "3vh" }}>
          이름
        </Grid>
      </Grid>
      {/* 이메일 */}
      <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
        <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}>
          이메일
        </Grid>
        <Grid item xs={10} sx={{ fontSize: "3vh" }}>
          이메일
        </Grid>
      </Grid>
      {/* 닉네임 */}
      <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
        <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}>
          닉네임
        </Grid>
        <Grid item xs={10}>
          <StyledTextField size="small" />
        </Grid>
      </Grid>
      {/* 가족이름 */}
      <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
        <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "1vh", color: "#6F6F6F" }}>
          가족 이름
        </Grid>
        <Grid item xs={10}>
          <StyledTextField size="small" />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Btn
          onClick={() => {
            registUser();
          }}
          sx={{ marginBottom: "5vh", marginTop: "3vh", marginRight: "1vh" }}
        >
          다음
        </Btn>
      </Grid>
    </Grid>
  );
}
