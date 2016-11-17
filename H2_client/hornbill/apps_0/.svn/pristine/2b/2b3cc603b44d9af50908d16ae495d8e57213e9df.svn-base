function tearBrand(){
    return this;
}
var controlFns = {
    index : function(){
        var php = {
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.islogin = 0;
            if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
                data.islogin = 1;
            };
            data.pageTitle     = '撕名牌';
            data._CSSLinks     = [ 'activity/tearBrand' ];
            this.render( 'activity/tearBrand.html', data );
        } )
    }
};

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
}
exports.__create = controller.__create(tearBrand , controlFns);
