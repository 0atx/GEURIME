# ✨그리미(Geurime) - 우리 아이 추억 저장소, 그리미

<img src="https://user-images.githubusercontent.com/55011885/203720193-d4b1d011-3627-4cc6-ad15-ebfbb497e985.png" alt="배너 이미지">

## 👉 [그리미 체험해보기](https://geurime.com/)

## 📹 시연 및 소개 영상 보기 : [UCC 링크](https://drive.google.com/file/d/1a7etRwkY7IvIr_sVOiqEgRYRA8CH9Q36/view?usp=sharing)

<br/>

## 📆 프로젝트 진행 기간

- 2022.10.10 ~ 2022.11.18
- SSAFY 7기 2학기 자율프로젝트

---

## 📖 그리미 - 기획 배경

- **여러분 아이의 심리, 궁금하지 않으신가요?**
- 아이가 그려온 그림들을 보관할 곳도 마땅치 않고, 아이가 그려온 그림을 봐도 어떤 감정인지 잘 파악이 안되는 부모님들을 위해 아이의 그림을 한 곳에 보관하고, 그림 분석을 통해 아이의 감정을 알 수 있도록 도와주는 서비스를 생각했습니다.
<br/>

## 🔎 그리미 - 개요

- ### **우리 아이 추억 저장소, 그리미!**
  - 그리미는 그림 일기 작성을 보다 쉽고 간편하게 할 수 있도록 도와주고, 등록된 그림들을 AI 분석을 통해 감정 상태를 예측해주는 서비스입니다.
    그리미는 **아이 그림 보관 & 아이 심리 상태**에 관심 있는 부모들을 위한 그림 등록 & 그림 AI 분석 웹앱 서비스입니다.
    <br/>

<br/>

---

## 💡 주요 기능

- ### 그림일기 및 그림 등록
  - 과거 날씨 자동 매핑 기능을 제공합니다.(기상청 데이터 크롤링을 통해 과거 날씨 조회)
  - 목소리로 일기 작성 및 수정할 수 있습니다.(react-speech-recognition 라이브러리 사용)
  - 그림판을 이용한 그림 그리기가 가능합니다.(react-canvas-draw 라이브러리를 이용해 canvas 그림판 구현)
   <br/>

- ### 그림 갤러리
  - 그림을 등록하거나 일기 작성을 통해 업로드한 그림을 볼 수 있습니다.
  - 보관함을 추가하여 폴더별로 그림을 나눌 수 있습니다.
  - 가족 간 아이 정보 연동을 통해 자녀의 갤러리를 공유할 수 있습니다.

    <br/>
- ### 그림 AI 분석
  - 그림일기와 그림 등록으로 업로드한 그림을 AI 분석을 통해 그림에 담긴 감정을 분석할 수 있습니다.
  - 메인 화면에서는 아이의 월별 감정 분석 통계를 확인할 수 있습니다.

    <br/>
- ### 커뮤니티
  - 자유/질문/정보 카테고리 별로 소통할 장소를 제공하고 있습니다.
  - 커뮤니티를 통해 아이 관련 정보를 나누거나, 자녀 상담 관련 정보, 그림 대회 정보 등을 공유할 수 있습니다.

    <br/>

  <br/>

---

## 🖥️ 화면 구성

- ### 홈 화면
![홈](https://user-images.githubusercontent.com/55011885/203720598-01685867-cc08-4a3f-a38b-921c52986ee9.png)
<br/>
- ### 소셜로그인 후 회원가입
![회원가입](https://user-images.githubusercontent.com/55011885/203720728-7b797512-858f-4055-a292-3527611383ac.gif)
<br/>
- ### 회원 정보 및 자녀 정보 수정 페이지
![회원정보_수정](https://user-images.githubusercontent.com/55011885/203720794-8cd89e6a-aedd-4efa-b32b-ca1638a6fb43.gif)
<br/>
- ### 초대링크 발급 및 초대링크로 회원가입 페이지
![초대회원가입](https://user-images.githubusercontent.com/55011885/203720520-8c8c5bc8-53a5-4573-b93d-4cee92c85db5.gif)
<br/>
- ### 그림 일기 등록 페이지
![그림 일기 등록](https://user-images.githubusercontent.com/55011885/203720839-4005bbfc-4455-4cc6-b94c-dedde3f0f40f.gif)
<br/>
- ### 그림 등록 페이지
![그림 등록](https://user-images.githubusercontent.com/55011885/203720438-d9765f07-490e-404e-b41f-037cc30abe94.gif)
<br/>
- ### 그림 감정 분석 결과 페이지
![그림 감정 분석 결과 페이지](https://user-images.githubusercontent.com/55011885/203720933-161995c9-70f9-47a3-9285-bd5ba286053b.gif)
<br/>
- ### 게시판 페이지
![게시판](https://user-images.githubusercontent.com/55011885/203721103-91248879-8f7e-438e-b2ea-3aa37d64c127.gif)

<br/>
<br/>

---

## 🛠️ 주요 기술

**Backend - Spring**

- IntelliJ IDE 2022.1.3
- JDK 11
- Springboot 2.7.1
- Spring Data JPA
- Spring Security
- Spring Web
- Swagger 3.0.0
- MySQL 8.0.29
- Hibernate 5.6.9 Final


**Backend - AI**
- Python 3.9.13
- Tensorflow 2.10.0
- FAST API 0.85.1


**Frontend - React**

- Visual Studio Code IDE
- Node.Js 16.17.1 LTS
- React 18.2.0
- Material UI 5.10.8
- Styled-components 5.3.5
- React-apexcharts 1.4.0


**CI/CD**

- AWS EC2 Ubuntu 20.04 LTS
- NGINX 1.23.1
- SSL(CertBot)
<br/>
<br/>

---

## 📰 ERD

![Geurime_ERD](https://user-images.githubusercontent.com/55011885/203721202-ecd0c6be-f1c9-4996-a438-3f748b1fc645.png)

<br/>
<br/>

## 📝 시스템 아키텍처

![서비스_아키텍처](https://user-images.githubusercontent.com/55011885/203721181-c5b4a24f-0c7f-4fa3-b1bf-d915ce2fc9f6.PNG)

<br/>
<br/>

## 🗂️ 프로젝트 파일 구조

---

### Back

```
geurime-backend
  ├── api
  │   ├── controller
  │   ├── dto
  │   └── service
  ├── config
  │   ├── auth
  │   ├── image
  │   └── jwt
  ├── database
  │   ├── entity
  |   ├── enums
  │   └── repository
  ├── exception
  └── interceptor
```

### Front

```
geurime-front
  ├── node_modules
  ├── public
  └── src
      ├── api
      ├── assets
      ├── components
      │   ├── common
      │   ├── modal
      │   └── nav
      ├── pages
      │   ├── board
      │   ├── diary
      │   ├── drawing
      │   ├── error
      │   ├── gallery
      │   ├── home            
      │   └── settings
      └── states
```
<br/>
<br/>

## 💻 협업 툴

---

<img src="https://img.shields.io/badge/-GitLab-FC6D26?style=flat&logo=GitLab&logoColor=white"/> <img src="https://img.shields.io/badge/-Jira-0052CC?style=flat&logo=JiraSoftware&logoColor=white"/> <img src="https://img.shields.io/badge/-Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/> <img src="https://img.shields.io/badge/-Notion-000000?style=flat&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/-Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/> <img src="https://img.shields.io/badge/-Mattermost-0058CC?style=flat&logo=Mattermost&logoColor=white"/>

<br/>
<br/>

## 🤝 협업 환경

---

- Gitlab
  - 코드의 버전을 관리
  - 이슈 발행, 해결을 위한 토론
  - MR시, 팀원이 코드리뷰를 진행하고 피드백 게시
- JIRA
  - 매주 월요일 목표량을 설정하여 Sprint 진행
  - 업무의 할당량을 정하여 Story Point를 설정하고, In-Progress -> Done 순으로 작업
- 회의
  - 매일 아침마다 Webex Scrum 진행, 전날 진도량과 당일 해야할 목표량 설정
- Notion
  - 회의가 있을때마다 회의록 기록
  - 개발 중 참고할만 하거나, 도움이 될 문서를 해당 기술 분야에 공유
  - 컨벤션 정리
  - 스토리보드, ERD, 기능명세서 등 모두가 공유해야 하는 문서 관리
- GatherTown
  - 화면 공유를 통해 함께 버그 해결
  - 상태 메세지를 통해 현재 하는 일 공유
  <br/>
<br/>

## 👨‍👩‍👧‍👦 팀원 역할 분배

---

![역할 분배](/uploads/225c82d3389fc79739b821b7d61792cb/Geurime_팀원.PNG)

- 팀장 : [신지한](https://github.com/shinzan7)
- 팀원 : [박윤하](https://github.com/0atx)
- 팀원 : [여예원](https://github.com/YewonYeo)
- 팀원 : [유현욱](https://github.com/hyundnr)
- 팀원 : [조혜안](https://github.com/chohyean)
- 팀원 : [한하평](https://github.com/gks3075)
<br/>
<br/>

## 📋 프로젝트 산출물

---

- [기능명세서](https://material-nitrogen-703.notion.site/ffd1777e8e8141c6b11dd82e72352239)
- [스토리보드](https://www.figma.com/file/EmZQelyvZLHVnRCdIA74Jn/%EC%9E%90%EC%9C%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=16%3A2)
- [컨벤션](https://material-nitrogen-703.notion.site/Gi-1d2349e0abfe4533843d78aceae350cb)
- [API](https://material-nitrogen-703.notion.site/REST-API-a5c6fed9798144e3a7f17ac9d256d408)
- [회의록](https://material-nitrogen-703.notion.site/06de1e4515844945933c8ed933eb165f)
<br/>
<br/>

---

## 🗃️ 프로젝트 결과물

- [포팅 메뉴얼](https://github.com/0atx/GEURIME/files/10081733/_.pdf)
- [중간 발표자료](https://github.com/0atx/GEURIME/files/10081730/default.pdf)
- [최종 발표자료](https://github.com/0atx/GEURIME/files/10081732/default.pdf)


