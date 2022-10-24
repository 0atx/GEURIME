import { Container } from "@mui/material";
import React, { useState } from "react";

import Button from "components/common/Btn.js";
import NavBar from "components/nav/NavBar";
import Header from "components/nav/Header";
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
      <h2>Header</h2>
      <Header></Header>
      <h2>BackMenu</h2>
      <BackMenu></BackMenu>
      <h2>SelectKids (상단에 있음)</h2>
      <SelectKids></SelectKids>
      <h2>Navbar(하단에 있음)</h2>
      <NavBar></NavBar>
    </div>
  );
}
