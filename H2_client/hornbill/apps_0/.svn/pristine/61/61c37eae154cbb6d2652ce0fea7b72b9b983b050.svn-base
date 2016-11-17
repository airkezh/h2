/*common*/
var waterFall             = require( 'circle/component/waterfall' );
var biWaterFallPlugin     = require( 'circle/component/biWaterfallPlugin' );
var waterFallReflowPlugin = require( 'circle/component/waterfallReflowPlugin' );
var waterfallDataUniquePlugin = require( 'circle/component/waterfallDataUniquePlugin' );
var optimiseFn            = require('circle/component/waterfallOptimise');
var lazy                  = require( 'm/component/lazyLoad' );
var UrlHandle             = require('wap/component/urlHandle');
var lazyLoad              = lazy.init({xpath:'.pic_load'});
var Tab                   = require( 'wap/component/tab' );
var sticky                = require('wap/component/sticky');
var UrlHandle             = require('wap/component/urlHandle');
var $body                 = $( document.body );
var goodsWall             = '.goods-wall';
var $gShelf               = $body.find( goodsWall );
var $pullUp               = $body.find( '.pullUp' );
var Wf                    = null;
var flag 				  = true;
var postData              = {};
var cashe                 = {};

/* 重置 */
function resetLayout(){
	$gShelf.empty();
	$pullUp.attr('status','loading');
}

/* 加载瀑布流 */
function switchWaterfall(type){
	if(Wf){
		Wf.destroy()
		Wf = null
	}

	resetLayout()  //重置	
	Wf = waterFall.init({
		el: goodsWall,
		url: '/aj/wx/ad_temp/waterfall',
		data : {
				'tab' :  type,
				'cid' : fml.vars.cid,
				'limit' : 10
		},
		dataName: 'tInfo',
		uniquekey: 'twitter_id,n_pic_file',
		plugins: [ biWaterFallPlugin, waterFallReflowPlugin , waterfallDataUniquePlugin],
		isAutoUpdateURL : false, //专为微信分享url定制（有分享设置）
		// keywords: 'cid',
		// keywords: ['cid', { 'keyword' : 'tab', 'default' : '0' }], 
		keywords : function(){
			return ('cid=' + fml.vars.cid + '#' + type ); 
		},
		colNum: 2,
		colGap : "10 8",
		hasSideGap : true,
		dataFilter: function(data){
			var gd = this._config.dataName;
			//缓存第一帧的数据
			if(data.frame == 0){
				cashe[type] = data;
			}
			return data[gd];
		},
		onFetchSuccess: function(data){
			if( data.length === 0 ){
				$pullUp.attr('status','stop')
				this.destroy();
				Wf = null
			}
		},
		onFetchFinished: function(data){
			lazyLoad.load();
			// flag = true;
		},
		optimiseFn: optimiseFn
	})
}



( function() {
	var tabClass  = '.tab';
	var $tab      = $body.find( tabClass );
	/* 预先绑定懒加载事件 */
	lazyLoad.scroll();
	
	if( $tab.length ){
		var tabTop = $tab.offset().top | 0 ;
		/* tab吸顶 */
		sticky.init( tabClass , {'infinity' : true ,'checkEle' : false});

	    var tabInstance = Tab.init( {
	    	rememberState : true,
	    	stateName:'type',
	        afterChange: function( item, _, _, isAuto ) {
	        	// console.log(item); 兼容多了一层
	        	var iType = item.data( 'type' ) || item.closest('.tab-item').data('type');
	    		!isAuto && biWaterFallPlugin.reset();
				switchWaterfall( iType );
	        }
	    } )
	    if ( tabInstance.getCurTab() == '0' ) {
			switchWaterfall( 0 );
	    }
    } else {
    	//瀑布流初始化
		switchWaterfall( 0 );
    }

    $( window ).on('wx-sign-over', function(event) {
		Wf.updateParam( 'isAutoUpdateURL' , true);
		// $(this).off('wx-sign-over');
	});


}() );