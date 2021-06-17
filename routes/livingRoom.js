/*
 * @description: 
 * @author: 小羽
 * @github: https://github.com/sulgweb
 * @lastEditors: 小羽
 * @Date: 2020-08-31 22:27:40
 * @LastEditTime: 2021-06-18 07:28:39
 * @Copyright: 1.0.0
 */
var express = require('express');
var router = express.Router();
var commonJS = require('../public/js/common');
var sqlHandle = require('../public/config/mysqlModal')

/**
 * @description: 获取直播间信息
 * @Date: 2020-08-31 11:32:31
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.get("/roomList", async (req, res, next) => {
    let data = req.query
    let sql
    if (!data.keyword) {
        sql = `select living_room.id,living_room.user_id,living_room.title,user.name,living_room.image,user.avatar,living_room.type from living_room left join user on living_room.user_id = user.id  where living_room.status != 0`
    } else {
        sql = `select living_room.id,living_room.user_id,living_room.title,user.name,living_room.image,user.avatar,living_room.type from living_room left join user on living_room.user_id = user.id where title like '%${data.keyword}%' or user.name like '%${data.keyword}%' and living_room.status !=0 limit 20`
    }
    let result = await sqlHandle.DB2(sql)
    if (result.length >= 0) {
        res.send(commonJS.outPut(200, result, 'success'))
    } else {
        res.send(commonJS.outPut(500, result, 'fail'))
    }
})


/**
 * @description: 根据类型获取直播间信息
 * @Date: 2020-08-31 11:32:31
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.get("/roomListByType", async (req, res, next) => {
    let data = req.query
    let sql
    if (!data.type) {
        sql = `select living_room.id,living_room.user_id,living_room.title,user.name,living_room.image,user.avatar,living_room.type from living_room left join user on living_room.user_id = user.id  where living_room.status != 0`
    } else {
        sql = `select living_room.id,living_room.user_id,living_room.title,user.name,living_room.image,user.avatar,living_room.type from living_room left join user on living_room.user_id = user.id where type = '${data.type}' and living_room.status !=0 limit 20`
    }
    let result = await sqlHandle.DB2(sql)
    if (result.length >= 0) {
        res.send(commonJS.outPut(200, result, 'success'))
    } else {
        res.send(commonJS.outPut(500, result, 'fail'))
    }
})


/**
 * @description: 新建房间
 * @Date: 2020-08-31 11:38:49
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.post("/addRoom", async (req, res, next) => {
    let data = req.body
    let sql = `insert into living_room (id,title,user_id,type) value ('${commonJS.getCode(32)}','${data.title}','${data.user_id}','${data.type}')`
    let result = await sqlHandle.DB2(sql)
    if (result.affectedRows == 1) {
        res.send(commonJS.outPut(200, data, 'success'))
    } else {
        res.send(commonJS.outPut(500, result, 'fail'))
    }
})


/**
 * @description: 获取直播间详情
 * @Date: 2020-09-10 22:04:29
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.get("/roomDetail", async (req, res, next) => {
    let data = req.query
    let sql = `select living_room.title,living_room.type,user.name,user.id,user.avatar from living_room left join user on living_room.user_id = user.id  where living_room.id = '${data.id}' and living_room.status != 0`
    let result = await sqlHandle.DB2(sql)
    if (result.length == 1) {
        let resultData = {
            ...result[0],
            room_id: data.id
        }
        res.send(commonJS.outPut(200, resultData, 'success'))
    } else {
        res.send(commonJS.outPut(500, result, 'fail'))
    }
})

/**
 * @description: 通过用户id获取直播间详情
 * @Date: 2020-09-10 22:04:29
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
 router.get("/roomDetailByUserId", async (req, res, next) => {
    let data = req.query
    let sql = `select living_room.title,living_room.type,user.name,user.id,user.avatar from living_room left join user on living_room.user_id = user.id  where living_room.user_id = '${data.id}' and living_room.status != 0`
    let result = await sqlHandle.DB2(sql)
    if (result.length == 1) {
        let resultData = {
            ...result[0],
            room_id: data.id
        }
        res.send(commonJS.outPut(200, resultData, 'success'))
    } else {
        res.send(commonJS.outPut(500, result, 'fail'))
    }
})


/**
 * @description: 编辑房间
 * @Date: 2020-08-31 11:40:27
 * @author: 小羽
 * @param {type} 
 * @return {type} 
 */
router.post("/editRoom", async (req, res, next) => {
    let data = req.body
    let sql = `update living_room set title='${data.title}',status='${data.status}',user_id='${data.user_id}' where id ='${data.id}' `
    let result = await sqlHandle.DB2(sql)
    if (result.affectedRows == 1) {
        res.send(commonJS.outPut(200, data, 'success'))
    } else {
        res.send(commonJS.outPut(500, result, 'fail'))
    }
})

module.exports = router;