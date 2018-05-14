const ConstantMap = require('../../framework/memory/ConstantMap');
const creds = require('../configs/creds');

class ProdCreds extends ConstantMap{
    constructor(){
        super();
        this.defineConstant('User', creds.prd.creds[0].user);
        this.defineConstant('Password', creds.prd.creds[0].password);
    }
}

module.exports = ProdCreds;