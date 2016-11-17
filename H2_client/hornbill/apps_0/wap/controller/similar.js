/*
 相似宝贝
 */
function similar() {
    return this;
}
var controlFns   = {
    'index': function() {
        var php = {
            main:    '/recommend/recommend_root_goods?__get_r=1',
            similar: '/recommend/recommend_similar_goods?limit=10&offset=0&__get_r=1'
        }

        this.bindDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.XR             = true
            data.use_rem_screen = true
            data._CSSLinks      = [ 'similar' ]
            data.pageTitle      = '相似宝贝'
            data.twitter_id     = this.req.__get.tid
            this.render( 'similar.html', data )
        } )
    }
}
exports.__create = controller.__create( similar, controlFns )
