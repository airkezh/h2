/*common*/
var timedown = require('app/doota/timedown');
function getClock( opts ){
        var end_time = opts.endTime || ''
            , s_time = opts.startTime || ''
            , start_time,tips,countdown_text,countdown_time;
        cur_time = new Date().getTime();
        start_time = new Date(s_time);
        end_time = new Date(end_time);
        if( cur_time < start_time ){
            tips = "nostart";
            countdown_text = opts.noStartText || '距离活动开始';
            countdown_time = start_time;
        }else if(cur_time >= start_time && cur_time <= end_time){
            tips = "ing";
            countdown_text = opts.startText || '距离活动结束';
            countdown_time = end_time;
        }else{ 
            tips = "end";
            countdown_text = opts.endText || '活动已结束';
        }
        if(tips != "end"){
            $(".clock").find("em").html(countdown_text);
            $(".time").attr("time", new Date(countdown_time).getTime()/1000 - new Date().getTime() / 1000)
        }else{
            $(".clock").html(countdown_text).css("text-align","center");
        }
        $('.time').each(function(){
            var _this = $(this);
            _this.removeClass('time');
            timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
            .onAction(function() {
                var t = arguments[2];
                day = t.d && t.d != 0 ? (t.d < 10 ? "0" + t.d : t.d) : "00";
                hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
                min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
                sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
                _this.html("<b>" + day + "</b>" + "天" + "<b>"+ hour +"</b>" + "时" + "<b>" + min + "</b>" + "分" + "<b>" + sec + "</b>" + "秒");
            }).onTimeOver(function(){
                window.location.reload();
            });
        });
    }

getClock({
    "noStartText" : "联合巨献 距抄底价开始还有"
    , "startText" : "联合巨献 距抄底价结束还有"
    , "endText" : "活动已结束"
    , "startTime" : "2015/06/27 00:00:00"
    , "endTime" : "2015/06/30 23:59:59"
});