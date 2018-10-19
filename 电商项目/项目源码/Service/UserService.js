module.exports = function () {
    this.init = function () {
        //1,引入首页数据处理模块
        var UsersDao = require('../Dao/UsersDao');
        //2，创建对象
        this.usersDao = new UsersDao();
        //3,初始化
        this.usersDao.init();
    };

    this.login = function (session, email, password, call,state) {
        var response = {
            state: 0,
            msg: ''
        }

        if(state==0){
            //(1)用户工具类
            var email = this.crypto(email);
            var password = this.crypto(password);
        }
        //检查用户是否存在于数据库中且密码是否正确
        this.checkUser(password, ['email', email], function (result) {
            if (!result.flag) {
                response.state = -1;
            }
            else if (result.result) {
                response.state = 2;
                response.email = result.email;
                response.password = result.password;
                session.user={
                    userId : result.result[0].user_id,
                    userName : result.result[0].firstName+result.result[0].lastName
                }
            } else {
                response.state = 1;
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
                    response.msg = '注册成功,登陆后进行浏览！！！';
                    session.user={
                        userId :  result.insertId,
                        userName : info.firstName+info.lastName
                    }
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
                msg.result = result;
            } else {
                msg.flag = true;
            }
            call(msg);
        });
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