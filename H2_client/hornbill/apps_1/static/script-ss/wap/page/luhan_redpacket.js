/*common*/
require( 'wap/zepto/fastclick' )
var tracking = require( 'wap/app/tracking' ) //埋点
	,openApp = require( 'wap/app/openApp' )
	,WXShare = require('wx/share')
   	,WXSign = require('wx/sign')
   	,Alert = require('wap/ui/alert');

var btnDown = $( '.download_btn' )
	,sendBtn = $( '.send_btn' )
	,applyBtn = $( '.apply_btn' )
	,shareBtn = $( '.share_btn' )
	,beforePage = $( '.before' )
	,afterPage = $( '.after' )
	,timeGap = 60
	,normalColor = '#fd7251'
	,disableColor = '#ccc'
	,luhan_status = fml.vars.luhan_status
	,mobile_result = $( '.result' )
	,mobile = $('.mobile')
	,shareMask = $( '.share_mask' )
	,activityId = 12501;  //鹿晗活动id，也是优惠券配置的id


/* 弹窗 */
var newAlert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){
		}
	});
};

/* 判断该用户是否已经领过优惠券(0没领过，1领过)，领过的话要显示后一页 */
function checkApplied() {
	if( luhan_status == 1 ){
		afterPage.show();
		mobile_result.hide(); //因为这个接口没返回电话号码，所以这里暂时隐藏电话号！
		newAlert( '您已领取过优惠券~' );
	}
}

/* 显示引导分享弹层 */
function maskShow() {
	shareMask.show();
}

/* 发送手机号，获取短信验证码 */
function getVerityCode( cbk ) {
		var phoneNum = $( '.phonenum' ).val().trim();
		if( phoneNum != '' ){
			$.ajax({
				url: '/aj/redpacket/newGetCode',
				type: 'GET',
				data: {
					'activity_id' : activityId,
					'mobile': phoneNum
				},
				dataType: 'json',
				success: function( data ) {
					if(data.error_code != 0){
						newAlert( data.message );
					}else {
						cbk();
					}
				},
				error: function() {
					newAlert("系统繁忙，请稍后再试");
				}	
			})
		}else{
			newAlert( '请输入手机号' );
		}
}

/* 收集手机号和验证码，发送到后台 */
function goAndGet() {
	var phoneNum = $( '.phonenum' ).val().trim();
	var verityCode = $( '.code' ).val();
	if( phoneNum !='' && verityCode != '' ){
		$.ajax({
			url: '/aj/redpacket/newGetPaper',
			type: 'GET',
			dataType: 'json',
			data: {
				'mobile': phoneNum,
				'code': verityCode,
				'activity_id': activityId
			},
			success: function( data ) {
				if(data.error_code != 0){
					newAlert( data.message );
				}else {
					showResult( data );
				}
			},
			error: function() {
				newAlert("系统繁忙，请稍后再试");
			}	
		})
	}else {
		newAlert("请填写完整信息");
	}
}

/* 展示结果，隐藏前一页（申请页）*/
function showResult( res ) {
	var data = res.data;
	if ( ( data.success == 0 && data.state == 'applied') || data.success == 1){
		beforePage.hide();
		afterPage.show();
		mobile.html( data.mobile );
		if( data.state && data.state == 'applied' ){
			newAlert( '您已领取过优惠券~' );
		}
	}else {
		newAlert( res.message );
	}
} 

/* 显示信息对应字的图片 */
function showMsg( msg ) {
	$( '.' + msg ).show();
}

/* 倒计时 */
function timeDown( times, cbk ) {
	window.setTimeout( function(){
			if( !times ){
				return;
			}
			else {
				times--;
				cbk( times );
				timeDown( times, cbk );
			}
		},1000 );
}

/* 发送短信的按钮倒计时状态 */
function btnTimeDown() {
	var $timeBox = $( '.send_btn' );
		var cbk = function(){
			$timeBox.css( {'background': disableColor, 'border-color': disableColor });
			$timeBox.unbind('click').html('重发(<b>' + timeGap + '</b>)');
			var $time = $timeBox.find('b');
			timeDown($time.text() ,function(times){
		   		if(!times){
		   			$timeBox.css( {'background': normalColor, 'border-color': normalColor } );
		   			$timeBox.html( '重新发送' ).bind( 'click', function( e ) {	
		   				getVerityCode( cbk );
		   			});
				}
				else {
					$time.text( times );
				}
			});
		}
		getVerityCode( cbk );
} 

// start
;
(function() {
	checkApplied();
	//点击‘发送验证’按钮，发送短信验证码到手机，每60秒重新发送一次
	sendBtn.on( 'click', btnTimeDown );

 	//点击‘立即领取按钮’，完成领取优惠券
	applyBtn.on( 'click', goAndGet );

	//app
	btnDown.on('click', function() {
    	openApp( 'meilishuo://open.meilishuo' );
    	//埋点
    	tracking.cr('luhan_kiss_act',{
    		'action' : 'click',
    		'page' : 'game_end_page',
    		'area' : 'download'
    	})
	})

	//点击‘告诉朋友们来亲鹿晗’按钮，弹出分享引导蒙层
	shareBtn.on( 'click', maskShow );

	//点击蒙层，蒙层消失
	shareMask.on( 'click', function(){
		shareMask.hide();
	})

	 
    //设置微信二次分享
    if(Meilishuo.config.os.weixinBrowser){
    	WXSign();
	    var shareData = {
	        'desc': '哈哈！我亲了鹿晗！这件事要昭告天下！！鹿晗要一个爱的鼓励，这种事情怎么能忘记告诉你',
	        'imgUrl': 'http://d05.res.meilishuo.net/pic/_o/15/40/02c43b87ba766291b6283a79e674_200_289.cg.jpg',
	        'title': '我居然亲了鹿晗了！告诉大家来拉仇恨！',
	        'link': 'http://m.meilishuo.com/luhan/kiss/'
	    };
	    WXShare.bind(shareData);
	}

}())