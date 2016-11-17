fml.define('app/posterWall' , ['component/userstate' ,'app/referrer' , 'app/checkLogin' , 'component/windowScroll' , 'component/pin' , 'component/shareTmp'] , function(require , exports){
	var $ = require('component/pin');
	var shareTmp = require('component/shareTmp');
	var scroll = require('component/windowScroll');
	var check = require('app/checkLogin');
	var refer = require('app/referrer');
	var isPosterLoad = false;
	var minHeight = 0;
	var isTop = false;
//	var browser = require('component/userstate').browser
	var ua = require('component/userstate');
	var browser = ua.browser;

	var preLoadData = {},
		preHoldCall = {},
		noTurbo = browser('msie' ,'6.0') || browser('msie' , '7.0')

	function getPreDataKey(posterUrl){
		return posterUrl.page + '' + posterUrl.frame
		}
	return function(urlData , posterUrl ,options ){
		options = $.extend({'noCheck': false,'frame_size' : 5} , options)

		var html_goods_wall = $(".goods_wall"),
			html_goods_wall_dom = html_goods_wall.get(0)
		var html_botSpinner = $('.botSpinner'),
			html_topSpinner = $('.topSpinner'),
			html_paging_panel = $('.paging_panel')

		var frame_size = options.frame_size ,
			onData = options.onData,
			noCheck = options.noCheck
		function showPg(){
			 html_paging_panel.removeClass('none_f')
             html_botSpinner.hide()	
				}
			
		var getPoster = function(data){
			data = data || {};
			if(isTop)
				html_botSpinner.show()

			
			var callback = function(response){
				if (onData) response = onData(response)
				if (0 == urlData.frame) $('.content_fluid').removeClass('v_hidden');
				isTop = true;
				html_botSpinner.show();
				html_topSpinner.hide();
				fml.fireProxy('showNav');
				$('.navhover').show();
				if (response['continue']){
					 urlData.frame++;
					 getPoster(urlData)
					 return
				}else if(response.tInfo == false){
					showPg()
					return false
				}else{
					if (response._layout)
						delete response._layout
					else{
						if ('string' == typeof response.tInfo)  
							tpl = response.tInfo
						 else {
							tpl = shareTmp('posterWall' , response)
							//window.setTimeout(function(){
							//	fml.fireProxy('logPoster' , response)
							//}, 2000)
							
						}
						html_goods_wall.append(tpl)
					}
					html_goods_wall.masonry('reload');
				}
				var instance = $.data( html_goods_wall_dom, 'masonry' );
				minHeight = instance.getHeight();
		
				//大于5帧 停止继续加载	
				if(urlData.frame >= frame_size){
					//显示分页
					showPg()
					isPosterLoad = false;
					if (noCheck) return;
					if (Meilishuo.config.user_id > 0) return;
			//		if (refer == 'gdt.qq' && ua.isNew()) {			//#3008 QQ空间新用户弹窗加粉效率测试需求
			//			var folQzone = require('app/checkQzoneFol');
			//			folQzone.folQzoneUnLog();
			//			return;
			//		}
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
			var mc_poster = Meilishuo.config.poster
			if (mc_poster &&  mc_poster[data.frame]){
				var totalNum = mc_poster[data.frame]
				delete mc_poster[data.frame]
				callback({'tInfo' : {} ,'_layout' : true ,'totalNum' : totalNum })
				//callback(mc_poster[data.frame])
			}else{
				if (noTurbo)
					$.get(posterUrl , data , callback , 'json').error(showPg)
				else
					getPosterBricks( data , callback )
			}
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
				$.get(posterUrl , data , function(posterData){

					// preLoadData[preKey] = posterData	
					if (posterData && posterData.tInfo){
						posterData.tInfo = shareTmp('posterWall' , posterData)	
						posterData._layout = true
						html_goods_wall.append(posterData.tInfo)
					}
						 
					 preLoadData[preKey] = posterData	
					if (callBack) callBack(posterData)
					if (preKey in preHoldCall){
						for (var i = preHoldCall[preKey].length-1 ; i>=0;i--)
							preHoldCall[preKey][i](posterData)
						delete preHoldCall[preKey]
						}
					} , 'json').error(showPg)
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
