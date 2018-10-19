module.exports = function () {
    this.init = function () {
        //1,引入首页数据处理模块
        var AdminsDao = require('../Dao/AdminDao');
        //2，创建对象
        this.adminsDao = new AdminsDao();
        //3,初始化
        this.adminsDao.init();
    };
    this.checkAdmin = function (email,password,call) {
        var data=0
        this.adminsDao.selectAdmin(['email',email], function (result) {
            if(result.length==0){
                data = -1;
            }else if(result[0].password == password){
                data = 2;
            }else{
                data = 1;
            }
            call(data)
        })
    }
};