fml.define('wap/app/doota/stock',[] , function(require , exports ){
	var _notype =false
	var _o = function(opt){
		var self = this
		this.opt = opt
		this.stockMax = null 
		this.inputNum = parseInt(opt.input.val())

		function chgShowNum(plus){
			this.inputNum += plus
			this.updateNum()
			}
		this.updateNum()

		opt.input.bind('input propertychange ', function(evt){
			if (!_notype) self.updateNum(this.value)
			_notype = false
			}).bind('blur' , function(){
				if ('' == this.value) this.value = 1
				})	

		opt.plus.on('tap', function(){
			if (self._stat) {
				if (self.tipOnout) self.tipOnout(self._stat)
				return
			}
			chgShowNum.call(self , 1)	
			})
		opt.minus.on('tap', function(){
			chgShowNum.call(self , -1)	
			})
		}
	
	_o.prototype.updateNum =  function(num , limitMax){
		var input = this.opt.input
		if ('' === num) return
			
		var maxOrderNum = this.opt.maxOrderNum || 100;
		num = num ? (num|0) : this.inputNum
		num = Math.max(num , 1)
		this._stat = 0
		if (num > maxOrderNum){
			this._stat = 1
			num = maxOrderNum
			///每人最多限购10件
		}else if (null != this.stockMax && num > this.stockMax ){
			this._stat = (0==this.stockMax) ?3: 2
			num = this.stockMax
			//超过库存
		}
		if (!limitMax) this.inputNum = num
		if (num != input.val()){
			_notype = true
			input.val(num)
			fml.emit('update_num',{num:num});
		}
		if (this.tipOnout) this.tipOnout(this._stat)
		if (this.outStock) this.outStock(num <=0 || num > this.stockMax )
		} 
	_o.prototype.upStockNum = function(num){
		num = parseInt(num) 
		this.opt.stockMax.html(num)
		this.stockMax = num
		this.updateNum(null , true)

		}
	
	_o.prototype.outStock = null 
	_o.prototype.tipOnout = null 
		
		

	exports.bind = function(opt){
		return new _o(opt)
		}
	
	
	})
