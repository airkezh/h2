fml.define('wap/page/activity/special_new' , ['wap/zepto' ,'wap/zepto/touch','wap/app/doota/timedown','wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){   
    window.timedown = require('timedown');
    var shareTmp = require('wap/component/shareTmp');
    fml.vars.joinurl=joinurl;
    /*判断已设置提醒*/
    fml.vars.isexit=function(tids,val){
    for(var item in tids){
        if(tids[item] == val)
           return true;
       }
    return false;
   };
    /*初始化时当前时间对应的秒杀tab*/
    getspeciallist(2,'zd_info',$('.rushtab .current').attr('hour'));
    $('.rushtab li').on('tap',function(){
        $(this).addClass('current').siblings('li').removeClass('current');       
        var type=$(this).attr('type');
        var _type=type=='today'? 2 : 1;
        var _hour=$(this).attr('hour');
        var _id=type=='today'?'zd_info':'yg_info';
    	getspeciallist(_type,_id,_hour);
        $('#'+type).show().siblings().hide();
    })
    
    /*活动规则弹窗*/
    var _adesc=$('.a_desc');
    _adesc.on('click',function(){
         alertMsg({},'ruleMsg');
    })

    /* 获取tab对应宝贝*/
    function getspeciallist(type,id,hour)
    {
        var data={};
        data.event_id=fml.vars.event_id;
        data.type=type;
        if(hour!='none')data.time=hour;
        $.get('/aj/tuan/qiang8_list?', data, 
            function(res){ 
                var list = {'item' : res.qiang8_info.goods_list||res.qiang8_info.segments};
                $('#content_box').html(shareTmp(id , list)); 
                setTimeout(function(){
                    if(!$('#content_box').html().length){getspeciallist(type,id,hour);return;}
                },1000)
                $('.good_box .time').each(function(){ 
                    var _this = $(this),
                    $status_btn=_this.parents('.good_box').find('.status_btn'),
                    reminds=parseInt(_this.attr('time'))*10;  
                    timedown.down(this, _this.attr('time') ,'0h-0i-0s-0e',['<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒','<b>%v</b>'])
                    .onTimeOver(function(){ 
                        window.location.reload();
                    })
                    .correct()
                    .onAction(function(){
                        var t = arguments[2];
                        day=t.d&&t.d!=0? (t.d<10 ? "0"+t.d+"天" : t.d +"天"):"";
                        hour=t.h?(t.h<10?"0"+t.h:t.h):"00";
                        min=t.i?(t.i<10?"0"+t.i:t.i):"00";
                        sec=t.s?(t.s<10?"0"+t.s:t.s):"00";
                        ms=t.e;
                        _this.text(day+hour+"时"+min+"分"+sec+"秒"+ms);
                       if(reminds==5999&&$status_btn.text()=='开抢提醒')
                       {
                          $status_btn.html('<i class=\'clock\'></i>即将开始').off('tap');
                          $status_btn.removeClass('remind_btn').addClass('reminded_btn');
                       }
                       reminds--;
                    }).setHeartHum(100); 
                });  
                 
                /*已抢光/已结束提示*/
                $('.empty_btn,.over_btn').on('tap',function(e){        
                    var $probox=$(this).parents('.good_box');  
                    alertMsgFn('宝贝太抢手了下次早点来哦！',$probox.attr('twid'),$probox.attr('shopid'),$(this).attr('strtype')=='2'?'去店铺看看':'领取优惠券');                          
                })

                /*开抢提醒*/
                $('.good_box .remind_btn').on('tap',function(e,type){
                    var $this=$(this);
                    var $probox=$this.parents('.good_box');
                    //,'access_token':'6ad1c635cb5301b84dbc1bcb8b420d51'
                    var _time=$probox.attr('stime').replace(/-/g,'/'),
                    param=type=='all'?'?remine_type=1':'';
                    $.get('/aj/tuan/remind_set'+param, {'pushtime':(new Date(_time).getTime()/1000).toString(),
                        'actidfor8':fml.vars.event_id,'twitter_id': $probox.attr('twid')}, function(res){
                        if(res.code=='10000'){
                            $this.html('<i class=\'clock\'></i>已设提醒').off('tap');
                            $this.removeClass('remind_btn').addClass('reminded_btn');
                        }
                        else{
                            var error='设置提醒失败'; 
                            // if(issuccess)
                            // {  
                            //issuccess=false;}
                            alertMsg({msg:error},'errorMsg');
                        }
                    } , 'json');
                })    
            } , 'json');
    }

    var alertMsgFn = function(msg,twitter_id,shop_id,btn_str){
        var detail_url=joinurl('twitter_single', {'twitter_info' : {'twitter_id' : twitter_id, 'is_doota' : 1}}, fml.vars._os, fml.vars._r, '/share/item/'+twitter_id);
        var param = {"r":fml.vars._r,"shop_id": shop_id};
        var shop_url= 'meilishuo://shop.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param));
        var data = {msg:msg,shop_url:shop_url,detail_url:detail_url,btn_str:btn_str};
        alertMsg(data,'alertMsg');
    }

    function joinurl(protocol,param , isosapp , r ,wapHref)
    {
        if (!protocol || !param) return false
        if (!isosapp) return wapHref || '###noapp'
        if (r) param.r = r
        var link = 'meilishuo'
        link += '://'+ protocol +'.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param))
        return link 
    }

    /*弹窗*/
    function alertMsg(data,id)
    {
        _adesc.removeClass('movelr');
        var tpl = shareTmp(id, data);        
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});        
            $('#maskLayer,.rbclose').on('touchstart touchend', function(event){
                event.preventDefault();
            }).on('tap' , function(e){
                $('.closeDialog').trigger('tap'); 
                _adesc.addClass('movelr');                     
        });            
    }

})