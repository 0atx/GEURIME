/*
컴포넌트 적용
@author 조혜안
@since 2022.10.25
*/
import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";

import Button from "components/common/Btn.js";
import NavBar from "components/nav/NavBar";

import BackMenu from "components/nav/BackMenu";
import SelectKids from "components/nav/SelectKids";

export default function Components() {
  return (
    <div style={{ marginTop: "80px" }}>
      <h1>색상표</h1>
      <h2 style={{ backgroundColor: "#FFE082" }}>버튼색 #FFE082</h2>
      <h2 style={{ backgroundColor: "#FFCA28" }}>네비바색 #FFCA28</h2>
      <h2 style={{ backgroundColor: "#FFA000" }}>포인트글씨 #FFA000</h2>

      <hr></hr>
      <h1> 컴포넌트 목록 </h1>
      <h2>버튼</h2>
      <Button>버튼</Button>
      <h2>BackMenu(상단에 있음)</h2>
      <BackMenu isLeft={true} title="타이틀적는곳" isRight="오른쪽"></BackMenu>
      <h2>SelectKids (상단에 있음)</h2>
      {/* <SelectKids></SelectKids> */}
      <h2>Navbar(하단에 있음)</h2>
      <NavBar></NavBar>
    </div>
  );
}
