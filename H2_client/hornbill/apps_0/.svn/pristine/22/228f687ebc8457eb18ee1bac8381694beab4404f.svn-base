function cart() {
    return this;
}

var controlFns = {
    index: function (params) {
        // console.log(require('querystring').parse.toString());
        var php = {
            'cartList': 'doota::/cart/list_info',
            'statistic': 'doota::/cart/statistic',
            'bannerList': 'doota::/cart/list_banner'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        var self = this;


        this.listenOver(function (data) {
            data.showSaleSideBar = true;
            data.topbanner = false
            data._CSSLinks = ['order_pc/cart/cart'];
            data.pageTitle = '我的购物车 - 美丽说';
            data.invalidGoods = [];
            data.SaleChannel = true;

            var list = data.cartList.info;
            if (list && list.length > 0) {
                list.forEach(function (shop) {
                    var valid = false;
                    for (var i = 0; i < shop.goods.length; i++) {
                        var goods = shop.goods[i];
                        if (goods.stock !== '0' && goods.shelf !== '0') {
                            valid = true;
                        } else {
                            data.invalidGoods.push(goods.sid);
                        }
                    }
                    shop.valid = valid;
                });
            }
            self.render('cart/index.html', data);
        });
    },

    statistic: function () {
        this.ajaxTo('doota::/cart/statistic');
    },


    haitao: function (params) {
        // console.log(require('querystring').parse.toString());
        var php = {
            'cartList': 'doota::/cart/list_info?is_haitao=1',
            'statistic': 'doota::/cart/statistic',
            'bannerList': 'doota::/cart/list_banner'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);

        var self = this;
        this.listenOver(function (data) {
            data.showSaleSideBar = true;
            data.topbanner = false
            data._CSSLinks = ['order_pc/cart/cart_haitao'];
            data.pageTitle = '我的购物车 - 美丽说';
            data.invalidGoods = [];
            data.SaleChannel = true;

            var list = data.cartList.info;
            if (list && list.length > 0) {
                list.forEach(function (shop) {
                    var valid = false;
                    for (var i = 0; i < shop.goods.length; i++) {
                        var goods = shop.goods[i];
                        if (goods.stock !== '0' && goods.shelf !== '0') {
                            valid = true;
                        } else {
                            data.invalidGoods.push(goods.sid);
                        }
                    }
                    shop.valid = valid;
                });
            }
            self.render('cart/index_haitao.html', data);
        });
    },
    shop_coupon: function () {
        //this.debugSnake({target:'devlab3'});
        this.ajaxTo('doota::/coupon/coupon_shop');
    },
    coupon_remind: function () {
        //this.debugSnake({target:'devlab3'});
        this.ajaxTo('doota::/cart/get_coupon_remind');
    },
    check: function (params) {
        var cartInfo = mokeData.cartInfo;
        var php = {};
        this.setDefaultData(php);
        this.bridgeMuch(php);
        var self = this;
        this.listenOver(function (data) {
            data.cartInfo = mokeData.cartInfo;
            data.showSaleSideBar = true;
            data.topbanner = false
            self.render('cart/aaa.html', data);
        });
    },
    del: function () {
        this.ajaxTo('doota::/cart/remove');
    },
    update: function () {
        this.ajaxTo('doota::/cart/update');
    },
    addToCart: function (tid) {
        var mSelf = this;
        var sid = this.req.__get.sid;
        var shop_id = this.req.__get.shop_id;
        var php = {
            'add_result': 'doota::/cart/add_result?sid=' + sid,
            'mz_check': 'doota::/cart/mz_check?twitter_id=' + tid,
            'coupon': 'doota::/coupon/coupon_cart_promotion'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            
            data.sid = sid;
            data.shop_id = shop_id;
            data.twitter_id = tid;

            data.topbanner = false;
            data.cartIsRecommend = true;
            data.img = mSelf.readData('img', mSelf.req.__get, 0);
            data._CSSLinks = ['order_pc/cart/addToCart'];
            data.winTitle = '加入购物车'
            data.pageTitle = data.winTitle + ' - 美丽说';
            mSelf.render('cart/addToCart.html', data);
        });
    }

};

exports.__create = controller.__create(cart, controlFns);