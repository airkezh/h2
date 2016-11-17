/*common*/
require('wap/zepto')
var defaultDressFunc = require( 'wap/app/doota/address' );
var form = $( '#addressForm' );
var f_is_default = form.find( '[name=is_default]' );
var phoneBox = form.find( '[name=phone]' );
var history = window.history;
var ajaxIsComplete = true;

defaultDressFunc(function(){
	goBack();
});

phoneBox.on( 'focus', function(){
	phoneBox.val('');
})


$( '.remove_addr_btn' ).on( 'click', function(){
	addr_id = $( this ).attr( 'addr_id' );
	if( ajaxIsComplete == true ){
		ajaxIsComplete = false;
		$.ajax( {
	        url     : '/aj/doota/address_delete',
	        type    : 'post',
	        dataType: 'json',
	        data    : { 'addr_id' : addr_id },
	        success : function( res ) {
	           ajaxIsComplete = true;
	           if(res.code == '0'){
					goBack();
				}else{
					alert( '删除失败' );
				}
	        },
	        error   : function() {
	            ajaxIsComplete = true;
	            alert( '系统繁忙，请稍后再试' );
	        }
	    } )
	}
});

form.on( 'click', '.switch_btn', function() {
	var is_defult = f_is_default.prop( 'checked' );
	if( is_defult ) {
		$(this).removeClass( 'switch_check').addClass( 'switch_uncheck' );
		 f_is_default.prop('checked', false );
	}else{
		$(this).removeClass('switch_uncheck').addClass('switch_check');
		f_is_default.prop( 'checked', true );
	}
})

form.on( 'change', 'select', function(){
	var $select_wrap = $(this).parent();
	if( $(this).val().trim() != 0 ){
		$select_wrap.find( '.notice' ).css( 'display', 'none' );
		$select_wrap.find( '.select_btn' ).html( '' );
	}else{
		$select_wrap.find( '.select_btn' ).html( '请选择' );
		$(this).parent().find( '.notice' ).css( 'display', 'inline-block' )
	}
})

function goBack() {
	if(history && history.length > 1){
		history.back();
		setTimeout(function(){
			window.location.href = "/welcome"
		}, 2000)
	}else{
		window.location.href = '/welcome';
	}
}
