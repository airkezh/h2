fml.define("page/huodong/vote_god", ["jquery", 'ui/alert', 'app/checkLogin'], function (require, exports) {
    var $ = require("jquery");
    var check = require('app/checkLogin');
    var Alert = require('ui/alert');

    if (window.location.search.indexOf("page") != -1) {
        window.location.hash = "discuss";
    }

    $(".heart").addClass("noJoin");

    $('.vote').delegate('.heart','click',function(){
        return;
        if(!check()) return false;
        // 检查登录
        var self = $(this);
        // 如果已经赞过了直接飘过
        if(self.hasClass('noJoin') || self.hasClass('alreadyJoin')) return;
        $.ajax({
            url:'/aw/vote/cupGod',
            type:'post',
            dataType:'json',
            data:{
                manid:self.attr('manid'),
                act : 'set'
            },
            success: function(data){
                console.log(JSON.stringify(data));
                if(data.code == 10000){
                    self.text(Number(self.text())+1);
                    $(".heart").addClass("noJoin");
                    self.addClass('alreadyJoin');
                }else{
                    alert(data.msg);
                }
            },
            error: function(){
                alert('系统繁忙，请稍后再试');
            }
        });
    });
});