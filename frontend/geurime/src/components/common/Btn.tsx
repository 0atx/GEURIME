/*
버튼
속성: bgColor, fontColor, width
@author 여예원
@since 2022.10.20
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

//props 설정
interface StyledButtonprops { 
    bgColor: string;
    fontColor: string;
    width: string;
}

const StyledButton = styled.button<StyledButtonprops>`
&& {
    background-color: ${(props) => props.bgColor || "#FFE082"};
    color: ${(props) => props.fontColor || "black"};
    border-radius: 24px;
    width: ${(props) => props.width};
    height: 37px;
  }

  &:hover {
    background-color: ${(props) => props.bgColor} !important;
    transform: scale(1.1);
  }

`;

export default StyledButton;