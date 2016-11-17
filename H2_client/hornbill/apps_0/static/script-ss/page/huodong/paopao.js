/*common*/
require('jquery');
var check = require('app/checkLogin');

/* 轮播 */
fml.use('app/lunbo' , function(){
	this({
			iWidth:807,
			snum:1,
			dtime:1000,
			ptable:'photos-table',
			toright:'btn-right',
			toleft:'btn-left',
			auto : {direction:'right',time:3000}
	});
});

var board = $('.more-bubble'),
	aGoods = $('.goods');
var boardWidth = $('.more-bubble').width(),
	boardHeight = $('.more-bubble').height();
var x, y;
var arrX = [], arrY = [];
var i = 0;
var flag = true;
function arrPosition(){
	for(var i=0;i<=28;){
		x = parseInt(Math.random()*(boardWidth))-$('.goods').eq(0).width();
		y = parseInt(Math.random()*(boardHeight))-$('.goods').eq(0).height();
		if(x<0){x = Math.abs(x);}
		if(y<0){y = Math.abs(y);}

		if(i==0){
			arrX.push(x);
			arrY.push(y);
			i++;
		}else{
			flag = true;
			for(var j=0;j<arrX.length;j++){
				var disX = x-arrX[j],
					disY = y-arrY[j];
				if(disX<0){disX = Math.abs(disX);}
				if(disY<0){disY = Math.abs(disY);}
				if(disX < $('.goods').eq(0).width() && disY < $('.goods').eq(0).width()){
						flag = false;
				}
			}
		}

		if(flag){
			arrX.push(x);
			arrY.push(y);
			i++;
		}
	}
	if(i==29){
		position();
	}
}
function position(){
	for(var i=0;i<14;i++){
		$('.goods').eq(i).css({
			'top': arrY[i+1]+'px',
			'left': arrX[i+1]+'px',
		});
		$('.goods').eq(i).on('mousemove',function(){
			$(this).addClass('animation');
			$(this).on('mouseout',function(){
				$(this).removeClass('animation');
			});
		});
	}
	for(var j=15;j<26;j++){
		var bubble = $('<img class="bubble" src="http://d04.res.meilishuo.net/pic/_o/d5/50/37d20c40fea13b433fb231e0d295_74_78.ch.png">');
		$('.more-bubble').append(bubble);
		bubble.css({
			'top': arrY[j]+'px',
			'left': arrX[j]+'px',
		});
		bubble.on('mousemove',function(){
			$(this).addClass('animation');
			$(this).on('mouseout',function(){
				$(this).removeClass('animation');
			});
		});
	}
	for(var k=26;k<=28;k++){
		var bubble = $('<img class="bubble" src="http://d04.res.meilishuo.net/pic/_o/5d/b2/45f9f5fe5202e740804fab4284da_124_124.cf.png">');
		$('.more-bubble').append(bubble);
		bubble.css({
			'top': arrY[k]+'px',
			'left': arrX[k]+'px',
			'width' : '10%'
		});
		bubble.on('mousemove',function(){
			$(this).addClass('animation');
			$(this).on('mouseout',function(){
				$(this).removeClass('animation');
			});
		});
	}
}
arrPosition();

/* 弹层的位置 */
var screenHeight = $(window).height(),
	screenWidth = $(window).width();
$('.popwin-award').css({
	'margin-left' : (screenWidth - 582)/2 + 'px',
	'margin-top' : (screenHeight - 473)/2 + 'px'
});

/* 弹层关闭按钮 */
$('.close').on('click',function(){
	$('.popwin').css({'display':'none'});
	$('.popwin-award').css({'display':'none'});
	$('.popwin-othe').css({'display':'none'});
	$('.counp').css({'display':'none'});
	$('.thing').css({'display':'none'});
});

/* 弹层确定按钮 */
$('.ok').on('click',function(){
	// 信息提交
	var _data = {
		'name' : $('#user-name').html(),
		'mobile' : $('#user-tel').html(),
		'address' : $('#user-address').html(),
		'age' : awardId,
		'activity': 'other_brand_ttaxc'
	};
	var _num = _data.mobile;
	if(!_data.name || !_data.address) return alert('信息输入不完整，请重新输入。');
	if(!/^\d{11}$/.test(_num)) return alert('手机号输入错误，请重新输入。');
	$.post('/aj/paopao/save', _data, function(data) {
		data = JSON.parse(data);
		console.log(data);
		if (data.error_code == 0) {
			alert('保存成功！');
			$('.popwin').css({'display':'none'});
			$('.popwin-award').css({'display':'none'});
			$('.popwin-othe').css({'display':'none'});
			$('.counp').css({'display':'none'});
			$('.thing').css({'display':'none'});
		}else{
			alert('保存失败！');
		};
	});
});


/* 弹层的位置 */
$('.popwin-other').css({
	'margin-left' : (screenWidth - 582)/2 + 'px',
	'margin-top' : (screenHeight - 363)/2 + 'px'
});

function award(){
	$('.popwin').css('display','block');
	$('.popwin-award').css('display','block');
}
function coupon(){
	$('.popwin').css('display','block');
	$('.popwin-other').show();
	$('.counp').show();
}
function other(){
	$('.popwin').show();
	$('.popwin-other').show();
	$('.text-other').attr('src','http://d04.res.meilishuo.net/pic/_o/d6/bd/bfd8756313f86a80f19742a49403_339_58.ch.png');;
	$('.thing').show();
}


var awardId = 0;
var chance = 100;
function myajax(_this){
    $.ajax({
        type : 'get',
        url : '/aj/paopao/award',
        data : {},
        success : function(data){
            res = JSON.parse(data);
            console.log(res);
            var chance = res.error_code;
            if(res.error_code  == -1){
            	//达到抽奖次数
            	alert('今日机会已经用完，明天再来吧!');
            }else if(res.error_code == 1){
            	//中奖&分享
            	var _data = {
					'stid' : '3691020897'
				};
				$.post('/aj/paopao/share', _data, function(data) {});

            	_this.hide();
            	if(res.data.award.prize_type == 0){
            		awardId = res.data.award.id;
            		award();
            		if(res.data.award.id == 385){
            			//台历
						$('.text').attr('src','http://d04.res.meilishuo.net/pic/_o/ce/af/301f45d5423260b7cf2e9d051427_468_58.ch.png');;
						$('.img-award').attr('src','http://d04.res.meilishuo.net/pic/_o/88/50/fa8a80d69578526790998d58f94c_136_106.cf.png');
            		}else if(res.data.award.id == 387){
            			//龙猫
						$('.text').attr('src','http://d02.res.meilishuo.net/pic/_o/f7/45/e22fa5bc4cfbf96b803156b035b7_372_58.cg.png');;
						$('.img-award').attr('src','http://d05.res.meilishuo.net/pic/_o/24/fc/976a279c91a623bd55d4556c7654_129_125.cf.png');
            		}else if(res.data.award.id == 389){
            			//吊脚娃娃
						$('.text').attr('src','http://d02.res.meilishuo.net/pic/_o/38/bb/b4fab6002135c5f5c5aaaf5b3c2f_442_58.ch.png');;
						$('.img-award').attr('src','http://d03.res.meilishuo.net/pic/_o/0c/b1/ebc51ca24a1e368d1dac37dd1032_130_106.cg.png');
            		}else if(res.data.award.id == 391){
            			//夜灯
            			console.log(res.data.award.id);
						$('.text').attr('src','http://d05.res.meilishuo.net/pic/_o/f0/8b/5461829d771dde524ec6d923060a_364_58.ch.png');
						$('.img-award').attr('src','http://d02.res.meilishuo.net/pic/_o/0d/44/6c16b93802b3780657d26ad14deb_85_92.cf.png');
            		}
            	}else{
            		//优惠券
            		_this.hide();
            		coupon();
            		$('.money').html("￥" + res.data.award.awardname);
            	}
            }else if(res.error_code == 0){
            	//未中&分享
            	var _data = {
					'stid' : '3691020897'
				};
				$.post('/aj/paopao/share', _data, function(data) {});

            	_this.hide();
            	var num = parseInt(Math.random()*4);
            	other();
            	if(num == 0){
	            	// 水中上升
					$('.thing').attr('src','http://d03.res.meilishuo.net/pic/_o/ad/ec/0bda5a194860655171a519ab201c_431_156.ch.png');
            	}else if(num == 1){
            		// 时之锁
					$('.thing').attr('src','http://d03.res.meilishuo.net/pic/_o/c9/f8/64d572606a5a81ea91486fed9e7a_351_161.cg.png');
            	}else if(num == 2){
            		// 单色激光
					$('.thing').attr('src','http://d05.res.meilishuo.net/pic/_o/77/ce/29b5755cce26c77ded2e66ab04ce_405_164.cg.png');
            	}else{
					$('.thing').attr('src','http://d05.res.meilishuo.net/pic/_o/0f/e9/b2c0609a940b62d06dd6c84c7d75_412_156.ch.png');
            	}
            }
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
           
        }
    });
};


$(".bubble").click(function(){
	var _this = $(this);
	if(!check()) return;
	myajax(_this);
});


