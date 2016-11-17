/*common*/
window.$        = require('wap/zepto');
var Alert       = require('wap/ui/alert');
var shareTmp    = require('wap/component/shareTmp');
var $wrap       = $('.wrap');
var $oForm      = $('#form_search');
var $rigBox     = $('#ipt-rig-box');
var oSearchmark = $('#search-mark');
var oInput      = $oForm.children('.ipt');
var channel		= 'channel=weixin_search';
var requestId   = 0;
var respondId   = 0;
var initInfo	= ''; //缓存初始默认推荐
var preValue    = '';

/* 初始化热门推荐面板 */
initRecom();

/* 搜索框 输入事件 */
oInput.on('focus',  function(event) {
	var value = $(this).val() || '' ;
	$wrap.hide();
	/* 防止两次值相同再次请求接口 */
	if( value && preValue != value){
		oSearchmark.empty().show();
		preValue = value;
		$(this).trigger('input')
	}else if( !value ){
		oSearchmark.show();
		clearInfo();
	}
}).on('input',  function(event) {
	var value = $(this).val() || '' ;
	if( value ) {
		changeType('search-btn');
		requestId++
		preValue = value;
		getData( { key_word : value } );
	}else{
		clearInfo();
	}
});

/* 搜索相关词 li 点击跳转事件 */
oSearchmark.on('click', '.item', function(ev) {
	var url = $( ev.target ).data('url');
	url && ( window.location.href = url );
});

/* 搜索 */
$oForm.on('submit',function(e){
	e.preventDefault();
	var v = $.trim(oInput[0].value);
	v = v ? v : fml.vars.defaultKey;
	window.location.assign('/wx/search?key=' + encodeURIComponent(v) + '&' + channel );
}).on('click', '.cancel-btn', function(event) {
	/* 取消。收起面板 mark hide */
	$wrap.show();
	oSearchmark.hide();
	changeType('im-btn');
});

/* 异步请求 初始化 热门搜索面板 */
function initRecom(){
	$.get( '/aj/wx/search/hot_search' , {} , function(res){
		if( res && res.length ){
			var tpl = shareTmp( 'hot-search-tpl' , res );
			initInfo = tpl;
			oSearchmark.empty().html( tpl );
		}
	} , 'json');
}

/* 输入框右侧状态 */
function changeType(arg){
	$rigBox.removeClass().addClass( arg );
}

/*清空面板回到推荐状态*/
function clearInfo(){
	changeType('cancel-btn');
	oSearchmark.html( initInfo ); //清空面板，显示初始页面
	requestId = respondId = 0;
}

/* 获取搜索数据 */
function getData(param){
	function showData (res){
		//加resondId与requestId判断，防止延迟返回的数据，覆盖初始页面数据
		respondId++
		if( requestId == 0 ){
			clearInfo();
		}else if( res.count == 0 ){
			oSearchmark.html( '' ); //清空面板
		}else if( res.count > 0 && requestId && ( respondId >= requestId ) ){
			var tpl = shareTmp( 'words-list-tpl',res.associative_word );
			oSearchmark.empty().append(tpl)
		}
	}
	$.get( '/aj/wx/search/autocomplete' , param , showData , 'json');
}