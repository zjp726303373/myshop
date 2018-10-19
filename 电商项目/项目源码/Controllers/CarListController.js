/**
 * Created by asus on 2018/10/19.
 */
module.exports = {
    checkout: function (req, res) {
        //1,���빺�ﳵ����ģ��
        var CarlistService = require('../Service/CarlistService');
        var carlistService = new CarlistService();
        carlistService.init();
        if(req.session.sign){
            carlistService.selectAll(req.session,function(data){
                carlistService.end();
                res.render('users/checkout',{userName:req.session.user.userName,products:data});
            });
            return;
        }
        var email =req.cookies.email;
        var password=req.cookies.password;

        if(email==null||password==null){
            res.render('users/account',{userName:''});
        }else{
            //(1)����userService
            var UserService = require('../Service/UserService');
            //(2)��������
            var userService = new UserService();
            //(3)�����ʼ��
            userService.init();
            //(4)��֤�û����Ϸ�
            userService.login(req.session,email,password,function(result){
                userService.end();
                if(result.state==2)
                {
                    req.session.sign=true;
                    carlistService.selectAll(req.session,function(data){
                        carlistService.end();
                        res.render('users/checkout',{userName:req.session.user.userName,products:result});
                    });
                }else{
                    res.render('users/account', {userName:''});
                }
            },1);
        }
    },
    addCarList : function(req,res){
        //1, ��������
        var info = {
            productId : req.query.goodsId,
            size : req.query.size,
            count : req.query.count
        }
        //1,���빺�ﳵ����ģ��
        var CarlistService = require('../Service/CarlistService');
        var carlistService = new CarlistService();
        carlistService.init();
        carlistService.addCarlist(req.session,info,function(data){
            carlistService.end();
            res.end(data);
        });
    },
    removeCarList : function(req,res){
        //1, ��������
        var productId = req.query.goodsId;
        //1,���빺�ﳵ����ģ��
        var CarlistService = require('../Service/CarlistService');
        var carlistService = new CarlistService();
        carlistService.init();
        carlistService.removeList(req.session,productId,function(data){
            carlistService.end();
            res.end(data);
        });
    },
}