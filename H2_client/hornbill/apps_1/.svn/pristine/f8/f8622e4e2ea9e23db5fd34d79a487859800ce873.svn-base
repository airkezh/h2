fml.use(['jquery' , 'component/iStorage', 'app/userFollow'] , function(){
	var $ = this.jquery;	
	var follow = this.userFollow;
	var storage = this.iStorage;
	$('.addFollow').live('click' , function(){
		var uid = $(this).attr('user_id');
		if(follow('add' , uid , function(){})){
			$(this).parent().html('<span class="followed removeFollow" user_id="'+ uid +'">已关注</span>')
		}	
	});
	$('.removeFollow').live('click' , function(){
		var uid = $(this).attr('user_id');
		if(follow('remove' , uid , function(){})){	
			$(this).parent().html('<span class="btn addFollow" user_id="'+ uid +'">＋加关注</span>');
		}
	});
	$('.darenBox').on('mouseover' , '.removeFollow' , function(){
		$(this).html('取消关注');
		});
	$('.darenBox').on('mouseout' , '.removeFollow' , function(){
		$(this).html('已关注');
		});
});
fml.use('app/calendar' , function(){
	this.today();	
});
fml.use('app/admClick', function(){
    this.monitor();
});
fml.use('app/adPoster', function(){
		this.carousel('.wlc_bnr',{'width':640,'height':240,'gap':4000,'type':2});
});
fml.use(['component/urlHandle' , 'component/dialog' , 'component/shareTmp'] , function(){
	var shareTmp = this.shareTmp;
	var dialog = this.dialog;
	var query = this.urlHandle.getParams(window.location.href.toString());
	var isfail = query.fail || '';
	if(isfail != ''){
		var html = shareTmp('noBoyTpl');
		dialog.meiliDialog({dialogTitle : "美丽提示" , dialogWidth : 420 , dialogContent : html }); 
		if(isfail == 'weibo')
			$('.toshare').addClass('toweibo').html('领取男生特别准入许可勋章，并转发到微博>>')
				.show().bind('click', function(){
					var url = '/connect/shareToWeibo/',
						data = {},
						callback = function(){
							$('.close_z').click();	
						};
					$.get(url , data , callback ,'json');
				});		
	}
});
fml.use('component/lazyLoad' , function(){
    this.load('.imgBox>span' ,'asrc');
	this.load('.brand_pic span' ,'asrc');
	this.load('.edit_sel li' ,'asrc' , 'bg');
});
fml.define('page/welcome' , ['jquery', 'app/logstatics'] , function(require, exports){
	var $ = require('jquery');
	var log = require('app/logstatics');

	$('.bds_tsina').click(function(){
		log.clickgetlog('/log_statistics/wel_bai_sina_share');
	});
	$('.bds_qzone').click(function(){
		log.clickgetlog('/log_statistics/wel_bai_qzone_share');
	});
	var href = location.href;
	if(href.indexOf('frm=qz_pcpush') > -1) {
		var frmFlag = 'frm=qz_pcpush_jz';
		$('a').click(function(){
			var hr = $(this).attr('href');
			var isFrm = '';
			var query = hr.indexOf('?');
			var str = hr.substr(query + 1);
			var arrtmp = str.split('&');
			for(var i=0 , len = arrtmp.length;i < len;i++){
				if (arrtmp[i].indexOf('frm=') > -1) {
					isFrm = arrtmp[i];
					break;
				}
			}
			if (isFrm) {
				hr = hr.replace(isFrm, frmFlag);
				isFrm = '';
			} else {
				hr = hr.indexOf('?') > -1 ? hr + '&' + frmFlag : hr + '?' + frmFlag;
			}
			$(this).attr('href', hr);
		})
	}
});

