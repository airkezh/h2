fml.use( 'app/like', function() {
    this.posterLike( '.user_module', '.poster_likes' );
} );
fml.use( 'app/forward', function() {
    this.posterForward( '.user_module', '.poster_forward' );
} );
fml.use( [ 'jquery', 'app/posterWalls', 'component/search/index', 'component/urlHandle' ], function( require ) {
    var $      = this.jquery,
        query  = this.urlHandle.getParams( window.location.href.toString() ),
        Search = this.index,
        searchInstance

    searchInstance = Search.init( {
        tmpl: 'search_input_tmpl',
        el:   '.search'
    } )

    searchInstance.$el.on( 'click', '.js-search-site', function() {
        searchInstance.widgets.AutoComplete.jump()
    } ).on( 'click', '.js-search-shop', function() {
        var searchKey = $.trim( searchInstance.widgets.AutoComplete.$input.val() )

        if ( searchKey ) {
            location.href = '/shop/' + fml.vars.shop_id + '?query=' + encodeURIComponent( searchKey )
        }
    } )

    var urlData = {
        'frame':   query.frame || 0,
        'page':    query.page || 0,
        'query':   query.query,
        'shop_id': fml.vars.shop_id
    };
    var opts    = $.extend( {}, urlData, query );
    if ( opts.current_date ) {
        this.posterWalls( opts, '/aj/shop/new_goods_list' );
    } else if ( query.query ) {
        this.posterWalls( this.jquery.extend( {}, urlData, {
            'page':    0,
            'frame':   0,
            'query':   query.query,
            'shop_id': fml.vars.shop_id
        } ), '/aj/search_shop_aj/resultList/' )
    } else {
        this.posterWalls( opts, '/aj/shop_list/goods' );
    }
} );

fml.define( 'page/shop_new', [], function( require, exports ) {
} );
