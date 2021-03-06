function share(){
    return this;
}
var controlFns = {
    index : function(tid){
        if (tid === 'share') return this.share();
        var mSelf = this;
        ///tid = tid*1 || 0
        this.req.__get.tid = tid;
        var php = {
            'catlog_info' : '/goods/share_goods_catalog',
            'goods_info' : '/goods/share_main',
            'goods_group' : '/goods/share_group',
            'goods_like' : '/goods/share_like_maybe',
            //'goods_still' : '/goods/share_still_look',
            //'goods_recommend' : '/goods/share_goods_recommend',
            'group_recommend' : '/goods/share_group_recommend',
            'share_leftbanner' : '/commerce/Ads_banner/share/left',
            'share_rightbanner' : '/commerce/Ads_banner/share/right',
            'share_volume' : '/goods/share_volume',
            'share_lite' : '/goods/share_attr_lite',
            'share_user' : '/goods/share_user',
            'adm11': '/adm/ad_Show?slot_id=11&twitter_id='+tid,
            'adm13': '/adm/ad_Show?slot_id=13&twitter_id='+tid,
            'adm15': '/adm/ad_Show?slot_id=15&twitter_id='+tid,
            'shop_info' : '/shop/shop_intro?twitter_id='+tid,
            'adm53': '/adm/ad_Show?slot_id=53&twitter_id='+tid,
            'dr_comm' : '/item/item_daren_comment',
            'point' : '/item/item_fashion_point',
            'images' : '/item/item_images'
            ,'goods' : '/item/item_share_goods',
            'recommend' : '/recommend/recommend_shop?num=2',
            'reportCheck':'/risk/risk_post_report_check?twitter_id='+tid
        }
        this.req.__get.top = this.req.__get.top || 'pic';
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            ///if ('1901427231' == tid) return this.transCall('sale' , tid)
            //base.var_dump(data.goods, false, 5);
            if (data.goods_info && data.goods_info.redirectUrl) mSelf.redirectTo(data.goods_info.redirectUrl)
            if(!data.goods_info || data.goods_info.show404 || !data.goods_info.uinfo) return mSelf.errorPage();
            if (data.goods_info.twitter_show_type == '4')  return mSelf.redirectTo(data.goods_info.twitter_source_tid,true)
            var url = require('url');
            var referer = mSelf.req.headers.referer || '';
            var hostname = url.parse(referer).hostname || '';
            // 来源是否是外站
            hostnameM = hostname.substr(hostname.indexOf(".")+1,"9");
            if(hostnameM != 'meilishuo' && hostname != ''){
                data.isSite = true;
            }
            // 来源是否是Baidu
            hostnameB = hostname.substr(hostname.indexOf(".")+1,"5");
            if(hostnameB == 'baidu'){
                data.isBaidu = true;
            }
            data.host_name = mSelf.req.headers.host;
            data.pageTitle = data.goods_info.pageTitle;
            data.meta_description = data.goods_info.metaDescription;
            data['_mobileAgent'] = '/share/' + tid;
            data.keywords = data.goods_info.keyword;
            data.isLogin = data.userInfo.user_id != 0 ? true : false;
            data.share_info = {};
            data.group_name = data.goods_info.group_name;
            data.share_info.comment = '美丽说杂志是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说杂志，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~';
            //	var qqHuiliu = 'http://www.meilishuo.com/share/' + tid + '?frm=huiliu_shareqzone';
            var qqHuiliu = '';
            // 7 => goods | 2 => picture | 9 => hart | default => text
            switch(data.goods_info.mode){
                case 7 :
                    data.showPrice = true;
                    if(data.group_name){
                        if(data.goods_info.ginfo.title == ''){
                            data.share_info.desc = encodeURIComponent('推荐 一个宝贝 - 来自杂志 #' + data.group_name + '# (分享自 @美丽说) >>');
                            data.share_info.descQQ = '推荐 一个宝贝 - 来自杂志#' + data.group_name + '#';
                        }else{
                            data.share_info.desc = encodeURIComponent('推荐【'+ data.goods_info.ginfo.title +'】- 来自杂志 #' + data.group_name + '# (分享自 @美丽说) >>');
                            data.share_info.descQQ = '推荐【'+ data.goods_info.ginfo.title +'】- 来自杂志#' + data.group_name + '#';
                        }
                        data.share_info.text = '>>分享自美丽说杂志《'+ data.group_name +'》';
                    }else{
                        if(data.goods_info.ginfo.title == ''){
                            data.share_info.desc = encodeURIComponent('推荐 一个宝贝 (分享自 @美丽说) >>');
                            data.share_info.descQQ = '推荐 一个宝贝';
                        }else{
                            data.share_info.desc = encodeURIComponent('推荐【'+ data.goods_info.ginfo.title +'】 (分享自 @美丽说) >>');
                            data.share_info.descQQ = '推荐【'+ data.goods_info.ginfo.title +'】';
                        }
                        data.share_info.text = '>>分享自美丽说';
                    }
                    break;
                case 2 :
                    if(data.group_name){
                        data.share_info.desc = encodeURIComponent('分享一张美图 - 来自@美丽说 杂志#'+ data.group_name +'#');
                        data.share_info.descQQ = '【美图】分享一张美图 - 来自 杂志#'+ data.group_name +'# ';
                        data.share_info.text = '>>分享自美丽说杂志《'+ data.group_name +'》';
                    }else{
                        data.share_info.desc = '分享一张美图 - 来自@美丽说';
                        //	data.share_info.descQQ = '分享一张美图' + qqHuiliu;
                        if(data.goods_info.twitter_content == ''){
                            data.share_info.descQQ = '【美图】分享一张美图' + qqHuiliu ;
                        }else{
                            data.share_info.descQQ = '【美图】' + data.goods_info.twitter_content + qqHuiliu ;
                        }
                        data.share_info.text = '>>分享自美丽说';
                    }
                    break;
                case 9 :
                    mSelf.redirectTo('/share/'+ data.goods_info.twitter_source_tid , true);
                    return;
                default :
                    data.showText = true;
                    break;
            }

            delete mSelf.req.__get.tid;
            //精选店铺info
            data.isTshopinfo = true;
            var taobaoCookieHelp = {
                'chrome' : 'http://jingyan.baidu.com/article/4f7d57128d6e401a2019279c.html'
                ,'ff' : 'http://jingyan.baidu.com/article/7908e85c60426baf481ad2e6.html'
                ,'default' : 'http://jingyan.baidu.com/article/b24f6c82fed0ef86bee5da69.html'
            }
            var ua = this.req.headers['user-agent']
            var browser = 'default'
            if (/chrome/i.test(ua)) browser = 'chrome'
            else if (/firefox/i.test(ua)) browser = 'ff'

            data.taobaoCookieHelpUrl = taobaoCookieHelp[browser]
            if (data.showPrice){
                data.isSingle = true;
                data._CSSLinks = ['twitter'];
                mSelf.render('twitter/single.html' , data);
            }else{
                data.onlyShowGoTop = true;
                data._CSSLinks = ['pic_twitter'];
                mSelf.render('twitter/share.html' , data);
            }
        });
    },
    'share' : function(){
        var url = this.readData('url',this.req.__get, '');
        var image = this.readData('image', this.req.__get, '');
        var content = this.readData('content', this.req.__get, '');
        this.redirectTo('/meilishuo_share?picurl='+encodeURIComponent(image)+'&siteurl='+encodeURIComponent(url)+'&content='+encodeURIComponent(content))
    },
    'item': function( tid ) {
        var php,
            req      = this.req,
            reqGet   = req.__get,
            page     = this.readData( 'page', reqGet, 0 )

        //tid = tid * 1 || 0

        reqGet.twitter_id = reqGet.tid = tid

         this.debugSnake({
            //target: 'devlab3'
         })

        php = {
            'goods_info': '/share/share_main',
            'feature_goods': '/share/featured_goods',
            'details':   '/share/goods_details',
            'shop_in':   '/share/shop_intro',
            //需要 tid
            'shop_com':  '/shop/shop_points',
            /*
             单品页右侧推荐
             http://redmine.meilishuo.com/projects/doota/wiki/Hostrecomendmaybe_like
             */
            'maybe_like': '/recommend/maybe_like',
            /*
             还买了什么
             http://redmine.meilishuo.com/projects/doota/wiki/Hostrecomendbuy_more
             */
            'buy_more': '/recommend/buy_more',
            'service': '/share/service_guarantee?src=share',
            /**
             * 左下角分类
             * http://redmine.meilishuo.com/projects/doota/wiki/Hostshareshop_goods_category
             */
            'shop_goods_category': '/share/shop_goods_category',
            'promote_info': '/customactivity/CustomActivity_common_tool_promote_model',
            'reportCheck':'/risk/risk_post_report_check?twitter_id='+tid,
            /*  优惠套餐  */
            'collocation' : '/collocation/collocation_list?twitter_id=' + tid
        }

        this.setDefaultData( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            var goodsTitle, goodsPrice, descText,
                goodsInfo = data.goods_info

            if ( !goodsInfo ) {
                return this.errorPage()
            }

            if ( goodsInfo.is_jump ) {
                reqGet.d_r = goodsInfo.d_r
                return this.redirectTo( goodsInfo.twitter_source_tid, true )
            }
            data.isLogin = data.userInfo.user_id != 0 ? true : false;
            goodsTitle = goodsInfo.goods_title
            goodsPrice = goodsInfo.price
            descText   = '我在美丽说上看到了"' + goodsTitle + goodsPrice +'元"，更多流行单品正在热卖，快来抢吧！'
            data.share_info = {
                comment: '美丽说是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~',
                promo: '>>分享自美丽说特卖"' + goodsInfo.promo + '"',
                desc: descText,
                descQQ: descText,
                text: descText
            }

            data._serviceIM     = goodsInfo.im
            data._shopid        = goodsInfo.shop_id
            data.isSale         = true
            data.SaleChannel    = true
            data.isTopcart      = true

            data.tid = tid
            
			//单宝页去掉全站tab
			data.noNavbar       = true
            data.service_exists = { data: data.shop_in.is_switch | 0 }
            data._CSSLinks      = [ 'doota/sale.wide' ]
            data.winTitle       = goodsTitle
            data.pageTitle      = goodsTitle + ' - 美丽说'

            if ( data.format && data.format.length ) {
                data.meta_description = data.format.join( ' ' ).replace( /,/g, ':' )
            }

            data.secondNavHold = true
            this.render( 'doota/sale_wide.html', data )
        })
    },
    'snapshot' : function(mid) {
        // this.debugSnake({ target: 'devlab3' })
        var php = {
            'snap' : 'doota::/order/snapshot?mid='+mid
        }
        this.setDefaultData( php );
        this.bridgeMuch( php );
        var self = this;
        this.listenOver( function( data ) {
            if (!data.snap) {
                return this.errorPage();
            }
            data.goods_info = data.snap.goods_info;
            data.details = data.goods_info.details;
            data._serviceIM = data.goods_info.im;
            //单宝页去掉全站tab
            data.noNavbar = true;
            data.headTag = 'snap';
            data._CSSLinks = [ 'doota/tradeSnap' ];
            data.pageTitle = data.goods_info.goods_title + ' - 美丽说';
            return self.render( 'doota/tradeSnap.html', data );

        })
    },
    'combo' : function(){
        var php = {
            'collocation':'/collocation/collocation_stock'
        }
        this.bindDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data){
            if(!data.collocation) return this.errorPage();
             data._CSSLinks = [ 'doota/combo' ];
             data.pageTitle = '选择优惠套餐';
             this.render('doota/combo.html', data);
        })
    }
}
exports.__create = controller.__create(share , controlFns);
