/*
SelectKids 헤더
@author 조혜안
@since 2022.10.25
*/
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemAvatar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function SelectKids() {
  const [open, setOpen] = useState(false);

  // 아이 목록 - 실제 정보로 변경 필요!!!
  const [kids, setKids] = useState([
    {
      image: "/assets/icon/default_profile.png",
      name: "첫째",
    },
    {
      image: "/assets/icon/default_profile.png",
      name: "둘째",
    },
    {
      image: "/assets/icon/default_profile.png",
      name: "셋째",
    },
    {
      image: "/assets/icon/default_profile.png",
      name: "넷째",
    },
  ]);

  // 클릭된 아이
  const [clicked, setClicked] = useState(kids[0]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        "& .css-hyum1k-MuiToolbar-root": {
          padding: "0px",
        },
        "& .css-e1xqc2-MuiList-root": {
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
          <List
            sx={{
              width: "100%",
              "& .MuiListItemText-primary": {
                fontSize: "23px",
              },
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={clicked.image} />
              </ListItemAvatar>
              <ListItemText primary={clicked.name}></ListItemText>

              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse sx={{ backgroundColor: "#ffffff" }} in={open} timeout="auto" unmountOnExit>
              {/* 아이 목록 */}
              <List component="div" disablePadding>
                {kids.map((kid, i) => (
                  <ListItemButton
                    key={i}
                    onClick={() => {
                      setOpen(!open);
                      setClicked(kid);
                      // 클릭된 아이의 정보로 화면 전체 변경 필요!!!
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={kid.image} />
                    </ListItemAvatar>
                    <ListItemText primary={kid.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
