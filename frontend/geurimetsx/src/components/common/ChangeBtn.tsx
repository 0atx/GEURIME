/*
변경 가능 버튼
속성: bgColor, fontColor
@author 여예원
@since 2022.10.20
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

// props 설정
interface StyledButtonProps { 
    bgColor: string;
    fontColor: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
&& {
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.fontColor};
    border-radius: 25px;
    height: 37px;
    box-shadow: 1px 1px 5px #C7C7C2;
  }

  &:hover {
    background-color: ${(props) => props.bgColor || "#FFE082"} !important;
    transform: scale(1.1);
  }

`;

export default StyledButton;