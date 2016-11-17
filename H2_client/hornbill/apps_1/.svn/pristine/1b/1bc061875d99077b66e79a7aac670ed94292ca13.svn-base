/*common*/

var $ = require('wap/zepto');

var defConf = {
    scrollThresholdTime : 100,
    scrollThresholdVal : 100,
    firstRequest : true
}

var PENDING = 0;

function Waterfall(conf) {
    this.conf = $.extend(defConf,conf);
    this.init();
}

Waterfall.prototype = {
    init : function(){
        var that = this;
        this.pullCount = 0;
        this.listerEvents();
        if(this.conf.firstRequest){
            setTimeout(function(){
                that.drawUI();
            });
        }
    },
    reset: function(){
        PENDING =0;
        this.pullCount = 0;
    },
    on : function(evt,cb){
        $(this).on(evt,cb);
    },
    emit : function(evt){
        $(this).trigger(evt);
    },
    off : function(evt){
        $(this).off(evt);
    },
    listerEvents : function(){
        var that = this , $win = $(window) , $doc = $(document);
        $win.scroll(this.throttle(function(e){
            var ws = $win.scrollTop(),
                wh = $win.height(),
                dh = $doc.height();
            if(dh - (wh + ws) < that.conf.scrollThresholdVal){
                that.drawUI();
            }
        }));

        this.on('requestDataStart',function(){
             PENDING =  1;
             this.pullCount++;
        });

        this.on('requestDataEnd',function(){
             PENDING =  0;
        });
    },
    drawUI : function(){
        if(!PENDING){
            this.emit('requestDataStart');
        }
    },
    throttle: function(fun) {
        var t, ms = this.conf.scrollThresholdTime;
        return function() {
            var that = this,
                arg = arguments;
            clearTimeout(t), t = setTimeout(function() {
                fun.apply(that, arg)
            }, ms);
        }
    }
}

return Waterfall;






