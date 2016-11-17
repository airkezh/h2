fml.define('m/app/doota/cart/calculator',[],function(require , exports){
	var DECIMAL_DIGIT = 2;//有效数字位数
	var calculator = {
		// 计算单个商品的总钱数
		single:function (con){
			var self = this,
			amount = Number(self.find('.amount').val()) || 1,
			price = Number(self.find('.u_price').text()),
			
			total = amount*100*price/100;
			if (isNaN(amount)) {
				// 应设计需求，失效产品的小计显示单价。。
				con.text(price.toFixed(DECIMAL_DIGIT));
			}else{
				con.text(total.toFixed(DECIMAL_DIGIT));
			}
			
			return amount *100* price/100 || 0;
		},
		// 计算所有购物车商品总钱数
		total:function (){
			var total = 0;
			$('.goods').each(function(i,item){
				var self = $(item),
				goodsTotal = calculator.single.call(self,self.find('.goods_total'));

				if (self.find('.select_goods:enabled').attr('checked')) {
					total += Number(goodsTotal);
				};
			});

			$('.total_price').text(
				total.toFixed(DECIMAL_DIGIT)
			);

			if(total != 0)
				$('.go_charge').show()

		//	console.log(total)
		}
	};
	return calculator;
})
