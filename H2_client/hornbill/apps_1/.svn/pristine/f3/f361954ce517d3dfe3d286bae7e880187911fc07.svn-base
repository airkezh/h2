/*common*/

var WaterFall = require( 'circle/component/waterfall' );

var postUrl = '/aj/wx_new/user_c'
	,dataName = 'data'
	,colNum = 2
if(fml.vars.args_type == 'attention'){
	postUrl = '/aj/wx_new/q_class' 
	dataName ='tInfo'
	colNum = 1
}

var waterFallInstance = WaterFall.init({
	el: '.goods-wall',
	url: postUrl,
	dataName: dataName,
	colNum: colNum,
	colGap : 0,
	onFetchStart: function(wf){
		wf.data.offset = wf.data.frame*10;
		// wf.data.limit = 10;
		wf.data.user_id = Meilishuo.vars.wx_user_id;
		show_loading();
	},
	onFetchSuccess: function(data){
		if(data.length === 0){
			this.lock();
		}
	},
	onFetchFinished: function(data){
		hide_loading();
	}
}).start()
function show_loading(){
	$('#loading').show();
}
function hide_loading(){
	var _length = $('.goods-wall div').length;
	if (!_length) {
		var str = '';
		if (fml.vars._type == 0) {
			str = '<div class="place-text">美丽说 | 寻找时尚同好</div>';
		}else{
			str = '<div class="place-text">快去首页关注你喜欢的达人吧！</div>';
		}
		$('.goods-wall').html(str);
	}
	$('#loading').hide();
}
$('.follow-btn').on('click', function(){
	var _this = $(this);
	$.post('/aw/user/follow', {'fuid' : fml.vars.cuid}, function(res){
		res = JSON.parse(res);
		if(res.code == 0){
			_this.html('已关注').removeClass('follow-btn').addClass('follow-btn-ok');
		}
	});
});