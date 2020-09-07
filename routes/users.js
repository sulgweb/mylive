var express = require('express');
var router = express.Router();
var commonJS = require('../public/js/common');
var sqlHandle = require('../public/config/mysqlModal')
const jwt = require('jsonwebtoken')

router.get("/test",async(req,res,next)=>{
  let img = await commonJS.base64Image("https://c-ssl.duitang.com/uploads/item/201807/08/20180708222217_wayur.jpeg")
  res.send(img)
})


/**
 * @description: 用户登录
 * @Date: 2020-09-01 10:46:49
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.post("/login",async(req,res,next)=>{
  let data = req.body
  if(data.account&&data.password){
    let sql = `select * from user where email='${data.account}' and password='${data.password}' limit 1`
    let result = await sqlHandle.DB2(sql)
    if (result.length == 1) {
      const token = 'Bearer ' + jwt.sign(
        {
          id:result[0].id,
          name:result[0].name,
          age:result[0].age,
          email:result[0].email
        },
        'living_xiaoyu',
        {
          expiresIn: 3600 * 24 * 7
        }
      )
      
      res.send(commonJS.outPut(200, token, 'success'))
    }else{
      res.send(commonJS.outPut(500, "账号/密码错误", 'fail'))
    }
  }else{
    res.send(commonJS.outPut(500, "账号/密码不能为空", 'fail'))
  }
})


/**
 * @description: 获取用户信息
 * @Date: 2020-08-31 11:13:14
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.get('/getUserInfo',async(req,res,next)=>{
  let data = req.query;
  let sql = `select * from user where id = '${data.id}' limit 1`
  let result = await sqlHandle.DB2(sql)
  if (result.length == 1) {
    res.send(commonJS.outPut(200, result[0], 'success'))
  }else{
    res.send(commonJS.outPut(500, result, 'fail'))
  }
})


/**
 * @description: 新增用户
 * @Date: 2020-08-31 11:13:05
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.post('/addUser', async (req, res, next)=>{
  let data = req.body;
  if(!data.email||!data.password){
    res.send(commonJS.outPut(500, "邮箱/密码不能为空", 'fail'))
    return
  }
  let sql = `insert into user (id,name,age,email,password) values ('${commonJS.getCode(32)}','${data.name}','${data.age}','${data.email}','${data.password}')`
  let result = await sqlHandle.DB2(sql)
  if (result.affectedRows == 1) {
    res.send(commonJS.outPut(200, data, 'success'))
  }else{
    res.send(commonJS.outPut(500, result, 'fail'))
  }
});


/**
 * @description: 编辑用户信息
 * @Date: 2020-08-31 13:38:44
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.post("/editUser",async(req,res,next)=>{
  let data = req.data
  if(!data.id){
    let sql = `update user set name=${data.name},age=${data.age},password=${data.password} where id=${data.id}`
    let result = await sqlHandle.DB2(sql)
    if (result.affectedRows == 1) {
      res.send(commonJS.outPut(200, data, 'success'))
    }else{
      res.send(commonJS.outPut(500, result, 'fail'))
    }
  }
})

module.exports = router;
