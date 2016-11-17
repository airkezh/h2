fml.define('page/huodong/drawLots' , ['jquery' , 'app/shareTo'] , function(require , exports){
	$ = require('jquery');
	var share = require('app/shareTo');
	$('.draw_join').on('click' , function(){
		$('.draw_step1').hide();
		//三种签的class
		var draw_qian = ['draw_s1' ,'draw_s2' ,'draw_s3'];
		//Math.random()*(上限-下限+1)+下限
		var i = parseInt(Math.random() * (2 - 0 + 1) + 0);
		$('.draw_step2').addClass(draw_qian[i]).show();
		//解签
		$('.draw_jie').on('click' , function(){
			var draw_ji = ['draw_a5' , 'draw_a6' , 'draw_a7'];
			var draw_ping = ['draw_a1' , 'draw_a2' , 'draw_a3' , 'draw_a4' , 'draw_a10'];
			var draw_shang = ['draw_a8' , 'draw_a9'];
			$('.draw_step2').hide();
			if(i == 0){
				var j = parseInt(Math.random() * (2 - 0 + 1) + 0);
				$('.draw_step3').addClass(draw_ji[j]).show();
				var ji_link = [
					['http://www.meilishuo.com/guang/attr/34128?frm=huodong_qiuqian_wuhaohuangse' , 'http://www.meilishuo.com/guang/attr/34328?frm=huodong_qiuqian_wuhaodanpin' , 'http://www.meilishuo.com/group/16440363?frm=huodong_qiuqian_wuhaodapei' , 'http://www.meilishuo.com/guang/attr/34591?frm=huodong_qiuqian_wuhaopeishi'],
					['http://www.meilishuo.com/guang/attr/34112?frm=huodong_qiuqian_sihaoyanse' , 'http://www.meilishuo.com/guang/attr/34421?frm=huodong_qiuqian_sihaodanpin' , 'http://www.meilishuo.com/group/13691628?frm=huodong_qiuqian_sihaodapei' , 'http://www.meilishuo.com/guang/attr/34537?frm=huodong_qiuqian_sihaopeishi'],
					['http://www.meilishuo.com/guang/attr/34148?frm=huodong_qiuqian_sanhaoyanse' , 'http://www.meilishuo.com/group/18656205?frm=huodong_qiuqian_sanhaoqunzi' , 'http://www.meilishuo.com/group/15198772?frm=huodong_qiuqian_sanhaodapei' , 'http://www.meilishuo.com/guang/attr/34528?frm=huodong_qiuqian_sanhaopeishi']
				];
				$('.draw_link a').each(function(i){
					$(this).attr('href' , ji_link[j][i]);	
				});
				var draw_sina = "吉签";
				var draw_sina_pic = "dsina_ji2.jpg";
			}else if(i == 1){
				var k = parseInt(Math.random() * (4 - 0 + 1) + 0);
				$('.draw_step3').addClass(draw_ping[k]).show();
				var ping_link = [
					['http://www.meilishuo.com/guang/attr/34125?frm=huodong_qiuqian_jiuhaoyanse' , 'http://www.meilishuo.com/guang/attr/36168?frm=huodong_qiuqian_jiuhaodanpin' , 'http://www.meilishuo.com/group/10920?frm=huodong_qiuqian_jiuhaodapei' , 'http://www.meilishuo.com/guang/attr/36285?frm=huodong_qiuqian_jiuhaopeishi'], 
					['http://www.meilishuo.com/guang/attr/34122?frm=huodong_qiuqian_bahaoyanse' , 'http://www.meilishuo.com/guang/attr/34347?frm=huodong_qiuqian_bahaodanpin' , 'http://www.meilishuo.com/group/11916?frm=huodong_qiuqian_bahaodapei' , 'http://www.meilishuo.com/guang/attr/34451?frm=huodong_qiuqian_bahaopeishi'], 
					['http://www.meilishuo.com/guang/attr/34127?frm=huodong_qiuqian_qihaoyanse' , 'http://www.meilishuo.com/guang/attr/34020?frm=huodong_qiuqian_qihaodanpin' , 'http://www.meilishuo.com/group/13888585?frm=huodong_qiuqian_qihaodapei' , 'http://www.meilishuo.com/guang/attr/34590?frm=huodong_qiuqian_qihaopeishi'], 
					['http://www.meilishuo.com/guang/attr/34120?frm=huodong_qiuqian_liuhaoyanse' , 'http://www.meilishuo.com/guang/attr/34332?frm=huodong_qiuqian_liuhaodanpin' , 'http://www.meilishuo.com/group/16969687?frm=huodong_qiuqian_liuhaodapei' , 'http://www.meilishuo.com/guang/attr/34536?frm=huodong_qiuqian_liuhaopeishi'], 
					['http://www.meilishuo.com/guang/attr/34143?frm=huodong_qiuqian_shihaoyanse' , 'http://www.meilishuo.com/guang/attr/34401?frm=huodong_qiuqian_shihaoduanku' , 'http://www.meilishuo.com/group/14478971?frm=huodong_qiuqian_shihaodapei' , 'http://www.meilishuo.com/guang/attr/34434?frm=huodong_qiuqian_shihaopeishi']
				];
				$('.draw_link a').each(function(i){
					$(this).attr('href' , ping_link[k][i]);
				});
				var draw_sina = "平签";
				var draw_sina_pic = "dsina_ping2.jpg";
			}else{
				var m = parseInt(Math.random() * (1 - 0 + 1) + 0);
				$('.draw_step3').addClass(draw_shang[m]).show();
				var shang_link = [
					['http://www.meilishuo.com/guang/attr/36304?frm=huodong_qiuqian_erhaoyanse' , 'http://www.meilishuo.com/guang/attr/38244?frm=huodong_qiuqian_erhaodanpin' , 'http://www.meilishuo.com/group/14336389?frm=huodong_qiuqian_erhaodapei' , 'http://www.meilishuo.com/guang/attr/34566?frm=huodong_qiuqian_erhaoyaodai'],
					['http://www.meilishuo.com/guang/attr/34133?frm=huodong_qiuqian_yihaoyanse' , 'http://www.meilishuo.com/guang/attr/34466?frm=huodong_qiuqian_yihaodanpin' , 'http://www.meilishuo.com/group/13171813?frm=huodong_qiuqian_yihaodapei' , 'http://www.meilishuo.com/guang/attr/34551?frm=huodong_qiuqian_yihaopeishi']
				];
				$('.draw_link a').each(function(i){
					$(this).attr('href' , shang_link[m][i]);	
				});
				var draw_sina = "上上签";
				var draw_sina_pic = "dsina_shang2.jpg";
			}

			//微博分享

			var url = location.href + '?frm=drawLots01';
			var desc = "刚才在美丽说求到了一个" + draw_sina + "，连蛇年怎么穿更旺的运势都有，太贴心了！——去美丽说求个新年签>>";
			var pic = Meilishuo.config.picture_url + 'images/huodong/drawLots/' + draw_sina_pic;
			//$('.d_sina').on('click' , function(){
				if($('.draw_share input').is(':checked')){
					share.shareToWeibo(url , desc , pic);	
				}
			//});	
		});
	});
});
