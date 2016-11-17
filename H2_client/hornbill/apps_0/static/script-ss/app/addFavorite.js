fml.define('app/addFavorite' , ['jquery', 'app/logstatics', 'app/tracking', 'component/iStorage', 'component/userstate'] , function(require , exports){
	var $ = require('jquery');
	var logstatic = require('app/logstatics');
	var logTrack = require('app/tracking');
	var storage = require('component/iStorage');
	var us = require('component/userstate');
	function addFavorite(opts) {
		var href = opts.href || 'http://www.meilishuo.com/', 
			frm = opts.frm || '', 
			name = opts.name || '美丽说',
			tipPos = opts.tipPos || {}, 
			notShowTip = opts.notShowTip || false;
		try {
			storage.set('isAddFavorite', '1');
			if (frm) frm = href.indexOf('?') > -1 ? '&frm='+frm : '?frm='+frm; 
			if (window.sidebar) {
				window.sidebar.addPanel(name,href+frm,'');
			} else if (document.all) {
				window.external.addFavorite(href+frm, name);
			} else {
				if (!notShowTip) showTip(tipPos, opts.obj);
			}
		} catch(e) {
			if (!notShowTip) showTip(tipPos, opts.obj);
		}
	}
	function showTip(pos,obj) {
		obj = obj || '#goTop';
		if ($('.favor_tip').length > 0) return;
		var style = 'position:absolute; right:'+pos.right+'px; top:'+pos.top+'px;'
		if (pos.center) style = 'margin:'+pos.top+'px auto 0;';
		var h = '<div class="favor_tip none_f" style="'+style+'border:1px solid #F3DB79; background-color:#FFC; width:200px; height:45px; text-align:center;">'
			+ '<p style="height:22px; line-height:22px;">您的浏览器不支持自动加收藏</p>'
			+ '<p style="height:22px; line-height:22px;">请按<span style="font-weight:bold;">ctrl+d</span>加入收藏</p>'
			+ '</div>';
		$(obj).append(h);
		$('.favor_tip').show();
		setTimeout(function(){$('.favor_tip').remove();}, 5000);
	}

	function _addBeforeLeave() {
		function confirmExit() {
			if (!us.isNew()) return;
			if ($('#dialogLayer').find('.pop_login').length > 0) return;
			storage.set('isAddFavorite', '1');
			var text = '亲，喜欢就收藏我们吧，每天都要来美丽说哟~~\n\n★每天分享20万件漂亮衣服，5万个新杂志\n★2000W爱美女生都在美丽说\n★24小时热榜，七天热榜持续更新\n★每周两次福利社更新，免费试用等你来拿';
			if (confirm(text)){
				logTrack.cr('add_favorite_before_leave');
				addFavorite({'frm':'hf', 'tipPos':{'right':40, 'top':38}, 'notShowTip':true});
			}
		}
		var _beforeFun = window.onbeforeunload;
		window.onbeforeunload = function() {
			_beforeFun && _beforeFun();
			storage.get('isAddFavorite', function(v){		//when exist many pages, close one page, the others don't show
				if (v === '1') return;
				confirmExit();
			});
		}
	}

	exports.addFavorite = addFavorite;
	exports.addFavor = function() {
		var log_click_url = '/log_statistics/click_add_favorite';	
		$('.collect').click(function(){
			addFavorite({'href':location.href, 'frm':'shoucangjia', 'tipPos':{'right':40, 'top':38}});
			logstatic.clicklog(log_click_url);	
		});
	
		// after 10 seconds, bind onbeforeunload event to add favorite 
		/* #3276 去掉站内针对不同浏览器关闭Tab提示收藏的Feture
		setTimeout(function(){
			if ($.browser.safari) return;	//filte chrome & safari
			storage.get('isAddFavorite', function(v){
				if (v === '1') return;
				_addBeforeLeave();
			});
		}, 10000);
		*/
	};
});
