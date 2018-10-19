/**
 * Created by asus on 2018/10/19.
 */
module.exports = {
    products: function (req, res) {
        var ProductService = require('../Service/ProductService');
        var productService = new ProductService();
        productService.init();
        productService.selectAll(function(data){
            if(req.session.sign){
                res.render('users/products', {userName:req.session.user.userName, products: data });
                return;
            }
            var email =req.cookies.email;
            var password=req.cookies.password;

            if(email==null||password==null){
                res.render('users/products', {userName:'', products: data });
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
                        res.render('users/products', {userName:req.session.user.userName, products: data });
                    }else{
                        res.render('users/products', {userName:'', products: data });
                    }
                },1);
            }
        })
    },
    single: function (req, res) {
        var product_id = req.query.goods_id;
        var ProductService = require('../Service/ProductService');
        var productService = new ProductService();
        productService.init();
        productService.selectByKey(['id',product_id],function(good){
            productService.selectAll(function(products){
                productService.end();
                if(req.session.sign){
                    res.render('users/single',{userName:req.session.user.userName,goods: good,products: products});
                    return;
                }
                var email =req.cookies.email;
                var password=req.cookies.password;

                if(email==null||password==null){
                    res.render('users/single',{userName:'',goods: good,products: products});
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
                            res.render('users/single',{userName:req.session.userName,goods: good,products: products});
                        }else{
                            res.render('users/single',{userName:'',goods: good,products: products});
                        }
                    },1);
                }
            });
        })
    },
}