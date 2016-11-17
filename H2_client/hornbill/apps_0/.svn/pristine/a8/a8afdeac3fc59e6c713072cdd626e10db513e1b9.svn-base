/*common*/
var	$ = require('jquery');

function right_nav( attr ){
	var ajaxUrl = attr || '';
	var pageUrl = window.location.href , pstrc , pageTarget;
	if( pageUrl.indexOf("?") > 0 ){
		var strH = pageUrl.split('?')[1].split('&');
		for(var i = 0 ; i < strH.length ; i++){
			var strHref = strH[i].split('=');
			if( strHref[0] == 'pstrc'){
				pstrc = strHref[1]
			}
		}
	}
	
	$.ajax({
        url : ajaxUrl ,
        type : "post",
        data : {
        	'pstrc' : pstrc
        },
        dataType : "json",
        async : false,
        success : function( res ){
        	if( res.code != 0){return}
	        var navDate = res.data;
	        if( navDate.header ){
	        	$(".nav_right").css({'width' : navDate.header.width+'px' , 'height' : navDate.header.height+'px' });
        		var top = '<div style="width:'+ navDate.header.width +'px;height:'+ navDate.header.height +'px"><img src=' + navDate.header.img + ' ></div>';
        		$(".nav_right").prepend(top);
	        }
	        if( navDate.navis && navDate.navis.length ){
	        	for( var i = 0; i < navDate.navis.length; i++){
	        		var navLi = navDate.navis[i];
	        		if( i == 11 ){
	        			navLi.url = navLi.url+"#coupon_rg"
	        		}
	        		if( navLi.title == '主会场'){
	        			if( pageUrl.indexOf('act_venue') > 0 || pageUrl.indexOf('shop_venue') > 0 ){
	        				pageTarget = '_blank'
	        			}else{
	        				pageTarget = '_self'
	        			}
					}else{
						pageTarget = '_blank'
					}
	        		var aLi = '<div style="width:'+ navLi.width +'px;height:'+ navLi.height +'px"><a href='+ navLi.url +' class="nav_a" target="' + pageTarget + '"><img src='+ navLi.img_orginal +'></a></div>';
	        		$(".nav_right .menu_main").append(aLi);
	        	}
        	}
        	if( navDate.footer ){
	        	var codeImg = '<div class="code_m" style="position:relative;width:'+ navDate.footer.width +'px;height:'+ navDate.footer.height +'px;background:url('+ navDate.footer.img +')"></div>';
	        	var codeMax = '<div style="display:none;position:absolute;left:30px;top:-10px;width:113px;height:80px"><img src='+ navDate.footer.qrcode +'></div>'
	        	$(".nav_right").append(codeImg);
	        	$(".nav_right .code_m").append(codeMax);
        	}
        	if( navDate.back ){
	        	var backImg = '<div class="go_top" style="width:'+ navDate.back.width +'px;height:'+ navDate.back.height +'px"><img src=' + navDate.back.img + ' ></div>';
	        	$(".nav_right").append(backImg);
        	}
        	function getCid ( attr ){
        		var strHref = attr || '';
        		if( strHref.indexOf("?") > 0 ){
        			var strH = strHref.split('?')[1].split('&');
					var result = strH[0].substr(4);
					return result;
        		}
        	}
        	// 鼠标滑过状态
	        if( navDate.navis && navDate.navis.length ){
	        	$(".menu_main div").mouseover(function(){
	        		var n = $(this).index();
	        		var strHref = $(this).children('a').attr('href');
					var result = getCid( strHref );
					if( result && result == fml.vars.cid) {return}
	        		$(this).children('a').children('img').attr('src', navDate.navis[n].img_active );
	        	})
	        	$(".menu_main div").mouseleave(function(){
	        		var n = $(this).index();
	        		var strHref = $(this).children('a').attr('href');
					var result = getCid( strHref );
					if( result && result == fml.vars.cid) {return}
	        		$(this).children('a').children('img').attr('src', navDate.navis[n].img_orginal );
	        	});
	        	$(".code_m").mouseover(function(){
	        		$(this).find('div').show();
	        	});
	        	$(".code_m").mouseout(function(){
	        		$(this).find('div').hide();
	        	});
	      //   	$("body").on("click",function(){
			    //     $(".code_m").find("div").hide();
			    // });

	        	$(".menu_main div a").each(function(i , data){
					var strHref = $(this).attr('href');
					var result = getCid( strHref );
					if( result && fml.vars.cid == result ){
						$(this).attr('target', '_self' );
        				$(this).children('img').attr('src', navDate.navis[i].img_active );
					}
				});
				if( fml.vars.venueMain == 1 ){
	        		$(".menu_main div").eq(0).children('a').children('img').attr('src', navDate.navis[0].img_active );
	        		$(".menu_main div").eq(0).mouseout(function(){
	        			$(this).children('a').children('img').attr('src', navDate.navis[0].img_active );
	        		})
				}

	        }

        },
        error:function(){
        	window.console && console.log('系统繁忙，请稍后再试');
        }
    })
	
	
}
exports.rNav = right_nav;