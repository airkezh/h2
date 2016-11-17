fml.define('app/repinNotic', ['jquery', 'component/waterfall' ,'component/shareTmp', 'component/userstate'], function(require, exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var userstate = require('component/userstate');
	var pin = require('component/waterfall');

	var notic_type = {'collect':'收进杂志', 
			'like':'喜欢了你的分享', 
			'followgroup':'关注了你的杂志', 
			'follow':'关注了你和你的所有杂志', 
			'registerOther':'加入了美丽说'};
	var i_url = {'collect':'goodsUrl', 'like':'url', 'follow':'url'};
	var isCheckNoticTime = false; 
	var last = '';
	var url = '/aj/home/repin';
	var callback = function(res){
		if (!res || res.repinNotice.length == 0) return;
		//res = res.repinNotice;
		var temp = res.repinNotice;
		var i = 0;
		res = [];
		for (var j=0,l=temp.length; j<l; j++) {
			if (temp[j] == null) continue;
			res[i++] = temp[j];
		}
		for (var k in res) {
			res[k].i_url = i_url[res[k].type] ? res[k][i_url[res[k].type]] : res[k].person_url;
			if (res[k].type == 'register')
				res[k].notic_msg = '关注了 <a href="/group/'+res[k].gid+'">#'+res[k].gname+'#</a>等杂志';
			else if (res[k].type == 'act')
				res[k].notic_msg = '参加了 <a href="/act/'+res[k].act_id+'">#'+res[k].act_name+'#</a>活动';
			else if (res[k].type == 'collect' || res[k].type == 'followgroup') 
				res[k].notic_msg = notic_type[res[k].type] + ' <a href="' + res[k].url + '" target="_blank">#' + res[k].gname + '#</a>';
			else if (res[k].type == 'medal')
				res[k].notic_msg = '获得了 <a href="'+res[k].url+'">'+res[k].medalname+'</a> 勋章';
			else if (res[k].type == 'travel')
				res[k].notic_msg = '参加了 <a href="'+res[k].url+'">'+res[k].actname+'</a> 活动';
			else
				res[k].notic_msg = notic_type[res[k].type];
			if (res[k].type == 'medal' || res[k].type == 'travel')
				res[k].i_url = res[k].url;
		}
		var $repin = $('.repinNotic').find('ul');
		if (last == '') {
			var tpl = shareTmp('repin_notic', {'dt_repin':res});
			$repin.append($(tpl));
			if ($repin.find('li').length > 0) {
				$repin.parent().show();
					pin.reload();
				//$('.mlsWall').masonry('reload');
			}
		} else {
			var i = 0, len = res.length, timer, num = $repin.find('li').length;
			var fillNotic = function() {
				var tpl = shareTmp('repin_notic', {'dt_repin':[res[len-i-1]]});
				$repin.prepend($(tpl).hide());
				i++;
				if (num + i <= 10) {
					$repin.find('li:first-child').removeClass('last').show();
						pin.reload();
					//$('.mlsWall').masonry('reload');
				} else {
					$repin.find('li:first-child').removeClass('last').slideDown();
					$repin.find('li:last-child').remove();
					$repin.find('li:last-child').addClass('last');
				}
				if (i == len) {
					window.clearTimeout(timer);
					return;
				}
				timer = window.setTimeout(fillNotic, 1000);
			}
			fillNotic();
		}
		last = res[0].time;
	};

	function repinFunc() {
		if (isCheckNoticTime) window.clearTimeout(isCheckNoticTime);
		if (userstate.activity()) {
			var data = last=='' ? {} : {'last': last};
			$.get(url, data, callback, 'json');	
		}
		isCheckNoticTime = window.setTimeout(repinFunc, 15000);
	} 
	
	exports.repinNotic = repinFunc;
});
