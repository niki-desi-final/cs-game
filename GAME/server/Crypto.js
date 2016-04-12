/**
 * Created by NikiHrs on 12.4.2016 г..
 */
var crypto = require('crypto');

var Decrypter =function(){
    var decipher = crypto.createDecipher('camellia-256-cfb1','CSMANIA',0114324313123123);
    return{
        decryptObject:function(data){
            var dec = decipher.update(data,'hex','utf8');
            dec += decipher.final('utf8');
            return dec;
        }
    }


}();

module.exports = Decrypter;