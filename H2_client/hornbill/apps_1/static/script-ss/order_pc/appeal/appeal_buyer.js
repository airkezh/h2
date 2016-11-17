fml.define('order_pc/appeal/appeal_buyer' , ['jquery','ui/alert','ui/uploadBtn','component/shareTmp'] , function(require , exports){
	var uploadButton = $('.upload_btn'),
		shareTmp = require('component/shareTmp'),
		Alert = require('ui/alert'),
		UploadBtn = require('ui/uploadBtn');

	var alert = function(msg){
		return new Alert({
			content:msg,
			width:370
		});
	}

	UploadBtn.bind(uploadButton , {
		'behind' : Meilishuo.config.domain.webapi + '/imageupload/pic_upload?big=1'
		//'behind' : 'http://webapi.pmlab1.meilishuo.com/imageupload/pic_upload?big=1'
		,crossDomain:true
		//,backuri : 'http://order_pc.fedevot.meilishuo.com/aw/proxy/'
		,backuri : Meilishuo.config.domain.order + '/aw/proxy/'
		,'success' : function(data,obj){
			if (typeof data.code != 'number') {
				var imgwrap = "."+$(obj).attr("data-btn");
				var imgWrapper = $(imgwrap);
				if(imgWrapper.children().length>=5){
					alert('最多上传5张图片！')
				} else {
					imgWrapper.empty();
					imgWrapper.append(shareTmp('imgTmp',data));
					imgWrapper.nextAll('.error').html('')
				}
			} else {
				alert(data.msg);
			}
		}
		,'error' : function(){

		}
		,'timeout' : 30000
	});
	uploadButton.parent('.ntBdaolpu').css({
		position:"absolute",
		top:"0",
		left:"0"
	});
	//提交举证
	Alert = require('ui/alert');
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:370
		});
	}
	$('.imgUpload span.close').live('click',function(){
		$(this).parent().remove();
	});
	$('#submit_btn').on('click',function(){
		var wrapper = $('.prove_info')
		//清除所有提示
		wrapper.find('.error').html('');

		//申诉说明
		if(!$.trim(wrapper.find("textarea").val())){
			$("#description").html("请填写申诉说明");
			return;
		}

		if(!wrapper.find('.imgUpload').length){
			wrapper.find("#proveError").html('请上传申诉凭证');
			return;
		}

		//验证非空
		var notNulls = [
			{name:'concact',tip:'请填写联系人'}
			,{name:'phone',tip:'请填写手机号'}
		]
		for (var i = 0; i < notNulls.length; i++) {
			var name = notNulls[i].name
				,tip = notNulls[i].tip
			var $name = wrapper.find('[name='+name+']')
			if(!$.trim($name.val())){
				$name.nextAll('.error').html(tip);
				return;
			}
		}


		//手机号
		if(!/^0?(13|15|18|14)[0-9]{9}$/.test(wrapper.find('[name=phone]').val())){
			wrapper.find('[name=phone]').nextAll('.error').html('手机号格式不正确')
			return;
		}

		postForm();

		function postForm(){
			var pics = []
				,as = wrapper.find('.imgUpload a')
			for (var i = 0; i < as.length; i++) {
				pics.push(as.eq(i).attr('href'));
			}
			var data = {
				description : wrapper.find('[name=description]').val()
				,concact : wrapper.find('[name=concact]').val()
				,phone : wrapper.find('[name=phone]').val()
				,pics : pics
				,refund_id : Meilishuo.config.refundId
			}
			$.post('/aj/doota/appeal_initiate', data, function(data, textStatus, xhr) {
				alert('提交成功').onSure(function(){
					window.location.href = '/refund/?refund_id=' + Meilishuo.config.refundId;
				});
			},'json').error(function() {
				alert('系统错误，请重新提交一下试试');
			});
		}
	});

});
