fml.define('wap/app/lark/znm' , ['wap/jquery.mobile'] , function(require , exports){
	var _productNum = 0,_chanceNum = 0;
	return {
		init: function(_this,productNum,chanceNum,callback_ok,callback_end){
			setTimeout(function(){
				$(".start").css("display","none");
			},3000);

			_productNum = productNum;
			_chanceNum = chanceNum;
			var $this = this;
			$(_this).click(function() {
				$this.play(this,callback_ok,callback_end);
			});
		},
		play: function(_this,callback_ok,callback_end){
			var _this = $(_this);
			if(_this.attr('num') == 1 && _this.css("opacity")!=0 ){
				// _this.addClass("animite");
				_this.css("opacity","0");
				--_productNum;
				if(_productNum == 0){
					callback_ok();
				}
				$(".product_num").html(_productNum);
			}
			if(_this.attr('num') == 0 ){
				$(".error").css("display","block");
				--_chanceNum;
				if(_chanceNum >= 0){
					$(".chance_num").html(_chanceNum);
					setTimeout(function(){
						$(".error").css("display","none");
					},1000);
				}else{
					console.log("error");
					callback_end();
				}
			}
		}
	};
});
