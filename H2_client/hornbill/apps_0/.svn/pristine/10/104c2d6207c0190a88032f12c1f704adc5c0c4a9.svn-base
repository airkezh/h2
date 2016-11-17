function search_shop_aj() {
    return this;
}

var controlFns = {
    getShopList: function( param ) {
        // this.debugSnake({'target':'mob.rdlab'});
        this.ajaxTo( '/shop/search_shop_new' );
    },

    resultList: function() {
        this.ajaxTo( '/shop/Shop_goods_search' )
    }

}

exports.__create = controller.__create( search_shop_aj, controlFns );

