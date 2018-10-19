/**
 * Created by asus on 2018/10/10.
 */
module.exports = function () {
    this.init = function () {
        //1,����MySQLģ��
        var mysql = require('mysql');  //����MySQLģ��

        //2������һ��connection
        this.connection = mysql.createConnection({
            host: 'localhost',       //���� ip
            user: 'root',            //MySQL��֤�û���
            password: '123456',                //MySQL��֤�û�����
            port: '3306',                 //�˿ں�
            database: 'myshop'          //���ݿ����������
        });
        //3������
        this.connection.connect();
    };

    this.selectAdmin = function (info, call) {
        //1,��дsql���
        var userGetSql = "SELECT * FROM admins WHERE " + info[0] + " = '" + info[1] + "'";
        //2,���в�ѯ����
        /**
         *query��mysql���ִ�еķ���
         * 1��userGetSql��д��sql���
         * 2��function (err, result)���ص�������err��ִ�д���ʱ���ش�һ��errֵ����ִ�гɹ�ʱ������result
         */
        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    };

    this.closeConnecte = function(){
        //3,���ӽ���
        this.connection.end();
    }
}
