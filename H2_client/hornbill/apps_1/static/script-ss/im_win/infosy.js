/*common*/
var $ = require('jquery')
	// ,changeTab = require('app/im/changeTab')
	,shareTmp = require('component/shareTmp')

// changeTab('.introBox', '.intro')

//标签切换

//标签init
;(function(){
	$('.intro_tab>li').on('click', function(event) {
		var self = $(this)
			,index = self.index()
			,con = $('.intro_list>div').eq(index)
		changeTab(self,con)
	}).eq(0).trigger('click')
	$('.user_tab>li').on('click', function(event) {
		var self = $(this)
			,index = self.index()
			,con = $('.list_user_list>div').eq(index)
		changeTab(self,con)
	}).eq(0).trigger('click')
	function changeTab(tab,con){
		tab.siblings().removeClass('act')
		tab.addClass('act')
		con.show().siblings().hide()
	}

}())

var toid = Meilishuo.config.toid


//用户备注可编辑状态切换
$('.user_remark .edit_btn').on('click', function(event) {
	var self = $(this)
		,$remarkDiv = $('.remark_content')
		,txt = $remarkDiv.val()//.trim()
		,$errorDiv = $('.remark_error_wrapper')
	$errorDiv.html('')
	// if(self.hasClass('save')){
		var oldText = self.data('oldContent') || ''
		// $remarkDiv.val(txt).attr('readonly', 'readonly');
		// if(txt==''){
		// 	setErr('用户备注不能为空')
		// } else {
			$.post('/windows/aj/remark_update', {
				toid : toid
				,remark : txt
			}, function(res) {
				if(res.error_code){
					setErr(res.message)
				} else {
					setErr('保存成功!')
					setTimeout(function(){setErr('')},3000)
				}
			},'json').error(function() {
				setErr('保存失败，系统错误')
			})
		// }
	// } else {
		// self.data('oldContent',txt)
		// $remarkDiv.removeAttr('readonly').focus()
	// }
	// self.toggleClass('save')

	function setErr(errtxt){
		$errorDiv.html(errtxt)
		$remarkDiv.html(oldText)
	}
})

//帮助标签
$('.help_mark').on('mouseenter', function(event) {
	var content = $(this).attr('data-help') || ''
		,top = $(this).offset().top + $(this).height() + 5
		,left = $(this).offset().left-60
		,$wrapper = $('#pleh_kram')
	if(!$wrapper.length){
		$wrapper  = $('<div />').attr('id','pleh_kram').css({
			width : '145px'
			,padding : '5px'
			,background : '#fcfece'
			,border : '1px solid #e6e6e6'
		}).appendTo($('body'))
	}
	$wrapper.html(content).css({
		position: 'absolute'
		,top: top
		,left: left
	}).show()
}).on('mouseleave', function(event) {
	$('#pleh_kram').fadeOut(300)
})

//用户标签删除
$('.marks_wrapper').on('click', '.del_btn', function(event) {
	console.log('del')
	var $self = $(this)
	var labelId = $(this).attr('data-id')
	$.post('/windows/aj/ulabel_del',{
		toid : toid
		,label_id : labelId
	}, function(res) {
		if(res.error_code==0){
			$self.parents('li').remove()
		}
	},'json')
})

//限制用户标签长度
$('.marks_add_wrapper input').on('input', function(event) {
	var val = $.trim($(this).val());
	if(val.length>8) $(this).val(val.substr(0,8))
})

//用户标签添加
$('.marks_add_wrapper').on('click', '.marks_add_btn', function(event) {
	if($('.marks_wrapper>li').length>=10){
		return $('.marks_error_tip').html('每个用户最多添加10个标签')
	}
	function addNewLabel(id,txt){
		var tmp = shareTmp('tmp_remark',{
			id : id
			,txt :txt
		})
		$('.marks_wrapper').append(tmp)
	}
	var $input =$('.marks_add_wrapper input')
	var val = $.trim($input.val());
	$input.val('')
	$('.marks_error_tip').html('')
	if(val=='') return
	$.post('/windows/aj/ulabel_add', {
		toid : toid
		,label : val
	}, function(res) {
		if(res.error_code==0){
			console.log('succ',res)
			addNewLabel(res.data[0].label_id,val)
		} else {
			$('.marks_error_tip').html(res.message)
		}
	},'json').error(function() {
		$('.marks_error_tip').html('系统错误，请重试！')
	})
}).on('keyup', 'input', function(event) {
	event.stopPropagation()
	if(event.which == 13){
		$(this).siblings('.marks_add_btn').trigger('click')
	}
})

//订单
if(!window.c_sendmsg){
	$('.send_address').hide()
}
$('.order_ul_wrapper').on('click', '.order_header', function(event) {
	//收放隐藏
	$(this).parent('li').siblings().removeClass('show_detail')
	$(this).parent('li').toggleClass('show_detail')
}).on('click', '.add_seller_remark', function(event) {
	//添加卖家备注
	var input = $(this).siblings('.seller_remark_input')
		,txt = $.trim(input.val())
		,orderId = $(this).parents('.order_li').attr('data-orderid')
		,ul = $(this).siblings('ul')
	if(txt && orderId){
		$.post('/windows/aj/add_seller_remark', {
			order_id : orderId
			,content : txt
		}, function(data, textStatus, xhr) {
			if(data.code==0){
				ul.prepend('<li>'+txt+'</li>')
				errorTip('添加备注成功')
			} else {
				errorTip(data.message)
			}
		},'json').error(function(){
			errorTip('添加失败：系统错误')
		})
	}
	input.val('')
	function errorTip(t){
		$('<li class="red_f">'+t+'</li>').appendTo(ul)
			.fadeOut(2000,function(){
				$(this).remove()
			})
	}
}).on('click', '.order_btn_wrapper>span', function(event) {
	//添加卖家备注
	var cla = $(this).attr('class') + '_pop'
		,popObj = $(this).siblings('.pop_wrapper').find('.'+cla)
	popObj.siblings().hide()
	popObj.toggle()
}).on('click', '.send_address', function(event) {
	//发送地址
	var txt = ''
	$(this).siblings('ul').find('li').each(function(index, el) {
		txt += $.trim($(el).text())+'\n'
	})
	try{
		window.c_sendmsg(txt)
	}catch(e){
		console.log('no method c_sendmsg')
	}
}).on('keyup', '.seller_remark_input', function(event) {
	event.stopPropagation()
	if(event.which == 13){
		$(this).siblings('.add_seller_remark').trigger('click')
	}
})
//init order
$('.order_ul_wrapper').html(shareTmp('tmp_order_list',{orders:fml.vars.orderList}))
fml.vars.orderList = null;
//order status change
$('[name=order_select]').on('change', function(event) {
	var val = $(this).val()
	$.get('/windows/aj/recent_order',{
		to : Meilishuo.config.toid
		,status : val
	}, function(res) {
		var orders = (res.data && res.data.datas) ? res.data.datas : []
		$('.order_ul_wrapper').html(shareTmp('tmp_order_list',{orders:orders}))
	},'json')
	//tmp_order_list
})
