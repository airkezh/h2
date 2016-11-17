fml.use('page/poster_guang');
fml.define('page/huodong/jianling_sec' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');

   
	//图片上传
	upload.init(function(){
		$('#cpic').val(0);
		$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
		$('.csuit').hide();
		$('.next').show();

	});
	$('.choice-item').on('click' , function(){
		if(!check()) return;	
	});

	//提交
	$('.next').off('click').on('click' , function(){
		//$(this).attr('disabled','disabled');
		$('.next').text('提交中.......');
		if(!check()) return;
		var radiovalue=getSelectValue("q1") + getSelectValue("q2") + getSelectValue("q3");
		//答题未完成
		if(radiovalue.length<3){
			alert('亲不要急，两步都做完才能得出准确的冰雪测试哦~');
			return;
		}
		var resultvalue='';
		switch(radiovalue){
			case 'aaa':
			case 'aba':
				var resultvalue='youya';
				break;

			case 'aab':
			case 'bbb':
				var resultvalue='fumei';
				break;

			case 'baa':
			case 'bab':
				var resultvalue='huola';
				break;
			
			case 'abb':
			case 'bba':
				var resultvalue='keai';
				break;

			default:
				break;
		}

		var url1 = '/aj/huodong/jlmgz';
		var data1 ={'group_id' :117520843}
		$.post(url1, data1, function(res){
		},"json");
		var cpic=$('#cpic').val();
		var url = '/aj/huodong/jlupload';
		var data = { 'actName' : 'jianling' , 'src' : $('.preview').attr('src') , 'img_idx' : resultvalue ,'cpic':cpic};
		data = $.extend(data, upload.getImgData());
		$.post(url, data, function(res){
		$('.next').text('查看我的冰雪属性');
		var html = shareTmp('ice',{'tpic':res.data.title,'lpic':res.data.url});
		var ice_pop = new dialogUI({
			'content' : html,
			'width' : '626px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});
		//分享到新浪
		$('#share_sina').on('click' , function(){
				var s_url = location.href;
				var s_desp = '酷暑炎夏，我的魅力能消夏！我在美丽说测试了自己的冰雪属性，快来为我投票增加我的魅力值吧！今夏，我和要和你一起白青看雪！@美丽说 ';
				var s_img = $('.lpic').attr('src');
				share.shareToWeibo(s_url, s_desp, s_img);
		});
		},"json")


	});

	//选择泳装
	$('.csuit').on('click' , function(){
		if(!check()) return;
		$('#cpic').val(1);
		var html = shareTmp('suit');
		var suit_pop = new dialogUI({
			'content' : html,
			'width' : '626px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});
		$('.topreview').on('click',function(){
			var bb_link=$('.bb_link').val();
			var s1 =bb_link.split('?');
			var s2=s1[0].split('/');
			var sl=s2.length-1;
			var s3=s2[sl];
			if(bb_link==''){
				alert('请填写泳装宝贝链接！');
				return;
			}

			if(isNaN(s3) || s3=='' || s3.length<6){	
			   alert("请检查是否是正确的泳装宝贝链接！");
			   return;
			}
			var url = '/aj/huodong/jlcpic';
			var data = {'twitter_id' : s3 };

			$.post(url, data, function(res){
			$('.imgbox img').removeClass('none_f').attr('src',res.data)				
			},"json");
			$('#closeDialog').trigger('click');
			$('.attach_photo').hide();
			$('.csuit').hide();
			$('.next').show();	
		});
	});




	//兼容placeholder
	function initPlaceHolders(){
	    if('placeholder' in document.createElement('input')){ //如果浏览器原生支持placeholder
	        return ;
	    }
	    function target (e){
	        var e=e||window.event;
	        return e.target||e.srcElement;
	    };
	    function _getEmptyHintEl(el){
	        var hintEl=el.hintEl;
	        return hintEl && g(hintEl);
	    };
	    function blurFn(e){
	        var el=target(e);
	        if(!el || el.tagName !='INPUT' && el.tagName !='TEXTAREA') return;//IE下，onfocusin会在div等元素触发 
	        var    emptyHintEl=el.__emptyHintEl;
	        if(emptyHintEl){
	            //clearTimeout(el.__placeholderTimer||0);
	            //el.__placeholderTimer=setTimeout(function(){//在360浏览器下，autocomplete会先blur再change
	                if(el.value) emptyHintEl.style.display='none';
	                else emptyHintEl.style.display='';
	            //},600);
	        }
	    };
	    function focusFn(e){
	        var el=target(e);
	        if(!el || el.tagName !='INPUT' && el.tagName !='TEXTAREA') return;//IE下，onfocusin会在div等元素触发 
	        var emptyHintEl=el.__emptyHintEl;
	        if(emptyHintEl){
	            //clearTimeout(el.__placeholderTimer||0);
	            emptyHintEl.style.display='none';
	        }
	    };
	    if(document.addEventListener){//ie
	        document.addEventListener('focus',focusFn, true);
	        document.addEventListener('blur', blurFn, true);
	    }
	    else{
	        document.attachEvent('onfocusin',focusFn);
	        document.attachEvent('onfocusout',blurFn);
	    }

	    var elss=[document.getElementsByTagName('input'),document.getElementsByTagName('textarea')];
	    for(var n=0;n<2;n++){
	        var els=elss[n];
	        for(var i =0;i<els.length;i++){
	            var el=els[i];
	            var placeholder=el.getAttribute('placeholder'),
	                emptyHintEl=el.__emptyHintEl;
	            if(placeholder && !emptyHintEl){
	                emptyHintEl=document.createElement('span');
	                emptyHintEl.innerHTML=placeholder;
	                emptyHintEl.className='emptyhint';
	                emptyHintEl.onclick=function (el){return function(){try{el.focus();}catch(ex){}}}(el);
	                if(el.value) emptyHintEl.style.display='none';
	                el.parentNode.insertBefore(emptyHintEl,el);
	                el.__emptyHintEl=emptyHintEl;
	            }
	        }
	    }
	}

	initPlaceHolders();

	function getSelectValue(rname){
		var radios=document.getElementsByName(rname);
		for (var i = 0; i < radios.length; i++) {
			if(radios[i].checked ==true) return radios[i].value;
		}
		return "";
	}

	//hack for ie6，页面有锚点和?参数的时候标题有问题
	if($.browser.msie) {
		document.title = '剑灵·白青维秘秀';
	}



});
