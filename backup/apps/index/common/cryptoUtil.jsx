/**
 * Created by mac on 2017/3/8.
 */
var CryptoJS = require("crypto-js");

export class CryptoJsUtil {
    //秘钥 和后台商量
    static pwd = CryptoJS.enc.Utf8.parse("29roeyufuqphribl")
    //加密
    static Encrypt = (word)=> {
         var iv  = CryptoJS.enc.Utf8.parse('0102030405060708');   
         var srcs = CryptoJS.enc.Utf8.parse(word);  
         var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJsUtil.pwd, { iv: iv,mode:CryptoJS.mode.CBC});
         return encrypted.toString();  
    };

    //解密p-[[;l']]
    static Decrypt = (word)=> {
         var iv  = CryptoJS.enc.Utf8.parse('0102030405060708'); 
         var srcs = CryptoJS.enc.Utf8.parse(word);  
         var decrypt = CryptoJS.AES.decrypt(srcs, CryptoJsUtil.pwd, { iv: iv,mode:CryptoJS.mode.CBC});  
         return CryptoJS.enc.Utf8.stringify(encrypted).toString();
    };

    //获取一个uuid
    static getUUID = ()=>{
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  
        // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
}