/*common*/

var $ = require('wap/zepto')
	, DECIMAL_DIGIT = 2
	, calculator = {
		/* 计算单个商品的总钱数 */
		single: function(con){
			var self = this
				, amount = Number(self.find('.amount').val()) || 1
				, price = Number(self.find('.goods_price').data('price'))
				, total = amount * 100 * price / 100

			if(isNaN(amount)){
				/* 应设计需求，失效产品的小计显示单价。。 */
				con.text(price.toFixed(DECIMAL_DIGIT))
			} else {
				con.text(total.toFixed(DECIMAL_DIGIT))
			}

			return amount * 100 * price / 100 || 0
		},

		/* 计算单个店铺的总钱数 */
		single_shop: function(con){
			var self = this
				, total = 0

			self.find('.goods').each(function(i, item){
				var self = $(item)
					, goodsTotal = calculator.single.call(self, self.find('.goods_total'))

				if(self.find('.select_goods:enabled').attr('checked')){
					total += Number(goodsTotal)
				}
			})

			con.text('¥' + total.toFixed(DECIMAL_DIGIT))

			return total
		},

		/* 计算所有购物车商品总钱数 */
		total: function(){
			var total = 0

			$('.cart_list').each(function(i, item){
				var self = $(item)
					, shopsTotal = calculator.single_shop.call(self, self.find('.shop_price_text'))

				total += Number(shopsTotal)
			})

			$('.total_price').text('¥' + total.toFixed(DECIMAL_DIGIT))

			if(total != 0){
				$('.go_charge').show()
			}
		}
	}

return calculator
