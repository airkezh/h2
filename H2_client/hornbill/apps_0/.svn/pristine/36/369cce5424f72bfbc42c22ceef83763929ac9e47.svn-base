/*common*/
require( 'wap/zepto/fastclick' )

var btnDown = $( '.download' )
	,sendBtn = $( '.send_btn' )
	,applyBtn = $( '.apply_btn' )
	,timeGap = 60
	,openApp = require( 'wap/app/openApp' )
	,normalColor = fml.vars.normal_color
	,disableColor = fml.vars.disable_color
	,OpenApp     = require( 'wap/app/openAppCustom' )
	,Alert           = require( 'wap/ui/alert' )

/* 弹窗 */
var newAlert = function( param ) {
    new Alert( {
        'content': param,
        'onSure' : function() {
        }
    } );
};

/* 发送手机号，获取短信验证码 */
function getVerityCode( cbk ) {
		var phoneNum = $( '.phonenum' ).val().trim();
		if( phoneNum != '' ){
			$.ajax({
				url: '/aj/redpacket/getCode',
				type: 'POST',
				data: {
					mobile: phoneNum
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

/*收集手机号和验证码，发送到后台*/
function goAndGet() {
	var phoneNum = $( '.phonenum' ).val().trim();
	var verityCode = $( '.code' ).val();
	if( phoneNum !='' && verityCode != '' ){
		$.ajax({
			url: '/aj/redpacket/getPaper',
			type: 'POST',
			dataType: 'json',
			data: {
				'mobile': phoneNum,
				'code': verityCode,
				'cid': fml.vars.paper_id
			},
			success: function( data ) {
				if(data.error_code != 0){
					newAlert( data.message );
				}else {
					showResult( data.data );
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

/* 展示申请结果（ 返回数据对应的结果图片 ），隐藏前一页（申请页）*/
function showResult( data ) {

	if ( data.success == 0 && data.state == 'not_start' ){
		newAlert( '活动还未开始!' );
		return;
	}

	if( data.state == 'empty'){
		newAlert( '今日已领完，明天0点再来吧' );
		return;
	}

	if( data.state == 'applied' ){
		showMsg( 'applied' );
	}else if( data.success == 1 ) {
		showMsg( 'success' );
	}

	if( data.success == 1 || data.state == 'applied') {
		$( '.richbag' ).show();   //显示有金币的钱袋
	}else {
		$( '.nonebag' ).show();   //显示没金币的钱袋
		if( data.state == 'end'){
			$( '.note' ).hide();
		}
	}

	$('.before').hide();
	$('.after').show();
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

// start
;
(function() {
	//点击发送验证按钮，发送短信验证码到手机，每60秒重新发送一次
	sendBtn.on( 'click', function() {
		var $timeBox = $( '.send_btn' );
		var cbk = function(){
			$timeBox.css( {'background':disableColor,'border':'1px solid'+disableColor } );
			$timeBox.unbind('click').html('重发(<b>' + timeGap + '</b>)');
			var $time = $timeBox.find('b');
			timeDown($time.text() ,function(times){
		   		if(!times){
		   			$timeBox.css( {'background':normalColor,'border':'1px solid'+normalColor } );
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
	})
 
	applyBtn.on( 'click', function() {
		goAndGet();
	})

	//app
	btnDown.on( 'click', function() {
	    OpenApp.check( function( isInstall ) {
	        if ( isInstall ) {
	            OpenApp.jump( 'meilishuo://open.meilishuo' )
	        } else {
	            location.href = '/download/latest'
	        }
	    })
	} )

}())