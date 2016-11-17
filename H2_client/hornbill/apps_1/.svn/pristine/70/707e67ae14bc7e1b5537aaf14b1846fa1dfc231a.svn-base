/*加载一页到详情页*/
fml.use(['jquery', 'component/shareTmp' ,'component/windowScroll' , 'app/tracking'], function(){
	var $ = this.jquery
		,scroll = this.windowScroll
		,shareTmp = this.shareTmp
		,tracking = this.tracking

	var tid = fml.vars.goods.twitter_id
	var y = $('#short_show').offset().top - 600

	var koubei = fml.vars.koubei
	var koubeiLength = 0
	if(koubei && koubei.length){
		var koubeiLength = koubei.length > 5 ? 5 : koubei.length
	}
	
	function ajaxShort(opt){
		$.get('/aj/getComment/' + opt.url, {'tid':tid,'page':0} ,function(data){
			if (!data) return
			/* 添加口碑数据 */
			if(opt.isShopCommet){
				if(koubeiLength == 5){
					data[opt.gather].length = 0
				}
				for(;koubeiLength;koubeiLength--){
					koubei[koubeiLength-1]['level'] = 5;
					data[opt.gather].unshift(koubei[koubeiLength-1])
				}
			}
			/* 判断数据长度 */
			if(!data[opt.gather].length) return
			var items = shareTmp(opt.tpl , {'item' : data[opt.gather]})
			$('#short_show .' + opt.pnl).html(items)
			}, 'json')
		}
	var loaded = false
	scroll.yIn(y , function(){
		if (loaded) return
		loaded = true
		var shortLink = {'evaLink' : 'eva' ,'shoppingLink' : 'shopping' , 'dealLink' :'deal'}
		for (var i in shortLink){
			$('.'+i).click((function(i){
				return function(){
					tracking.cr('share/short/'+i)
					$('.' + shortLink[i] ).trigger('click')
					}
				})(i))
			}

		var shopnum = 5 - koubeiLength;
		ajaxShort({url :'shop?num='+shopnum+'&level=5&filter=1' , 'gather' : 'cInfos' , 'pnl' : 'eva_comments' ,'tpl': 'twitter_comment_shop', 'isShopCommet': true})
		ajaxShort({url :'shopping?num=2' , 'gather' : 'aInfo' , 'pnl' : 'shoppingshow_comments' ,'tpl': 'shoppingshow_tmp'})
	})
})

fml.use(['app/page','jquery','app/clubAction', 'app/doota/tab', 'component/shareTmp'] , function(){
	var $ = this.jquery
		,page = this.page,
        shareTmp = this.shareTmp,
        tab = this.tab;

	var wrapBox = $('.wrap')
		,doc =  $(document)
	function rollCommentPnl(){
		if (!wrapBox.length) return
		var top = wrapBox.offset().top
		if (top > doc.scrollTop()) return
		wrapBox[0].scrollIntoView()
		}
	
	var shop_comments_null = $('#shop_comments_null')
		,eva_comments = $('#eva_comments')
		,shop_deal_null = $('#shop_deal_null')
		,deal_comments = $('#j-deal-comments')
		,shs_comments = $('#shoppingshow_comments')
		,shs_comments_null = $('.shoppingshow_null')

	var shop_comment = {
			'totalNum' : fml.vars.count_dis 
			,'url' : '/aj/getComment/shop'
			,'tid' : fml.vars.goods.twitter_id
			,'tmpId' : 'twitter_comment_shop'
			,'commentPnl' : eva_comments 
			,'pageNav' : $('#shopPagingNav')
			,'pageSize' : 8 
			,'processData' : function(res){
				if (res && res.cInfos) {
					eva_comments.show()
					shop_comments_null.hide()
				/* 添加最多5条口碑数据 */
					var koubei = fml.vars.koubei
					if(!(+$('.currentpage').attr('index')) && shop_comment.param.filter_point == 0 && koubei && koubei.length){
						var k = koubei.length > 5 ? 5 : koubei.length
						for(;k;k--){
							koubei[k-1]['level'] = 5;
							res.cInfos.unshift(koubei[k-1])
						}
					}
				/* end */
					return {'item' : res.cInfos}
				}else {
					eva_comments.hide()
					shop_comments_null.show()
					}
				}
			,'cbk' : rollCommentPnl 
			,'param' : {
                'filter' : 1,
                'filter_point': 0
            }
		}

	$('#short_show .all_rate_btn').click(function(){
		$('.shpcmt .all_rate_btn').prop('checked',this.checked).trigger('change')
		return false
	})

	function updateShpcmtTotal(){
		var filter = $('.shpcmt .all_rate_btn').prop('checked')
		shop_comment.totalNum = fml.vars.count_dis[filter ? 'meaning' :'all']
	}



	$('.eva').click(function(){
		$(this).unbind('click')
		///delete shop_comment.param
		updateShpcmtTotal()
		page(shop_comment)
	})

	$('.shopping').click(function(){
		$(this).unbind('click')	

		page({
			'totalNum' : fml.vars.count_shs
			,'url' : '/aj/getComment/shopping'
			,'tid' : fml.vars.goods.twitter_id
			,'tmpId' : 'shoppingshow_tmp'
			,'commentPnl' : shs_comments 
			,'pageNav' : $('#shsPagingNav')
			,'pageSize' : 8
			,'processData' : function(res){
				if (res && res.aInfo && res.aInfo.length) {
					shs_comments.show()
					shs_comments_null.hide()
					return {'item' : res.aInfo}
				}else {
					shs_comments.hide()
					shs_comments_null.show()
					}
				}
			,'cbk' : rollCommentPnl 
			,'param' : {
				'num': 8
			}
		});	

	})

    /*
        获取评论分类的数量

        added by sunzhidong
        2014-6-26
     */
    $.get('/aj/getComment/filter', {
            'tid':fml.vars.goods.twitter_id,
            'page':0
        }, function(data){
            if (!data || !data.length) return;
            //如果评论数为 0，则不显示分类。data[0] 表示“全部评价”
            if(!data[0].total) {
                return;
            }

            var koubei = fml.vars.koubei
            var koubeiLength = 0
			var koubeiLength = koubei.length > 5 ? 5 : koubei.length
            data[0].total += koubeiLength;

            var items = shareTmp('twitter_comment_count' , {'item' : data});
            $('.eva_comments_filter_tab').html(items);

            /*
             设置评价分类 tab
             */
            var cur = 0;
            var flag = false;
            var $pageNav = $('#shopPagingNav')

        /**
         * 当只看有内容的评论时，只有在接口返回数据后，才能知道真实的评论数目
         */
            var oldCbk = shop_comment.cbk;
            shop_comment.cbk = function(data) {
                oldCbk && oldCbk();
                if(flag) {
                    flag = false;
                    //每次翻页的时候不会进入该方法，需要设置 shop_comment.totalNum 来影响翻页操作
                    var num = shop_comment.totalNum = data.pages.totalNum;
                    var pageLen = Math.ceil(data.pages.totalNum / 8);

                    $pageNav.html(pageLen <= 1 ? '' : shareTmp('pagingNav' , {
                        pageLen: pageLen,
                        page: 0
                    }))
                }
            }
            //这个按钮现在是动态生成了，因此得放到这个回调方法内
            $('.shpcmt .all_rate_btn').on('change'  ,function(){
                shop_comment.param.filter =  this.checked ? 1:0

                updateShpcmtTotal()
                page(shop_comment,true)
                $('.eva').trigger('click')

            })

            tab.bind({
                'tagPnl': '.comments',
                'tabTag': '.eva_comments_filter_tab .item',
                'activeTagClass': 'cur',
                'contents': '.eva_comments',
                onShowed: function(_, _, index) {
                    if(cur != index) {
                        cur = index;
                        shop_comment.param.filter_point = cur;
                        if(data[index].total == 0) {
                            shop_comment.totalNum = 0;
                        }
                        flag = true;
                        page(shop_comment);
                    }
                }
            });
    }, 'json')
});
fml.use('app/twitter_comment' , function(){
	this();	
});
fml.use(['app/clubApi', 'jquery', 'app/checkLogin'] , function(){
	var check = this.checkLogin,
		clubApi = this.clubApi.clubApi
	$('.cnt_item .cl_like').live('click', function(){
		if ($(this).attr('uid') == Meilishuo.config.user_id) return;
		if (!check()) return false;
		var data = {
			'aid' : $(this).attr('aid')
		}
		clubApi('like', data);
		var $likeNum = $(this).find('em').last();
		var num = parseInt($likeNum.text()) || 0;
		var isLiked = $(this).find('.cl_love').length > 0;
		if(isLiked) {
			num--;
			$(this).find('.cl_love').removeClass().addClass('cl_unlove');
		} else {
			num++;
			$(this).find('.cl_unlove').removeClass().addClass('cl_love');
		}
		$likeNum.html(num||'');
	});

	$('.cnt_item .cl_like').live('mouseenter', function(){
		if ($(this).attr('uid') == Meilishuo.config.user_id) {
			$(this).parents('.cnt_item').find('.love_pro').show()
		}
	}).live('mouseleave', function(){
		if ($(this).attr('uid') == Meilishuo.config.user_id) {
			$(this).parents('.cnt_item').find('.love_pro').hide()
		}
	})
});

fml.use('page/doota/overShopHeader',function(){});


fml.use(['jquery','app/tracking'] , function(){
	var $ = this.jquery
		tracking = this.tracking
	$('.goserviceqq,.ico_serviceqq').click(function(){
		var frmSide = $(this).is('.ico_serviceqq')
		var side = frmSide ? 'side':'sale'
		var pos = frmSide ? 'shareFlow':'shareGroup9'
		tracking.cr('dootaQQ',{'frm' : side ,'action':'contact_service','pos':pos})
		})	
	
})
fml.use('jquery' , function(){
	var $ = this
	$('.contentArea .format li').each(function(i,li){
		var text = li.textContent || li.innerText
		if (text.length < 20 ) return
		if (li.offsetWidth < li.scrollWidth){
			li.setAttribute('title', text)
			}
		})
})
fml.use('app/like' , function(){
	this.posterLike('.all_goods' , '.poster_likes');
});
fml.use('app/eventHover' , function(){
	this.hoverShow('.hover_pic' , '.like_merge');
	//this.hoverShow('.code_txt .code' , '.code_pic');
});
fml.use('app/forward' , function(){
	this.posterForward('.all_goods' , '.poster_forward');
	this.twitterForward('.twitter' ,'#twitter_magazi' )	
});
fml.use(['app/doota/tab'], function() {
	this.tab.bind({
		'tagPnl': '.tab_match',
		'tabTag': '.tabArea1',
		'activeTagClass': 'cur',
		'contents': '.contentArea1'
	});
});
fml.use('page/doota/itemCom' , function(){
	this.setRightBar()
	this.setTab()
	this.lazyLoad()
});
// app/doota/shop_new 被废弃
// fml.use('app/doota/shop_new',function(){});

fml.define('page/doota/beauty_main', [] , function(){});