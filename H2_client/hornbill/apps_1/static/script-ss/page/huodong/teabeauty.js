fml.define('page/huodong/teabeauty' , ['jquery','app/checkLogin'] , function(require, exports){ 
	var check = require('app/checkLogin'),
		dialog = require('ui/dialog');

	var drtext=[
		'#不瘦不美不夏天#虽然喵喵是吃不胖的体质，不过总是希望食物能够完全消化利用，不会有过多残留变成脂肪啦，最近受朋友影响，每天中午吃饭后我都会泡一杯@TeaBeauty茶颜 抹茶酵素粉来“刮刮油脂”，据说是利用了酵素分解的原理，给肠道做运动呢~~~希望坚持28天看看会有什么不一样的惊喜吧',
		'#不瘦不美不夏天#为了清理肠胃买的@TeaBeauty茶颜 抹茶酵素粉，里面富含新鲜能量taef是维生素C18-20倍呢，喝了几天肠胃通畅了，排除了体内的毒素，真是爽多了。因为熬夜变差的皮肤也变得好起来了。',
		'#不瘦不美不夏天#要瘦的姑娘们看过来，推荐给你们最近我在喝的这个@TeaBeauty茶颜 排毒清肠养颜抹茶酵素粉。它可以有效的排除宿便，润滑肠道，缓解便秘。而且包装小巧携带方便，每天午餐后服用一包就可以啦~',
		'#不瘦不美不夏天#@TeaBeauty茶颜 的抹茶酵素粉我算是离不开啦，每每贪嘴吃了不该吃的东西后，马上冲一包，将多余的残渣通过排毒排出体外,无论是从身体还是心理上，都会轻松不少。好身材好皮肤的必备之品哦，第二次推荐给大家啦！~',
		'#不瘦不美不夏天# 抓住春天的尾巴快快减肥吧~~大家都说我瘦了呢~这几个月除了坚持每天运动以及健康的饮食，最重要的就是每个午餐过后的@TeaBeauty茶颜 抹茶酵素粉排毒之旅,调理肠道~加速减肥瘦身~皮肤也变好了呢!',
		'#不瘦不美不夏天#想减肥的姑娘们试过酵素了吗？听说那是史上最健康最有效的减肥产品呢！ 于是我给我家周先生先入了一盒@TeaBeauty茶颜 抹茶酵素粉，嘻嘻，样子好精致啊，我还试喝了一口，味道还不错，其实都是蔬菜和水果加入其中 想要减肥的童鞋可以用此酵素代替你的下午茶，听说约一个月就能轻松瘦身几斤滴呢！'
	];
	var $tb_daren = $('.tb-dr1> div');
	$tb_daren.hover(function(){
		var i=$tb_daren.index(this);
		$(this).find('.tb-meng').stop(true,true).fadeOut('slow');
		$('.tb-darentext').removeClass().addClass('wa'+i).addClass('tb-darentext').html(drtext[i])
		.stop(true,true).slideDown('slow');


	},
	function(){
		var i=$tb_daren.index(this);
		$(this).find('.tb-meng').stop(true,true).fadeIn('slow');
		$('.tb-darentext').stop(true,true).slideUp('slow');

	})


	var drtext2=[
		'#不瘦不美不夏天#不知道是不是最近空气质量差了，脸上老是有痘痘，好烦心啊!就买了@TeaBeauty茶颜 抹茶洁面皂，用了一个星期，脸上的痘痘都不见了！嘿嘿~现在皮肤光光，心情好好~包装也很清新，还有送赠品~',
		'@TeaBeauty茶颜 抹茶洁面皂清新的茶香让洁面也小清新～包装和赠品都灰常自然精致。丰富的泡沫温柔带走油光和杂质，脸蛋干净不紧绷，感觉皮肤滑滑嫩嫩的,多余的角质也没有了,很适合夏天用呢！',
		'最近不知道换季还是啥原因~又开始久违的长痘痘T^T于是换了个@TeaBeauty茶颜 抹茶洁面皂~有很清新的抹茶味道~包装超精美~里面还配有专门的木质皂盒以及起泡网。洗脸时泡沫丰富又细腻~不会刺激皮肤~能够达到深层清洁的效果~同时，用完有非常清爽的感觉~但是光滑不紧绷~夏天快到了，该备一块洁面皂啦~',
		'夏天开始入各种控油的东西了~ 毛孔干干净净的显的整个人都清爽白皙~ 这款含天然的@TeaBeauty茶颜 抹茶洁面皂去油脂和控油效果都非常好~ 配方很天然~ 洗完脸后感觉毛孔会呼吸了~',
		'#不瘦不美不夏天#整天蓬头垢面的回家，感觉不会爱了~！在小伙伴的指引下，买了@TeaBeauty茶颜 的新品樱之抹茶洁面皂，淡淡的抹茶香，好稀饭！洗了几次，皮肤变得白净光滑，难道这是所谓的鸡蛋肌？！哈哈~再也不怕油光满面的回家了!',
		'#不瘦不美不夏天#还记得我年后推荐的茶酵素吧，非常有效~所以对@TeaBeauty茶颜 家的产品信赖度大增，新推出的抹茶控油祛痘洁面皂就被收入囊中！淡淡的茶香和丰富的泡沫，带走油光和杂质， 脸蛋立刻回归滑溜溜的的状态，嫩得像鸡蛋壳啊~~还赠送超级可爱的木质托架和起泡网，让洗脸瞬间变享受哟！'
	];
	var $tb_daren2 = $('.tb-dr2> div');
	$tb_daren2.hover(function(){
		var i=$tb_daren2.index(this);
		$(this).find('.tb-meng').stop(true,true).fadeOut('slow');
		$('.tb-darentext2').removeClass().addClass('wat'+i).addClass('tb-darentext2').html(drtext2[i])
		.stop(true,true).slideDown('slow');			

	},
	function(){
		var i=$tb_daren2.index(this);
		$(this).find('.tb-meng').stop(true,true).fadeIn('slow');
		$('.tb-darentext2').stop(true,true).slideUp('slow');

	})
	$('#face,#body').on('click',function(){
		//alert($(this).attr('pid'));
    	if (!check()) return false;
		var status = $(this).attr('data-status')
		if(status==1) {
			//console.log('already click')
			return;
			//$(this).attr('data-status','0')
		} else {
			$(this).attr('data-status','1')
		}
		change();
		function change(){
			var s = $('#face').attr('data-status') + $('#body').attr('data-status');
			switch (s){
				case '00':
				$('.changepic').css('backgroundPosition','0 0');
					//console.log('chou pang')
					break;
				case '01':
				$('.changepic').css('backgroundPosition','-913px 0');
					//console.log('chou shou')
					break;
				case '10':
				$('.changepic').css('backgroundPosition','-603px 0');
					//console.log('mei pang')
					break;
				case '11':
				$('.changepic').css('backgroundPosition','-302px 0');
					//console.log('mei shou')
					break;
				default:
					break;
			}
		}


		var data = {
			'pid': $(this).attr('pid'),
			'actUrl':'/biz/huodong/teabeauty/?frm=TeaBeauty100',
			'actTitle':'TeaBeauty茶颜 还我漂漂大行动'
		}
		$.post('/aj/huodong/post_twitter', data, function(res){
			//alert(res.twitter);
		},"json")


	})

});
