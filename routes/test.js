var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('GET /test route called');
    let username = req.query.username;
    console.log('Received username:', username);

    res.send(JSON.stringify([
        {
            no: 1,
            birth: 970528,
            name: '이윤지',
            joinYear: 2024,
            joinMonth: 7,
            introduce:'안녕하세요~ 반갑습니다.'
        },
        {
            no: 2,
            birth: 950415,
            name: '김철수',
            joinYear: 2019,
            joinMonth: 3,
            introduce:'잘부탁드립니다'
        }
    ]));
});

module.exports = router;