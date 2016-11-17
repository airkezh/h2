fml.use(['jquery', 'app/posterWalls', 'component/urlHandle'], function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'tab' : query.tab || 'all'
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/daren');
});
fml.use('component/waterfall' , function(){
//	this.posterWall({defaultColumn:4, lessColumn:0, isFixed:false, cornerNavId:'.daren_nav', cornerStampId:'.siderbar'});	
	this.init({
		containerId : '.goods_wall',
		preLayout : { 
			'.daren_nav' : [0,2],
			'.siderbar' : -1
		}
	})
});
fml.use('app/userInfoTips' , function(){
    this(); 
});
fml.use('app/adPoster', function(){
	this.carousel('.daren_bnr',{'width':640,'height':240,'gap':2500,'type':2});
	this.adBanner('bottom', 'findfs');
});

fml.define('page/daren' , ['jquery'] , function(require,exports){
	var $ = require('jquery');
	$star = $('.star_img');
	$star.hover(function(){
		$(this).find('.attent').show();
		$(this).addClass('redborder_dr');
	},function(){
		$(this).find('.attent').hide();	
		$(this).removeClass('redborder_dr');
	});

	$('.dr_poster').live('mouseover mouseout',function(event){
		if(event.type == 'mouseover'){
			$(this).addClass('redborder_po');	
		}else{
			$(this).removeClass('redborder_po');
		}
	});

});
