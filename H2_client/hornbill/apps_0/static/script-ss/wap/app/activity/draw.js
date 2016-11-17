fml.define('wap/app/activity/draw' , ['wap/jquery.mobile'] , function(require , exports){
	var ajax_btn = function(){
		event.preventDefault();
		var url = '/activity/draw/set/ajax_btn',
			_set = $('.show-detail'),
			_url = _set.find('#btn').attr('href'),
			data = {
				real_name : _set.find('#name').val(),
				mobile_phone : _set.find('#tel').val(),
				address : _set.find('#star').val()
			},
			callback = function(_msg){
				if(_msg.code == 0){
					location.href = _url;
				}else{
					alert(_msg.msg);
					_set.find('#name').val('');
					_set.find('#tel').val('');
				}
			};
		$.get(url , data , callback ,'json');
	}
	return function(){
		$('#btn').on('click', function(){
			ajax_btn();
		});
	};
});