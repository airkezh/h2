fml.define('wap/component/uploadBtn' ,['wap/zepto','wap/zepto/touch','wap/app/tracking'] , function(require,exports){
	var tracking = require('wap/app/tracking');
	function wrapInp(inp , opt){
		opt = opt || {}
		var multiple = opt.multiple
			,inputName = opt.inputName || 'attach'
		inp = $(inp)
		var wrapPnl = inp.css({'position':'relative'})
		
		var fileInp = $('<input type="file" accept="image/*" capture="camera" style="" name="'+ inputName +'" '+(multiple?'multiple':'')+' />')
					.css({'position': 'absolute','left':0,'top': 0,'cursor':'pointer','opacity' : 0, 'width':'100%', 'height':'100%','margin':0,'padding':0})
					.appendTo(wrapPnl)
		return wrapPnl
	}

	function bindH5(inp , opt){
		var loadingFileNum = 0; //正在上传的图片数量
		opt.fileNum = 1
		var wrapper = wrapInp(inp ,opt).on('change' , 'input[type=file]' ,sendFile )

		function getForm(){
			var form = new FormData
			if (opt.plusData){
				for (var name in opt.plusData){
					form.append(name, opt.plusData[name])
					}
				}
			return form
		}

		function sendAjax(fd , fileIndex , fileName){
			!loadingFileNum && opt.start && opt.start(inp)
			var xhr = new XMLHttpRequest()
			var sendTime = new Date()
				,_timer
			xhr.onreadystatechange = function(){
				if (xhr.readyState != 4) return;			
				xhr.onreadystatechange =null;
				_timer && window.clearTimeout(_timer)
				~(function(){
					if (xhr.status != 200){
						//return opt.error && opt.error({'description':'not 200'} , inp , xhr.status , fileIndex ,fileName)
						return opt.error && opt.error({'description':'网络错误，上传失败'} , inp , xhr.status , fileIndex ,fileName)
						}
					var errRaised = false
					try {
						var ret = JSON.parse(xhr.response);
					} catch (err){
						errRaised = true
						tracking.cr('doota/op/upfail/err',{userid: Meilishuo.config.user_id ,sendTime:sendTime,err:err})
						return opt.error && opt.error({'description':err} , inp , ret , fileIndex ,fileName)
					}
					!errRaised && opt.success && opt.success(ret , inp , fileIndex ,fileName)
				})();
				loadingFileNum--;
				!loadingFileNum && opt.final && opt.final(inp);
			}
		if (opt.progress){
			xhr.upload.addEventListener('progress', function(e){
				opt.progress(inp, e.loaded/e.total,fileIndex ,fileName)
			}, false)
			}
		
		loadingFileNum++;
		xhr.open('POST', opt.behind || '/imageupload/pic_upload')
		xhr.send(fd)

		if (opt.timeout){
			_timer = window.setTimeout(function(){
				opt.error && opt.error({'description':'上传超时失败'} , inp)
				//opt.error && opt.error({'description':'timeout'} , inp)
				xhr && xhr.abort()
				_timer && window.clearTimeout(_timer)

				tracking.cr('doota/op/upfail/timeout',{'sendTime':sendTime ,userid: Meilishuo.config.user_id})
				loadingFileNum--;
				!loadingFileNum && opt.final && opt.final(inp)
				} , opt.timeout)
			}
		}

		function sendFile(){
			var inputName = this.getAttribute('name')
			var files = this.files
			if (!files.length) return
			if (opt.maxFileNum && files.length > opt.maxFileNum){
				return opt.error && opt.error({'description':'每次最多上传'+ opt.maxFileNum + '张图片，请重新选择'} , inp )
				//return opt.error && opt.error({'description':'file numbers > '+ opt.maxFileNum} , inp )
				}

			//存在大于5M的图片时自动过滤
			for (var i =0 ; i<files.length;i++){
				if(files[i].size > 50*1024*1024){
					return opt.error && opt.error({'description':'图片大小不能超过5M，请重新选择'} , inp )
				}
			}
			
			var fileNum = opt.fileNum || files.length
			for (var i =0 ; i<files.length;){
				var fd = getForm()
					,fileIndex = []
					,fileName = []
				for(var j = 0 ;j< fileNum;j++){
					fd.append(inputName,files[i])
					fileIndex.push(i)
					fileName.push(files[i].name)
					i++
				}
				fd.append('fileIndex',fileIndex)
				fd.append('fileName',fileName)
				fd.append('fileCount',files.length)
				fd.append('is_m','1');
				sendAjax(fd ,fileIndex , fileName)
			}
			this.value = ''
		}
	}

	var supportH5 = (window.FormData !== undefined  && window.XMLHttpRequest !== undefined)
	exports.bind = function(inp , opt){
		if(!supportH5) return;
		$.each($(inp) , function(){bindH5(this , opt)})
	}
})