![thumbnail](https://github.com/user-attachments/assets/cd7e8ab6-4d94-465d-8817-6ecd18f61125)

<div align="center">
    <a href="https://liboo.kr" target="_blank">
      <img src="https://github.com/user-attachments/assets/ad322787-ad07-4405-b526-112c882e66ab" width="20%" />
    </a>
  <h3> 컨퍼런스를 더 가까이, LiBoo 에서 라이브로 🚀 </h3>
</div>
<div align="center">
  <p align=center>
    <a href="https://gominzip.notion.site/TEAM-127673f3719e803faf63c70322560d3b?pvs=4"> Notion </a> &nbsp; ｜ &nbsp; 
    <a href="https://www.figma.com/design/op5Ui6oZ4Zx2D8VUgWOKM0/LiBoo-%F0%9F%9A%80?node-id=1-2&node-type=canvas&t=zcYYT1qCtckcUdcs-0"> Figma </a> &nbsp; ｜ &nbsp;
    <a href="https://github.com/boostcampwm-2024/web22-LiBoo/wiki"> Wiki </a> &nbsp; ｜ &nbsp;
    <a href="https://github.com/orgs/boostcampwm-2024/projects/17"> BackLog </a>
  </p>
</div>

<br/>

# 💻 데모 및 배포 링크

- **서비스 링크**: [https://liboo.kr](https://liboo.kr/)

<br/>

# 🎯기획 배경

네이버 DAN, 토스 Slash, 카카오 If, 인프콘 등 다양한 컨퍼런스가 열리고 있지만, 참여는 여전히 쉽지 않습니다.

높은 경쟁률과 제한된 참가 인원 대신, **더 많은 사람들이 기회를 얻고 컨퍼런스 문화가 더욱 활발**해지기를 바라는 마음으로 LiBoo 프로젝트를 기획했습니다.

### **LiBoo가 만드는 변화와 목표**

- **누구나** 쉽게 기술을 공유하고 배울 수 있는 열린 플랫폼
- **팀원 간 소규모 공유**부터 **기업 컨퍼런스 협업**까지 지원
- 더 많은 사람들이 참여할 수 있는 **기술 공유 기회 확대**

<br/>

# 📺 핵심 기능

![feature-main](https://github.com/user-attachments/assets/36f6b53e-10ac-47c8-bc71-e7e15596ff1b)
![feature-host](https://github.com/user-attachments/assets/a4092bc8-84eb-4a47-ada6-b135de0e3e85)
![feature-client](https://github.com/user-attachments/assets/340cd919-0c99-4285-8426-7e6329e97360)
![feature-chat-client](https://github.com/user-attachments/assets/89b20971-bd33-42fd-bc3e-27d6d810d7da)
![feature-chat-host](https://github.com/user-attachments/assets/814c6063-39bb-44ea-a66c-519055784ebf)

<br/>

# ⚙️ 서비스 아키텍처

![Streaming Data Architecture](https://github.com/user-attachments/assets/02e854c4-4512-482d-bda2-719b7ceabea6)

### 🎥 호스트

| **단계**                     | **설명**                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **1. 방송 시작**             | 호스트는 **OBS**를 통해 방송을 시작합니다.                                                                                    |
| **2. 스트림 전송**           | OBS에서 생성된 **RTMP 스트림**을 **RTMP 서버**로 전송합니다.                                                                  |
| **3. 스트림 변환 및 업로드** | RTMP 서버는 스트림을 **HLS 세그먼트**(`.ts` 파일)와 **`index.m3u8`** 파일로 변환하고, 이를 **Object Storage**에 업로드합니다. |
| **4. 방송 정보 관리**        | **API 서버**와 방송 정보를 주고받아 클라이언트 대시보드에 방송을 노출시킵니다.                                                |
| **5. 실시간 시청**           | 클라이언트는 **Object Storage**에 직접 접근하여 **HLS 세그먼트**와 **`index.m3u8`** 파일을 통해 실시간 영상을 시청합니다.     |

<br />

### 💬 클라이언트

| **기능**           | **설명**                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **채팅 기능**      | 호스트를 포함한 모든 클라이언트는 **채팅 서버**와 통신하여 실시간으로 채팅을 주고받을 수 있습니다. |
| **채팅 종류**      | 채팅은 **질문**, **일반**, **공지**로 구분됩니다.                                                  |
| **질문 채팅 처리** | **질문 채팅**은 1차적으로 **Redis**에 캐싱되며, 방송 종료 후 **MySQL**에 영구 저장됩니다.          |

<br />

### 🚀 CI/CD

| **구성**      | **설명**                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **배포 도구** | **프론트엔드**와 **백엔드**는 **GitHub Actions**, **Docker**, **Docker Swarm**을 활용하여 **NCP**에 배포됩니다. |

<br/>

# 🛠️ 기술 스택

| Part       | Stack                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------- |
| 공통       | ![fullstack 2](https://github.com/user-attachments/assets/1a7f6b03-9d59-4ecc-adc9-39ad17ac67a4) |
| 프론트엔드 | ![fullstack 1](https://github.com/user-attachments/assets/64fdaa86-289d-42f0-80ce-4f01df4bfe75) |
| 백엔드     | ![fullstack 3](https://github.com/user-attachments/assets/8a01cd0b-f324-4c6e-85f6-f75c74239bdb) |

<br/>

# 📝 핵심 기술 정리

프로젝트를 진행하면서 겪은 다양한 경험과 학습 내용을 꾸준히 문서화하며 지식을 공유하고, 깊이 있는 기술적 도전을 이어나가고자 합니다.
| **카테고리** | **주제** | **설명** |  
|---------------------|--------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|  
| **메인 대시보드** | [**동영상 스트리밍 처리 프로토콜을 알아보자**](https://gominzip.notion.site/b987e92eb6c84eef9af1301877eb7c91?pvs=4) | RTMP와 HLS의 차이와 장단점을 분석하며, LiBoo 프로젝트 사례를 공유합니다. |  
| | [React Query - Suspense 활용하기](https://gominzip.notion.site/React-Query-useQuery-Suspense-74beaa80dbe34d70942b48a198636afb?pvs=4), [React Query - onError 활용하기](https://gominzip.notion.site/React-Query-useQuery-onError-23e412b69af04c50b5d5da1cca386bba?pvs=4) | React Query의 `Suspense`와 `onError`를 활용한 상태 관리 및 문제 해결 과정을 공유합니다. |  
| **호스트 페이지** | [**리액트 훅 폼 딥다이브**](https://gominzip.notion.site/38fb796bb3034277885637e54f8747bb?pvs=4) | 리액트 훅 폼의 동작 방식과 Controlled/Uncontrolled 컴포넌트의 차이를 설명합니다. |  
| **채팅** | [**채팅 서버의 확장성을 고려한 Redis-Cluster 및 Redis Adapter**]() | Redis 클러스터링과 어댑터 설정으로 채팅 서버 확장성을 높인 사례를 공유합니다. |  
| | [**Shared Worker로 소켓 통신 개선하기**](https://gominzip.notion.site/Shared-Worker-14c673f3719e80379344fd026b1109a1?pvs=4) | 다중 탭에서도 하나의 소켓을 공유할 수 있도록 개선해온 과정 |  
| **인프라** | [**백엔드 서버의 확장성을 고려한 Docker 및 Docker Swarm 도입**]() | Docker로 서비스 확장성과 배포 효율성을 높인 사례를 다룹니다. |

[👉 더 많은 기술정리 보러 가기 👈](https://gominzip.notion.site/12d673f3719e8098ad94ed6b71b10ac0?pvs=4)

<br/>

# TEAM 정권지르기 👊

|                                     김준서                                     |                                     김영길                                     |                                    고민지                                     |                                    김지수                                    |                                    홍창현                                    |
| :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/45356754?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/46553489?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/101329724?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/85912592?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/48922050?v=4" width="120"> |
|                                     **BE**                                     |                                     **BE**                                     |                                    **FE**                                     |                                    **FE**                                    |                                    **FE**                                    |
|                       [@i3kae](https://github.com/i3kae)                       |                    [@hoeeeeeh](https://github.com/hoeeeeeh)                    |                   [@gominzip](https://github.com/gominzip)                    |                    [@jsk3342](https://github.com/jsk3342)                    |                   [@spearStr](https://github.com/spearStr)                   |
