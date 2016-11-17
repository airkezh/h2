function similar() {
    return this
}

var controlFns = {
    index: function( param ) {
        var php = {
            similar: '/recommend/recommend_similar_goods?__get_r=1',
            match:   '/recommend/recommend_match_goods?__get_r=1',
            shop:    '/recommend/recommend_similar_shop?__get_r=1'
        }
        this.ajaxTo( php[ param ] )
    }
}

exports.__create = controller.__create( similar, controlFns )
