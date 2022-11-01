import { Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { fontWeight } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';


export default function BoardInputItem() { 

  const boardCategories = [
    // {
    //   value: 'USD',
    //   label: '$',
    // },
    {
      value: '자유',
      label: '자유',
    },
    {
      value: '질문',
      label: '질문',
    },
  ];
  

  const [boardCategory, setBoardCategory] = useState('자유');
  const [title, setTitle] = useState();

  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };
  const titleChange = (event) => {
    setTitle(event.target.value);
    // console.log({제목: title})
  };

  return (
  <Grid>
      {/* <Paper
        sx={{
          Color: '#FFE082',
          borderWidth: 3,
          borderRadius: 3
        }}
      >
      </Paper> */}
  
      <Grid>
        이미지 인풋
      </Grid>

      {/* 분류 */}
      <Grid
        container
        direction="row"
        alignItems='center'
        sx={{marginTop: '5%'}}
      >
        <Grid
          item
          xs={2.5}
          textAlign='center'
        >
          분류
        </Grid>
        <Grid
          item
          xs={9.5}
          alignItems='center'
        >
        <TextField
          id="standard-select-currency"
          select
          value={boardCategory}
          onChange={handleChange}
          variant="standard"
            sx={{ width: '31vh', marginLeft: '3%' }}
        >
          {boardCategories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </Grid>

        {/* 제목 */}
        <Grid
          container
          direction="row"
          alignItems='center'
          sx={{marginTop: '5%'}}
        >
        <Grid
          item
          xs={2.5}
          textAlign='center'
        >
          제목
        </Grid>
        <Grid
          item
          xs={9.5}
          alignItems='center'
        >
            <TextField
              sx={{ width: '31vh', marginLeft: '3%' }}
              variant="standard"
              placeholder="제목을 입력하세요"
              onChange={titleChange}
            />
        </Grid>
      </Grid>

      {/* 내용 */}
      <Grid
        container
        direction="column"
      >
        <Grid
          xs={2.5}
          textAlign='center'
          sx={{ marginTop: '5%' }}
        >
          내용
        </Grid>
        
          <Grid
            sx={{marginLeft: '7%', marginTop: '2%'}}
          >
            <TextField
              multiline
              minRows={5}
              maxRows={5}
              sx={{ width: '80vw', borderBlockColor: '#FFE082', borderRadius: 10, borderColor: '#FFE082' }}
              
            />
      </Grid>
      </Grid>
      {/* 등록 버튼 */}
      <Grid>

      </Grid>
    </Grid>
  </Grid>
  )
}