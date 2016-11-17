function shop(){
    return this;
}
var controlFns = {
    'index' : function(spid){
        var device = base.loadModel('wap/tools.js').uaos(this.req);
        if (device.phone){
            return this.redirectTo('http://m.meilishuo.com/shop/shop/'+spid, true);
        }
        spid = spid*1 || 0;
        if (spid) {
            return this.shopDetail(spid);
        }
        this.shopWide(spid);
    },

    /**
     * @desc: 好店宽屏优化
     * @author: sunzhidong
     */
    'shopWide': function(spid) {
        var php = {
            'service' : '/share/service_guarantee?shop_id=' + spid,
            'shop_catalog' : '/shop/shop_filter',
            'shop_list': '/shop/shop_list'
        };

        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.pageTitle = '好店 - 美丽说';
            data._CSSLinks = ['doota/shop_wide'];
            data.headTag = 'shop';
            data.onlyShowGoTop = true;

            mSelf.render('shop/shop_wide.html' , data);
        });
    },

    'shopDetail' : function(spid){
        var page = this.readData('page',this.req.__get, 0)|0;
        this.req.__get.shop_id = spid;
        var php = {
            'shop_info' : '/shop/shop_info',
            'shop_wins' : '/shop/shop_show_box',
            'shop_cata' : '/share/shop_goods_category',
            'other' : '/shop/shop_recommend',
            'service' : '/share/service_guarantee',
            'shop_rate' : '/shop/shop_points_trend',
            'shop_intro' : '/shop/shop_intro',
            'shop_coupon' : '/shop/shop_coupon_apply?shop_id='+spid
            , 'shop_banner' : '/shop/shop_top_banner?shop_id='+spid
            , 'user_module' : '/shop/shop_columns?shop_id='+spid
			,'shop1111_coupon' : '/note/shop_1111_promotion?shop_id='+spid
			,'shop1111_black_list' : '/shop/black_11?shop_id='+spid
            , 'shop_new_nums' : '/shop/new_goods_nums?shop_id='+spid
        }

        // 新品到店
        var current_date = this.readData('current_date', this.req.__get, 0);
        if(current_date){
            php['goods'] = '/shop/new_goods_list';
        } else {
            php['goods'] = '/shop/goods_list';
        }

        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            // data.shop_coupon = [
            // 	{coupon_id:103312,price:'50'},
            // 	{coupon_id:103313,price:'100'},
            // 	{coupon_id:103312,price:'200'}
            // ];
            if(!data.shop_info.shop_id) return mSelf.errorPage();
            data.poster0 = data.goods
            data.category_id = mSelf.req.__get.category_id;

            // 新品到店
            if(current_date){
                data.category_id = -1;
            }
            data.current_date = current_date;

            //base.var_dump(data.shop_cata, false, 5);
            data._serviceqq = data.shop_info.qq;
            data._serviceIM = data.shop_info.im
            data.pageTitle = data.shop_info.shop_nick +' - 美丽说';
            data._CSSLinks = ['doota/shop_con' , 'doota/shop1111'];
            // true 宽屏
            //data.fluid = true;
            data.isEdit = true;

            //获取分页总数
            data.groupPg = {};
            data.groupPg.total_num = data.goods.totalNum;
            data.groupPg.current_page = page;
            data.groupPg.page_size = 20 * 11;
            data.headTag = 'shop';
            data.spid = encodeURIComponent(spid);
            data.secondNavHold = true;
			data.noNavbar = true;
            mSelf.render('shop/shopCon.html' , data);
        });
    },
    'comment' : function(p){
        if(p == 'append') this.append();
        else {
            var mSelf = this;
            var php = {
                'comment' : 'doota::/order/detail?page=0'
            };
            this.setDefaultData(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){
                if (!data.comment) return mSelf.errorPage();
                data.comment.data = data.comment.info;
                data._serviceIM = data.comment.data.order.im
                data._CSSLinks = ['order/shop/comment'];
                data.pageTitle = '购买评价 - 美丽说';
                mSelf.render('order/shop/comment_new.html' , data);
            });
        }
    },
    'append' : function(){
        var mSelf = this;
        var php = {
            'comment' : '/goods/comment_info_sku'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            if (!data.comment) return mSelf.errorPage();
            data._serviceIM = data.comment.order.im;
            data._CSSLinks = ['order/shop/append'];
            data.pageTitle = '购买评价 - 美丽说';
            mSelf.render('order/shop/comment_append.html' , data);
        });
    },
    'rating' : function() {
        var shop_id = this.req.__get.shop_id;

        var php = {
            'shop_info' : '/shop/shop_info',
            'shop_cata' : '/share/shop_goods_category?shop_id=' + shop_id,
            'shop_points' : '/shop/shop_points_trend?detail=1',
            'comment_list' : '/shop/comment_list',
            'shop_intro' : '/shop/shop_intro',
            'shop_service' : '/shop/service_guarantee',
            'service' : '/share/service_guarantee'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            if(!data.shop_info.shop_id) return this.errorPage();
            data.groupPg = {
                total_num : data.comment_list.pages.totalNum,
                current_page : this.readData('page',this.req.__get, 0)|0,
                page_size : data.comment_list.pages.page_size || 8
            };
            data._serviceqq = data.shop_info.qq;
            data._serviceIM = data.shop_info.im
            data.category_id = this.req.__get.category_id|0;
            data.secondNavHold = true
            data._CSSLinks = ['doota/shop_rating'];
            data.pageTitle = '店铺评级 - 美丽说';
            this.render('shop/shop_rating.html' , data);
        });
    },

    // 招商中心的东西，暂时保留，之后都删掉
    'settled' : function(arg){
        var php = {};
        this.bridgeMuch(php);
        this.listenOver(function(data){
            this.redirectTo('http://zhaoshang.meilishuo.com/business/' + arg,false);
        });
    }
};
exports.__create = controller.__create(shop , controlFns);
