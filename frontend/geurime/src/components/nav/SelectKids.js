import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

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
      }}
    >
      <AppBar
        color="transparent"
        // position="static"
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
                fontSize: "2.5vh",
              },
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/assets/logo/onlylogo.png" />
              </ListItemAvatar>
              <ListItemText primary="우주최강귀요미카니" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse sx={{ backgroundColor: "#ffffff" }} in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/assets/logo/onlylogo.png" />
                  </ListItemAvatar>
                  <ListItemText primary="우주최강귀요미포" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
