fml.use('app/countdown', function(){
    this();
});
fml.use('component/lazyLoad', function(ll){
	setTimeout(function(){
		ll.load('.orbis_user span', 'asrc');
	}, 1000);
});
fml.use('app/welfare_apply' , function(){});
fml.define('page/huodong/orbis' , ['jquery' , 'app/checkLogin'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	//导航fix页面
	var left = ($(window).width() - '1044')/2;
	left = Math.ceil(left);
	$('#orbis_nav').css({'left' : left + 'px'});
	if($.browser.msie && $.browser.version == '6.0'){
		$('#orbis_nav').css({'position' : 'absolute' , 'top' : $(window).scrollTop() + $(window).height() - '52' + 'px' , 'left' : left + 'px'});
		$(window).scroll(function(){
			$('#orbis_nav').css({'position' : 'absolute' , 'top' : $(window).scrollTop() + $(window).height() - '52' + 'px' , 'left' : left + 'px'});
		});
	}
	//导航交互
	$('#orbis_nav a').on('click' , function(){
		var index = $('#orbis_nav a').index($(this));
		$('.orb_nav0').attr('class' , 'orb_hnav0');
		$('.orb_nav1').attr('class' , 'orb_hnav1');
		$('.orb_nav2').attr('class' , 'orb_hnav2');
		$('.orb_nav3').attr('class' , 'orb_hnav3');
		$('.orb_nav4').attr('class' , 'orb_hnav4');
		$(this).attr('class' , 'orb_nav' + index);
	});
	//达人图片交互
	var daren_text = ['这款卸妆露无油分、无香料、无色素、无酒精，推荐给像我一样是敏感肌的姑娘。它里面还还加入了一些天然的保湿精华。它有很强的溶水性，所以手和脸稍微沾点水，卸妆的触感会更好，洗完脸以后还滑滑的。最重要的是，即使是化了稍微重一点的彩妆，也可以用它卸的很干净。推荐推荐！' , '一直很爱用Orbis家的澄净卸妆露，着哩状质地不仅卸妆后保湿肌肤，卸妆力也丝毫不打折扣。特地请了日本知名的剪纸大师苍山日菜为它设计了限量版的瓶身，中国大陆限量发售6000支，瓶子控的MM们快去收集吧！值得一提的是，今年是ORBIS成立26周年，大家一起祝它生日快乐吧~~' , '很喜欢这瓶新澄净卸妆露,终于找到款没刺激性的卸妆露了~对于我这种容易引发痘痘的来说很喜欢这款纯天然的植物成分的温和卸妆露，和以往用的卸妆露对比，这次找到最适合了！而且不油腻按少少的卸妆露，就能轻松卸掉眼妆，最喜欢这点！很适合爱化彩妆的我以前卸妆要分好几种的来卸妆，现在一瓶就能搞掂，对于懒人的我来说太开心了！赞~推荐一个' , '推荐一下orbis的澄净卸妆露，质地很特别是凝胶状。刚开始试用的时候其实挺担心会卸不干净，但是让人意外的是，这个抹在脸上很好推，大概是因为质地的关系，洗完也不紧绷不油腻，非常清爽。听说现在还出了限量版，有兴趣的MM可以关注一下哦。' , '周围有很多MM都在被痘痘肌困扰，担心卸妆产品刺激皮肤。Orbis的这个澄净卸妆露是我用下来最温和不刺激的产品，有几次卸妆露碰到眼睛里也不刺痛。关键是价格亲民量也大碗，按一次就可以把全脸都卸干净，200块不到的一瓶可以用很久。' , 'orbis的卸妆露已经用到了第二瓶 机缘巧合用了这个牌子的卸妆露 但是近几年都不愿意再用其他的了 液体是者哩状的 带走彩妆是感觉被凝绸的液体吸走的 冲水就干净 不粘腻 之后也很保湿 最主要我是最讨厌刺激眼睛的卸妆油了 如果刺激眼睛肯定打叉 这个肯定是打勾！'];
	$('.orbis_daren > div').hover(function(){
		$(this).find('.orbis_meng').stop(true , true).fadeOut('slow');
		var index = $('.orbis_daren > div').index($(this));
		if(index < 3){
			$('.orbis_darentext').addClass('orbis_dt2').removeClass('orbis_dt1');	
		}else{
			$('.orbis_darentext').addClass('orbis_dt1').removeClass('orbis_dt2');	
		}
		$('.orbis_darentext').html(daren_text[index]).stop(true , true).slideDown('slow');
	} , function(){
		$(this).find('.orbis_meng').stop(true , true).fadeIn('slow');
		$('.orbis_darentext').stop(true , true).slideUp('slow');
	});

	//关注
	$('.orbis_join').on('click' , function(){
		if(check()){
			$.get('/aj/user/follow?fuid=39693125');
			$('.orbis_join').html('已经<br />加入');
		}
	});



});
