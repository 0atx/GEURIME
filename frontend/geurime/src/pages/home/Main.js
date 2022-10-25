import React from "react";
import { Grid, Paper, Avatar } from '@mui/material';

export default function Main() { 
    return (
        <div id="container">
            <Grid container justifyContent="center">
                <Grid item xs={10}>갤러리</Grid>
                <Grid item xs={10}>
                    갤러리
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={10} >우리 가족 정보</Grid>
                <Grid item xs={10} >
                    <Paper elevation={3} >
                        {/* todo: 실제 가족 정보로 변경 필요 */}
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
