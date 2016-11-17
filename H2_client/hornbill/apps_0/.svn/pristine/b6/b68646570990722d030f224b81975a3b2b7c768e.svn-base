/*common*/

var $ = require('wap/zepto')
	,check = require('circle/app/checkLogin')
    ,tracking = require('wap/app/tracking')
	,openAppLink = require('wap/app/openAppLink')

var likeInfo = $('.likeInfo')
	,likeHeart = $('.likeHeart')
	,likeNum = $('.likeNum')
	,attention = $('.attention')
	,goAttention = $('.goAttention')
	,cancelAttention = $('.cancelAttention')
	,area  = $('.area')
var len = $('.goods').length

window.MLS = {
    didLogin : function(){  
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}
function login(func){
	if( !check() ){
		return;
	}
}
//关注
if(fml.vars.followed==1){
	// $('.attention').html('已关注')
	$('.cancelAttention').show();
	$('goAttention').hide();
}

var cdata = {
	'fuid' : fml.vars.uid
};

function change(){
	$(".note").hide()
}
$('.goAttention').one( 'click' , attentionFn )
function attentionFn(){
	if(!check()){ //没登陆跳登录页
		return;
	}else{
		$.post('/aj/superMaster/attentioned', cdata, function(res){
			$(".note").html("关注成功").show();
			setTimeout(change,3000);
			cancelAttention.show();
			goAttention.hide();
			tracking.cr( 'activity', {
				'action' : 'click'
				,'_page_code' : 'activity_superMaster_index'
				,'_page_area' : 'attention'
				,'_ext' : 'fuid='+fml.vars.uid+':auid='+fml.vars.user_id
				,'activity_id' : fml.vars.testId
			} )
			$('.goAttention').one( 'click' , attentionFn )
		},'json')
	}
}
$('.cancelAttention').one( 'click' , cancelAttenFn )

function cancelAttenFn(){
	if(!check()){ //没登陆跳登录页
		return;
	}else{
		$.post('/aj/superMaster/cancel' , cdata , function(res){
			$(".note").html("取消关注成功").show();
			setTimeout(change,3000);
			cancelAttention.hide();
			goAttention.show();
			tracking.cr( 'activity', {
				'action' : 'click'
				,'_page_code' : 'activity_superMaster_index'
				,'_page_area' : 'cancelAttention'
				,'_ext' : 'fuid='+fml.vars.uid+':auid='+fml.vars.user_id
				,'activity_id' : fml.vars.testId
			} )
			$('.cancelAttention').one( 'click' , cancelAttenFn )
		},'json')
	}

}
//喜欢
$('.likeHeart').one( 'click' , likeFn )
function likeFn(){
	var data = {
		'stid' : $(this).data('tid')
	};
	var tag = $(this);
	var index = $(this).parent().parent().index()
	var tid = $(this).data('tid')
	var like = $(this).data('islike');
	var likeNum = $(this).children()
	var num = parseInt(likeNum.html())
	if(!check()){ //没登陆跳登录页
		return;
	}else{
		$.post('/aj/superMaster/like',data,function(res){
			if( !tag.hasClass('redHeart') ){
				//变红心
				tag.addClass('redHeart');
				tag.css('background-image' , 'url("http://d04.res.meilishuo.net/pic/_o/13/7d/951efe2d4dcdbcae36303ef01f65_23_19.ch.png")')
				likeNum.html(num+1)
				tracking.cr( 'activity', { 
					'action' : 'click'
					,'_page_code' : 'activity_superMaster_index'
					,'_page_area' : 'like'
					,'_pos_name' : tid
					,'_pos_id' : index
					,'activity_id' : fml.vars.testId
				} )

			}else{
				//变灰心
				tag.removeClass('redHeart')
				tag.css('background-image' , 'url("http://d03.res.meilishuo.net/pic/_o/64/79/3555a4d072d9bfcccb35916e7bc5_27_25.cf.png")')
				likeNum.html(num-1)
				tracking.cr( 'activity', { 
					'action' : 'click'
					,'_page_code' : 'activity_superMaster_index'
					,'_page_area' : 'unlike'
					,'_pos_name' : tid
					,'_pos_id' : index
					,'activity_id' : fml.vars.testId
				})
			}
			$('.likeHeart').one( 'click' , likeFn )
		},'json')
	}
}

/*获取单品页链接*/
function getDoneUrl(ele) {
	var twitter_id = parseInt(ele.data('tid'));
	var index = ele.parent().index()
	var	Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id;
	window.location.href = window.__get_r( Url , $('.goods').data('xr')+':_page_code=activity_superMaster_index:pos_name='+twitter_id + ':pos_id='+index + ':activity_id=' + fml.vars.testId);
}
area.on( 'click' , function(){
	getDoneUrl($(this))
})
//点我建群链接
$('.creat').on( 'click' , function(){
	if(!check()){ //没登陆跳登录页
		return;
	}else{
		window.location.href = window.__get_r( 'meilishuo://create_circle.meilishuo?json_params='+ encodeURIComponent( JSON.stringify( {r : fml.vars.r} )) , $(this).data('xr')+':_page_code=activity_superMaster_index:activity_id=' + fml.vars.testId );
	}
})
