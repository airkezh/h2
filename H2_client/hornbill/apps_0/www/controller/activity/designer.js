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
    },
    vote: function() {
        var php = {
            'main':'/customactivity/CustomActivity_designer_contest3?cid=14495&project_id=3&season_id=3'
        }

        this.setDefaultData( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {

            data.pageTitle = data.main.data.page.title
            
            data._CSSLinks = [ 'activity/designer2' ]
            this.render( 'activity/designer2.html', data )
        } )
    },
    vote_sub: function(did) {
        var php = {
           'main':'/customactivity/CustomActivity_designer_contest3_2?cid='+did+'&season_id=3&project_id=3'
        }

        this.setDefaultData( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {

            data.pageTitle = data.main.data.page.title
            
            data._CSSLinks = [ 'activity/designer2' ]
            this.render( 'activity/designer2_sub.html', data )
        } )
    }
}
exports.__create = controller.__create( designer, controlFns )
