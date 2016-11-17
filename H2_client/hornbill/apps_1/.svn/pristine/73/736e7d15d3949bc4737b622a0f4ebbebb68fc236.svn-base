/*common*/
/**
 * @page h5 建群页
 * @author weijingdu@meilishuo.com
 * @date 2015-05-13
 * @todo 页面功能模仿native建群页
 */
require( 'circle/zepto/touch1' );
var $ 			= require( 'circle/zepto' ),
	win 		= window,
	$form       = $( '.circle-form' ),
    $btn        = $( '#submit' ),
	$tip 		= $( '.tip' ),
	$fields     = $( '.item .js-ipt' ),
	$required   = $( '.js-required'),
	$pri		= $( '#private' ),
	$desc       = $( '#desc' ),
	source      = document.referrer,
    paramR      = fml.vars.paramR,
    mlsApp      =fml.vars.mlsApp,
	c;

/**
 * 检查需要填写的内容是否均被填写完毕
 */
function checkRequired() {
    var isOK = 2 ;
    var arr = [ '群名称不能为空','群简介不能为空','创建成功'];
    var a = 'mymove 3s';
    $required.each( function( i, v ) {
        if ( !v.value && isOK == 2 ) {
            isOK = i;
        }
    })
    if(isOK != 2){
    	$tip.text(arr[isOK]);
	   	$tip.addClass('animate');
	   	c = setTimeout(function () {
	   		$tip.removeClass('animate');
	   	},2000);
        return false;
    }else{
   		return true;
   	}
}
/**
 * 获得前一页的参数
 */
function getArgs (source) {
   var Args = {};
   var qs = source.indexOf('?')>0 ? source.substring(source.indexOf('?')+1) : '';
   var items = qs.split('&');
   for(var i = 0;i<items.length;i++){
        var item = items[i].split('=');
        Args[item[0]] = item[1];
   } 
   return Args;
}


;(function () {	
    if(Meilishuo.config.user_id === 0){
        if(mlsApp == false){
            win.location.href = "http://m.meilishuo.com/user/login";
        }else{
            win.location.href = 'meilishuo://login.meilishuo';
        }     
    }else{

    }
    // 防止重新进行ajax
	var isLoading = false;

    //按钮切换样式
	$pri.on('touchstart',function () {		
		$(this).toggleClass('green');
	})

	$btn.on('touchstart',function () {
		clearTimeout(c);
		if(checkRequired() && !isLoading){
			isLoading = true;
		    var data = {};
            var Args = getArgs(source);
            data.source = Args['id'] ? Args['id'] : "";
		    $fields.each(function() {
		        data[ this.id ] = this.value
		    })
		    if($('.green').length){
		    	data['private'] = 1;
		    }else{
		    	data['private'] = 0;
		    }

		    // ajax提交数据
		    $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/aw/create_group/create',
                data: data,
                success: function( resp ) {
                    isLoading = false;
                    var data = resp.data;
                    $tip.text(resp.message);
                    $tip.addClass('animate');
                    c = setTimeout(function () {
                        $tip.removeClass('animate');
                    },1500);
                    if ( resp.error_code == 0 ){  
                        if( mlsApp == false){
                            win.location.href = "http://circle.meilishuo.com/circle/chat?circle_id="+encodeURIComponent(data.id);
                        }else{
                            win.location.href = 'meilishuo://circle.meilishuo?json_params='+encodeURIComponent(JSON.stringify({"circle_id" : data.id,"r": paramR}));
                        }
                    }

                }
            })
        }
    })

}())