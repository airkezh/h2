fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/replyBox', function(){});
fml.define('page/huodong/summerbb' , ['jquery' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo' , 'component/regString' , 'app/checkLogin'] , function(require,exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var regString = require('component/regString');
	var check = require('app/checkLogin');

	var isAjaxLoad = true
		, goodsInfo = {}
		, win = {};
	var pids = ''
		, img_urls = '';
    var initGroup = function(){
        var groups = $('.summerbb_wall .imgBox');
        var i = 0
            , len = groups.length
			, img = '<img class="minpic" src="http://d03.res.meilishuo.net/pic/s/37/1d/dfe92ba560d6dada47766ae3fc51_640_640.c1.jpg"/>'
		
        for(i = 0; i < len; i++){
            var imgs = $(groups[i]).find('img');
            $(imgs).eq(0).before(img)
            $(imgs).eq(8).remove();
            $(imgs).eq(2).css({'margin-right':'4px'});
            $(imgs).eq(5).css({'margin-right':'4px'});
            $(imgs).eq(1).css({'margin-right':'0px'});
            $(imgs).eq(4).css({'margin-right':'0px'});
            $(imgs).eq(7).css({'margin-right':'0px'});
        }
    }
    initGroup();
	var goodsSubmit = function(pids, img_urls){
        var data = {
			pid : pids
			, img_url : img_urls
            , actName : 'MaybellineBBCream'
        };
		$("#linkMessageTips span").html('正在提交...');
		var t = setTimeout(function(){
			var tpl = shareTmp('success', {})
			win = new dialogUI({
				'title' : '分享成功'
				, 'content' : tpl
				, 'width' : '530px'
				, 'onChange' : function(){
					$('#dialogLayer').css({'padding' : 0}).children('#dialogTitle').css({'height' : 0, 'position' : 'relative'}).children('.close_z').css({'height' : 24, 'width' : 24, 'margin-top' : 8, 'background-image' : 'none', 'position' : 'absolute', 'right' : '8px'}).next('#dialogTitleText').hide();
				}
			})
		}, 2000);
        $.get('/goods/ajax_createMaybellineBBCreamGoods', data ,function(res){},'json');
	}
	$('.ga_tab .tab_btn div').on('click', function(){
		$(this).parents('.ga_tab').attr('class', 'ga_' + $(this).attr('class') + ' ga_tab')	
	});
	$('.ga').on('click' , function(){
		if(!check()) return;
		pids = '';
		img_urls = '';
		var tpl = shareTmp('huodong');
		var html = tpl;
		win = new dialogUI({
			'title':'分享宝贝'
			, 'content':html
			, 'width':'640px'
			, 'onChange' : function(){
				$('#dialogLayer').css({'padding' : 0}).children('#dialogTitle').css({'height' : 0, 'position' : 'relative'}).children('.close_z').css({'height' : 24, 'width' : 24, 'margin-top' : 8, 'background-image' : 'none', 'position' : 'absolute', 'right' : '8px'}).next('#dialogTitleText').hide();
			}
			, 'onStart' : function(){
				var item = '', items = ''
				$.post('/maybellineActivity/ajax_MaybellineGoods', {} ,function(r){
					var i = 0, len = r.length;
					for(i = 0; i < len; i++){
						item = '<div pid="' + r[i].pid + '" id="ga' + i + '">' + 
							'<span>' +
								'<img src="' + r[i].img_url + '" height="122" width="122"/>' +
							'</span>' +
							'<p></p></div>'
						items += item;
					}
					$('.ga_select').html(items);
				}, 'json')
			}
		});
		$('.gasub').on('click', function(){
			_gaq.push(["_trackPageview","meilishuo/share/submit"]);
			var img_urls_post = img_urls.split(',,,')
			img_urls_post.pop(-1)
			var pids_post = pids.split(',,,')
			pids_post.pop(-1)
			//urls_array.push('http://detail.tmall.com/item.htm?spm=a1z10.3.w18318990046.48.vs3hx5&id=23680676355&')
			if(pids.length == 0){
				$("#linkMessageTips span").html('请选择至少1个宝贝');
				return;
			}
			$('.gasub').off('click')
			goodsSubmit(pids_post, img_urls_post);
		});
	});
	$('.ga_select div').live('click', function(){
		var btn = $(this)
			, pid = btn.attr('pid')
			, img_url = btn.find('img').attr('src')
		if(btn.attr('class') == 'selected'){
			btn.removeClass('selected')
			img_urls = img_urls.replace(img_url + ',,,', '')
			pids = pids.replace(pid + ',,,', '')
		}else{
			btn.addClass('selected')
			img_urls += img_url + ',,,'
			pids += pid + ',,,'
		}
	});
	$('.ga_continue').live('click', function(){
		$('.share_group .i_sina').click();	
		$('.close_z').click();
	})	
	
	
	/*share sina qzone qq*/
	var url = location.href + '?frm=summerbb_hd01';
	var desc = '#美宝莲BB霜#不浪费的青春，就是边走边美！达人们纷纷踏上了寻美之路，你还在等什么？！我已带着美宝莲BB拎上旅行箱准备出发了，你们也赶快来定制专属私家旅行箱吧，100支美宝莲BB UV正在寻觅私奔伴侣！'
	var title = '轻装上阵漂亮防晒一夏天';
	var pic = Meilishuo.config.picture_url + 'images/huodong/summerbb/summerbb_share1.jpg';
	$('.i_qzone').on('click',function(){
		share.shareToQzone(url , desc, '', title , pic);	
	});
	$('.i_sina').on('click',function(){
		share.shareToWeibo(url , desc , pic , false);//false 为不抓取图片
	});
	$('.i_tx').on('click',function(){
		share.shareToQQ(url , desc , pic);	
	});
	
});
