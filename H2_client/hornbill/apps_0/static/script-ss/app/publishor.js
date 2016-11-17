fml.define('app/publishor', ['jquery', 'app/smile', 'app/twitterApi', 'ui/alert', 'app/checkLogin', 'app/sharePost', 'component/regString', 'component/shareTmp', 'app/insertAtCaret'], function(require, exports){
	var smile = require('app/smile');
	var shareTmp = require('component/shareTmp');
	var sharePost = require('app/sharePost');
	var insertAtCaret = require('app/insertAtCaret');
	var check = require('app/checkLogin');
	var getStrLen = require('component/regString').getStringLength;
	var dialogShow = sharePost.dialogShow;
	var twitterApi = require('app/twitterApi').twitterApi;
	var alert = require('ui/alert');

	var options = {'type':'picture', 'group_id':Meilishuo.config.mag_id, 'name':Meilishuo.config.mag_name, 'activity_id':Meilishuo.config.activity_id};		//argus for submit

	var $editorbg = $('.editorbg');
	var $editor = $editorbg.find('.editor');
	var $message = $editorbg.find('.message');
	var $wrapper = $editorbg.find('.wrapper');
	var $toggle = $('.toggle');
	var $shareGoods = $('#shareGoodsLink');

	var showMessage = function(text) {
		$message.html(text).show();
	};
	var hideMessage = function() {
		$message.hide();	
	}

	var alertTip = function(content) {
		new alert({
			content: content, 
			width: 370
		});		
	}

	var publish = {};

	publish.init = function(){
		$toggle.click(function(){
			if (!check()) return false;
			$toggle.not(this).removeClass('active').removeData('isAddClass');
			$shareGoods.hide();
			$(".smileysbox").hide();
		});
		publish.addFace();
		publish.addGoods();
		publish.addTopic();
		publish.addPic();
		publish.submit();
		$editor.keydown(function(){ hideMessage(); })
	}

	publish.addFace = function() {
		smile.showSmile('.editorbg', '.toggle_smileys', 'publish');
	}

	publish.addGoods = function() {
		var $toggleGoods = $editorbg.find('.toggle_goods'); 
		function addGoodsFun(e){
	//		e.stopPropagation();
			if ($shareGoods.length === 0) {
				$shareGoods = $(shareTmp('shareGoodsLinkTpl'));
				$shareGoods.prepend('<div class="line"></div>')
				$editorbg.append($shareGoods)
			}
			if (!$toggleGoods.data('isAddClass')) {	
				$toggleGoods.data("isAddClass","true");
				$toggleGoods.addClass('active');
				$shareGoods.show();
				$("#addGoodsSubmit").unbind('click').bind("click",function(){
					var goodsUrl = $shareGoods.find(".add_goods_url").val();
					dialogShow.goodsAjax(goodsUrl, goodsForUpload);
				});
			} else {
				$toggleGoods.removeData('isAddClass');
				$toggleGoods.removeClass('active')
				$shareGoods.hide();
			}
		}
		var $goodsHolder = $(
			'<div class="none_f goods_holder holder left_f">' +
				'<div class="tedit_icon"><div class="close_z"></div></div>' +
				'<div class="goodspic left_f"><img class="goods_pic" /></div>' +
				'<div class="goodspic_r"><h3></h3>' +
				'<div class="goods_price"></div></div>' +
				'<div class="clear_f"></div>' + 
			'</div>'
		);
		$wrapper.append($goodsHolder);
		$wrapper.on('click', '.close_z', function(){
			if ($(this).parent().parent().hide().hasClass('goods_holder')) {
				options.goodsID = 0;
				options.type = 'picture';
			} else {
				options.pic_id = false;
			}
		})

		function goodsForUpload(response , goodsUrl , res){
			hideMessage();
			$shareGoods.hide();
			$goodsHolder.find('.goods_pic').attr('src', response.data.gInfo.image);
			$goodsHolder.find('h3').html(response.data.gInfo.title);
			$goodsHolder.find('.goods_price').html(response.data.gInfo.price);
			$goodsHolder.show();
			options.image = response.data.gInfo.image
			options.title = response.data.gInfo.title;
			options.goodsID = response.data.gInfo.goodsID;
			options.type = 'goods';
			$toggleGoods.removeClass('active').removeData('isAddClass');
			$editor.focus();
		}
		$('.pub_list').on('click', '.toggle_goods', addGoodsFun);
	}

	// add topic
	publish.addTopic = function() {
		var $topic = $('.toggle_topic');
		$('.pub_list').on('click', '.toggle_topic', addTopicFun);
		function addTopicFun() {
			var defaultText = '#输入话题标题# ';
			var v = $editor.val();
			var pos = v.search(defaultText);
			if (-1 === pos) {
				insertAtCaret($editor, defaultText);
				v = $editor.val();
				pos = v.search(defaultText);
			}
			selectRange($editor, pos+1, pos+7);
		}
		function selectRange(obj, start, end) {
			return obj.each(function(){
				if (this.setSelectionRange) {
					this.focus();
					this.setSelectionRange(start, end);
				} else if (this.createTextRange) {
					var range = this.createTextRange();
					range.collapse(true);
					range.moveEnd('character', end);
					range.moveStart('character', start);
					range.select();
				}
			});
		}
	}

	// add picture
	publish.addPic = function() {
		var $picUpload = $(
			'<div style="height:0; width:0; opacity:0;">' +
				'<form method="post" enctype="multipart/form-data" action="/imageupload/pic_upload" target="picture_upload_iframe">' +
					'<input type="file" size="1" name="attach" class="upload_file pa_f" style="width:80px; top:125px; left:184px; height:34px; z-index:99; filter:alpha(opacity=0); opacity:0; cursor:pointer;" />' +
					'<input type="hidden" name="ajax" value="1" />' +
					'<input type="hidden" name="domain" value="0" />' +
				'</form>' +
				'<iframe src="about:blank" id="picture_upload_iframe" name="picture_upload_iframe" style="display: none;"></iframe>' +
			'</div>'
		);
		var $uploadPicHolder = $('<div class="upload_pic_holder holder none_f left_f"><div class="tedit_icon"><div class="close_z"></div></div><img /></div>');

		var $togglePic = $editorbg.find('.toggle_pic')
		var $uploadForm = $picUpload.find('form');
		var $uploadFile = $picUpload.find('.upload_file');
		$editorbg.append($picUpload);
		$wrapper.append($uploadPicHolder);
		$uploadFile.click(function(){
			if (!check()) return false;
			$toggle.not(this).removeClass('active').removeData('isAddClass');
			$shareGoods.hide();
			$('.smileysbox').hide();
			$uploadFile.change(uploadFun);
		});
		function uploadFun(){
			var filename = $(this).val();
			// validate file extension
			if (!/\.(gif|jpg|png|jpeg|bmp)$/i.test(filename)) {
				$(this).val();
				showMessage('请上传标准图片文件, 我们支持gif,jpg,png和jpeg.');
				//put focus back to editor
				$editor.focus();
				return false;
			}
			$uploadPicHolder.find('img').attr('src', '');
			$uploadPicHolder.hide();
			$uploadForm.submit();
			$editor.focus();
			showMessage('正在上传图片');
		}
		var up_iframe = document.getElementById('picture_upload_iframe');
		var upload_cbk = function(res){
			if (this.readyState && this.readyState != 'complete') return;
			var iframe = up_iframe.contentDocument || up_iframe.contentWindow.document;
			var res = iframe.body.innerHTML.replace(/<.*?>/g,'').replace('&amp;', '&');
			if(!res) return;
			res = $.parseJSON(res);
			hideMessage();
			if (res.code) {
				alertTip(res.msg);
			} else {
				$uploadPicHolder.find('img').attr('src', res.pic_url);
				$uploadPicHolder.show();
				options.pic_id = res.pic_id;
			}
		}
		up_iframe.attachEvent ? up_iframe.attachEvent('onload', upload_cbk) : up_iframe.onload = upload_cbk;
	}

	publish.submit = function() {
		function createTwitter(type) {
			var callback = function(res){
				if (res.code) {
					alertTip(res.msg);
					isLoad = 0;
					return false;
				}
				$editor.val('');
				window.location.href = window.location.href;
			}
			if (type === 'goods') { // 宝贝
				var data = {
					type : 7,
					tContent: options.content,
					gPicID: options.pic_id || 0,		//当同时发宝和发图片时，替换发宝的图片
                    goodsID: options.goodsID,
					activity_id: options.activity_id || 0,
					goods_pic_url : options.image,
					goods_title : options.title, 
					group_id : options.group_id,
					name : options.name,
					tagvalue : Meilishuo.config.tag_id , 
					tag : Meilishuo.config.tag
				};
				twitterApi('create', data, callback);
			}
			else if (type === 'picture'){ // 图片
				var data = {
					tContent: options.content,
					activity_id: options.activity_id || 0,
					group_id : options.group_id,
					name : options.name,
					type: 5 ,
					tagvalue : Meilishuo.config.tag_id , 
					tag : Meilishuo.config.tag
				};
				if (options.pic_id) {
					data['pid'] = options.pic_id;
					data['type'] = 2;
				}
				twitterApi('create', data, callback);
			}		
		}
		var isLoad = 0;
		$editorbg.find('.pub_sub').click(function(){
			if (!check()) return false;
			if (isLoad) return;
			if (Meilishuo.config.controller === 'magazine' && !Meilishuo.config.is_editor) {
				showMessage('成为杂志的编辑才能发言哦~');
				return false;
			}
			options.content = $.trim($editor.val());
			if (options.content.length == 0) {
				showMessage('说两句吧~~~');
				$editor.focus();
				return false;
			} else if (getStrLen(options.content) > 140) {
				showMessage('不超过140个字哦~~~');
				$editor.focus();
				return false;
			}
			isLoad = 1;
			createTwitter(options.type);	
		});
	}

	//start
	publish.init();
});
