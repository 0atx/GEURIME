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
import invite from "assets/icon/settings/settings_invite.png";
import kids from "assets/icon/settings/settings_kids.png";
import resign from "assets/icon/settings/settings_resign.png";
import logout from "assets/icon/settings/settings_logout.png";
import user from "assets/icon/settings/settings_user.png";
import { useNavigate } from "react-router-dom";
import { userState } from "states/UserState";
import { useRecoilState } from "recoil";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export default function Settings() {
  // userinfo
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const navigate = useNavigate();

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
          {/* 내 프로필 변경 */}
          <ListItemButton
            onClick={() => {
              navigate("/modifyuserinfo");
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <img src={user} width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="내 프로필 변경" />
          </ListItemButton>
          <Divider />
          {/* 아이 프로필 변경 - 아이일 때는 보이지 않음 */}
          {!userInfo.isChild && (
            <div>
              <ListItemButton
                onClick={() => {
                  navigate("/modifykidsinfo");
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <img src={kids} width="100%" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="아이 프로필 변경" />
              </ListItemButton>
              <Divider />
            </div>
          )}

          {/* 가족 초대하기 */}
          <ListItemButton
            onClick={() => {
              setOpenInvite(true);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <img src={invite} width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="가족 초대하기" />
          </ListItemButton>
          <Divider />
          {/* 로그아웃 */}
          <ListItemButton
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <img src={logout} width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="로그아웃" />
          </ListItemButton>
          <Divider />
          {/* 회원 탈퇴 */}
          <ListItemButton
            onClick={() => {
              setOpenDeleteUser(true);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <img src={resign} width="100%" />
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
