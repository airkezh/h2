/*common*/

var $ = require( 'wap/zepto/touch' )
	,followUser = require( 'wap/app/followUser' )
	,allClicked = false
	,$finishBtn = $( '.js-finish' )
	,$alert = $( '.js-alert' )
	,followNum = 0
	,canFinish = false
	,configSingle = {
		el: '.js-focus',
        followClass: 'done',
        unfollowClass: 'ready',
        unfollow: '取消关注',
        follow: '关注',
        events: {
        		'afterFollow': function(c) {
                    followNum ++ ;
                },
                'afterUnfollow': function(c) {
                	followNum --;
                }
            }
	};


(function init() {
	followUser.follow( configSingle );
	$( '.js-round-btn' ).on( 'tap', function() {
		var _this = $( this );
		if ( !allClicked ) {	
			_this.addClass( 'choosed' );
			allClicked = true;
		} else {
			_this.removeClass( 'choosed' );
			allClicked = false;
		}
	});

	$finishBtn.on( 'tap', function( e ) {
		if ( allClicked ) {
			followUser.followAll ( $( '.js-focus'), e );
		} else {
			if( followNum ){
				finish();
			} else {
				$alert.show();
				setTimeout(function(){
					$alert.hide();
				},1000);
			}
		}
	});
	
	$(document).on( 'allSuccess', function() {
		finish();
	});

}())

function finish() {
	$finishBtn.html( '提交中..' );
	setTimeout( function () {
		$finishBtn.html( '成功' );
		window.location.href = 'meilishuo://close.meilishuo/';
	}, 500 );
}
