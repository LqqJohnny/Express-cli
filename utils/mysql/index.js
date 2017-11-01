var mysql=require("mysql");
// 使用 bluebird 将数据库操作变成 promise  还不确定是否有必要
// var Promise = require('bluebird');
// Promise.promisifyAll(require('mysql/lib/Connection').prototype);
// Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var config = require('./config.js')
var pool = mysql.createPool(config);

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;
