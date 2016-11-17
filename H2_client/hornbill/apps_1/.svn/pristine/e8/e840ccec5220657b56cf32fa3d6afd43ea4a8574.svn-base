fml.use('app/welfare_apply' , function(){});
fml.use('app/countdown' , function(){ this(); });
fml.define('page/huodong/origins_marry' , ['jquery' , 'app/checkLogin' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	var dialogUI = require('ui/dialog');
    var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');

	String.prototype.getBytes = function() {
		var cArr = this.match(/[^\x00-\xff]/ig);
		return this.length + (cArr == null ? 0 : cArr.length);
	}

	$('.pop_btn1 , .pop_btn2').on('click' , function(){
		var index1 = $('.pop_btn1').index($(this));
		var index2 = $('.pop_btn2').index($(this));
		var pop_index = 0;
		index1 == -1 ? pop_index = index2 : pop_index = index1;
		var link = $(this).siblings('a').attr('href');

		var html = shareTmp('pop');
		var dialog = new dialogUI({
				'content' : html,
				'width' : '644px',
				'onChange' : function(){
					$('#dialogTitle').hide();
			        $('#dialogLayer').css({'background' : 'none' , 'padding' :'0'});
					$('#pop_box').attr('class' , 'pop' + pop_index);
					$('#pop_box a').attr('href' , link);
				}
			});
		$('.close_btn').on('click' , function(){
	        dialog.drive.destroyModel();
        });
		$('.tui').on('click' , function(){
			var text = $(this).siblings('input').val();
			if(text == "") return;
			if(text.getBytes() > 28){
				alert('不能超过14个字哦~');
				return;
			}
			$(this).html('提交中...').attr('disabled','disabled');
			$.get('/aj/huodong/origins_marry_tui' , {'actName' : 'origins_marry' , 'img_idx' : (pop_index + 1) , 'img_text' : text} , function(r){
				if (!r && !r.data) return;
				$('#pop_box').hide();
				$('.over').show();
				//sina share
				$('.share_sina').on('click' , function(){
					var s_url = location.href;
					var s_desc = "我刚刚许下了圣诞心愿并为自己挑选了一份Origins悦木之源圣诞新年礼盒套装，你也来为自己的圣诞节挑选一份礼物吧，让肌肤和你一起欢度这个白雪圣诞～ ";
					var s_img = r;
					share.shareToWeibo(s_url, s_desc, s_img);
					dialog.drive.destroyModel();
				});

			} , 'json');

		});
	});


});
