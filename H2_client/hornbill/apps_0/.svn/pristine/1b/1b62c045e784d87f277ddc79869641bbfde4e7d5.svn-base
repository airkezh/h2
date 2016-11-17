/*common*/
var $ = require('wap/zepto')

var $defaultBtn = $( '.addrShow' ).find( '.choose_btn' );
var $addrItem = $( '.addrShow .adrl_list' );
var ajaxIsComplete = true;

$addrItem.on( 'click', function(){
	var $this = $( this );
	var $choose_btn = $this.prev();
	var addr_id = $this.attr( 'addr_id' );

	$addrItem.attr( 'is_default', '0' )
	$this.attr( 'is_default', '1' ) 

	setDefaultAddr( addr_id );
	setSelectBtn( $choose_btn );
})		

$defaultBtn.on( 'click', function(){
	var $this = $( this );
	var addr_id = $this.attr( 'addr_id' );
	setSelectBtn( $this );
	setDefaultAddr( addr_id );
})

$( '.add_address' ).on( 'click', function(){
	window.location.href = '/address/edit/new'
	setTimeout(function(){
		location.reload();
	},1000)
})

//hack,解决返回这个页面后这个页面不刷新的问题
$( '.edit_btn' ).on( 'click', function(){
	setTimeout(function(){
		location.reload()
	},1000);
})

function setDefaultAddr( addr_id ){
	if( ajaxIsComplete == true ){
		ajaxIsComplete = false;
		$.ajax( {
	        url     : '/aj/doota/address_default',
	        type    : 'post',
	        dataType: 'json',
	        data    : { 'addr_id' : addr_id },
	        success : function( res ) {
	           ajaxIsComplete = true;
	           if(res.code == '0'){
					window.history.back();
					setTimeout(function(){
						window.location.href = "/welcome"
					}, 2000)
				}else{
					alert( res.msg );
				}
	        },
	        error   : function() {
	            ajaxIsComplete = true;
	            alert( '系统繁忙，请稍后再试' );
	        }
	    } );
	}
}

// 设置被选择的默认地址的样式
function setSelectBtn( $this ){
	var checked = $this.attr( 'checked' );
	var defaultNote = $this.parents( '.addrShow' ).find( '.default_note' );
	if( checked == 'true' ){
		return;
	}else{
		$defaultBtn.removeClass( 'choose' ).addClass( 'unchoose' );
		$defaultBtn.attr( 'checked','false' );
		$defaultBtn.attr( 'is_default', '0' )

		$this.attr( 'is_default', '1' )
		$this.attr( 'checked','true' );
		$this.removeClass( 'unchoose' ).addClass( 'choose' )
		$this.next().children().eq( 0 ).append( defaultNote );	
		
	}
}

