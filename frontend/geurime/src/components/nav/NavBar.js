import { Paper, BottomNavigation, BottomNavigationAction, Avatar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useState } from "react";

export default function NavBar() {
  const [value, setValue] = useState(0);

  return (
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
        <BottomNavigationAction label="홈" icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction label="갤러리" icon={<PhotoOutlinedIcon />} />
        <BottomNavigationAction icon={<AddBoxIcon color="primary" />} />
        <BottomNavigationAction label="커뮤니티" icon={<GroupsOutlinedIcon />} />
        <BottomNavigationAction label="설정" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
