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
	}
};

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
}
exports.__create = controller.__create(amazingTest , controlFns);
