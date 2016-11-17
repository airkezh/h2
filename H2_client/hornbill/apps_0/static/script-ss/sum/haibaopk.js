fml.define('sum/haibaopk' , ['jquery','sum/uploadPic','app/shareTo', 'app/checkLogin', 'component/shareTmp', 'component/dialog', 'component/urlHandle'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');
	var dialog = require('component/dialog');
	var urlHandle = require('component/urlHandle');
	var check = require('app/checkLogin');
	var share = require('app/shareTo');
	var uploadPic = require('sum/uploadPic');
	var submitApply = function(){
		var gid = 0;
		if(!($('.showImgage img').attr('id'))){
			alert('请上传图片');
			return false;
		}
		if(!($('#magaLink').val())){
			alert('请输入杂志链接');
			return false;
		}else{
			var magaurl = $('#magaLink').val();
			var urlWithoutHttp = /www.meilishuo.com\/group\//i,
				isHttp = /http:\/\//i,
				isNum = /^[1-9]+[0-9]*]*$/;
			if(magaurl.search(urlWithoutHttp) === 0 || magaurl.search(urlWithoutHttp) === 7){
				gid = magaurl.replace(/http:\/\//i, '').replace(urlWithoutHttp, ''); 
				if(!isNum.test(gid)){
					alert('杂志链接格式错误');
					return false;
				}
			}else{
				alert('杂志链接格式错误');
				return false;
			}
		}
		var url = '/activity_daren/ajax_haibao',
			data = {
				'pid' : $('.showImgage img').attr('id'),
				'src' : $('.showImgage img').attr('src'),
				'division' : $('[name=division]:checked').val(), 
				'actName' : 'haibaopk',
				'group_id' : gid
			},
			callback = function(){
				var totalNum = $('.division[division=' + data.division + ']').attr('total_num');
				var page = Math.floor(totalNum / 25); 
				var url = Meilishuo.config.server_url + 'wbapp/haibao/pk?limit=1&tab=' + data.division + '&page=' + page;
				var t = setTimeout(function(){
					urlHandle.redirect(url);
				},3000);
			};
		$.post(url , data , callback ,'json');
	};
	return function(){
		$('.judge_menu').find('.jm_tab1, .jm_tab2').bind('click', function(){
			var filter = $(this).attr('filter');
			$('.jm_tab1').addClass('jm_focus1');
			$('.jm_tab2').addClass('jm_focus2');
			$(this).removeClass('jm_focus' + filter);
			$('.judge_con').find('.jc_filter').hide();
			$('.judge_con').find('.jc_filter[filter=' + filter + ']').show();
		});
		$('.dr_votes').bind('click', function(){
			var box = $(this).parents('.daren_box'),
				division = $(this).parents('.division').attr('division'),
				url = 'http://www.meilishuo.com/wbapp/haibao/pk?limit=1&tab=' + division,
				desc = '我喜爱的' + box.find('.dr_name').text() + '正在参加@美丽说 时尚偶像巅峰对决，希望大家能为她投一票>>',
				pic = $(this).parents('.daren_box').find('.dr_pic').find('img').attr('src');
			share.shareToWeibo(url , desc , pic);
		});

		$('#applyBtn').bind('click', function(){
			if(!check()) return false;
			var html = shareTmp('haibaopkUploadPicTpl');
			dialog.meiliDialog({
				dialogTitle : "我要报名",
				dialogWidth : 480,
				dialogContent : html,
				onStart : function(){
					var url = '/activity_daren/check_user',
						data = {}, 
						callback = function(res){
						//	console.log(res)
							if(res == 'OK')
							$('#division3').parent().show();    
						};  
					$.post(url , data , callback);

					uploadPic();
					$('#onSubmitApplyBtn').bind('click', function(){
						$(this).unbind('click');
						var t = setTimeout(function(){
							$(this).bind('click', submitApply);
						},200);
						submitApply();
					});
					$('#onCancelApplyBtn').bind('click',function(){
						$('.close_z').click();
					}); 
				},
				onClose : function(){}
			}); 
		});
	}
});
