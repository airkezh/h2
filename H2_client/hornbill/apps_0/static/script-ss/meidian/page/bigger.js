/*common*/
require('wap/zepto/touch')
require('wap/app/dialog')
var uploadBtn = require('wap/component/uploadBtn')
var shareTmp = require('wap/component/shareTmp')
var Alert = require('wap/ui/alert')
require('jquery')

uploadBtn.bind('.upload_btn' , {
    'behind' : '/image/upload'
    ,'success' : function(data,obj){
    	datas = {
            'image_id':data.data.image_id
        } 
        $.post('/aj/bigger/create', datas, function(res){
            if(res.code == '40102'){
                location.href = '/auth/connect?type=weixin&callback_uri=' + encodeURIComponent(location.href)
            }else{
                location.href = 'http://m.midianapp.com/bigger/activity/remind/?bigger_id=' + res.data.bigger_id
            }  
         }, 'json');
    }
    ,'error' : function(a){
    	alert('系统错误，上传失败');
    },
    'start': function(){
        $('.upload_btn').addClass('gray')
        $('.upload_btn').text('上传中...')
    }
});
  
//alert(document.cookie)



var mark_btn = $('.mark_wrap ul li')
for (var i = 0; i < mark_btn.length; i++) {
    (function(num){
        var mark_btn_arr = mark_btn[num]
        $(mark_btn_arr).on('tap', function(){
            $('.leamsg').attr('placeholder','要不您也留一手')
            $('.black').removeClass('black');
            $(this).addClass('black');
            var index = $(this).attr('value');
            $('.mark_des_wrap ul').hide();
            $('.mark_des_wrap ul[value='+index+']').show() 
            var check_arr = $('.mark_des_wrap ul[value='+index+'] li') 
            for (var l = 0; l < check_arr.length; l++) {
                (function(n){
                    var check_arrs = check_arr[n]
                    $(check_arrs).on('tap',function(){
                        $('.checked').removeClass('checked');
                        $(this).addClass('checked');
                        var check_text = $('.mark_des_wrap ul[value='+index+'] li.checked').text()
                        $('.leamsg').val(check_text)
                    })
                }(l))
            }
        })
    }(i))
};

$('.mark_wrap li[value="5"]').trigger('tap');

//var check_text = $('.mark_des_wrap ul[value='+index+'] li.checked').text()
//$('.leamsg').val(check_text)
//$('.leamsg').attr('placeholder','要不您也留一手')

$('#mark_sumbit, #mark_sumbit_anonymous').on('tap',function(){
        var $btn = $(this)
        var score = $('.mark_wrap .black').attr('value')
        var comment = $('.leamsg').val()
        var comment_placeholder = $('.leamsg').attr('placeholder')
        var anonymous = ($btn.attr('id') == 'mark_sumbit_anonymous')
        var btnText = $btn.text()
        
        if (! score) {
            new Alert({
                content : '好歹您给打个分'
            });
            return;
        }
        if (comment == '' || comment == comment_placeholder) {
            new Alert({
                content : '好歹您给留一手'
            });
            return;
        }

        $btn.addClass('eventnone gray').text('正在提交...')

        data = {
            'comment_score':score,
            'comment_content':comment,
            'bigger_id':fml.vars.biggerId,
            'anonymous': anonymous ? '1' : '0'
        }
        $.post('/aj/bigger_com/comment', data, function(res){
            $btn.removeClass('eventnone gray').text(btnText)
            
            if(res.code == '40102'){
                location.href = '/auth/connect?type=weixin&callback_uri=' + encodeURIComponent(location.href)
            }
            else if(res.code == '0'){
                var url = 'http://' + document.domain + '/bigger/activity/result/?bigger_id=' + fml.vars.biggerId 

                if (! anonymous && ! fml.vars.currentNickname) {
                    location.href = '/auth/connect?type=weixin&scope=userinfo&callback_uri=' + encodeURIComponent(url)
                }
                else {
                    location.href = url;
                }
            }

         }, 'json');
})





























