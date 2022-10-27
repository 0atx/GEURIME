/*
캘린더
@author 조혜안
@since 2022.10.25
*/
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";

export default function MainCalendar() {
  return (
    <Calendar
      calendarType="Hebrew" // 일요일시작
      // 날짜의 일을 빼는 코드
      formatDay={(locale, date) => moment(date).format("DD")}
    ></Calendar>
  );
}
