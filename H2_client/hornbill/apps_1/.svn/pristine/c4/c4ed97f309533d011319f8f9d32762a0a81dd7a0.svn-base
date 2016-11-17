/*common*/
var timedown = require('app/doota/timedown'),
    shareTmp = require('component/shareTmp'),
    scroll = require('component/windowScroll'),
    parent = $('.s_container'),
    sub = $('.s_roll'),
    hid = $('#hid'),
    scrolllen = sub.children().length > 0 ? sub.find('li:eq(0)').width() : 0; 
    
    /**初始化整点抢里的数据**/
    if(hid && hid.attr('currentdate') != ''){
        var currentp = parseInt(hid.attr('currentp'));
        if(currentp + 1==sub.children().length){
            var $li = sub.find('li').not(':last').remove();
            sub.append($li);
        }else{
            sub.css('left',-1*parseInt(hid.attr('currentp'))*scrolllen+"px");
        }
        getrushlist(hid.attr('currentdate'),hid.attr('currenthour'));

        $('.scroll_r').click(function(){
        var positionl = sub.length > 0 ? sub.position().left:0;   
        scrollright(parent,sub,positionl,scrolllen);
        })
        $('.scroll_l').click(function(){
            var positionl = sub.length > 0 ? sub.position().left:0;   
            scrollleft(parent,sub,positionl,scrolllen);
        })
        $('.s_container i').click(function(){
            _this = $(this);
            parent.find('i').removeClass('t_redbtn');
            _this.addClass('t_redbtn');
            getrushlist(_this.attr('date'),_this.attr('hour'));                     
        })
    }


if($('.f_container').length){

    /*二级导航*/

    var subNav = $('.nav_tabs'),
    subOrgParent = subNav.parent(),
    subHolder = $('#navbar .sec_nav'),
    titlist = $('.content .list_box'),
    nav = subNav,
    wheader = $('#navbar').find('.wheader,.sale_nav');
    var frstNavHeight = $('#navbar').find('.wheader').height();
    var y = subNav.offset().top - frstNavHeight;

    scroll.yIn(nav.offset().top, function() {
        subHolder.append(subNav)
        wheader.stop().animate({
            'margin-top': - frstNavHeight
        }, function() {
            if (subNav.parent().is(subHolder)) $(this).hide()
        })
    }, function() {
        
        subOrgParent.prepend(subNav)
        wheader.show().stop().animate({
            'margin-top': 0
        })
    })

/**滑动到相应分栏自动切换tab**/
    if(titlist.length) {
        titlist.toArray().reverse().forEach(function(data){
            var _this = $(data);
            scroll.yIn(_this.position().top - 300,function(){
                nav.find('[href="#' +_this.attr('id') + '"]').parent().addClass('curr')
                .siblings().removeClass('curr');           
            },
            function(){
                nav.find('[href="#' + _this.attr('id') + '"]').parent().prev().addClass('curr')
                .siblings().removeClass('curr');
            })
        })
        
    }   
}
var t_time = $('.countdown .t_time');
    timedown.down(this, t_time.attr('time')).onTimeOver(function(){
        window.location.reload();
    })
    .onAction(function(c){
        for(var item in c)
        {
           if(c[item]){
            $('#'+item+'1').html(timesplit(c[item]).charAt(0));
            $('#'+item+'2').html(timesplit(c[item]).charAt(1));                   }
        }  
           
    })                 
    
    function timesplit(num){
        return ( num <= 9  ? "0" + num : num).toString();
    }
    function scrollright(parent,sub,positionl,scrolllen)
    {
        sub.animate({left:positionl - scrolllen + "px"},function(){
                var $li = sub.find('li:eq(0)').clone(true);
                sub.find('li:eq(0)').remove();
                sub.css('left','0px').append($li);            
        });
    }
    function scrollleft(parent,sub,positionl,scrolllen)
    {
        if(positionl == 0){
        var $li = sub.find('li').not(':eq(0)').clone(true);
        sub.find('li').not(':eq(0)').remove().end().end().prepend($li) 
        .css('left',-1*scrolllen*(sub.find('li').length-1) + 'px');   
        }     
        sub.animate({left:sub.position().left+scrolllen+"px"});
    }
    function getrushlist(date,hour)
    {
        $.get('/aj/tuan/rushlist?', {'event_id' : fml.vars.event_id,'type':'1','zd_date':date,'zd_time':hour}, function(res){
            var list = {'item' : res.zhengdianqiang};
                $('.rushbuy_box').html(shareTmp('rushinfo' , list)); 
                var timer = setInterval(function(){
                    if($('.oclockbuy .rushbuy_box').find('.time')){
                         $('.time').each(
                            function($_this){
                                var _this = $(this);
                                _this.removeClass('time');
                                timedown.down(this, _this.attr('time'), 'd-0h-0i-0s-e',['<b>%v</b>天','<b>%v</b>小时','<b>%v</b>分','<b>%v</b>秒','<b>%v</b>']).onTimeOver(function(){
                                    _this.parents('span').html('');
                                }).setHeartHum(100);
                            })
                    clearInterval(timer); 
                }
            },1000);           
        } , 'json');
    }
    $('.fix_nav,.nav_tabs').find('ul').on('click', 'li a', function(event) {
        event.preventDefault();
        var id = $(this).attr('href').replace(/\?[\w\W]*#/g,'#');
        var h_tip = id != '#pgtop' ? 45 : 270 ;
        $(this).parent('li').addClass('curr').siblings().removeClass('curr');
        $('html,body').animate({'scrollTop':$(id).offset().top - h_tip}, 200);
    });