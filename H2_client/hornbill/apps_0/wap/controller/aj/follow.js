function follow() {
    return this
}

var controlFns = {
    shop: function( param ) {
        var php = {
            follow:   '/shop/shop_follow',
            unfollow: '/shop/shop_unfollow'
        }

        this.ajaxTo( php[ param ] )
    }
}

exports.__create = controller.__create( follow, controlFns )
