var express = require('express');
var router = express.Router();
var query = require("../utils/mysql");
/* GET home page. */
router.get('/', function(req, res, next) {
    //  使用 mysql 连接池 的 例子
    //   这里的 sql 语句 可以是 select / delete / update / insert
    query("select name from user where id = 1",function(err,vals,fields){
        var name = '1';
        name = vals[0].age;
        res.render('index', { title: 'Express'+name }); // render 一个页面
    });


});

module.exports = router;
