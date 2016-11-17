fml.define('app/subNavUp',['jquery','component/windowScroll'] , function(require , exports){
	var scroll = require('component/windowScroll')

	var navBind = function(opts){
		var firNavBar = opts.firNavBar || '.wheader'
			,secNavBar = opts.secNavBar || '.sec_nav'
			,secNavCon = opts.secNavCon

		var $navBar = $(firNavBar).parent()  //导航外层容器
			,$firNavBar = $(firNavBar) //主导航box下，一级导航容器
		    ,$secNavBar = $(secNavBar) //主导航box下，二级导航容器
			,$secNavCon = $(secNavCon) //二级导航content

		if(!$secNavCon.length) return;

		//原头部文件如果没有sec_nav 则append入
		if(!$navBar.children(secNavBar).length){
			$navBar.append($secNavBar); 
		}

		var $subHolder = $navBar.children(secNavBar)
			,$oldSecNavParent = $secNavCon.parent() //原二级导航外层容器

		var firNavHeight = $firNavBar.height() || 0;
		var y = $secNavCon.offset().top - firNavHeight;
		scroll.yIn(y,function(){
			$oldSecNavParent.height($secNavCon.height()).css('visibility','hidden');
			$subHolder.append($secNavCon);
			$subHolder.show();
			$firNavBar.stop().animate({'margin-top' : -firNavHeight},function(){
				if($secNavCon.parent().is($subHolder)){
					$(this).hide();
				}
			})
		},function(){
			$oldSecNavParent.prepend($secNavCon).css('visibility','visible');
			$subHolder.hide();
			$firNavBar.show().stop().animate({'margin-top':0});
		});
	};

	exports.navBind = navBind;
	
})
