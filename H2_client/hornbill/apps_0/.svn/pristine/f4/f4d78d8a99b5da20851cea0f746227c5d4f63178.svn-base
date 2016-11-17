(function(){

function loadScript(url,callback){
	var head = document.head || document.getElementsByTagName( 'head' )[0] || document.documentElement ; 
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	head.appendChild(script);
	script.onload = script.onreadystatechange = function(){
		var state = this.readyState;
		if (!state || 'loaded' == state || 'complete' == state) {
			 callback();
		}
	};
}



function jqReady(){
	try {
		exePickup(jQuery);
	}catch(e){
		alert("该网站暂时不支持美丽说拾宝器抓取");
		}
	function exePickup($){
		$.fn.cssO = function(css){
			var self = $(this);
			for (var c in css){
				if (css.hasOwnProperty(c)) self.css(c , css[c]);
				}
			return self;
			};
		var mDomain = 'http://www.meilishuo.com/'

		var meilishuo = {
			hostName : "meilishuo",
			imgWidth : 200,
			server_url : mDomain,
			imgHeight : 200,
			maxWidth:200,
			maxHeight:200,
			init : function(){
				if(window.location.href == "about:blank"){
					window.location.href = this.server_url
					return false;
				}
				var localhost = window.location.toString();
				if(localhost.substr(localhost.indexOf(".")+1,"9") == this.hostName){
					alert("你就在美丽说呢,不能采集本站哦!");
					return false;
				};
				this.overLay();
				this.checkGoods();
				return;
			},
			checkGoods : function(){
				var url = this.server_url + 'ja/twitter/verify';
				var data = {url:encodeURIComponent(window.location)};
				var _this = this;
				var callback = function(response){
					if(response.code) {
						alert(response.msg || '对不起,请换其他页面尝试抓图');
						return;
					}
					if(response.data.message == 'picture'){
						if(_this.getImgSize() <= 0 || _this.getImg() == ""){
							alert("抱歉,页面上没有足够大的图片");
							$("#overLay").remove();
							return false;
						}
						$("#waitFor").show();
						window.setTimeout(function(){
							_this.forImg();
							$(".meiliLogo").show();
						},10)
					}else if(response.data.message == 'goods'){
						$("#overLay").remove();
						_this.showIframe(_this.server_url + 'meilishuo_goods?mlsurl=' + encodeURIComponent(window.location.href) + '&mlstype=goods');
					}
				}
				var res = $.get(url , data , callback , 'jsonp')
			},
			showIframe : function(url){
				$("waitFor").show();
				var iframe = '<div style="position: absolute; width: 100%;height: '+ $(window).height() +'px; top: '+ $(document).scrollTop() +'px; z-index:2147483647; left: 0; visibility: visible; " class="iframePanel"><iframe width="100%" height="100%" src="'+ url +'" frameborder="0" scrolling="no" allowTransparency="true" style="visibility: visible;" ></iframe></div>'
				if($(".iframePanel").size()==0) $('body').append(iframe = $(iframe));
				$('body').css('overflow' , 'hidden');
				var isIe = window.postMessage;
				var timer = null;
				var ieIframe = iframe.find('iframe')[0].contentWindow;
				if (!isIe){
					timer = window.setInterval(function(){
						try{
							var d = ieIframe.name;
						}catch(e){
						}
						if ('close' == d){
							closeLayer();
							window.clearInterval(timer);
						}
					}, 500)
				}else {
					function receiveMessage(event){
						var d = event.data;
						if ('close' == d){
							closeLayer();
						}
					}
					if(window.addEventListener){
						window.addEventListener("message", receiveMessage,false);
					}else{
						window.attachEvent("onmessage", receiveMessage);
					}
					ieIframe.name = window.location
				}
				var closeLayer = function(){
					$('body').css('overflow' , 'auto');
					iframe.remove();
				}
			},
			getImgSize : function(){
				var imgSize = $(document).find("img").size();
				return imgSize;
			},
			getImg : function(){
				var img = $(document).find("img");
				var len = img.size();
				var imgArr = [];
				var imgSrcList = {};
				for(var i=0; i<len; i++){
					var thisImg = img.eq(i);
					var iw = thisImg.width();
					var ih = thisImg.height();
					var imgList = {};
					if(thisImg.attr('src') in imgSrcList) continue;
					imgSrcList[thisImg.attr('src')] = true; 
					if(iw>=this.maxWidth && ih>=this.maxHeight){
						if(thisImg.attr("src") == "" || thisImg.attr("src") == undefined || thisImg.attr("src") == null) continue;
						var cImg = new Image;
						cImg.src = thisImg[0].src;
							if(iw/ih >= this.imgWidth/this.imgHeight){
								if(iw > this.imgWidth){
									cImg.width = this.imgWidth;
									cImg.height = (ih * this.imgWidth) / iw;
								}else{
									cImg.width = iw;
									cImg.height = ih;
								}
							}else{
								if(ih > this.imgHeight){
									cImg.height = this.imgHeight;
									cImg.width = (iw * this.imgHeight) / ih;
								}else{
									cImg.height = ih;
									cImg.width =  iw;
								}
							}
							imgList.width = iw;
							imgList.height = ih;
							imgList.img = cImg
							imgArr.push(imgList);
					}
				}
				return imgArr;
			},
			forImg : function(){
				var _this = this;
				var imgs = this.getImg();
				var imgLen = imgs.length;
				for(var j=0;j<imgLen;j++){
					var everImg = imgs[j];
					$("#overLay").append($('<div class="imgItem"><span class="imgUpload">抓取</span><span class="imgSize" style="background: #fff;border-radius: 4px; -webkit-border-radius: 4px;float:left;font-size: 11px; position:absolute; bottom: 10px; left: 70px; width: 60px;" >'+ everImg.width +' x '+ everImg.height +'</span></div>').append(everImg.img));
					$(everImg.img).cssO({"margin-top":(this.imgHeight-$(everImg.img).height())/2})
				}
				$(".imgItem").cssO({"float":"left","cursor":"pointer","text-align":"center","position":"relative","width":"200px","height":"200px","overflow":"hidden","border-right":"1px solid #e7e7e7","border-bottom":"1px solid #e7e7e7","background-color":"#fff"})
				.bind("click",function(){
					window.setTimeout(function(){
						$("#overLay").remove();
					},1000)
					_this.showIframe(_this.server_url + 'meilishuo_goods?picurl=' + encodeURIComponent($(this).find('img').attr("src")) + '&mlstype=twitter&location='+encodeURIComponent(window.location.href));
				});
				$(".imgUpload").cssO({"position" : "absolute" , "display" : "none" , "height" : "32px" , "background" : "url('http://i.meilishuo.net/css/images/goods/zq.png') no-repeat" , "cursor" : "pointer" , "color" : "#fff" , "font-size" : "14px" , "font-weight" : "bold" , "line-height" : "32px" , "left" : "57px" , "top" : "80px" , "text-align" : "center" , "width" : "82px"})
				$(".imgItem").hover(function(){
					$(this).find(".imgUpload").show();
				} , function(){
					$(this).find(".imgUpload").hide();
				})
				$("#waitFor").hide();
			},
			overLay : function(){
				var _this = this;
				this.closeOverLay();
				$(window).scrollTop(0);
				var overLay = '<div id="overLay" ><div style="width:100%;height:40px;background: -moz-linear-gradient(#FFFCFC, #F3F0F0); background: -webkit-linear-gradient(#FFFCFC, #F3F0F0); filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#FFFCFC,endcolorstr=#F3F0F0);border-bottom:1px solid #ccc;line-height: 40px;text-align: center;"><div style="cursor:pointer; color: #666; font-size: 14px; font-weight: bold; text-align: center;" id="closeOverLay">关闭</div></div><div class="meiliLogo"><a style="display: block; height: 200px; width: 200px; " href="http://www.meilishuo.com" target="_blank"></a></div></div>';
				$("body").append($(overLay));
				$("#overLay").width($(document).width());
				$("#overLay").height($(document).height());
				$("#overLay").cssO({"background-color":"rgba(255,255,255,0.8)","filter":"progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ccffffff,endcolorstr=#ccffffff)","position":"absolute","z-index":"999999","top":"0"});
				$(".meiliLogo").cssO({"float":"left","cursor":"pointer","text-align":"center","width":"200px","height":"200px","overflow":"hidden","border-right":"1px solid #e7e7e7","border-bottom":"1px solid #e7e7e7","background":"#f2f0f0 url(http://stc-tx.meiliworks.com/css/images/header/mllogo.png) no-repeat center" , "display" : "none"});
				$('#overLay').append('<div id="waitFor" style="text-align:center;position:absolute;left:50%;margin-left:-25px;top:100px;z-index:9999999;padding:3px; color:#999;" ><p><img src="http://stc-tx.meiliworks.com/css/images/indicator_medium.gif" /></p><p>抓取中...</p></div>');
				$("#closeOverLay").click(function(){
					_this.closeOverLay();
				});
			},
			overLayGoods : function(){
				var _this = this;
				this.closeOverLay();
				$(window).scrollTop(0);
				var overLay = '<div id="overLay" ></div>';
				$("body").append($(overLay));
				$("#overLay").width($(document).width());
				$("#overLay").height($(document).height());
				$("#overLay").cssO({"background-color":"rgba(255,255,255,0.8)","filter":"progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ccffffff,endcolorstr=#ccffffff)","position":"absolute","z-index":"999999","top":"0"});
				$("#closeOverLay").click(function(){
					_this.closeOverLay();
				});
			},
			closeOverLay : function(){
				//this.findImg();
				//this.mouseImg();
				$("#overLay").remove();
				$(".iframePanel").remove();
			},
			findImg : function(){
				var _this = this;
				var find = '<div class="shareToMeilishuo" style="width:40px;background:#fff;height:20px;border:solid 1px #FCBCD2;" >美丽说</div>';
				$("body").append($(find));
				$(".shareToMeilishuo").cssO({"cursor":"pointer","position":"absolute","display":"none","z-index":"9999999999999"});
				$(".shareToMeilishuo").hover(function(e){
					$(this).show();
					_this.stopPropagation(e);
				},function(){
					$(this).hide();
				})
			},
			mouseImg : function(){
				var len = this.getImgSize();
				var img = $($(document).find("img"));
				var imgArr = [];
				var imgUrl = [];
				for(var i=0; i<len; i++){
					var thisImg = img.eq(i);
					var iw = thisImg.width();
					var ih = thisImg.height();
					if(iw>=this.maxWidth && ih>=this.maxHeight){
						thisImg.hover(function(){
							$(".shareToMeilishuo").show();
							$(".shareToMeilishuo").cssO({"top":$(this).offset().top,"left":$(this).offset().left});
							$(".shareToMeilishuo").attr("src",$(this).attr("src"));
						},function(){
							$(".shareToMeilishuo").hide();
						})
					}
				}
				$(".shareToMeilishuo").click(function(){
					window.open("http://www.meilishuo.com?imgurl="+$(this).attr("src"),"newwindow","location=yes","width=400,height=400");

				})

			},
			stopPropagation : function(e) {
				var getEvent = e || window.event;
				if(getEvent.stopPropagation) { 
					getEvent.stopPropagation();
				} else {
					getEvent.cancelBubble = true;
				}   
			}
		}
		meilishuo.init();
			
	};
}

if (typeof jQuery != 'undefined')
	jqReady()
else	
	loadScript("http://s.meilishuo.net/js/jquery.js",jqReady)

})()
