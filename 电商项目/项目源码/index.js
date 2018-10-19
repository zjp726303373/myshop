//1,引入express
var express = require('express');
var app = express();
//2,设置模板引擎
var path = require('path');
//3,设置视图地址
app.set('views', path.join(__dirname, '/views'));
//4,设置ejs引擎
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
//5,设置静态文件
app.use(express.static('public'));
//6,引入body-parser模块
var bodyParser = require('body-parser');
//7，创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({
    secret: '12345',
    name: 'express_11_cookie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 800000 }    //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));

var indexController = require('./Controllers/IndexController');

app.get('/index', indexController.index);

app.get('/account', indexController.account);

app.get('/contact', indexController.contact);

app.get('/men', indexController.men);

app.get('/register', indexController.register);

app.get('/women', indexController.women);

app.post('/login',urlencodedParser,indexController.login);

app.post('/registers',urlencodedParser,indexController.registers);

var productController = require('./Controllers/ProductController');

app.get('/products', productController.products);

app.get('/single', productController.single);

var carListController = require('./Controllers/CarListController');

app.get('/checkout', carListController.checkout);

app.get('/addCarList',carListController.addCarList);

app.get('/removeCarList',carListController.removeCarList);

var adminController = require('./Controllers/AdminController');
app.get('/admin-log', adminController.admin_log);

app.listen(9999,function(){
    console.log('Server is running...');
});