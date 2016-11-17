/*common*/	
require('wap/zepto/fastclick');
require('wap/app/dialog');

	var signWX = require('wx/sign'), 
		shareWX = require('wx/share'),
		shareTmp = require('wap/component/shareTmp');

	var $main = $('.qa-main')
		, $list = $('.qa-list')
		, arrList = (fml.vars.qustions).slice(1)
		, qaHtml = ''
		, qaDetail = '';

	var init = function(){
		for(i = 0; i < arrList.length ;i++){
			var qid = i+1;
			qaDetail = '';
			for(s = 0; s < arrList[i].items.length; s++){
				qaDetail += '<label><input class="m-radio" name="answer-'+qid+'" type="radio"/><span>'+arrList[i].items[s].answer+'</span></label>'
			}
			qaHtml += '<section class="qa-list num-'+qid+'" number="'+qid+'"><img src="'+ arrList[i].img +'"><ul class="qa-cont"><li>'+ qaDetail +'</li></ul></section>'
		}
		$main.find('.qa-list').after(qaHtml)
	}

	init();

	var curNumber = 0;
	$('.btn_qa_next').on('tap', function(){
		var $all = $main.find('qa-list')
			, $this = $(this);

		if($main.find('input[name= "answer-'+ curNumber +'"]:checked').length == 0){
			var tpl = shareTmp('wrongTips');
			$('dialogLayer').css('width', "50%");
			$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
			$('body #maskLayer').on('tap', function(){
				$('.closeDialog').trigger('tap');
			})	
		}else{
			curNumber = curNumber+1;
			if(curNumber == arrList.length+1){
				window.location.href = '/activity/summerFuide/mark/'
			}else{
				$main.find('.qa-list').hide().eq(curNumber).show();
				if(curNumber == arrList.length){
					$this.text('查看结果')
				}
			}
		};
	})

	signWX();
	shareWX.bind({
		'desc':'快来发掘你的时尚基因，和鹿晗一起开启最时髦的热力summer吧！',
		'imgUrl':'http://d01.res.meilishuo.net/pic/_o/ed/d4/eaa1c2ec43ec14714f2ff6d9fac7_100_100.cg.jpg',
		'title': '暑假约男神 霸占时尚圈',
		'link': 'http://m.meilishuo.com/activity/summerFuide/home/'
	});

