import BackMenu from "components/nav/BackMenu";
import NavBar from "components/nav/NavBar";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Divider,
  ListItemButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useState } from "react";
import DeleteUserModal from "components/modal/DeleteUserModal";
import InviteFamilyModal from "components/modal/InviteFamillyModal";

export default function Settings() {
  // 탈퇴 모달
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  // 초대 모달
  const [openInvite, setOpenInvite] = useState(false);

  return (
    <div>
      {/* 헤더 */}
      <BackMenu title="설정"></BackMenu>
      <Container id="container">
        <List sx={{ width: "100%" }}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="내 프로필 변경" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="자녀 프로필 변경" />
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => {
              setOpenInvite(true);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="가족 초대하기" />
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => {
              setOpenDeleteUser(true);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="회원 탈퇴" />
          </ListItemButton>
        </List>
      </Container>
      {/* 하단 네비 */}
      <NavBar></NavBar>
      {/* 탈퇴 모달 */}
      <DeleteUserModal
        open={openDeleteUser}
        handleClose={() => {
          setOpenDeleteUser(false);
        }}
      ></DeleteUserModal>
      {/* 초대 모달 */}
      <InviteFamilyModal
        open={openInvite}
        close={() => {
          setOpenInvite(false);
        }}
      ></InviteFamilyModal>
    </div>
  );
}
