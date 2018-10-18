module.exports = function () {
    this.init = function () {
        //1,引入MySQL模块
        var mysql = require('mysql');  //调用MySQL模块

        //2，创建一个connection
        this.connection = mysql.createConnection({
            host: '192.168.2.190',       //主机 ip
            user: 'root',            //MySQL认证用户名
            password: '520431',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database: 'myshop'          //数据库里面的数据
        });
        //3，连接
        this.connection.connect();
    };
    this.selectCarList = function (info,call) {
        var userGetSql = "SELECT * FROM carlist WHERE "+info[0]+"='"+info[1]+"'";
        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.selectCarLists = function (userId,call) {
        var userGetSql = "SELECT * FROM carlist inner join products on carlist.product_id=products.id WHERE carlist.user_id='"+userId+"'";
        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.addCarList = function(info,call){
        var userAddSql = "INSERT INTO carlist(user_id,product_id) values(?,?)";
        this.connection.query(userAddSql, info, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.deleteCarList = function(info,call){
        //delete from people where id=20;
        var userAddSql = "DELETE FROM carlist WHERE user_id=? and product_id=?";
        this.connection.query(userAddSql, info, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.closeConnecte = function(){
        //3,连接结束
        this.connection.end();
    }
};