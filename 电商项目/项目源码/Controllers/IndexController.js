module.exports = {
    index: function (req, res) {
        if(req.session.sign){
            res.render('users/index',{userName:req.session.user.userName});
            return;
        }
        var email =req.cookies.email;
        var password=req.cookies.password;

        if(email==null||password==null){
            res.render('users/index',{userName:'', state:-1});
        }else{
            //(1)引入userService
            var UserService = require('../Service/UserService');
            //(2)创建对象
            var userService = new UserService();
            //(3)对象初始化
            userService.init();
            //(4)验证用户都合法
            userService.login(req.session,email,password,function(result){
                userService.end();
                if(result.state==2)
                {
                    req.session.sign=true;
                    res.render('users/index', {userName:req.session.userName});
                }else{
                    res.render('users/index', {userName:''});
                }
            },1);
        }
    },
    account: function (req, res) {
        if(req.session.sign){
            res.render('users/account',{userName:req.session.user.userName});
            return;
        }
        var email =req.cookies.email;
        var password=req.cookies.password;

        if(email==null||password==null){
            res.render('users/account',{userName:''});
        }else{
            //(1)引入userService
            var UserService = require('../Service/UserService');
            //(2)创建对象
            var userService = new UserService();
            //(3)对象初始化
            userService.init();
            //(4)验证用户都合法
            userService.login(req.session,email,password,function(result){
                userService.end();
                if(result.state==2)
                {
                    req.session.sign=true;
                    res.render('users/account', {userName:req.session.userName});
                }else{
                    res.render('users/account', {userName:''});
                }
            },1);
        }
    },
    contact: function (req, res) {
        if(req.session.sign){
            res.render('users/contact',{userName:req.session.user.userName});
            return;
        }
        var email =req.cookies.email;
        var password=req.cookies.password;

        if(email==null||password==null){
            res.render('users/contact',{userName:'', state:-1});
        }else{
            //(1)引入userService
            var UserService = require('../Service/UserService');
            //(2)创建对象
            var userService = new UserService();
            //(3)对象初始化
            userService.init();
            //(4)验证用户都合法
            userService.login(req.session,email,password,function(result){
                userService.end();
                if(result.state==2)
                {
                    req.session.sign=true;
                    res.render('users/contact', {userName:req.session.userName});
                }else{
                    res.render('users/contact', {userName:''});
                }
            },1);
        }
    },
    men: function (req, res) {
        var ProductService = require('../Service/ProductService');
        var productService = new ProductService();
        productService.init();
        productService.selectByKey(['sex','men'],function(data){
            if(req.session.sign){
                res.render('users/men', {userName:req.session.user.userName, products: data });
                return;
            }
            var email =req.cookies.email;
            var password=req.cookies.password;

            if(email==null||password==null){
                res.render('users/men', {userName:'', products: data });
            }else{
                //(1)引入userService
                var UserService = require('../Service/UserService');
                //(2)创建对象
                var userService = new UserService();
                //(3)对象初始化
                userService.init();
                //(4)验证用户都合法
                userService.login(req.session,email,password,function(result){
                    userService.end();
                    if(result.state==2)
                    {
                        req.session.sign=true;
                        res.render('users/men', {userName:req.session.user.userName, products: data });
                    }else{
                        res.render('users/men', {userName:'', products: data });
                    }
                },1);
            }
        })
    },
    register: function (req, res) {
        if(req.session.sign){
            res.render('users/register',{userName:req.session.user.userName});
            return;
        }
        var email =req.cookies.email;
        var password=req.cookies.password;

        if(email==null||password==null){
            res.render('users/register',{userName:''});
        }else{
            //(1)引入userService
            var UserService = require('../Service/UserService');
            //(2)创建对象
            var userService = new UserService();
            //(3)对象初始化
            userService.init();
            //(4)验证用户都合法
            userService.login(req.session,email,password,function(result){
                userService.end();
                if(result.state==2)
                {
                    req.session.sign=true;
                    res.render('users/register', {userName:req.session.userName});
                }else{
                    res.render('users/register', {userName:''});
                }
            },1);
        }
    },
    women: function (req, res) {
        var ProductService = require('../Service/ProductService');
        var productService = new ProductService();
        productService.init();
        productService.selectByKey(['sex','women'],function(data){
            if(req.session.sign){
                res.render('users/women', {userName:req.session.user.userName, products: data });
                return;
            }
            var email =req.cookies.email;
            var password=req.cookies.password;

            if(email==null||password==null){
                res.render('users/women', {userName:'', products: data });
            }else{
                //(1)引入userService
                var UserService = require('../Service/UserService');
                //(2)创建对象
                var userService = new UserService();
                //(3)对象初始化
                userService.init();
                //(4)验证用户都合法
                userService.login(req.session,email,password,function(result){
                    userService.end();
                    if(result.state==2)
                    {
                        req.session.sign=true;
                        res.render('users/women', {userName:req.session.user.userName, products: data });
                    }else{
                        res.render('users/women', {userName:'', products: data });
                    }
                },1);
            }
        })
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
        userService.init();
        //(3),用户登陆业务
        userService.login(req.session,email,password,function(result){
            if(result.state==2){
                req.session.sign=true;
                res.cookie('email',result.email, {maxAge:60*60 * 1000});
                res.cookie('password',result.password, {maxAge:60*60 * 1000});
            }
            result.name=null;
            result.password=null;
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
};