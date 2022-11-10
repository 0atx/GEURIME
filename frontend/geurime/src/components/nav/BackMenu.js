/*
BackMenu 헤더
속성 : type(String), isLeft(Boolean), title(String), clickTitle(타이틀클릭 함수), isRight(String), clickRight(오른쪽클릭 함수)
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";
import { Toolbar, Grid, AppBar, Box, Menu, MenuItem, IconButton } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteGalleryModal from "components/modal/DeleteGalleryModal";

export default function BackMenu({ type, isLeft, title, clickTitle, isRight, clickRight }) {
  const navigate = useNavigate();

  // detail gallery 필요 변수들
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const location = useLocation();
  const galleryId = location.pathname.substring(15, location.pathname.length + 1);
  const [deleteGalleryOpen, setDeleteGalleryOpen] = useState(false);

  async function deleteGallery() {
    setDeleteGalleryOpen(true);
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      {/* 갤러리 삭제 모달 */}
      <DeleteGalleryModal open={deleteGalleryOpen} id={galleryId} setOpen={setDeleteGalleryOpen} />
      <AppBar
        style={{
          background: "#FFFFFF",
          position: "fixed",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Grid
            container
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            {/* isLeft */}
            <Grid item sx={{ textAlign: "center" }} xs={2}>
              {isLeft === true && (
                <KeyboardArrowLeftRoundedIcon
                  onClick={() => {
                    // 뒤로 가기
                    navigate(-1);
                  }}
                ></KeyboardArrowLeftRoundedIcon>
              )}
            </Grid>
            {/* title */}
            <Grid item sx={{ textAlign: "center" }} onClick={clickTitle} xs={8}>
              <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
                {title}
                {type === "registDiary" && <ArrowDropDownRoundedIcon></ArrowDropDownRoundedIcon>}
              </Grid>
            </Grid>
            {/* isRight */}
            <Grid item sx={{ fontSize: "1.8vh", textAlign: "center" }} xs={2}>
              <div
                style={{
                  color: "#ffa000",
                }}
                onClick={clickRight}
              >
                {isRight}
                {type === "registKids" && <AddIcon></AddIcon>}
                {type === "detailGallery" && (
                  <>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MenuIcon sx={{ color: "#FFCA28" }} />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          width: "30vw",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate(`/modifydetailgallery/${galleryId}`);
                        }}
                      >
                        보관함 수정
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          deleteGallery();
                          handleClose();
                        }}
                      >
                        보관함 삭제
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
