fml.define('app/shareTo' , ['jquery' , 'app/logstatics'] , function(require , exports){
	var $ = require('jquery');
	var log = require('app/logstatics');
	var shareToWeibo = function(url, reply, imgsrc ,searchPic) {
		javascript:void((
			function(s,d,e){
			   var f='http://v.t.sina.com.cn/share/share.php?'; var p=['url='+e(url),'&title=',e(reply),'&appkey=463778370'].join('');
			   if(imgsrc !== false ) { 
				   p += '&pic='+imgsrc;
				}
				if(searchPic === false){
					p += '&searchPic='+searchPic;	
				}
				function a(){
					if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join(''))){                                     u.href=[f,p].join('');
					}
				};
				if(/Firefox/.test(navigator.userAgent)){
					setTimeout(a,0);
				}else{
					a();
				}
			}
		)(screen,document,encodeURIComponent));
	};
	var shareToQzone = function(url, reply, description, title, imgsrc) {
		javascript:void((
			function(s,d,e){
				var f='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
				var s={
					url:url,
					desc:reply,/*默认分享理由(可选)*/
					summary:description,/*摘要(可选)*/
					title:title,//twittertitle,/*分享标题(可选)*/
					site:'美丽说',/*分享来源 如：腾讯网(可选)*/
					pics:imgsrc/*分享图片的路径(可选)*/
				};
				var p = [];
				for(var i in s){
					p.push(i + '=' + e(s[i]||''));
				}
				function a(){
					if(!window.open([f,p.join('&')].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join(''))){
						u.href=[f,p.join('&')].join('');
					}
				};
				if(/Firefox/.test(navigator.userAgent)){
					setTimeout(a,0);
				}else{
					a();
				}
		})(screen,document,encodeURIComponent));
	};
	var shareToQQ = function(url, reply, imgsrc){
		javascript:void((
			function(s,d,e){
				var f='http://v.t.qq.com/share/share.php?',u=url,p=['url=',e(u),'&title=',e(reply),'&appkey=95fd1cb5bf304d259fdaec43297d8b33'].join('');
				if(imgsrc !== false ) {
					p += '&pic='+imgsrc;
				}
			function a(){
				if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join(''))){
					u.href=[f,p].join('');
				}
			};
			if(/Firefox/.test(navigator.userAgent)){
				setTimeout(a,0);
			}else{
				a();
			}
		})(screen,document,encodeURIComponent));
	};

	exports.shareToWeibo = shareToWeibo;
	exports.shareToQzone = shareToQzone;
	exports.shareToQQ = shareToQQ;

	exports.shareGroupToSinaWeibo = function($name, $picSrc, $groupId, $reply,$rep){   
		log.clicklog('/board/groupweibo_btn')
		var reply = $reply + '>> ';
		var url = (typeof $rep == 'undefined') ?  'http://www.meilishuo.com/group/' + $groupId + '?frm=huiliu_groupweibo' : 'http://wap.meilishuo.com/minisite/'+$rep;
		var imgsrc = $picSrc;
		shareToWeibo(url, reply, imgsrc);
	};
	exports.shareToQQWeiBo = function($name, $picSrc, $groupId, $reply, $rep){
		log.clicklog('/board/grouptq_btn')
		var reply = $reply;
		var imgsrc = $picSrc;
		var randNum = Math.random();
		//var url = server_url +'group/'+$groupId+'?' +
		//randNum;
		var url = (typeof $rep == 'undefined') ? 'http://www.meilishuo.com/group/'+$groupId+'?frm=huiliu_grouptq&' + randNum : 'http://wap.meilishuo.com/minisite/'+$rep;
		shareToQQ(url, reply, imgsrc);
		   //$.get(server_url+'share/ajax_shareToWeibo/'+tid);
	};
	exports.shareGroupToQzone = function($name, $picSrc, $groupId,$reply,$description,$title,$rep){
		log.clicklog('/board/groupqzone_btn')
		var randNum = Math.random();
		var server_url = location.host + '/'
		var reply = $reply;
		var url = (typeof $rep =='undefined') ?server_url + 'group/' + $groupId +'?frm=huiliu_groupqzone&' + randNum :  server_url + 'minisite/'+$rep;
		var imgsrc = $picSrc;
		var description = $description;
		shareToQzone(url, reply, description, $title, imgsrc);
	//$.get(server_url+'share/ajax_shareToQzone/'+tid);
	};
	exports.shareGoodsToQQWeiBo = function($name, $picSrc, $goodsId, $reply, $filter){
	//	log.clicklog('/share/sharetq_btn')
		var reply = $reply;
		var imgsrc = $picSrc;
		var filter = (typeof $filter =='undefined') ? 'share/' : $filter;
		var url = 'http://www.meilishuo.com/' + filter + $goodsId + '?frm=huiliu_sharetqq';
		shareToQQ(url, reply, imgsrc);
	};
	exports.shareGoodsToQzone = function($name, $picSrc, $goodsId, $reply, $description, $title, $filter){
	//	log.clicklog('/share/shareqzone_btn')
		var filter = (typeof $filter =='undefined') ? 'share/' : $filter;
		var url = 'http://www.meilishuo.com/' + filter + $goodsId + '?frm=huiliu_shareqzone';
		var reply = $reply;
		var imgsrc = $picSrc;
		var description = $description;
		shareToQzone(url, reply, description, $title, imgsrc);
	};
});
