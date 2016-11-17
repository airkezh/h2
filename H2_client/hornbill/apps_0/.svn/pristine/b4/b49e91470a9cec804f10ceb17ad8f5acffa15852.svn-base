fml.define('wap/app/activity/znm' , ['wap/jquery.mobile'] , function(require , exports){
	this._num1 = 5, this._num2 = 3;

	/**
	 * 点击隐藏事件
	 * @param  {[String]} _dom [Dom节点ID]
	 * @return {[Void]}
	 */
	this.opt = function(_dom) {
		_dom.animate({
	    	opacity: 0
		},1000);
		_dom.off('click');
	}

	/**
	 * dom点击事件
	 * @param {[Dom]} _this [点击事件Dom节点]
	 * @return {[Void]}
	 */
	this.domClick = function(_this){
		if (_this.attr('num') !== '1') {
			this.showError();
			this._num2 === 0 ? (window.location.href = '/activity/znm/show/') : this._num2--;
		}else{
			this.opt(_this);
			this._num1 === 1 ? (window.location.href = '/activity/znm/ok/') : this._num1--;
		}
	}

	/**
	 * 容错事件
	 * @return {[Void]}
	 */
	this.showError = function(){
		$('#error').show();
		if (this._num2) {
			$('#right img').attr('src','http://img.meilishuo.net/css/images/wap/activity/znm/' + ($('#right img').attr('src').match(/(\d)/)[1] - 1) + '.png');
		};
		setTimeout(function(){
			$('#error').hide();
		},1000)
	}

	var share = function(_this, _num){
		event.preventDefault();
		var url = '/activity/znm/set/ajax',
			_set = $('.btn'),
			data = {
				real_name : _set.find('#name').val(),
				mobile_phone : _set.find('#tel').val(),
				email : _set.find('#mail').val()
			},
			callback = function(_msg){
				if(_msg.code == 0){
					_num === 1 ? location.href = _msg.data.qZoneShareUrl : location.href = _msg.data.weiboShareUrl;
				}else{
					alert(_msg.msg);
					_set.find('#name').val('');
					_set.find('#tel').val('');
				}
			};
		if (!_set.find('#name').val() || !_set.find('#tel').val() || !_set.find('#mail').val()) {
			$('.bug').show();
			setTimeout(function(){
				$('.bug').hide();
			},4000);
		}else{
			$.get(url , data , callback ,'json');
		}
	}

	return function(){
		setTimeout(function(){
			$('.float-l img').on('click', function(){
				domClick($(this));
			});
			$('#start').hide();
		},5000)
		$('#qq').on('click',function(){
			share($(this),0);
		});
		$('#weibo').on('click',function(){
			share($(this),1);
		});
	};
});
