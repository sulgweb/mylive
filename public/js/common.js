const base64Img = require('base64-img');
class Common {
    //格式化输出
    outPut(code,data,msg=""){
        return {code:code,data:data,msg:msg}
    }
    //生成len位随机字符串
    getCode(len){
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var nums = "";
        for (var i = 0; i < len; i++) {
        var id = parseInt(Math.random() * 62);
        nums += chars[id];
        }
        return nums;
    }
    //图片转base64
    async base64Image(url){
        return new Promise((resolve,reject)=>{
            base64Img.requestBase64(url,(err,res,body)=>{
                resolve(body)
            })
        }) 
    }
}
const common = new Common();
module.exports = common;