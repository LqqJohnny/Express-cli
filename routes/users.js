var express = require('express');
var router = express.Router();

/**
 * 可以在这里设置对 所有 /user/* 的拦截器
 *  也可以在每一个单独的router里面设置 拦截
 *
 * 最后如果多个 router 用到同一个拦截方法 可以将此方法 单独拿到
 * Interceptor 文件夹 , 在export 出来使用
 */

router.use(function(req,res,next){
    // 做一些判断
    console.log(req.session);
    if(!req.session.user){
        res.render('index', { title: 'please login in first.' })
    }else{
        next();
    }
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); //  send 一条信息
});

module.exports = router;
