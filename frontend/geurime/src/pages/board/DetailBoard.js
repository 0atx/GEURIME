import { http } from "api/http";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function DetailBoard( ) { 

  const [board, setBoard] = useState()
  const navigator = useNavigate();
  useEffect(() => {

    // const response = await http.post(`/boards/${boardid}`);
    // if (response.data.message == "success") {
    //   console.log('등록 완료!')
    //   navigator("/Board");
    // } else {
    //   alert("게시글을 등록하지 못했습니다");
    //   return;
    // }
  },[])


  
  return (
    <div>ㅎㅇ</div>
//   <Paper
      
//   style={{ margin: '3%', marginBottom: '5%' }}
//   variant="outlined"
//   sx={{
//     borderColor: '#FFE082',
//     borderWidth: 3,
//     borderRadius: 3
//   }}
// >
//   {/* 제목 부분 */}
//   <Grid
//     sx={{
//       margin: '4%',
//       marginLeft: '5%',
//       fontWeight:"bold"
//     }}
//   >
//    [{item.boardCategory}] {item.boardTitle}
//   </Grid>
  
//   <Grid
//     container
//     sx={{alignItems: 'center', display: 'flex'}}
//     direction="row"
//     flexWrap={'nowrap'}
//   >
//     <Grid
//       item
//       sx={{ alignItems: 'center', textAlign: 'center', margin: '3%', borderRadius: 3 }}
//       xs={7}
//       backgroundColor="#E1E1E1"
//     >
//     <img
//       src={item.boardFirstImage}
//       loading="lazy"
//       style={{ height: '16vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '3.5%' }}
//       />

//   </Grid>

//     <Grid
//       justifyContent="center"
//       sx={{ marginTop: '3%'}}
//     >
//       <Grid>
//         작성자 : {item.userNickname}
//      </Grid>
//       <Grid
//         sx={{ marginTop: '6%' }}
//       >
//         작성일 : {time}
//       </Grid>
//       <Grid
//         sx={{ marginTop: '6%'}}
//         justifyContent="center"
//       >
//         <Grid
//             container
//             direction="row"
//         >
//           <Grid
//             sx={{marginRight: '10%'}}
//           >
//           <Visibility fontSize="8"/>
//               {item.boardViews}
//           </Grid>
//           <Grid>
//           <QuestionAnswerOutlinedIcon fontSize="8" />
//             {item.commentCount}
//           </Grid>
//       </Grid>
//       </Grid>
      
//     </Grid>
//   </Grid>
//     </Paper>
//   ) <Paper
      
//   style={{ margin: '3%', marginBottom: '5%' }}
//   variant="outlined"
//   sx={{
//     borderColor: '#FFE082',
//     borderWidth: 3,
//     borderRadius: 3
//   }}
// >
//   {/* 제목 부분 */}
//   <Grid
//     sx={{
//       margin: '4%',
//       marginLeft: '5%',
//       fontWeight:"bold"
//     }}
//   >
//    [{item.boardCategory}] {item.boardTitle}
//   </Grid>
  
//   <Grid
//     container
//     sx={{alignItems: 'center', display: 'flex'}}
//     direction="row"
//     flexWrap={'nowrap'}
//   >
//     <Grid
//       item
//       sx={{ alignItems: 'center', textAlign: 'center', margin: '3%', borderRadius: 3 }}
//       xs={7}
//       backgroundColor="#E1E1E1"
//     >
//     <img
//       src={item.boardFirstImage}
//       loading="lazy"
//       style={{ height: '16vh', width: '24vh', margin: '2%', borderRadius: 5, marginTop: '3.5%' }}
//       />

//   </Grid>

//     <Grid
//       justifyContent="center"
//       sx={{ marginTop: '3%'}}
//     >
//       <Grid>
//         작성자 : {item.userNickname}
//      </Grid>
//       <Grid
//         sx={{ marginTop: '6%' }}
//       >
//         작성일 : {time}
//       </Grid>
//       <Grid
//         sx={{ marginTop: '6%'}}
//         justifyContent="center"
//       >
//         <Grid
//             container
//             direction="row"
//         >
//           <Grid
//             sx={{marginRight: '10%'}}
//           >
//           <Visibility fontSize="8"/>
//               {item.boardViews}
//           </Grid>
//           <Grid>
//           <QuestionAnswerOutlinedIcon fontSize="8" />
//             {item.commentCount}
//           </Grid>
//       </Grid>
//       </Grid>
      
//     </Grid>
//   </Grid>
//   </Paper>
  )
}