module.exports = function () {
    this.init = function () {
        //1,引入MySQL模块
        var mysql = require('mysql');  //调用MySQL模块

        //2，创建一个connection
        this.connection = mysql.createConnection({
            host: '192.168.2.190',       //主机 ip
            user: 'root',            //MySQL认证用户名
            password: '123456',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database: 'myshop'          //数据库里面的数据
        });
        //3，连接
        this.connection.connect();
    };
    this.selectCarList = function (info,call) {
        var userSql = "SELECT * FROM carlist WHERE "+info[0]+"='"+info[1]+"'";
        this.connection.query(userSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.selectCarLists = function (userId,call) {
        var userSql = "SELECT * FROM carlist inner join products on carlist.product_id=products.id WHERE carlist.user_id='"+userId+"'";
        this.connection.query(userSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.addCarList = function(info,call){
        var userSql = "INSERT INTO carlist(user_id,product_id,count,size) values(?,?,?,?)";
        this.connection.query(userSql, info, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.updatelist = function(info,call){
        //update table1 set field1=value1 where 范围
        var userSql = "UPDATE carlist SET count=?,size=? WHERE user_id=? and product_id=?";
        this.connection.query(userSql, info, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };
    this.deleteCarList = function(info,call){
        var userSql = "DELETE FROM carlist WHERE user_id=? and product_id=?";
        this.connection.query(userSql, info, function (err, result) {
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