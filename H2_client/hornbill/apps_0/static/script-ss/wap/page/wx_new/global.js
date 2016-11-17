/*common*/

/* 微信分享 */

// fml.vars.share = 'true' or '0'
if( !(fml.vars.share == 0) ){
	var signWX = require( 'wx/sign' );
    var shareWX = require( 'wx/share' );
   
    var txt = '专属达人挑款师带你开启美丽说时尚之旅！加入我们，发现流行，占有世界！';
	var shareD = {
			'title' : '美丽说 ' + txt
		    ,'desc': txt
		    ,'link': window.location.href
		    ,'imgUrl' : 'http://d04.res.meilishuo.net/pic/_o/e1/57/23da17ce0853a6b5589a1492ce34_200_200.cf.png'
	};

	if(fml.vars.shareData){
		$.extend( shareD , fml.vars.shareData );
	}

	signWX( function(){
		$(window).trigger('wx-sign-over');
	} );
	// signWX();

	shareWX.bind( shareD );
	
	// alert(JSON.stringify(shareD) )	
};


