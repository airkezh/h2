fml.define('order_pc/coupon/index' , ['jquery'] , function(require){
	var $ = require('jquery');

    var Request = new Object();
	Request = GetRequest();

	//让couponStatus默认选中提交前状态
	if(Request['status']){
	var obj='option[value=' + Request['status'] + ']';
	$('#couponStatus').find(obj).attr("selected",true);
	}

	//让couponType默认选中提交前状态
	if(Request['coupon_type']){
	var obj='li[value=' + Request['coupon_type'] + ']';
	$('#couponType li').removeClass("selected");
	$('#couponType').find(obj).addClass("selected");
	var couponTypeVal=$('#couponType').find(obj).attr('value');
	$('#couponType').attr('value',couponTypeVal);
	}


    //平台券按钮
	$('#platCoupon').on('click',function(){
		$('#platCoupon').addClass('selected');
		$('#shopCoupon').removeClass('selected');
        window.location.href='/coupon/?page=0&coupon_type=1&status=' + $('#couponStatus').val();
				// resetCoupon(coupon_type);
	})
	//店铺券按钮
	$('#shopCoupon').on('click',function(){
		$(this).addClass('selected');
		$('#platCoupon').removeClass('selected');
        window.location.href='/coupon/?page=0&coupon_type=2&status='+$('#couponStatus').val();
		// resetCoupon(coupon_type);
	})
	//选择优惠券状态
	$('#couponStatus').on('change',function(){
			// alert('hhh');
			window.location.href='/coupon/?page=0&coupon_type='+$('#couponType').attr('value') + '&status='+$('#couponStatus').val();
	});
    
    //解析url函数
	function GetRequest() {
	   var url = location.search; //获取url中"?"符后的字串
	   var theRequest = new Object();
	   if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	      }
	   }
	   return theRequest;
	}

    // var resetCoupon =function(coupon_type){
    // 	$.ajax({
    // 		type:'post'
    // 		,url:'/aj/coupon/coupon'
    // 		,data:{status:'available',coupon_type:coupon_type,page:'0'}
    // 		,dataType:'json'
    // 		,success:function(data){
    //             console.log(data);
    // 			console.log('success');
    // 			//重置优惠券
    // 			$('.coupon_box').empty();
    // 			$('.')
    // 		}
    // 		,error:function(data){
    // 			console.log('error');
    // 		}
    // 	})
    // }
});

