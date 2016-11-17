fml.define('app/huodong/choujiang' , ['jquery' , 'app/checkLogin' , 'app/setSync' , 'app/magazine' , 'ui/dialog' , 'ui/alert' ,'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');  
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var setSync = require('app/setSync');
    var alertDialog = require('ui/alert');
	var check = require('app/checkLogin');
	var isForward = true;
	var dialogFn = null;

	return function(){
		$('#tryLucky').bind('click' , function(){
			if(!check()) return;
			if($(this).attr('status') == '0'){
				var html = '<div class="prizePanel"><p>你已经达到转发20次的上限了,感谢你的热情参与!</p></div>';
				new alertDialog({
					content : html,
					width : 370
				})
				return;
			}else{
				var html = shareTmp('forwardActive');  
			};
			new dialog({
				content : html	
			})
			setSync.setShareTips();
			$('body').append('<img  width="0" height="0" src="/oreal_activity/oreal_popups?frm=oreal_popups" />');
		}); 
		$('.showActiveRole').bind('click' , function(){
			var html = shareTmp('activeRole')
			new dialog({
				content : html,
				width : 520,
				title : '活动详细规则'
			})
		});
		$('#closePrizePanel').live('click' , function(){
			if($('.checkForward:checked').length > 0){
				$.post('/oreal_activity/confirm' , {} , function(){} , 'json');	
			}
			dialogFn.drive.destroyModel();
		});
		$('#goOnForward').live('click' , function(){
			$('#tryLucky').trigger('click');
		});
		$('#forwardPrize').live('click' , function(){
			$('.show_message_tips ').css('top' , '23px').show();
			var url = '/oreal_activity/ajax_haibao';	
			var content = $('#forwardContent').val();
			var data = {
				content : content,
                syncToWeibo: $(this).parents('.maga_zf').find('[s_name=weibo]').attr('s_type') == 1 ? 'true' : 'false',
				actName : 'oreal'
			}
			var callback = function(response){
				isForward = true;
				$('#tryLucky').attr('status' , response.status);
				if(response.nums.length != 0){
					$.each(response.nums , function(index , data){
						var top = Math.floor(data/96),left = Math.floor(data%96);
						var prizeBlock = '<div style="position:absolute;background:url( '+ fml.vars.useBg +' ) ' + -(left*10) + 'px ' + -(top*10) + 'px;top : ' + (top*10) + 'px;left : ' + (left * 10) + 'px;">';
						$('.lucky_box').append(prizeBlock);
					});
				}
                $('.joinNums').html(+($('.joinNums').text()) + 1);
                dialogFn = new dialog({
                    title : '抽奖',
                    content : '<div class="prizePanel"> <p>抽奖中...</p><p><img src="http://i.meilishuo.net/css/images/huodong/choujiang/randomPrize.gif"></p> </div>'
                });
                setTimeout(function(){
                    if(response.lottery.lottery || response.lottery.trial){
                        var prizeName = '';
                        if(response.lottery.lottery)
                            prizeName = '正品';
                        else
                            prizeName = '试用装';
                        var html = '<p style="text-align:left">恭喜你，获得了欧莱雅肌底透白柔肤液+多重滋润霜 '+ prizeName +'1份，我们会在活动结束后10个工作日内私信联系你领奖事宜。</p><p><img src="http://i.meilishuo.net/css/images/huodong/choujiang/prize.jpg"></p><p class="mt5_f"><input class="checkForward" checked="true" type="checkbox" /> 同步中奖信息到我的首页</p><p><span class="prize_btn btn" id="closePrizePanel">确定</span></p>';
                    }else{
                        var html = '<p>感谢参与活动，这次没有中奖，继续转发还能获得抽奖机会，要不要试试？</p><p><span class="prize_btn btn" id="goOnForward">我要继续转发</span></p>';
                    }
                    $('.prizePanel').html(html);
                } , 2000);

			}
			if(isForward){
				$.post(url , data , callback , 'json');
				isForward = false;
			}
		});
	}
});
