module.exports = function () {
    this.init = function () {
        //1,引入购物车数据处理模块
        var CarListDao = require('../Dao/CarListDao');
        //2,创建对象
        this.carListDao = new CarListDao();
        //3,初始化
        this.carListDao.init();
    };

    this.selectAll = function (session, call) {
        var msg = {
            url: '',
            result: []
        };
        if (session.sign) {
            this.carListDao.selectCarLists(session.user.userId, function (result) {
                var length = result.length;
                if (length == 0) {
                    msg.url = 'users/checkout';
                } else {
                    msg.url = 'users/checkout';
                    msg.result = result;
                }
                call(msg);
            });
        } else {
            msg.url = 'users/account';
            call(msg);
        }
    };

    this.addCarlist = function (session, productId, call) {
        var msg = null;
        var that = this;
        if (session.sign) {
            this.checkList(session.userId, productId, function (result) {
                if (result) {
                    that.carListDao.init();
                    that.carListDao.addCarList([session.userId, productId], function (result) {
                        msg = '商品添加成功，请在购物车中查看！！！';
                        call(msg);
                    })
                } else {
                    msg = '该商品已经在购物车中！！！';
                    call(msg);
                }
            })
        } else {
            msg = '请先进行登录然后再添加商品！！！';
            call(msg);
        }
    };

    this.removeList = function(session, productId, call){
        this.carListDao.deleteCarList([session.userId,productId],function(){
            call('商品已经从购物车中移除！！！');
        })
    };

    this.checkList = function (userId, productId, call) {
        this.carListDao.selectCarList(['user_id', userId], function (result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].product_id == productId) {
                    call(false);
                    return;
                }
            }
            call(true);
        });
    };

    this.end = function(){
        this.carListDao.closeConnecte();
    };
}