/*
현재 클릭된 아이의 정보를 담는 state
@author 여예원
@since 2022.11.03
*/

import { atom } from "recoil";

export const CurrentKidState = atom({
  key: "kid",
  default: {
    drawingBoxDtoList: [
      {
        drawingBoxCategory: "",
        drawingBoxId: 0,
        drawingBoxName: "",
      },
    ],
    kidBirth: "",
    kidId: localStorage.getItem("currentKidId"),
    kidName: "",
    kidProfileImage: "",
  },
});
