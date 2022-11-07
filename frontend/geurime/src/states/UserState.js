/*
유저의 정보를 담는 state
사용할 파일에서 해야할 작업
1. import useRecoilValue or useRecoilState
2. import 사용할 state
3. const [변수명, set변수명] = useRecoilValue(사용할 state)
@author 여예원
@since 2022.10.28
*/

import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("name"),
    nickname: "",
    email: localStorage.getItem("email"),
    userBirth: "",
    userGender: "",
    userProfileImage: "",
    inviteCode: "",
    familyId: "",
    familyName: "",
    familyLeaderId: "",
    isChild: false,
    kidDtoList: [],
  },
});
