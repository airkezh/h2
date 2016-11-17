function sem() {
    return this;
}
var controlFns   = {
    index: function() {
        var php     = {'apks' : '/url/Package_get'},
            ua      = this.req.headers[ 'user-agent' ],
            wapMod  = base.loadModel( 'wap/tools.js' ),
            channel = wapMod.getChnlMark( this.req, this.res )

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            if ( !channel || (data.apks && !data.apks[ channel ]) ) {
                channel = 'web'
            }

            if ( data.apks && data.apks[ channel ] && data.apks[ channel ].src ) {
                data.appURL = data.apks[ channel ].src
            } else {
                data.appURL = 'http://apk.meilishuo.com/Meilishuo-0523/Meilishuo_baiduApp1_30900.apk'
            }

            data.pageTitle = '美丽说——线上最大的时尚生活市集'
            data._CSSLinks = [ 'activity/sem' ]
            this.render( 'activity/sem.html', data )
        } )
    }
}
exports.__create = controller.__create( sem, controlFns )
