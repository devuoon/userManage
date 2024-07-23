// 필요한 모듈 불러오기
const express = require('express');
const path = require('path');
// Express 애플리케이션 인스턴스 생성
const app = express();
const port = 3000;

// JSON 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 파일 가져오기
const memberRouter = require('./routes/member');
app.use('/api/member', memberRouter);

// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});