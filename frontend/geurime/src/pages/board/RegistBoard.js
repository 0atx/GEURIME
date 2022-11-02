import { Button, Grid } from "@mui/material";
import { http } from "api/http";
import { useRef, useState } from "react";
import BoardInputItem from "./BoardInputItem";

export default function RegistBoard() { 

  const [title, setTitle] = useState();
  const [text, setText] = useState();
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
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const [images, setImages] = useState();

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const textChange = (event) => {
    setText(event.target.value);
  };
  const handleChange = (event) => {
    setBoardCategory(event.target.value);
  };

  const regist = async () => {
    // setTitle(event.target.value);
    console.log('등록중')
    console.log({카테고리: boardCategory})
    console.log({제목: title })
    console.log({ 내용: text })
    console.log({이미지url: imgRef.current.files[0]})
    const response = await http.post(`/boards`, {
      request: {
        userId: 1,
        boardTitle: title,
        boardContent: text,
        boardCategory: boardCategory,
      },
      imageFile: {
        imageFile: imgRef.current.files[0]
      },

    });
    // console.log({전체게시글: response.data });

    if (response.data.message == "success") {

    } else {
      alert("게시글을 등록하지 못했습니다");
    }
  };

  function changeProfile(e) {
    const reader = new FileReader();
    const img = imgRef.current.files[0];
    setImages(e.target.files);

    reader.readAsDataURL(img);
    reader.onloadend = () => {
      // 화면에 읽힐 수 있는 url로 변경
      setImageUrl(reader.result);
    };
  }


  return (
    <Grid
    id='container'
      container
      
    sx={{textAlign: "center", justifyContent: 'center'}}
    >
      <BoardInputItem
        titleChange={titleChange}
        handleChange={handleChange}
        boardCategory={boardCategory}
        boardCategories={boardCategories}
        textChange={textChange}
        changeProfile={changeProfile}
        imgRef={imgRef}
        imageUrl={imageUrl}
      ></BoardInputItem>
      <Grid>
        <Button
        variant="contained"
          sx={{ width: '40vw', borderRadius: 5 }}
          onClick={regist}
        >게시글 등록</Button>
      </Grid>
    </Grid>
    )
}