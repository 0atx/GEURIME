/*
NavBar
@author 조혜안
@since 2022.10.25
*/
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "components/common/Btn.js";
import AOS from "aos";
import "aos/dist/aos.css";
import Calendar from "components/nav/Calendar.js";

export default function NavBar() {
  const location = useLocation();

  const [value, setValue] = useState(0);

  // 등록 메뉴
  const [menuOpen, setMenuOpen] = useState(false);
  // 캘린더 열기
  const [calOpen, setCalOpen] = useState(false);

  const handleClose = () => {
    setCalOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {menuOpen && (
        <div>
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              bottom: "56px",
              backgroundColor: "rgba(0, 0, 0, 0.46)",
            }}
            onClick={() => {
              setMenuOpen(false);
            }}
          ></div>
          <Dialog onClose={handleClose} open={calOpen}>
            <DialogTitle>일기를 등록할 날짜를 선택해주세요!</DialogTitle>
            <Calendar></Calendar>
            <DialogActions></DialogActions>
          </Dialog>
          }
          <div style={{ textAlign: "center" }}>
            <Button
              data-aos="fade-up"
              data-aos-delay="200"
              sx={{
                position: "fixed",
                left: "33%",
                width: "33%",
                bottom: "140px",
              }}
              onClick={() => {
                setCalOpen(true);
              }}
            >
              일기 등록
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/registdrawing">
              <Button
                data-aos="fade-up"
                data-aos-delay="100"
                sx={{
                  position: "fixed",
                  left: "33%",
                  width: "33%",
                  bottom: "85px",
                }}
              >
                그림 등록
              </Button>
            </Link>
          </div>
        </div>
      )}
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            "&&": {
              "& .MuiBottomNavigationAction-label": {
                fontSize: "2vh",
              },
            },
            "& .Mui-selected": {
              "& .MuiBottomNavigationAction-label": {
                transition: "none",
                fontWeight: "bold",
                lineHeight: "20px",
                fontSize: "2vh",
              },
              "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
                color: "#FFCA28",
              },
            },
          }}
        >
          {/* 홈  */}
          <BottomNavigationAction
            component={Link}
            to="/main"
            label="홈"
            icon={<HomeOutlinedIcon />}
          />
          {/* 갤러리 */}
          <BottomNavigationAction
            component={Link}
            to="/gallery"
            label="갤러리"
            icon={<PhotoOutlinedIcon />}
          />
          {/* 등록 */}
          <BottomNavigationAction
            icon={<AddBoxIcon color="primary" />}
            onClick={() => {
              setMenuOpen(true);
            }}
          />
          {/* 커뮤니티 */}
          <BottomNavigationAction
            component={Link}
            to="/board"
            label="커뮤니티"
            icon={<GroupsOutlinedIcon />}
          />
          {/* 설정 */}
          <BottomNavigationAction
            component={Link}
            to="/settings"
            label="설정"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
