/*
버튼
@author 여예원
@since 2022.10.20
*/

import * as React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const StyledButton = styled(Button)`
&& {
    background-color: #FFE082;
    color: black;
    border-radius: 25px;
    height: 37px;
    box-shadow: 1px 1px 5px #C7C7C2;
  }

  &:hover {
    background-color: #FFE082 !important;
    transform: scale(1.1);
  }

`;

export default StyledButton;