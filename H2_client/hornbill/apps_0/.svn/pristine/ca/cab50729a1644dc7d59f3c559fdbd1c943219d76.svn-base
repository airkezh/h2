function shop(){
    return this;
}
var controlFns = {
    'comment' : function(p){
        if(p == 'append') this.append();
        else {
            var goods_ids = this.req.__get.goods_id;
            var mSelf = this;
            var php = {
                'comment' : 'doota::/order/detail?page=0'
                , 'tags' : '/goods/goods_tag?goods_id=' + goods_ids
            };
            this.setDefaultData(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){
                if (!data.comment) return mSelf.errorPage();
                data.comment.data = data.comment.info;
                //console.log(JSON.stringify(data.tags));
                data._serviceIM = data.comment.data.order.im
                data._CSSLinks = ['order_pc/shop/comment'];
                data.pageTitle = '购买评价 - 美丽说';
                mSelf.render('shop/comment_new.html' , data);
            });
        }
    },
    'append' : function(){
        var mSelf = this;
        var php = {
            'comment' : 'doota::/shop/comment_info_sku'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            if (!data.comment) return mSelf.errorPage();
            data._serviceIM = data.comment.order.im;
            data._CSSLinks = ['order_pc/shop/append'];
            data.pageTitle = '购买评价 - 美丽说';
            mSelf.render('shop/comment_append.html' , data);
        });
    }
};
exports.__create = controller.__create(shop , controlFns);
