/*
SelectKids 헤더
@author 조혜안
@since 2022.10.25
*/
import { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useRecoilState } from "recoil";
import { userState } from "states/UserState";
import { CurrentKidState } from "states/CurrentKidState";
import { http } from "api/http";

export default function SelectKids() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [currentKid, setCurrentKid] = useRecoilState(CurrentKidState);

  // 아이 목록 담는 변수
  const [kids, setKids] = useState([]);

  // 처음 로딩시 유저정보 가져오기
  async function getUserInfo() {
    if (currentKid.kidId === 0) {
      const response = await http.get(`/users/${userInfo.userId}`);
      if (response.data.message === "success") {
        setUserInfo(response.data.data);
        setKids(response.data.data.kidDtoList);
        setCurrentKid(response.data.data.kidDtoList[0]);
      }
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getUserInfo();
    }
  }, []);

  const navigater = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        "& .css-hyum1k-MuiToolbar-root": {
          padding: "0px",
        },
        "& .css-1qg3ghx-MuiList-root": {
          paddingTop: "0px",
        },
      }}
    >
      <AppBar
        color="transparent"
        style={{
          position: "fixed",
          paddingTop: "0px",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <Grid
                container
                alignItems="center"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                {/* 상단바 */}
                <Grid item xs={3} sx={{ marginLeft: "20px" }}>
                  {currentKid.kidProfileImage !== "" ? (
                    <Avatar
                      src={currentKid.kidProfileImage}
                      sx={{ marginRight: "10px" }}
                    />
                  ) : (
                    <Avatar
                      src="/assets/icon/default_profile.png"
                      sx={{ marginRight: "10px" }}
                    />
                  )}
                </Grid>
                {currentKid.kidName}
                <KeyboardArrowDownIcon />
              </Grid>
              {/* 클릭 후 보이는 메뉴 */}
              <Menu
                sx={{ marginTop: "28px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {kids.map(function (kid, i) {
                  return (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        setCurrentKid(kid);
                        handleClose();
                      }}
                    >
                      {kid.kidProfileImage !== "" ? (
                        <Avatar
                          src={kid.kidProfileImage}
                          sx={{ marginRight: "10px" }}
                        />
                      ) : (
                        <Avatar
                          src="/assets/icon/default_profile.png"
                          sx={{ marginRight: "10px" }}
                        />
                      )}

                      {kid.kidName}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Grid>
            {/* 설정 아이콘 */}
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <IconButton
                onClick={() => {
                  navigater("/settings");
                }}
              >
                <SettingsIcon sx={{ color: "#666665" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
