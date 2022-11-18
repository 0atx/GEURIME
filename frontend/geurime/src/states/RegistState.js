/*
분석중인 일기 존재 여부
@author 유현욱
@since 2022.11.11
*/

import { atom } from "recoil";

export const registState = atom({
  key: "regist",
  default: {
    "state": "",
    "num" : ""
  },
});
