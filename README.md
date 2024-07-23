# 유저관리 기능 구현하기 (JS)

### 구현 기능
<details>
    <summary>nodejs / express 설정(app.js)</summary>
    
- app.js 생성 (서버를 설정하고 실행하는 역할)
- Express 애플리케이션 인스턴스 생성
- 미들웨어 설정
- 라우팅 설정
- 서버 실행

</details>
<details>
    <summary>GET 요청(member.js)</summary>
    
- 전체 사용자 목록 조회
- 캐시에 데이터가 없으면 기본 사용자 목록을 설정하고 캐시에 저장
- 특정 행 체크 시 사용자 정보를 조회하기 위해 no 기준으로 사용자 정보 조회
</details>
<details>
    <summary>POST 요청(member.js)</summary>
    
- 사용자 생성 입력 폼에 데이터를 입력하면 테이블에 행 추가
- 유저 번호는 데이터의 길이를 조회하여 자동 생성 (수정 불가)

</details>
<details>
    <summary>PUT 요청(member.js)</summary>
    
- 특정 사용자 정보를 업데이트, 사용자 번호를 기준으로 새로운 데이터로 갱신 후 캐시에 저장
- 특정 행 체크한 후 수정 버튼을 누르면 행의 자용자 정보 가져오기

</details>
<details>
    <summary>DELETE 요청(member.js)</summary>
    
- 특정 사용자 번호 기준으로 사용자를 삭제
- 사용자를 제거한 후 캐시에 저장
</details>

### 폴더 구조

    myapp/
    │
    ├── node_modules/
    ├── public/
    ├── index.html
    │   └── js/
    │       └── index.js
    ├── routes/
    │   └── member.js
    ├── app.js
    └── package.json

### 구현 화면

<img src="https://github.com/devuoon/userManage/blob/main/public/img/capture.gif">
