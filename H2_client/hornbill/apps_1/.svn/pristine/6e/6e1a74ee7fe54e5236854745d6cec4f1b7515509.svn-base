fml.define('sum/items' , ['component/shareTmp' , 'sum/book'] , function(require , exports){
	var shareTmp = require('component/shareTmp');
	var book = require('sum/book');
	var DATA = {items : [
		{
			title : '当季热款',
			data : [
				 {no : 'c53', name : '圆领T恤', tab : ['牛仔短裤', '牛津鞋', '剑桥包'], isIn : true}, 
				 {no : 'c7', name : '波西米亚上衣', tab : ['网纱裙', '平底凉鞋', '宽腰带'], isIn : false},
				 {no : 'c15', name : '吊带式T恤', tab : ['百褶裙', '麻边厚底系带鞋', '手拿包'], isIn : false},
				 {no : 'c42', name : '吊带衫', tab : ['百褶裙', '宽沿帽', '麻边厚底系带鞋'], isIn : false},
				 {no : 'a1', name : '直身连衣裙', tab : ['宽腰带', '麻边厚底系带鞋'], isIn : true},
				 {no : 'a3', name : '合身连衣裙', tab : ['邮差包', '粗跟'], isIn : false}, 
				 {no : 'a14', name : '蓬撑连衣裙', tab : ['粗跟', '宽腰带'], isIn : false},
				 {no : 'b7', name : '雪纺裙', tab : ['衬衫', '马克森软鞋', '三角头巾'], isIn : false},
				 {no : 'd4', name : '裙裤', tab : ['波西米亚上衣', '帆船鞋', '宽腰带'], isIn : true},
				 {no : 'd10', name : '七分裤', tab : ['不对称长T恤', '牛津鞋', '邮差包'], isIn :false},
				 {no : 'd38', name : '牛仔短裤', tab : ['不规则背心', '麻边厚底系带鞋', '邮差包'], isIn : false},
				 {no : 'd6', name : '连体裤', tab : ['托特包', '麻边厚底系带鞋', '宽腰带'], isIn : true},
				 {no : 'e5', name : '平底凉鞋', tab : ['蓬撑连衣裙', '宽沿帽'], isIn : true},
				 {no : 'f6', name : '坡跟', tab : ['开叉吊带连衣裙', '链条包'], isIn : false},
				 {no : 'g1', name : '链条包', tab : ['蓬撑连衣裙', '尖头鞋'], isIn : false},
				 {no : 'g9', name : '手抓包', tab : ['雪纺裙', '中跟'], isIn : false},
				 {no : 'h1', name : '宽沿帽', tab : ['蓬撑连衣裙', '麻边厚底系带鞋'], isIn : false},
				 {no : 'h4', name : '太阳镜', tab : ['裙裤', '踝带鞋'], isIn : false},
			 ]
		},
		{
			title : '上装',
			data : [
				{no : 'c32', name : 'V领T恤', tab : ['网纱裙', '芭蕾平底鞋', '宽腰带'], isIn : false},
				{no : 'c53', name : '圆领T恤', tab : ['牛仔短裤', '牛津鞋', '剑桥包'], isIn : true}, 
				{no : 'c15', name : '吊带式T恤', tab : ['百褶裙', '麻边厚底系带鞋', '手拿包'], isIn : false},
				{no : 'c16', name : '不对称长T恤', tab : ['短裤', '平底凉鞋', '邮差包'], isIn : false},
				{no : 'c43', name : '打结T恤', tab : ['彩色丹宁裤', '麻边厚底系带鞋', '太阳镜'], isIn : false},
				{no : 'c40', name : '露背背心', tab : ['宽摆裙', '芭蕾平底鞋', '链条包'], isIn : true},
				{no : 'c41', name : '夏日宽松背心', tab : ['小腿裤', '红底鞋', '链条包'], isIn : false},
				{no : 'c42', name : '吊带衫', tab : ['百褶裙', '宽沿帽', '麻边厚底系带鞋'], isIn : true},
				{no : 'c44', name : '百褶雪纺背心', tab : ['小腿裤', '踝带鞋', '乞丐包'], isIn : false},
				{no : 'c1', name : '娃娃式罩衫', tab : ['网纱裙', '芭蕾平底鞋', '圆筒包'], isIn : true},
				{no : 'c2', name : '衬衫', tab : ['宽腿裤', '手抓包', '宽沿帽'], isIn : false},
				{no : 'c39', name : '工字背心', tab : ['宽沿帽', '百褶裙', '麻边厚底系带鞋'], isIn : false},
				{no : 'c7', name : '波西米亚上衣', tab : ['网纱裙', '平底凉鞋', '宽腰带'], isIn : true},
				{no : 'c45', name : '抹胸上衣', tab : ['花边荷叶裙', '坡跟', '太阳镜'], isIn : false},
				{no : 'c46', name : '抽绳蕾丝吊带', tab : ['裙裤', '宽沿帽', '芭蕾平底鞋'], isIn : false},
				{no : 'c47', name : '吊带超短背心', tab : ['麻边厚底系带鞋', '工字背心', '短裤'], isIn : false},
				{no : 'c48', name : '束腰马甲', tab : ['网纱裙', '坡跟', '宽沿帽'], isIn : false},
				{no : 'c49', name : '不规则背心', tab : ['彩色丹宁裤', '踝带鞋', '乞丐包'], isIn : false}
			]
		},
		{
			title : '连衣裙&裙子',
			data : [
				{no : 'a1', name : '直身连衣裙', tab : ['宽腰带', '麻边厚底系带鞋'], isIn : true},
				{no : 'a2', name : 'A字连衣裙', tab : ['剑桥包', '坡跟'], isIn : false},
				{no : 'a3', name : '合身连衣裙', tab : ['邮差包', '粗跟'], isIn : true},
				{no : 'a7', name : '裹胸连衣裙', tab : ['链条包', 'T字高跟鞋'], isIn : false},
				{no : 'a8', name : '吊带露背连衣裙', tab : ['细高跟', '太阳镜'], isIn : false},
				{no : 'a12', name : '开叉吊带连衣裙', tab : ['麻边厚底系带鞋', '三角头巾'], isIn : false},
				{no : 'a14', name : '蓬撑连衣裙', tab : ['粗跟', '宽腰带'], isIn : true},
				{no : 'a15', name : '吊带裙', tab : ['芭蕾平底鞋', '链条包'], isIn : false},
				{no : 'a16', name : '衬衫裙', tab : ['牛津鞋', '剑桥包'], isIn : false},
				{no : 'b1', name : 'A字裙', tab : ['娃娃式罩衫', '保龄球包', '帆船鞋'], isIn : true},
				{no : 'b2', name : '铅笔裙', tab : ['娃娃式罩衫', '链条包', '红底鞋'], isIn : false},
				{no : 'b6', name : '宽摆裙', tab : ['娃娃式罩衫', '圆筒包', '芭蕾平底鞋'], isIn : false},
				{no : 'b7', name : '雪纺裙', tab : ['衬衫', '马克森软鞋', '三角头巾'], isIn : true},
				{no : 'b8', name : '花边荷叶裙', tab : ['波西米亚上衣', '圆筒包', '平底凉鞋'], isIn : false},
				{no : 'b9', name : '百褶裙', tab : ['波西米亚上衣', '芭蕾平底鞋', '夸张配饰'], isIn : false},
				{no : 'b10', name : '网纱裙', tab : ['波西米亚上衣', '手抓包', '平底凉鞋'], isIn : false}
			]
		},
		{
			title : '裤子',
			data : [
				{no : 'd3', name : '短裤', tab : ['波西米亚上衣', '保龄球包', '麻边厚底系带鞋'], isIn : false},
				{no : 'd4', name : '裙裤', tab : ['波西米亚上衣', '帆船鞋', '宽腰带'], isIn : true},
				{no : 'd10', name : '七分裤', tab : ['不对称长T恤', '牛津鞋', '邮差包'], isIn : true},
				{no : 'd38', name : '牛仔短裤', tab : ['不规则背心', '麻边厚底系带鞋', '邮差包'], isIn : false},
				{no : 'd6', name : '连体裤', tab : ['托特包', '麻边厚底系带鞋', '宽腰带'], isIn : true},
				{no : 'd1', name : '小腿裤', tab : ['衬衫', '手抓包', '尖头鞋'], isIn : false},
				{no : 'd2', name : '宽腿裤', tab : ['衬衫', '马鞍包', 'T字高跟鞋'], isIn : false},
				{no : 'd5', name : '打褶裤', tab : ['波西米亚上衣', 'T字高跟鞋', '宽腰带'], isIn : false},
				{no : 'd7', name : '打底裤', tab : ['衬衫', '乞丐包', '太阳镜'], isIn : false},
				{no : 'd8', name : '彩色丹宁裤', tab : ['吊带式T恤', '平底凉鞋', '邮差包'], isIn : true}
			]
		},
		{
			title : '鞋',
			data : [
				{no : 'e5', name : '平底凉鞋', tab : ['蓬撑连衣裙', '宽沿帽'], isIn : true},
				{no : 'e4', name : '踝带鞋', tab : ['裙裤', '太阳镜'], isIn : false},
				{no : 'e6', name : '麻边厚底系带鞋', tab : ['吊带露背连衣裙', '宽沿帽'], isIn : true},
				{no : 'e1', name : '红底鞋', tab : ['夏日宽松背心', '小脚裤', '链条包'], isIn : false},
				{no : 'e3', name : 'T字高跟鞋', tab : ['吊带露背连衣裙', '太阳镜'], isIn : false},
				{no : 'e9', name : '芭蕾平底鞋', tab : ['吊带裙', '链条包'], isIn : false},
				{no : 'e13', name : '夹脚鞋', tab : ['短裤', '手抓包'], isIn : true},
				{no : 'e2', name : '玛丽珍鞋', tab : ['蓬撑连衣裙', '马鞍包'], isIn : false},
				{no : 'e7', name : '牛津鞋', tab : ['小脚裤', '保龄球包'], isIn : false},
				{no : 'e10', name : '马克森软鞋', tab : ['衬衫裙', '托特包'], isIn : false},
				{no : 'e11', name : '帆船鞋', tab : ['宽摆裙', '剑桥包'], isIn : false},
				{no : 'f6', name : '坡跟', tab : ['开叉吊带连衣裙', '链条包'], isIn : true},
				{no : 'f7', name : '鱼嘴鞋', tab : ['小脚裤', '手拿包'], isIn : false},
				{no : 'f1', name : '中跟', tab : ['合身连衣裙', '乞丐包'], isIn : false},
				{no : 'f4', name : '粗跟', tab : ['蓬撑连衣裙', '宽腰带'], isIn : false},
				{no : 'f5', name : '细高跟', tab : ['吊带露背连衣裙', '太阳镜'], isIn : false},
				{no : 'f10', name : '尖头鞋', tab : ['合身连衣裙', '马鞍包'], isIn : false}
			]
		},
		{
			title : '包包&配饰',
			data : [
				{no : 'g1', name : '链条包', tab : ['蓬撑连衣裙', '尖头鞋'], isIn : true},
				{no : 'g2', name : '圆筒包', tab : ['衬衫', '粗跟'], isIn : false},
				{no : 'g3', name : '保龄球包', tab : ['合身连衣裙', '坡跟'], isIn : false},
				{no : 'g4', name : '剑桥包', tab : ['波西米亚上衣', '芭蕾平底鞋'], isIn : false},
				{no : 'g5', name : '托特包', tab : ['连体裤', '麻边厚底系带鞋', '宽腰带'], isIn : false},
				{no : 'g6', name : '乞丐包', tab : ['A字裙', 'T字高跟鞋'], isIn : false},
				{no : 'g7', name : '邮差包', tab : ['合身连衣裙', '粗跟'], isIn : false},
				{no : 'g8', name : '马鞍包', tab : ['玛丽珍鞋', '衬衫'], isIn : false},
				{no : 'g9', name : '手抓包', tab : ['雪纺裙', '中跟'], isIn : true},
				{no : 'g11', name : '手拿包', tab : ['小脚裤', '鱼嘴鞋'], isIn : false},
				{no : 'h1', name : '宽沿帽', tab : ['蓬撑连衣裙', '麻边厚底系带鞋'], isIn : true},
				{no : 'h2', name : '宽腰带', tab : ['A字连衣裙', '芭蕾平底鞋'], isIn : false},
				{no : 'h4', name : '太阳镜', tab : ['裙裤', '踝带鞋'], isIn : true},
				{no : 'h3', name : '夸张配饰', tab : ['吊带露背连衣裙', '平底凉鞋'], isIn : false},
				{no : 'h5', name : '三角头巾', tab : ['波西米亚上衣', '雪纺裙'], isIn : false}
			]
		}
	]};
	return function(obj){
		var $o = $('#' + obj);
		var $nav = $o.find('nav'),
			$sec = $o.find('section'),
			$foc = $nav.find('.focus');
		var a = shareTmp('items_nav', DATA); 
		$nav.prepend(a);
		$nav.find('li').bind('click', function(){
			var i = $(this).index();
			var data = DATA.items[i];
			b = shareTmp('items_section', {data:data,index:i});
			$sec.html(b);
			$foc.attr('class','focus f' + i);
			$nav.find('li').removeClass('isThis').eq(i).addClass('isThis');
			$sec.find('li').bind('click',function(){
				$sec.find('li').addClass('undo');
				var j = $(this).index();
				$(this).addClass('isPop');
				var t = window.setTimeout(function(){
					book(obj, data.data[j], {i : i, j : j});
				},400);
			});
		});
		$nav.find('li').eq(0).click();
	};
});
