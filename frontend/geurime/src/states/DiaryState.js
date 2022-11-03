/*
일기를 등록할 때 정보를 담는 state
@author 조혜안
@since 2022.11.01
*/

import { atom } from "recoil";

export const diaryState = atom({
  key: "diary",
  default: {
    dateTitle: "", // 일기 날짜 타이틀 (ex. 11월 1일 일기)
    feeling: null, // 기분
    weather: null, // 날씨
    getupTime: null, // 오늘 일어난 시간
    sleepTime: null, // 어제 잠든 시간
    writing: "", // 작성한 글
  },
});
