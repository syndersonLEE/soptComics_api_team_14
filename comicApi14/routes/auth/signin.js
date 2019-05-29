var express = require('express');
var router = express.Router();

const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');
const encrytion = require('../../module/encrytionModule')

//로그인
router.post('/', async(req, res) => {
    const id = req.body.id;
    const pw = req.body.password;

    const selectQuery = 'SELECT * FROM user WHERE userId = ?';

    if (!id || !pw) { //아이디가 없고 패스워드도 없음
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    } else {
        const selectResult = await db.queryParam_Parse(selectQuery, [id])
      
        if (!selectResult) { //디비 조회 안되면
            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.MEMBERSHIP_DB_SELECT_ERROR));
        } else if (selectResult.length == 1) { //디비 조회 결과 한개면
            console.log(selectResult[0].salt)
            const hashedPw = await encrytion.onlyEncrytion(pw, selectResult[0].salt)
            
            if (selectResult[0].userPw == hashedPw.hashedPassword) {
                res.status(200).send(utils.successTrue(statusCode.CREATED, resMessage.LOGIN_SUCCESS));
            } else {
                res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            }
        } else {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.LOGIN_FAIL));
        }
    }
});

module.exports = router;