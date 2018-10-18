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
        this.carListDao.selectCarLists(session.user.userId, function (data) {
            call(data);
        });
    };

    this.addCarlist = function (session, info, call) {
        var that = this;
        if (session.sign) {
            this.checkList(session.user.userId, info.productId, function (result) {
                if (result) {
                    that.carListDao.init();
                    that.carListDao.addCarList([session.user.userId,info.productId,info.count,info.size], function (result) {
                        msg = '商品添加成功，请在购物车中查看！！！';
                        call(msg);
                    })
                } else {
                    that.carListDao.init();
                    that.carListDao.updatelist([info.count,info.size,session.user.userId,info.productId], function (result) {
                        msg = '该商品存在购物车中！已帮你修改成最新购物信息！';
                        call(msg);
                    })
                }
            })
        } else {
            msg = '请先进行登录然后再添加商品！！！';
            call(msg);
        }
    };

    this.removeList = function(session, productId, call){
        this.carListDao.deleteCarList([session.user.userId,productId],function(){
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