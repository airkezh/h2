fml.define('component/up_label' , ['jquery'] , function(require,exports){
	var $ = require('jquery')
		,_default_server = '/'
		,_allow_suffix = ['jpg']

	/*
	* config
	*.server : upload to where
	*.upfield : html or function ,set while want no auto upload 
	*.suffix : array ,[filetype]
	*/
	exports.init = function(label ,config, callOnUped ,callOnError){
		config = config || {}
		if (config.upfield){
			$(label).click(function(){
				('function' == typeof config.upfield ?　config.upfield() :　$(config.upfield)[0]).click()
				})
			return
			}

		var _old_filename
			,ifrid = '_file' + Math.random() 
			,_suffix = config.suffix || _allow_suffix || []
		
		var form = $("<div style='display:none'><form target="+ifrid+" method=POST" +
		"enctype=multipart/form-data action='"+ (config.server || _default_server)+"'> " + 
		"<input type=file /></form><iframe src='' id="+ifrid+" name="+ifrid+"></iframe></div>")
			.appendTo('body')

		form.find('iframe').bind('load',function(){
			if ('about:blank' == this.contentWindow.location) return
			callOnUped(this.contentWindow.document.body.innerHTML)
			})	

		var file = $('input',form).bind('change' , function(){
			var file_name = this.value.toLowerCase()
			if (_old_filename == file_name) return
			_old_filename = file_name

			var suffix = file_name.substr(file_name.lastIndexOf('.') + 1)
			if (callOnError){
				for(var i = _suffix.length-1 ; i>=0 ;i--){
					if (suffix == _suffix[i]) break
					} 
				if (i < 0 && _suffix.length ) return callOnError('type' , suffix)
			}

			this.form.submit()
			
			})[0]

		$(label).bind('click' , function(){
			file.click()
			})
		}
	})
