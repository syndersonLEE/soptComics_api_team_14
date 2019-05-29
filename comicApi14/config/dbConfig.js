const mysql = require('promise-mysql');
const config = { //DB정보
    host: 'hyeong.cxe0tbdkmw3z.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'hyeong',
    password: 'hyeong412',
    database: 'soptoon',
}
module.exports =  mysql.createPool(config); //커넥션 생성