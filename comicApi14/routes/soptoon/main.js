var express = require('express');
var router = express.Router();

const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');

/*
    METHOD  : GET
    url     : /webtoon/main/:flag
    메인 웹툰 가져오기
*/
router.get('/:flag', async(req, res) => {
    const flag = req.params.flag;

    if(flag == 0) {
        const getMain0Query = 'SELECT * FROM webtoon ORDER BY webtoonLike DESC'; //인기
        const getMain0Result = await db.queryParam_None(getMain0Query);
        if(!getMain0Result) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MAIN_DB_SELECT_ERROR));
        } else {
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.MAIN0_SUCCESS));
            console.log(getMain0Result);
        }
    } else if (flag == 1){
        const getMain1Query = 'SELECT * FROM webtoon ORDER BY webtoonDate DESC'; //신작
        const getMain1Result = await db.queryParam_None(getMain1Query);
        if(!getMain1Result) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MAIN_DB_SELECT_ERROR));
        } else {
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.MAIN1_SUCCESS));
            console.log(getMain1Result);
        }
 
    } else if (flag == 2) {
         const getMain2Query = 'SELECT * FROM webtoon WHERE webtoonCom = 1'; //완결
         const getMain2Result = await db.queryParam_None(getMain2Query);
         if(!getMain2Result) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MAIN_DB_SELECT_ERROR));
        } else {
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.MAIN2_SUCCESS));
            console.log(getMain2Result);
        }
    } else {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.WRITE_FLAG_VALUE));
    } 
});
/*
    METHOD  : GET
    url     : /webtoon/main/banner
    메인 배너 가져오기
*/
router.get('/banner', async(req, res) => {
    //배너 json형태로 보내주기


});


module.exports = router;