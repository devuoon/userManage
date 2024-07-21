const express = require('express');
const path = require('path');
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});