fml.define('app/updateNt' , ['jquery'],function (require, exports){
	var $ = require('jquery')
    window.setInterval(function(){
        $.post('/aj/upNt/',{'nt':Meilishuo.config.nt},function(res){
            if (res && res.nt)
                Meilishuo.config.nt = res.nt
            },'json')
        },300000)
	
	})
