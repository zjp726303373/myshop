module.exports = {
    index: function (req, res) {
        if(req.session.sign){
            console.log(req.session)
            res.render('users/index',{userName:req.session.user.userName});
            return;
        }
        console.log(222)
        var email =req.cookies.email;
        var password=req.cookies.password;

        if(email==null||password==null){
            res.render('index',{state:-1});
        }else{
            //(1)引入userService
            var UserService = require('../Service/UserService');
            //(2)创建对象
            var userService = new UserService();
            //(3)对象初始化
            userService.init();
            //(4)验证用户都合法
            userService.login(req.session,email,password,function(result){
                if(result.state==2)
                {
                    req.session.sign=true;
                    res.render('users/index', {userName:req.session.userName});
                }else{
                    res.render('users/index', {userName:''});
                }
            },1);
        }
        //res.render('users/index', {userName:req.session.userName});
    },
    account: function (req, res) {
        res.render('users/account', {});
    },
    // checkout: function (req, res) {
    //     //1,引入购物车处理模块
    //     var CarlistService = require('../Service/CarlistService');
    //     var carlistService = new CarlistService();
    //     carlistService.init();
    //     carlistService.selectAll(req.session,function(data){
    //         carlistService.end();
    //         res.render(data.url,{products:data.result});
    //     })
    // },
    // addCarList : function(req,res){
    //     //1, 解析数据
    //     var productId = req.body.productId;
    //       //1,引入购物车处理模块
    //     var CarlistService = require('../Service/CarlistService');
    //     var carlistService = new CarlistService();
    //     carlistService.init();
    //     carlistService.addCarlist(req.session,productId,function(data){
    //         carlistService.end();
    //         res.end(data);
    //     });
    // },
    // removeCarList : function(req,res){
    //     //1, 解析数据
    //     var productId = req.body.productId;
    //       //1,引入购物车处理模块
    //     var CarlistService = require('../Service/CarlistService');
    //     var carlistService = new CarlistService();
    //     carlistService.init();
    //     carlistService.removeList(req.session,productId,function(data){
    //         carlistService.end();
    //         res.end(data);
    //     });
    // },
    contact: function (req, res) {
        res.render('users/contact', {});
    },
    products: function (req, res) {
        res.render('users/products', {});
    },
    // products: function (req, res) {
    //     var ProductService = require('../Service/ProductService');
    //     var productService = new ProductService();
    //     productService.init();
    //     productService.selectAll(function(result){
    //         productService.end();
    //         res.render('products', { products: result });
    //     })
    // },
    single: function (req, res) {
        res.render('users/single', {});
    },
    men: function (req, res) {
        res.render('users/men', {});
    },
    checkout: function (req, res) {
        res.render('users/checkout', {});
    },
    register: function (req, res) {
        res.render('users/register', {});
    },
    women: function (req, res) {
        res.render('users/women', {});
    },
    login: function (req, res) {
        //1, 解析数据
        var email = req.body.email;
        var password = req.body.password;
        //2,向业务层要数据
        //(1),引入UserService模块
        var UserService = require('../Service/UserService');
        //(2),创建UserService对象并初始化
        var userService = new UserService();
        userService.init()
        //(3),用户登陆业务
        userService.login(req.session,email,password,function(result){
            if(result.state==2){
                req.session.sign=true;
                res.cookie('email',result.email, {maxAge:60*60 * 1000});
                res.cookie('password',result.password, {maxAge:60*60 * 1000});
            }
            result.name=null;
            result.password=null;
            console.log(req.session);
            res.end(JSON.stringify(result.state));
        },0);
    },
    registers: function (req, res) {
        //1, 解析数据并包装对象
        var userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
        //2,向业务层要数据
        //(1),引入UserService模块
        var UserService = require('../Service/UserService');
        //(2),创建UserService对象并初始化
        var userService = new UserService();
        userService.init();
        //用户注册业务
        userService.register(req.session,userInfo,function(data){
            //把对象转为json格式数据并返回页面
            userService.end();
            res.end(JSON.stringify(data))
        });
    }
}