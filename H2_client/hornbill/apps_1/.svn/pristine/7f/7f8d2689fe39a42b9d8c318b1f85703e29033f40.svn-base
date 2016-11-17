fml.define('wap/app/hackWeixin',['wap/zepto'],function(){
	//判断是否微信 
	if (navigator.userAgent.indexOf('MicroMessenger') == -1 ) return
	function hackHref(){
		var href = this.getAttribute('href')
		if (href.indexOf('meilishuo://') == 0 || href.indexOf('meilishuohd://') == 0){
			href = 'http://m.meilishuo.com/goto/open/?url='+encodeURIComponent(href)
			this.setAttribute('href', href)
		}
		}
	$('a').click(hackHref)
	$('a').live('tap' ,hackHref)
	//劫持 连接是 meilishuo://的 A
	/*
	var links = document.links
	for (var i=0,j = links.length ; i < j ; i++){
		var a = links[i]
		var href = a.getAttribute('href')
		if (href.indexOf('meilishuo://') == 0 || href.indexOf('meilishuohd://') == 0){
			href = 'http://m.meilishuo.com/goto/open/?url='+encodeURIComponent(href)
			a.setAttribute('href', href)
			}
		
		}
	*/
	})
