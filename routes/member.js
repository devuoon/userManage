const express = require('express');
const NodeCache = require('node-cache');
const router = express.Router();

// 캐시 초기화 (TTL: 1일 = 86400초)
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 86400 });

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('GET /api/member 라우트 호출됨');

    // 캐시에서 데이터를 가져옴
    let users = cache.get('users');

    console.log('캐시에서 가져온 데이터:', users);

    if (!users) {
        // 캐시에 데이터가 없는 경우 기본 사용자 목록을 설정
        users = [
            {
                no: 1,
                birth: '1997-05-28',
                name: '이윤지',
                joinYear: 2024,
                joinMonth: 7,
                introduce: '안녕하세요~ 반갑습니다.'
            },
            {
                no: 2,
                birth: '1995-04-15',
                name: '김철수',
                joinYear: 2019,
                joinMonth: 3,
                introduce: '잘부탁드립니다'
            }
        ];
        // 데이터를 캐시에 저장
        cache.set('users', users);
        console.log('기본 사용자 목록을 캐시에 저장:', users);
    }

    res.json(users);
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log('POST /api/member 라우트 호출됨');
    const newUser = req.body;
    console.log('받은 사용자 데이터:', newUser);

    // 캐시에서 기존 데이터를 가져옴
    let users = cache.get('users') || [];

    // 새로운 번호를 생성 (기존 데이터 수 + 1)
    const newNo = users.length + 1;

    // 새로운 번호를 사용자 데이터에 추가
    newUser.no = newNo;

    // 새로운 사용자 데이터를 추가
    users.push(newUser);

    // 업데이트된 사용자 목록을 캐시에 저장
    cache.set('users', users);

    console.log('업데이트된 사용자 목록을 캐시에 저장:', users);

    res.json({
        message: '사용자 데이터가 성공적으로 수신되었습니다',
        user: newUser
    });
});

/* PUT update user */
router.put('/:no', function(req, res, next) {
    console.log('PUT /api/member/:no 라우트 호출됨');
    const no = parseInt(req.params.no);
    const updatedUser = req.body;
    console.log('받은 사용자 데이터:', updatedUser);

    // 캐시에서 기존 데이터를 가져옴
    let users = cache.get('users') || [];
    const userIndex = users.findIndex(user => user.no === no);

    if (userIndex !== -1) {
        // 사용자를 업데이트
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        // 업데이트된 사용자 목록을 캐시에 저장
        cache.set('users', users);
        console.log('업데이트된 사용자 목록을 캐시에 저장:', users);

        res.json({
            message: '사용자 데이터가 성공적으로 업데이트되었습니다',
            user: users[userIndex]
        });
    } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
    }
});

/* DELETE user */
router.delete('/:no', function(req, res, next) {
    console.log('DELETE /api/member/:no 라우트 호출됨');
    const no = parseInt(req.params.no);
    console.log('삭제할 사용자 번호:', no);

    // 캐시에서 기존 데이터를 가져옴
    let users = cache.get('users') || [];
    const userIndex = users.findIndex(user => user.no === no);

    if (userIndex !== -1) {
        // 사용자를 삭제
        const deletedUser = users.splice(userIndex, 1);
        // 업데이트된 사용자 목록을 캐시에 저장
        cache.set('users', users);
        console.log('업데이트된 사용자 목록을 캐시에 저장:', users);

        res.json({
            message: '사용자 데이터가 성공적으로 삭제되었습니다',
            user: deletedUser[0]
        });
    } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
    }
});

module.exports = router;