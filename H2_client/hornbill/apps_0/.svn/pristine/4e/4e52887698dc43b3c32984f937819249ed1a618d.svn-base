fml.define('wap/page/activity/special' , ['wap/zepto' ,'wap/zepto/touch', 'wap/zepto/scroll','wap/app/doota/timedown','wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){
    $('#'+$('.c_tab').attr('name')).show();
    $('.container .tab').on('tap',function(){
        $(this).addClass('c_tab').siblings().removeClass('c_tab');
    	$('#'+$(this).attr('name')).show().siblings().hide();
    })
    var shareTmp = require('wap/component/shareTmp');
	var alertMsgFn = function(msg,twitter_id,shop_id){
        var detail_url=joinurl('twitter_single', {'twitter_info' : {'twitter_id' : twitter_id, 'is_doota' : 1}}, fml.vars._os, fml.vars._r, '/share/item/'+twitter_id);
        var param = {"r":fml.vars._r,"shop_id": shop_id};
        var shop_url= 'meilishuo://shop.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param));
		var data = {msg:msg,shop_url:shop_url,detail_url:detail_url};
        alertMsg(data,'alertMsg');
	}
	$('.empty_btn,.over_btn').on('tap',function(e){        
        var $probox=$(this).parents('.probox');  
        var timer=setTimeout(function(){
            alertMsgFn('宝贝太抢手了下次早点来哦！',$probox.attr('twid'),$probox.attr('shopid')); 
            clearTimeout(timer);         
        },400)                         
	})
    $('.remind_btn').on('tap',function(){
        var $this=$(this);
        var $probox=$this.parents('.probox');
        //,'access_token':'6ad1c635cb5301b84dbc1bcb8b420d51'
        var _time=$probox.attr('stime').replace(/-/g,'/');
        $.get('/aj/tuan/remind_set', {'pushtime':(new Date(_time).getTime()/1000).toString(),
            'actidfor8':fml.vars.event_id,'twitter_id': $probox.attr('twid')}, function(res){
            if(res.code=='10000'){
                $this.html('<i class=\'clock\'></i>已设提醒').off('tap');
                $this.removeClass('remind_btn').addClass('reminded_btn');
            }
            else{
                var error='设置提醒失败';   
                alertMsg({msg:error},'errorMsg');
            }
        } , 'json');
    })
    window.timedown = require('timedown');
	$('.time').each(function(){
        var _this = $(this),
        $status_btn=_this.parents('.probox').find('.status_btn');
        reminds=parseInt(_this.attr('time'));
         day="",hour="",min="",sec="";
        _this.removeClass('time');
        timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
        .onAction(function(){
            var t = arguments[2];
               day=t.d&&t.d!=0? (t.d<10 ? "0"+t.d+"天" : t.d +"天"):"";
               hour=t.h?(t.h<10?"0"+t.h:t.h):"00";
               min=t.i?(t.i<10?"0"+t.i:t.i):"00";
               sec=t.s?(t.s<10?"0"+t.s:t.s):"00";
               _this.text(day+hour+"时"+min+"分"+sec+"秒");
               if(reminds==599&&$status_btn.text()=='开抢提醒')
               {
                  $status_btn.html('<i class=\'clock\'></i>即将开始').off('tap');
                  $status_btn.removeClass('remind_btn').addClass('reminded_btn');
               }
               reminds--;
        })
        .onTimeOver(function(){
            window.location.reload();   
        }); 
    });
    $('.etime').each(function(){
        var _this = $(this),
        day="",hour="",min="",sec="";
        
        timedown.down(this, _this.attr('etime') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
        .onAction(function(){
           var t = arguments[2];
           day=t.d&&t.d!=0? (t.d<10 ? "0"+t.d+"天" : t.d +"天"):"";
           hour=t.h?(t.h<10?"0"+t.h:t.h):"00";
           min=t.i?(t.i<10?"0"+t.i:t.i):"00";
           sec=t.s?(t.s<10?"0"+t.s:t.s):"00";
           _this.text(day+hour+":"+min+":"+sec);
        }).onTimeOver(function(){ 
            _this.parent('.rushtip').text('活动已结束');

        }); 
    });

    function joinurl(protocol,param , isosapp , r ,wapHref)
    {
        if (!protocol || !param) return false
        if (!isosapp) return wapHref || '###noapp'
        if (r) param.r = r
        var link = 'meilishuo'
        link += '://'+ protocol +'.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param))
        return link 
    }
    function alertMsg(data,id)
    {
        var tpl = shareTmp(id, data);
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});        
            $('#maskLayer,.l_btn').on('tap' , function(e){
                e.preventDefault();
                var timer=setTimeout(function(){
                    $('.closeDialog').trigger('tap'); 
                    clearTimeout(timer);
                },400)
                     
            });            
    }
})