module.exports = function () {
    this.init = function () {
        //1,引入首页数据处理模块
        var UsersDao = require('../Dao/UsersDao');
        //2，创建对象
        this.usersDao = new UsersDao();
        //3,初始化
        this.usersDao.init();
    };

    this.login = function (session, email, password, call) {
        var response = {
            state: 0,
            msg: ''
        }
        var that = this;
        var email = this.crypto(email);
        var password = this.crypto(password);
        //检查用户是否存在于数据库中且密码是否正确
        this.checkUser(password, ['email', email], function (result) {
            if (!result.flag) {
                response.state = -1;
                response.msg = "邮箱地址错误，请重新输入或者立即注册！";
            }
            else if (result.userId) {
                response.state = 1;
                response.msg = "登录成功！";
                that.setSession(session, result.userId);
            } else {
                response.state = 0;
                response.msg = "输入密码错误！";
            }
            call(response);
        });
    };

    this.register = function (session, info, call) {
        var response = {
            state: 0,
            msg: ''
        }
        var that = this;
        info.email = this.crypto(info.email);
        info.password = this.crypto(info.password);
        //检查用户是否存在于数据库中
        this.checkEmail(['email', info.email], function (result) {
            if (result) {
                response.state = -1;
                response.msg = '用户名已存在，请重新输入！';
                call(response);
            } else {
                //账户不存在时往数据库中添加数据
                that.usersDao.insertUser(info, function (result) {
                    response.state = 1;
                    response.msg = '注册成功';
                    that.setSession(session, result.insertId);
                    call(response);
                });
            }
        })
    };

    this.selectUserByKey = function (info, call) {
        this.usersDao.selectUser(info, function (result) {
            call(result);
        })
    };

    this.checkEmail = function (info, call) {
        this.selectUserByKey(info, function (result) {
            if (result.length == 0) {
                call(false);
            } else {
                call(true);
            }
        });
    };

    this.checkUser = function (password, info, call) {
        var msg = {
            flag: false
        };
        this.selectUserByKey(info, function (result) {
            if (result.length == 0) {
            } else if (result[0].password == password) {
                msg.flag = true;
                msg.userId = result[0].user_id;
            } else {
                msg.flag = true;
            }
            call(msg);
        });
    };

    this.setSession = function (session, user_id) {
        session.sign = true;
        session.userId = user_id;
    };

    this.crypto = function (data) {
        var Tools = require('../Tools/Tool');
        var tool = new Tools();
        return tool.crypto(data);
    };

    this.end = function(){
        this.usersDao.closeConnecte();
    };
};