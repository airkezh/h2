/*common*/	
require('wap/zepto/fastclick')
var signWX = require('wx/sign'), 
	shareWX = require('wx/share');

    var arrList = fml.vars.serviceArr;
    var map = {};
    var arr = [];
    var total = 10;

    function findNum(){
    	var num = parseInt(Math.random()*arrList.length);
        if(!map[num]){
            map[num] = 1;
            return arrList[num];
        }else{
            return findNum(arrList);
        }
    }

    for(var i=0; i<total; i++){
        arr[i] = findNum();
    }

    arr.map(function(index,item){
        $('#question').append('<div class="box"><img src='+index.image_src+'><p>'+(item+1)+'、'+index.title+'</p><ul class="topic"><li data-attr="'+index.items[0].answer+'">'+index.items[0].question+'</li><li data-attr="'+index.items[1].answer+'">'+index.items[1].question+'</li><li data-attr="'+index.items[2].answer+'">'+index.items[2].question+'</li><li data-attr="'+index.items[3].answer+'">'+index.items[3].question+'</li></ul></div>');
    });

    function delay(cb,time){
        setTimeout(cb,time || 200);
    }

    var boxs = $('#question').find('.box');

    $('.per').html(1+'/'+total);
 	
    var score = 0; //得分
    boxs.eq(0).show().siblings().hide();
    boxs.each(function(i,e){
        var _this = $(this);
        _this.find('.topic li').on('click', function(){
            var self = $(this);
            self.addClass('selected');
            if (self.attr('data-attr') =='1') {
                score += 10;
            }

            delay(function(){
                if (i != boxs.size()-1) {
                    $('.per').html((i+2)+'/'+total);
                    
                    boxs.eq(i+1).show().siblings().hide();
                }
                if (i == boxs.size()-1){
                    window.location.href = '/activity/market/score/?score_id=' + score;
                }
            })
        });
    });
    
    signWX(); 
    shareWX.bind({
        'desc':'美丽说特别策划，10道题鉴定你是没童年还是美童年！',
        'imgUrl':'http://d02.res.meilishuo.net/pic/_o/ea/af/a41d94fc94a4d64ac955b0f2b107_200_200.cf.jpg',
        'title':'6.1儿童节测你看过多少经典动画片~有胆来玩！',
        'link': 'http://m.meilishuo.com/activity/market/children/'
    });