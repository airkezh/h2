fml.define('page/aboutus',['jquery'],function(require,exports){
	var $ = require('jquery');
	(function changeColor(){
		var oUl = $(".job_content").children('ul');
		for(var i=0; i<oUl.length; i++){
			if(i%2>0){
				$(oUl[i]).addClass("even");
			}
		}
	})();
	$(".job_tu img").toggle(function(e){
		$(e.target).attr("src","http://i.meilishuo.net/css/images/about/job_up.png");
		var descId = $(e.target).parent().parent().attr("data-jobId");
		$("#"+descId).show();
	},function(e){
		$(e.target).attr("src","http://i.meilishuo.net/css/images/about/job_down.png");
		var descId = $(e.target).parent().parent().attr("data-jobId");
		$("#"+descId).hide();
	});
	$(".list_ul").toggle(function(e){
		$(e.target).parent().find(".job_tu img").attr("src","http://i.meilishuo.net/css/images/about/job_up.png");
		var descId = $(e.target).parent().attr("data-jobId");
		$("#"+descId).show();
	},function(e){
		$(e.target).parent().find(".job_tu img").attr("src","http://i.meilishuo.net/css/images/about/job_down.png");
		var descId = $(e.target).parent().attr("data-jobId");
		$("#"+descId).hide();
	});
	function getType(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg);  
		if (r!=null) return unescape(r[2]); return null; 
	};
	$(".nav_list li").removeClass("aclr");
	for(var i=0; i< $('.nav_list').children().length; i++){
		if(getType('type') == $($('.nav_list li')[i]).attr('data-type')){
			$($('.nav_list li')[i]).addClass("aclr");
		}
	}
	function sharetoqqweibo(title,url,picurl){  
		var shareqqstring='http://v.t.qq.com/share/share.php?title='+title+'&url='+url+'&pic='+picurl;  
		return shareqqstring;
	}  
    function sharetosina(title,url,picurl){  
		var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&pic='+picurl; 
		return sharesinastring;
	}   
	function sharetoqqzone(title,url,picurl){  
		var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl;  
		return shareqqzonestring;
	}
	$('.sina a').on('click',function(e){
		$(e.target).attr('href',sharetosina("加入美丽说，一起探索美丽未来。",window.location.href,"http://i.meilishuo.net/css/images/about/job_xuan.jpg"));
	});
	$('.qzone a').on('click',function(e){
		$(e.target).attr('href',sharetoqqzone("加入美丽说，一起探索美丽未来。",window.location.href,"http://i.meilishuo.net/css/images/about/job_xuan.jpg"));
	});
	$('.qqweibo a').on('click',function(e){
		$(e.target).attr('href',sharetoqqweibo("加入美丽说，一起探索美丽未来。",window.location.href,"http://i.meilishuo.net/css/images/about/job_xuan.jpg"));
	});
});