const crypto = require('crypto');
const encrytion = {
    encrytion: (pw) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buf) => {
                if (err) {
                    reject(err);
                } else {
                    const salt = buf.toString('base64');
                    crypto.pbkdf2(pw, salt, 10, 32, 'SHA512', (err, hashed) => {
                        if (err) {
                            reject(err);
                        } else {
                            let result = {
                                "hashedPassword": "",
                                "salt": ""
                            }
                            result.hashedPassword = hashed.toString('base64')
                            result.salt = salt
                            resolve(result)
                        }
                    })
                }
            })
        })
    },
    onlyEncrytion: (pw, salt) => {
        return new Promise((resolve, reject) => {
            //생성된 랜덤 값으로 salt 암호화
            crypto.pbkdf2(pw, salt, 10, 32, 'SHA512', (err, hashed) => {
                if (err) {
                    reject(err);
                } else {
                    let result = {
                        "hashedPassword": "",
                        "salt": ""
                    }
                    result.hashedPassword = hashed.toString('base64')
                    result.salt = salt
                    resolve(result)
                }
            })

        })
    }
}
module.exports = encrytion;