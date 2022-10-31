import React, { useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Input,
} from "@mui/material";
import Btn from "components/common/Btn";
import BackMenu from "components/nav/BackMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { useRef } from "react";

export default function RegistKids() {
  const [kids, setKids] = useState([]); // 아이 담을 변수
  const [open, setOpen] = useState(false); // 아이 등록 모달 관리 변수

  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 아이이름
  const kidsNameInput = useRef(null);

  // 생년월일
  const kidsBirthInput = useRef(null);

  function addKids() {
    setOpen(true);
    console.log("click");
  }

  // 아이 등록 모달 닫기 함수
  const handleClose = () => {
    setOpen(false);
  };

  // 프로필
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();

  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  }
  // todo: fontsize 변경하기
  return (
    <Grid>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
        <DialogContent>
          <Grid container textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={12} sx={{ fontWeight: "bold" }}>
              아이 정보 입력
            </Grid>
          </Grid>
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={5} sx={{ marginBottom: "1vh", textAlign: "center" }}>
              {imageUrl == "" ? (
                <Avatar src={imageUrl} sx={{ width: 100, height: 100 }} />
              ) : (
                <AccountCircleIcon color="action" sx={{ fontSize: 100 }} />
              )}
            </Grid>
            <Grid item xs={12} sx={{ fontSize: "2.7vh", color: "#FFA000" }}>
              <label for="profile">
                <div>프로필 사진 변경</div>
              </label>
              <div>
                <form method="post" encType="multipart/form-data">
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
            {/* todo: 캘린더 클릭 후 이름 바뀌는 것 수정 필요 */}
            <Grid item xs={10}>
              <Input
                inputRef={kidsNameInput}
                inputProps={{
                  style: {
                    fontSize: "3vh",
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* 생년월일 */}
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "4vh" }}>
            <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "3vh", color: "#6F6F6F" }}>
              생년월일
            </Grid>
            <Grid item xs={10} sx={{ fontSize: "3vh" }} justifyContent="center">
              <Input
                inputRef={kidsBirthInput}
                placeholder="ex) 20000717"
                inputProps={{
                  style: {
                    fontSize: "3vh",
                  },
                }}
              />
            </Grid>
          </Grid>
          {/* 성별 */}
          <Grid container justifyContent="center" textAlign="center" sx={{ marginBottom: "3vh" }}>
            <Grid item xs={10} sx={{ fontSize: "3vh", marginBottom: "2vh", color: "#6F6F6F" }}>
              성별
            </Grid>
            <Grid item xs={10} sx={{ fontSize: "3vh" }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  color="secondary"
                  sx={{
                    fontSize: "3vh",
                  }}
                  value={userInfo.userGender == "F" ? "F" : userInfo.userGender == "M" ? "M" : null}
                >
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label={<Typography variant="h5">남</Typography>}
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label={<Typography variant="h5">여</Typography>}
                  />
                </RadioGroup>
              </FormControl>
              <Grid
                container
                justifyContent="center"
                textAlign="center"
                sx={{ marginTop: "3.5vh" }}
              >
                <Btn>등록</Btn>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <BackMenu isLeft="false" title="우리 아이 정보 등록" type="registKids" clickRight={addKids} />
      <Grid id="container">
        <Grid
          direction="row"
          container
          alignItems="center"
          sx={{
            textAlign: "center",
            height: "82vh",
            width: "100vw",
          }}
        >
          {kids.length == 0 ? (
            <Grid item xs={12} sx={{ color: "#6f6f6f" }}>
              <Typography align="center" variant="h5">
                위쪽의 + 버튼을 눌러
              </Typography>
              <Typography align="center" variant="h5">
                아이 정보를 등록하세요!
              </Typography>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Btn
            onClick={() => {
              console.log("등록완료");
            }}
            sx={{ marginRight: "3vh" }}
          >
            등록 완료
          </Btn>
        </Grid>
      </Grid>
    </Grid>
  );
}
