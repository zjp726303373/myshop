module.exports = function (){
    this.init = function(){
        //1,引入产品数据处理模块
        var ProductsDao = require('../Dao/ProductsDao');
        //2，创建对象
        this.productsDao = new ProductsDao();
        //3,初始化
        this.productsDao.init();
    };

    this.selectAll = function(call){
        this.productsDao.selectProducts(function (result) {
            call(result);
        });
    };

    this.end = function(){
        this.productsDao.closeConnecte();
    };
}
