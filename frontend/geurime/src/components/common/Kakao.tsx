import React from "react";

export default function Kakao() { 
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_REQUEST = `${KAKAO_REDIRECT_URI}?redirect_uri=http://localhost:3000/oauth/redirect`;
  // const KAKAO_REQUEST = `${KAKAO_REDIRECT_URI}?redirect_uri=http://서버주소/oauth/redirect`

  return (
    <>
      <a href={KAKAO_REQUEST}>
      카카오 로그인
      </a>
    </>
    
  )

}