function amazingTest(){
	return this;
}
var controlFns = {
	maleGod : function(){
		var php = {
            'connect_weixin': '/connect/weixin?type=1'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            if(data.os.weixinBrowser) connectWX(this, data);
        	data.onlyShowGoTop = false;
        	data.use_rem_screen = true
            data.pageTitle     = '男神约不约'
            data._CSSLinks     = [ 'activity/maleGod' ]
            this.render( 'activity/maleGod.html', data )
        } )
	},
    styleTest : function(){
        var php = {
            'connect_weixin': '/connect/weixin?type=1'
            ,'question': '/customactivity/CustomActivity_common_tool_single?id=style_test_new'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            if(data.os.weixinBrowser) connectWX(this, data);
            data.onlyShowGoTop = false;
            data.use_rem_screen = true
            data.pageTitle     = '美丽说风格测试'
            data._CSSLinks     = [ 'activity/amazingTest/styleTest' ]
            this.render( 'activity/amazingTest/styleTest.html', data )
        } )
    },
    styleResult : function(){
        var answer = this.req.__get.answer || '';
        var from_uid = this.req.__get.from_uid || '';
        var php_result;
        var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
        if ( !answer && !from_uid ){
            this.redirectTo('/activity/amazingTest/styleTest/');
        }
        if( weixinBrowser && from_uid ) {
            php_result = '/CustomActivity/CustomActivity_transfer_answer?from_uid='+ from_uid;
        } else {
            php_result = '/CustomActivity/CustomActivity_transfer_test?answer='+answer;
        }
        var php = {
            'test_result' : php_result
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.answer = answer;
            data.from_uid = from_uid;
            data.onlyShowGoTop = false;
            data.use_rem_screen = true
            data.pageTitle     = '美丽说风格测试'
            data._CSSLinks     = [ 'activity/amazingTest/styleResult' ]
            this.render( 'activity/amazingTest/styleResult.html', data )
        } )
    }
};

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
}
exports.__create = controller.__create(amazingTest , controlFns);
