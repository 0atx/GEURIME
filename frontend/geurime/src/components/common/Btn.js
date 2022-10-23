/*
버튼 속성: bgcolor(배경색), fontcolor(글씨색)
@author 여예원
@since 2022.10.20
*/

import * as React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  && {
    background-color: ${(props) => props.bgcolor || "#FFE082"};
    color: ${(props) => props.fontcolor || "#000000"};
    border-radius: 25px;
    height: 37px;
    box-shadow: 1px 1px 5px #c7c7c2;
  }

  &:hover {
    background-color: #ffe082 !important;
    transform: scale(1.1);
  }
`;

export default StyledButton;
