/*
백엔드 auth controller 에서 정보를 받은 후 유저정보 확인하는 페이지 (신규 여부)
@author 여예원
@since 2022.10.27
*/

import React, { useEffect } from "react";

export default function Logincheck() {
  let accessToken,
    refreshToken,
    accessTokenExpiration,
    refreshTokenExpiration,
    userId,
    name,
    birthYear,
    gender,
    nickname,
    email,
    inviteCode;

  useEffect(() => {
    // Redirect된 url 주소에서 parameter 세팅
    accessToken = new URL(window.location.href).searchParams.get("accessToken");
    refreshToken = new URL(window.location.href).searchParams.get(
      "refreshToken"
    );
    accessTokenExpiration = new URL(window.location.href).searchParams.get(
      "accessTokenExpiration"
    );
    refreshTokenExpiration = new URL(window.location.href).searchParams.get(
      "refreshTokenExpiration"
    );
    userId = new URL(window.location.href).searchParams.get("userId");
    name = new URL(window.location.href).searchParams.get("name");
    birthYear = new URL(window.location.href).searchParams.get("birthYear");
    gender = new URL(window.location.href).searchParams.get("gender");
    nickname = new URL(window.location.href).searchParams.get("nickname");
    email = new URL(window.location.href).searchParams.get("email");
    inviteCode = localStorage.getItem("inviteCode");

    // 신규 유저 성인 (가족 코드 없음)
    if (accessToken && nickname === "" && inviteCode === "") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration);
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("birthYear", birthYear);
      localStorage.setItem("gender", gender);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("email", email);

      window.location.replace("/userinfo");
    }

    // // 신규 유저 성인 (가족 코드 있음)
    if (accessToken && nickname === "" && inviteCode !== "") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration);
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("birthYear", birthYear);
      localStorage.setItem("gender", gender);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("email", email);
      localStorage.setItem("inviteCode", inviteCode);

      window.location.replace("/userinfo");
    }

    // 나이와 성별이 있으면 기존 유저이므로 main으로
    if (accessToken && nickname !== "") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration);
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("birthYear", birthYear);
      localStorage.setItem("gender", gender);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("email", email);

      window.location.replace("/main");
    }
  }, []);

  return <div></div>;
}
