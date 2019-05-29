var express = require('express');
var router = express.Router();

const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');
const encrytion = require('../../module/encrytionModule');

const crypto = require('crypto-promise');

//회원가입
router.post('/', async(req, res) => {
    const id = req.body.id;
    const pw = req.body.password;
    const name = req.body.name;

    const selectQuery = 'SELECT * FROM user WHERE userId = ?';
    const insertQuery = 'INSERT INTO user (userId, userPw, salt, userName) VALUES (?, ?, ?, ?)';

    if (!id || !pw || !name) { //널값으로 들어오면 안돼
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    } else { //id중복값 체크
        const selectResult = await db.queryParam_Arr(selectQuery, [id]);
        if (!selectResult) {
            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.USER_DB_SELECT_ERROR));
        } else if (selectResult.length >= 1) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_USER));
        } else {
            const encrytionResult = await encrytion.encrytion(pw);

            const insertResult = await db.queryParam_Arr(insertQuery, [id, encrytionResult.hashedPassword, encrytionResult.salt, name]);
            console.log(insertResult);

            if (!insertResult) {
                res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.USER_DB_INSERT_ERROR))
            } else {
                res.status(200).send(utils.successTrue(statusCode.CREATED, resMessage.CREATED_USER, req.body));
            }
        }
    }

});

module.exports = router;