fml.define('order_pc/complain/complain_detail' , ['jquery','component/focus','component/shareTmp','ui/alert','ui/confirm','ui/dialog','ui/uploadBtn'] , function(require){
	var $ = require('jquery');
	var Alert = require('ui/alert');
    var Confirm = require('ui/confirm');
	var shareTmp = require('component/shareTmp')
	var Focus = require('component/focus')
		,dialog = require('ui/dialog');

	Focus.inputFocus('#textArea');

	// 已解决
	$('.done').on('click',function(){
		var _this=$(this);
		$.post('/complain/close/',{order_id:_this.parents('.complain_info').attr('order_id')},function(data){
			if(data.code==0){
				$('.sucess').show();
				_this.parent().hide();
				$('.onCancel').click()
			}
		},'json');
	});

	// 未解决
	$('.deal').on('click',function(){
		$('.complain_cont').slideDown();
		//上传图片
		var uploadButton = $('#uploadImg'),
		uploadBtn = require('ui/uploadBtn');
		$('.imgUpload span.close').live('click',function(){
			$(this).parent().remove();
		});
    	uploadBtn.bind(uploadButton , {
		    'behind' : Meilishuo.config.domain.webapi + '/imageupload/pic_upload?big=1'
		    //'behind' : 'http://webapi.pmlab1.meilishuo.com/imageupload/pic_upload?big=1'
		    ,crossDomain:true
		    //,backuri : 'http://order_pc.fedevot.meilishuo.com/aw/proxy/'
		    ,backuri : Meilishuo.config.domain.order + '/aw/proxy/'
		    ,'success' : function(data,obj){
		    	console.log(data);
		        if (typeof data.code != 'number') {
		        	var imgWrapper = $('.evidence');
		        	if(imgWrapper.children().length>=4){
		        		return new Alert({
		        			width:370,
		        			content:'最多上传4张图片！'
		        		});
		        	} else {
		        		imgWrapper.append(shareTmp('imgTmp',data));
		        		imgWrapper.nextAll('.wrong_tip').html('');
		        	}
			    } else {
			    	return new Alert({
	        			width:370,
	        			content:data.msg
	        		});
			    }
		    }
		    ,'error' : function(){
	        }
		    ,'timeout' : 30000
	    });
    	uploadButton.parent('.ntBdaolpu').css({
    		width: '92px',
    		height: '30px',
    		float: 'left'
    	});
	});

	// 撤销投诉
	$('.cancel_complaint').on('click', function (){
		var _this=$(this),
			mes = confirm("亲，你投诉的内容是否已经得到妥善解决，确定要撤销投诉吗？");

		if(mes){
			$.post('/complain/cancel/',{order_id:_this.parents('.complain_info').attr('order_id')},function(data){
				if(data.code==0){
					$('.sucess').show();
					_this.parent().hide();
					$('.onCancel').click()
				}
			},'json');
		}
	});

		$('.onCancel').click(function(){
			$('.complain_cont').slideUp();
		});

    	//限制文字字数
		$('#textArea').keyup(function(){
    		$('.text_num span').text($(this).val().length);
    		if($(this).val().length>500){
    			$(this).val($(this).val().substring(0,500));
    			new Alert({
    				width:370
    				,content:'文字不能超过500个字符'
    			})
    		}
    	})

		//确定按钮
    	$('.onSure').on('click',function(){
    		//投诉内容
    		var feed_detail = $('#textArea').val();
    		if(feed_detail.length < 1){
    			new Alert({
					width:380,
					content:'投诉内容不能为空'
				});
				return false;
    		}
    		//上图图片凭证
    		var complain_evidence = $('.evidence img').map(function(i,img){
					return $(img).attr('data-src');
				}).toArray();
    		$.ajax({
				type:'post'
				,url:'/aj/doota/feedback_add'
				,data:{
					bat_order_id :$('.complain_info').attr('order_id')
					,feed_type : $('.complain_info').attr('feed_type')
					,feed_detail : feed_detail
					,feed_img : complain_evidence
				}
				,dataType:'json'
				,success:function(data){
					console.log(complain_evidence);
					if (data.code == 0) {
						var _box=$('.complain_user:eq(0)').clone(true);
						_box.find('.user_time em').text(data.time);
						_box.find('.complain_msg .order_cont').html('投诉详情：'+ feed_detail);
						//
						var evidence=$('.evidence').clone();
						var imgUpload=evidence.find('.imgUpload');

						if(imgUpload.length>0){
							imgUpload.addClass('img_detail').removeClass('imgUpload');
							imgUpload.find('.close').remove();
							_box.find('.img_list').show().html(evidence.html());
						}else{
							_box.find('.img_list').hide();
						}
						$('.complain_cont').hide();
						$('.complain_cont #textArea').val('');
						$('.complain_cont .evidence').html('');
						$('.status').before(_box);
						_box.css('display','none');
						_box.slideDown(1000);
						//_box.animate({height:_box.outerHeight()},500);
					}else{
						new Alert({
							width:380,
							content:data.msg
						});
					}
				}
				,error: function(data){
					new Alert({
						width:380,
						content:'系统错误，请重新提交'
					});
				}
			})	
    	
    	});



	
});
