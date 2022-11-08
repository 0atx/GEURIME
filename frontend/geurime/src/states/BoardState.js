import { atom } from "recoil";

export const boardState = atom({
  key: "board",
  default: {
    "boardContent": "",
    "boardId": null,
    "boardTitle": "",
    "boardType": ""
  },
});
