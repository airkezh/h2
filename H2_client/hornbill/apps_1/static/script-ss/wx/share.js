/*common*/
var events = {
	'Timeline':'onMenuShareTimeline'
	,'AppMessage':'onMenuShareAppMessage'
	,'QQ':'onMenuShareQQ'
	,'Weibo':'onMenuShareWeibo'
} 

var defs = {
	title : document.title
	, link : window.location.href
	, desc : ''
	, imgUrl : 'http://i.meilishuo.net/css/images/wap/web/apple-touch-icon-72x72-precomposed-touch.png'
    /*
	, trigger : function(res){} //用户点击分享到朋友圈
	, success : function(res){} //已分享
	, cancel : function(res){} //已取消
	, fail : function(res){}
    */
}

function set(eventName, opts){
//	wx[name]($.extend({}, defs, opts))
   // console.log(arguments)

    var name = events[eventName]

	wx[name]({
        title : opts.title || defs.title    
        , link : opts.link || defs.link
        , desc : opts.desc || defs.desc
        , imgUrl : opts.imgUrl || defs.imgUrl
        , trigger : function(res){
            opts.trigger && opts.trigger(res, name, eventName)
        }
        , success: function(res){
            opts.success && opts.success(res, name, eventName)
        }
        , cancel : function(res){
            opts.cancel && opts.cancel(res, name, eventName)
        }
        , fail : function(res){
            opts.fail && opts.fail(res, name, eventName)
        }
    })

}

function change(opts){
	for(var eventName in events){
		set(eventName, opts)
	}
}

exports.bind = function(opts){
	wx.ready(function () {
		change(opts)
	})
}
exports.change = change

for(var eventName in events){
	exports['bind' + eventName] = function(opts){
		wx.ready(function(){
            set(eventName, opts)
		})
	}
	exports['change' + eventName] = function(opts){
        set(eventName, opts)
	}
}

