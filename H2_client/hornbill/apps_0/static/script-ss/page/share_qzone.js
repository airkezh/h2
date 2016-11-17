fml.define('page/share_qzone' , ['jquery'] , function(require , exports){
	var $ = require('jquery')
	var frm = 'frm=QQaiguang'
	$('a').live('click' , function(){
		var search = this.search
		if (-1 == this.className.indexOf('price_go') && -1 ==  search.indexOf(frm)){
			this.href += search ? '&' : '?'
			this.href += frm
			}
		})

	})
