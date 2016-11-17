fml.define('test/app/posterWall' , ['component/pin'] , function(require , exports){
	var $ = require('component/pin');
	var shareTmp = {};
	var scroll = {};
	var check = {};
	var storage = {};
	var refer = {};
	var isPosterLoad = false;
	var minHeight = 0;
	var isTop = false;

	var preLoadData = {},
		preHoldCall = {},
//		noTurbo = browser('msie' ,'6.0') || browser('msie' , '7.0')
		noTurbo = false;
	function getPreDataKey(posterUrl){
		return posterUrl.page + '' + posterUrl.frame
		}
	return function(urlData , posterUrl ,options ){
		window.console && console.timeEnd('page/guang 2 app/posterWall')
		window.console && console.time('app/posterWall 2 spinnerHide')
		options = $.extend({'noCheck': false,'frame_size' : 5} , options)

		var html_goods_wall = $(".goods_wall"),
			html_goods_wall_dom = html_goods_wall.get(0)
		var html_botSpinner = $('.botSpinner'),
			html_topSpinner = $('.topSpinner'),
			html_paging_panel = $('.paging_panel')

		var frame_size = options.frame_size ,
			onData = options.onData,
			noCheck = options.noCheck
			

		var getPoster = function(data){
			data = data || {};
			if(isTop)
				html_botSpinner.show()
			
			var callback = function(response){
				if (onData) response = onData(response)
				if (0 == urlData.frame) $('.content_fluid').removeClass('v_hidden');
				isTop = true;
				html_botSpinner.show();
				window.console && console.timeEnd('app/posterWall 2 spinnerHide')
				html_topSpinner.hide();
				fml.fireProxy('showNav');
				$('.navhover').show();
				if(response.tInfo == false){
					html_paging_panel.removeClass('none_f');
					html_botSpinner.hide();
					return false;
				}else{
					var tpl = ('string' == typeof response.tInfo) ? response.tInfo : shareTmp('posterWall' , response);	
					html_goods_wall.append($(tpl));
					window.setTimeout(function(){
						fml.fireProxy('logPoster' , response)
					}, 25)
				}
				html_goods_wall.masonry('reload');
				var instance = $.data( html_goods_wall_dom, 'masonry' );
				minHeight = instance.getHeight();
				$.get('http://log.meilishuo.com/cr/for_test',function(){
					alert('aaa')	
				})	
				//大于5帧 停止继续加载	
				if(urlData.frame >= frame_size){
					//显示分页
					html_paging_panel.removeClass('none_f');
					html_botSpinner.hide();
					isPosterLoad = false;
					if (noCheck) return;
					if (Meilishuo.config.user_id > 0) return;	
					if (refer == 'gdt.qq' || refer == 'weibo') {
						check();
					} else {
						// #2799
						if (refer == 'renren') return;	
						fml.fireProxy('showLoginWin', check);
					}
					return;
				}else{
					if(response.tInfo && response.totalNum > 20 && Math.floor(response.totalNum/20) > urlData.frame){
						isPosterLoad = true; 

						urlData.frame++;

				 		if (!noTurbo) window.setTimeout(function(){
							getPosterBricks(data)
						} , 500) 
					}else{
						html_botSpinner.hide();
					} 
				}
			}
			if (noTurbo)
				$.get(posterUrl , data , callback , 'json')
			else
				getPosterBricks( data , callback )
		}	

		/*ajax read poster data*/
		function getPosterBricks(data ,callBack){
			var preKey = getPreDataKey(data)

			if (preKey in preLoadData) {
				//loading or loaded
				if (!callBack) return
				if (false === preLoadData[preKey]){
					if (! (preKey in preHoldCall)) preHoldCall[preKey] = []
					preHoldCall[preKey].push(callBack)
				}else 
					callBack(preLoadData[preKey])
					
			}else {
				preLoadData[preKey] = false
				console.time('cbk...')
				$.get(posterUrl , data , function(posterData){
				console.timeEnd('cbk...')

					// preLoadData[preKey] = posterData	
					if (posterData && posterData.tInfo)
						posterData.tInfo = shareTmp('posterWall' , posterData)	
						 
					 preLoadData[preKey] = posterData	
					if (callBack) callBack(posterData)
					if (preKey in preHoldCall){
						for (var i = preHoldCall[preKey].length-1 ; i>=0;i--)
							preHoldCall[preKey][i](posterData)
						delete preHoldCall[preKey]
						}
					} , 'json')
				}
			}
		/*
		window.setTimeout(function(){
			preLoadData = {}
			} , 120000)
		*/
		var _win = $(window);
		var scrollPoster = function(){
			scroll.bind(function(pos , isDown){
				if(!isDown) return;
				var winH = _win.height(); 
				var top = pos + winH; 
				//浏览器滚动大于等于当前海报最小高加载海报
				if(top >= minHeight - 300 ){
					if(isPosterLoad){
						isPosterLoad = false;	
						getPoster(urlData);
					}
				}
			});
		}

		getPoster(urlData);
		scrollPoster();
		//load faster
		if (!history.pushState) return
		var pagePrev = $('.pagePrev'),
			pageNext = $('.pageNext'),
			originAcls = '.originA'
		var pageLast = pageNext.prev().attr('href')
		function turnPage(evt ,prevOrNext){
			var next = prevOrNext == 'next' ? $('.pageNav a.currentpage').next() : $('.pageNav a.currentpage').prev() 
			if (!next.is(originAcls)){
				next.trigger('click')
				evt.preventDefault()
				return false
				}
			}
		pageNext.add('.pageNext2').click(function(evt){
			turnPage(evt ,'next')
			})
		pagePrev.click(function(evt){
			turnPage(evt , 'prev')
			})
		$('.pageNav i').each(function(){
			$(this).next().addClass('originA')	
			$(this).prev().addClass('originA')	
			})
		//$('.pageNav a').attr('target' , '_blank')
		$('.pageNav a').not(originAcls).not('.pagePrev').not('.pageNext').not('.pageNext2').click(function(evt){
			var abtn = $(this) 
			
			var page = parseInt(this.href.match(/page=(\d+)/)[1])
			if (isNaN(page) ) return
			urlData.page = page
			urlData.frame = 0
			$(".poster_wall").remove()
			history.pushState(null, null, this.href)
			$('.content_fluid').addClass('v_hidden')
			$('.paging_panel').addClass('none_f')
			html_topSpinner.show()
			isTop = false

			getPoster(urlData)

			window.scrollTo(0,0)
			$('.pageNav a.currentpage').removeClass('currentpage')
			abtn.addClass('currentpage')
			
			var pgPre = page -1,
				pgNext = page +1
			if (pgPre < 0) pagePrev.hide()
			else {
				pagePrev.attr('href' , this.href.replace('page='+page , 'page='+pgPre) )
				pagePrev.show()
				}

			if (abtn.attr('href') == pageLast)	
				pageNext.hide()
			else
				pageNext.show()

			pageNext.attr('href' , this.href.replace('page='+page , 'page='+pgNext) )
				
			evt.preventDefault()
			
			})
			
			
	}
});
