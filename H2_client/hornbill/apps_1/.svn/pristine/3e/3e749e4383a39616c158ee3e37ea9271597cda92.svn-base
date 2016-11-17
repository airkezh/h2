fml.use('m/app/slideOpen' , function(){
	this.tapSlider();
	this.tapDefault();
	$('#openApp').trigger('tap')
	// setTimeout(function(){$('.daoliuBanner').find('.slider').trigger('tap');},1000)
});
fml.define('m/page/welcome',['m/zepto/touch', 'm/app/goAppWelcome'] ,function(){
	
	/* baidu lightapp js */
	var e = document.createElement("script");
	var s = document.getElementsByTagName("script")[0];
	e.type = "text/javascript";
	e.name = "baidu-tc-cerfication";
	e.src = "http://apps.bdimg.com/cloudaapi/lightapp.js#b9f5e498889cf25a702988eebd2a53a9";
	s.parentNode.insertBefore(e, s);

	window.bd && bd._qdc && bd._qdc.init({app_id: '18a49f24d007a1e8a816bd2c'});
	/* baidu lightapp js */

	var personArea = $('#personArea')
	$('#personBtn').on('tap', function(){
		if(Meilishuo.config.user_id == '0')
			window.location = '/user/login'

		if(personArea.attr('isShow') == "0") {
			personArea.show()
			personArea.attr('isShow', "1")
		}
		else {
			personArea.hide()
			personArea.attr('isShow', "0")
		}
	})	
});