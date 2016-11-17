/**
 * 设计师大赛 PC 版
 */
function designer() {
    return this
}

var controlFns   = {
    index: function() {
        var php = {
            page: '/customactivity/customActivity_designer_contest2?cid=12495'
        }

        this.setDefaultData( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = data.page.data.page.title
            data._CSSLinks = [ 'activity/designer' ]
            this.render( 'activity/designer.html', data )
        } )
    }
}
exports.__create = controller.__create( designer, controlFns )
