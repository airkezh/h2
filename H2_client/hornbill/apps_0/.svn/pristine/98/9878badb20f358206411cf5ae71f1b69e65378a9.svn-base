fml.define('wap/client/component/clientUse', [], function(require, exports){
	if(!window.MLS){
		window.MLS = {};
	}
	window.MLS.didLogin = function(){
		window.location.reload();
	}

	var uploadQueue = {};
	function addUploadQueue(id,btn,cb){
		uploadQueue[id] = {
			btn : btn,
			cb : cb
		}
	}
	window.MLS.onUploadComplete = function(dataStr){
		var data = JSON.parse(dataStr);
		var uploadId = data.json_params.upload_id;
		if(uploadQueue[uploadId]){
			var btn = uploadQueue[uploadId].btn
				, cb = uploadQueue[uploadId].cb
			cb(data,btn);
		}
	}

	/*
		http://redmine.meilishuo.com/projects/meilishuo-mob/wiki/Meilishuo_URL_Scheme
	*/
	var callClient = {
		//跳转至客户端“登陆”
		toLogin : function(){
			if(Meilishuo.config.user_id == 0){
				window.location.href = 'meilishuo://login.meilishuo';
			}
		},
		//跳转至客户端”我的优惠券“
		coupons : function(){
			window.location.href = 'meilishuo://coupons.meilishuo';
		},
		//上传图片，点击时绑定回调
		upload : function(btn,cb){
			var uploadId = (new Date()).getTime() + "";
			addUploadQueue(uploadId,btn,cb)
			var jsonParams = '{"upload_id":"'+uploadId+'"}';
			window.location.href = 'meilishuo://upload.meilishuo?json_params=' + encodeURIComponent(jsonParams);
		},
		//绑定上传图片
		bindUpload : function(btn,cb){
			var btn = $(btn);
			var uploadId = getNewId();
			while(uploadQueue[uploadId]){
				uploadId = getNewId();
			}
			addUploadQueue(uploadId,btn,cb)
			var jsonParams = '{"upload_id":"'+uploadId+'"}';
			btn.on('tap',function(){
				window.location.href = 'meilishuo://upload.meilishuo?json_params=' + encodeURIComponent(jsonParams);
			});
			//btn.attr('href','meilishuo://upload.meilishuo?json_params=' + encodeURIComponent(jsonParams))
			function getNewId(){
				return ~~(Math.random()*100000) + "";
			}
		}
	}

	/*
		http://redmine.meilishuo.com/projects/meilishuo-mob/wiki/In-App_JS_API
	 */
	var responseClient = {
		didLogin : function(cb){
			if(typeof cb == 'function'){
				window.MLS.didLogin = cb;
			}
		}
	}

	exports.callClient = callClient;
	exports.responseClient = responseClient;
});
