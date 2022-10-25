import React from 'react';
import { Grid } from '@mui/material';
import Btn from 'components/common/Btn';

export default function UserInfo() { 
    return (
        <Grid id="container">
            <Grid container>
                사진
            </Grid>
            <Grid container>
                이름
            </Grid>
            <Grid container>
                이메일
            </Grid>
            <Grid container>
                닉네임
            </Grid>
            <Grid container>
                간편비밀번호
            </Grid>
            <Grid container>
                간편비밀번호확인
            </Grid>
            <Grid container>
                가족이름
            </Grid>
            <Grid container>
                <Btn>다음</Btn>
            </Grid>
           
        </Grid>
    )
}