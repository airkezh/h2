fml.define('page/paipai/poster0' , ['jquery' ,'component/waterfall','component/shareTmp']  , function(require,exports){
	var shareTmp = require('component/shareTmp')
   		,pin = require('component/waterfall')
		,$ = require('jquery')

	var content_fluid = $('.content_fluid , .wheader .header_top');

	var colWidth = pin.getSettings('colWidth');
    var colNumMin = pin.getSettings('colNumMin');
	var autoResize  = pin.getSettings('autoResize');
 	function setWidth(){
		var windowWidth = $(document).height() > $(window).height() ? $(window).width() : $(window).width() - 20;
        var colNum =  Math.floor(windowWidth / colWidth);
        if(colNum < colNumMin) return;
		if(autoResize)
			var content_width = colNum * colWidth;
		else
			var content_width = colNumMin * colWidth;
        content_fluid.width(content_width);
    }
	setWidth()
	pin.init({
        containerId : '.goods_wall',
		colNumMin : 3 ,
		autoResize : false,
        preLayout : {
            '.corner_notic' : 0,
			'.corner_stamp' : -1,
			'.corner_nav' : [1,-1]
        },
        resizeCallback : function(){
            setWidth();
        }
    });
	$('.topSpinner').hide();
	content_fluid.removeClass('v_hidden');
    if (Meilishuo.config.poster0){
		pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
		$('.midSpinner').hide()
	}
});
