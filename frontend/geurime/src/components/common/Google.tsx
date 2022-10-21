import React from "react";

export default function Google() { 
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_REQUEST = `${GOOGLE_REDIRECT_URI}?redirect_uri=http://localhost:3000/oauth/redirect`;
  // const KAKAO_REQUEST = `${KAKAO_REDIRECT_URI}?redirect_uri=http://서버주소/oauth/redirect`

  return (
    <>
      <a href={GOOGLE_REQUEST}>
        <img src="/assets/loginBtn/googlelogin.png" width="65vh" />
      </a>
    </>
    
  )

}