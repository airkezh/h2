function m() {
    return this
}

/**
 * mainapp/detail 太长，生成的二维码很难扫描，所以用个短地址跳转
 * @type {{index: Function}}
 */
var controlFns   = {
    'index': function( param ) {
        this.redirectTo( '/mainapp/detail/' + param, true )
    },

    //c 表示 circle，param 是圈子 id
    'c': function( param ) {
        var domain = config.site.DOMAIN,
            host = ( domain && domain.circle ) || 'http://circle.meilishuo.com',
            si   = this.req.__get.si

        this.redirectTo( host + '/circle/chat/?circle_id=' + param + ( si ? '&si=' + si : '' ) )
    }
}
exports.__create = controller.__create( m, controlFns )
