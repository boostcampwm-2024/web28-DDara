<div align="center">
<h1>✈ 팀 소개 ✈</h1>
  
<img width="20%" alt="image" src="https://github.com/user-attachments/assets/820e58bf-81a7-41c4-a50a-62c474739ad0" />


### 안녕하세요, 팀 "따라따라" 입니다!

<br />

저희는 6주간 ⚒ **"기술적 도전"** ⚒을 목표로 삼았습니다.

<br />

저희는 단순히 api나 라이브러리를 **"가져다 써서" 구현 하는 것이 아닌**,

**모든 것을 "직접 구현"** 해보고, 그 과정에서 깊이 있는 기술적인 도전을 해 나갑니다.

<br /><br /><br /><br />

<h1>🌍 서비스 소개 🌍</h1>
</div>


![image](https://github.com/user-attachments/assets/55dacfcb-07b8-4c96-9c33-b35e13b42ecc)

<br /><br />

# ✨ 서비스 소개

### 📳 온보딩 페이지


<img height="400" alt="image" src="https://github.com/user-attachments/assets/f526a900-c892-4805-bebb-ec15c2f51c1f" />

### 📳 회원가입/로그인

|회원가입|로그인|
|:--:|:--:|
|<img height="400" alt="image" src="https://github.com/user-attachments/assets/4fb674a3-63e5-44c9-9bad-c7f271572b2d" />|<img height="400" alt="image" src="https://github.com/user-attachments/assets/95dd3604-71ea-4360-b82d-ba0c53f15e2c" />|

### 📳 채널 생성 (호스트 기준)


<img height="400" alt="image" src="https://github.com/user-attachments/assets/c408bed8-5108-497b-a54d-bb2eb0c78b92" />

### 📳 채널 공유 (호스트 기준)

<img height="400" alt="image" src="https://github.com/user-attachments/assets/695fab45-43fb-49a3-8984-e98b00afd2ff" />

### 📳 채널 접속 (게스트 기준)

|주원님 (게스트1) 화면|동율님 (게스트2) 화면|재도님 (게스트3) 화면|
|:--:|:--:|:--:|
|<img height="400" alt="image" src="https://github.com/user-attachments/assets/ae5acd50-f32b-4e11-98b8-1ab739b28a8e" />|<img height="400" alt="image" src="https://github.com/user-attachments/assets/0227abad-3059-43b2-99f0-0ddeafdb7ba6" />|<img height="400" alt="image" src="https://github.com/user-attachments/assets/7b3026ac-c7a8-4164-90d5-3235e9309388" />|




### 📳 채널 및 게스트 현황 확인 (호스트 기준)

|사용자 별로 필터링해서 보기|사용자 위치/방향 실시간 확인|
|:--:|:--:|
|<img height="400" alt="image" src="https://github.com/user-attachments/assets/05c0b0cc-1b35-4922-9f38-78123b71a9c2" />|<img height="400" alt="image" src="https://github.com/user-attachments/assets/ff7cc1b4-bd0a-4d61-ab85-fbd7e2a5d842" />|



### 📳 모바일 접속시 데스크탑으로 유도

<img height="400" alt="image" src="https://github.com/user-attachments/assets/4afb0401-dc24-4ada-9f79-60e1c495336c" />


### 📳 메인 페이지로 리다이렉션

|존재하지 않는 url 접속시|로그인하지 않았을 시|
|:--:|:--:|
|<img height="400" alt="image" src="https://github.com/user-attachments/assets/7aec458b-67a8-410e-825e-c54126ff6f02" />|<img height="400" alt="image" src="https://github.com/user-attachments/assets/16a27076-1d22-474f-950e-e2de1a48452f" />|

### 📳 게스트가 이동 중일 때 호스트와 게스트 화면 비교

|동율님(게스트)을 보고 있는 호스트 화면|동율님 (게스트) 실시간 위치와 방향 화면|
|:--:|:--:|
|<img height="400" alt="image" src="https://github.com/user-attachments/assets/3d8ffce1-c43c-43ab-8ed1-f38a83ebb863" />|<img height="400" alt="image" src="https://github.com/user-attachments/assets/47e49e76-f448-4019-836f-d0012ced8e29" />|


<br /><br />

# 💡 라이브러리나 API에 의존하지 않기 위한 노력

## 🎨 1. 지도 위 캔버스에 출발지/도착지 마커, 경로 그리기

- 캔버스 위에 그려둔 그림은 지도(캔버스)를 이동하거나 확대/축소하더라도 그린 위치(지도 기준)에 그대로 존재해야 함

<br /><br />

<div align="center">
<img width="40%" alt="image" src="https://github.com/user-attachments/assets/a1cc5824-f30f-4e11-9cfc-b9279fc13e0d" />
<img width="40%" alt="image" src="https://github.com/user-attachments/assets/63590a47-7b52-4413-8732-313a8dac58ff" />
</div>

<br /><br />

**단순히 지도 API를 사용하는 것이 아닌,**

어떻게 동작되는지 모두 알고 직접 구현하기 위해 **모든 그림과 마커는 캔버스로 직접 구현하였고,**

**지도의 좌표 연동하는 로직을 직접 구현하였습니다.**

<br /><br />

지도 위에 캔버스를 연동하는 과정에서 이벤트 관련 많은 이슈들이 있었고, 문제 없이 이벤트를 전달하기 위해 많은 설계와 고민 과정을 거쳤습니다.

<br />

[🗺️ 지도와 캔버스 연동을 위한 고민 스토리 바로가기](https://harsh-flier-3c0.notion.site/45f04fb981a74d55a3eb5b7326a61549?pvs=4)



<br /><br />

## 🧭 2. 실시간 위치 파악

- 호스트(손자)는 게스트들(할머니, 할아버지)의 위치를 실시간으로 확인 가능해야 함
- 게스트(할머니)는 본인의 위치와 호스트(손자)가 설정해둔 출발지, 도착지, 경로만을 확인할 수 있어야 함

<br />

<div align="center">
<img width="800" alt="image" src="https://github.com/user-attachments/assets/19a1efb6-1317-4d5d-aeb6-130f9e377f3e" />
</div>



<br /><br />

**단순히 지도에서 제공하는 현재 위치 API를 사용하는 것이 아닌,** 어떻게 동작되는지 모두 알고 직접 구현하기 위해

**현재 위치와 모바일 디바이스의 회전 각도를 가공하여 소켓 통신을 통해**

다양한 사용자의 위치를 확인할 수 있도록 **직접 구현하였습니다.**

<br /><br />

특히 소켓 통신 과정에서 각 사용자 권한마다 (호스트/게스트) 보내야 하는 정보와 받아야 하는 정보가 다르기 때문에

클라이언트/서버에서 각각 필요한 정보만을 통신할 수 있도록 많은 고민 과정을 거쳤습니다.

<br />

[🔌 실시간 위치 파악 구현을 위한 고민 스토리](https://harsh-flier-3c0.notion.site/feat-2b5c2ffeceeb4269b2959632969b97fd?pvs=4)

<br /><br />



# 📃 우리가 집중해서 해결한 문제

###  by. J060_김주원

- [[FE] 🎨 지도의 기능들 canvas에서 구현하기](https://harsh-flier-3c0.notion.site/6f012cd873b7430aae0c9d4143ee4adc?pvs=4)

###  by. J174_이동율

- [[FE] 💾 초보 개발자의 데이터 관리 시행착오](https://harsh-flier-3c0.notion.site/460d018a42fc47b8b1ec667bb1a0abc1?pvs=4)

###  by. J210_임재도
 
- [[FE] 🧬 캔버스와 네이버 지도 API를 연동하기 위한 과정](https://harsh-flier-3c0.notion.site/API-150b1b2b6491804fb316d48a0ab3a705?pvs=4)


###  by. J234_정혜인

- [[FE] 🗺️ 지도와 함께 움직이는 캔버스 설계/구현 시행착오 스토리](https://harsh-flier-3c0.notion.site/45f04fb981a74d55a3eb5b7326a61549?pvs=4)

- [[BE] 🔌 실시간 소켓 통신의 도전기: 다양한 조건이 존재하는 통신 feat. 클라이언트와 서버 각각에서의 고민과 설계 과정](https://harsh-flier-3c0.notion.site/feat-2b5c2ffeceeb4269b2959632969b97fd?pvs=4)

<br />

### ... 그 외 다양한 기술적 도전 보러가기

- [기술적 도전 모음zip](https://harsh-flier-3c0.notion.site/133b1b2b649180648a0fe8dcecbc12ea?pvs=4)

<br /><br />

# ⛏ 서비스 아키텍처

<img width="1300" alt="image" src="https://github.com/user-attachments/assets/ab20d1eb-dab9-4373-b32b-7e455debb5c5">


</div>

<br /><br />


# 🌱 팀원 소개

<div align="center">
  
|J060_김주원|J174_이동율|J210_임재도|J234_정혜인|
|:--:|:--:|:--:|:--:|
|<a href="https://github.com/juwon5272"><img src="https://github.com/user-attachments/assets/f774ff48-8831-490f-b0fe-b18b024f7916" width="150px;" alt=""/></a>|<a href="https://github.com/leedongyull"><img src="https://github.com/user-attachments/assets/178c1cd6-b296-498e-adb1-60534eec2713" width="150px;" alt=""/></a>|<a href="https://github.com/effozen"><img src="https://github.com/user-attachments/assets/92bddae1-19ce-4b06-811e-52df15ac726c" width="150px;" alt=""/></a>|<a href="https://github.com/happyhyep"><img src="https://github.com/user-attachments/assets/40ac933c-3e19-4884-a5e9-da2f2298dd72" width="150px;" alt=""/></a>|
|FE|FE|FE|Full Stack (FE + BE)|
|<a href="https://github.com/juwon5272">@juwon5272</a>|<a href="https://github.com/leedongyull">@leedongyull</a>|<a href="https://github.com/effozen">@effozen</a>|<a href="https://github.com/happyhyep">@happyhyep</a>|

</div>

<br /><br />


<h1>🎢 바로가기 링크</h1>

<div align="center">
<br /><br />
<div align="center" style="display: flex">
  <a href="https://ddara.kro.kr/"><img width="60%" alt="image" src="https://github.com/user-attachments/assets/0eaf0bac-01bc-44ae-ab02-56c2c9951ce1" /></a>
</div>

<br />
저희는 모바일 웹서비스이기 때문에, 모바일로 접속하시는 것을 추천드립니다.
<br />
<img width="20%" alt="image" src="https://github.com/user-attachments/assets/32d30ab1-7d87-4e86-bcca-9f30d1150f3c" />


<br />
(모바일에서 위 QR 코드로 접속하실 수 있습니다.)


<br /><br />

<a href="https://harsh-flier-3c0.notion.site/133b1b2b649180648a0fe8dcecbc12ea?pvs=4"><img width="50%" alt="image" src="https://github.com/user-attachments/assets/a55a5551-e329-4566-8fbb-23185c1b4fce" /></a>

<br />

<div align="center" style="display: flex">
<a href="https://www.figma.com/design/r9nl4Jcz9VXIMbrpf50wY6/PickMeUp?node-id=90-1897"><img width="18%" alt="image" src="https://github.com/user-attachments/assets/eff4141f-bd7f-4791-8789-ae1c8c2c9602" /></a>
<a href="https://www.figma.com/design/r9nl4Jcz9VXIMbrpf50wY6/PickMeUp?node-id=87-929"><img width="18%" alt="image" src="https://github.com/user-attachments/assets/74606b44-04a2-4b06-9f52-b12e453bc882" /></a>
<a href="https://www.notion.so/127b1b2b649180e88f70d6a4648924a0?pvs=4"><img width="18%" alt="image" src="https://github.com/user-attachments/assets/a8108a13-e48b-4c9e-b840-a446b3f54f6c" /></a>
</div>

<br />

<div align="center" style="display: flex; gap: 10px">
<a href="https://github.com/orgs/boostcampwm-2024/projects/196"><img width="18%" alt="image" src="https://github.com/user-attachments/assets/5507e684-7628-46a5-b317-761aa9483bec" /></a>
<a href="https://ddara.kro.kr/api-docs"><img width="18%" alt="image" src="https://github.com/user-attachments/assets/457b1e76-71a8-4a2d-8cd7-f60378b0bbe2" /></a>
<!-- <a href=""><img width="18%" alt="image" src="https://github.com/user-attachments/assets/6500d674-d951-4cc0-ae71-5502c1dedea9" /></a> -->
</div>

</div>

