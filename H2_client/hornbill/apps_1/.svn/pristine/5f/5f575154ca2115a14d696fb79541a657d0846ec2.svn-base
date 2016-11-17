fml.define('page/huodong/meibaolian' , ['jquery' , 'app/checkLogin', 'app/tracking' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo'] , function(require , exports){
	var $ = require('jquery');
	var logTrack = require('app/tracking');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var share = require('app/shareTo');
	var checkLogin= require('app/checkLogin');

	var qState={
		currQ:1,
		result:""
	};

	$('.radioGroup a').on('click',clickRadio);
	function clickRadio(){
		$('.radioGroup a').off('click',clickRadio);
		$(this).addClass('selected');
		var sIndex=$(this).index();
		$('.findMine .radioGroup').fadeOut(500,function(){$(this).fadeIn(500);});
		$('.findMine .qa').fadeOut(500,function(){
			switch(qState.currQ){
				case 1:
					qState.currQ++;
					qState.result=(sIndex+"");
					$(".qa").removeClass("q1").addClass("q2");
					$('.radioGroup a:eq(0)').removeClass().addClass('r21');
					$('.radioGroup a:eq(1)').removeClass().addClass('r22');
					$('.radioGroup a:eq(2)').css({display:'none'});
					break;
				case 2:
					qState.currQ++;
					qState.result+=sIndex;
					$(".qa").removeClass("q2").addClass("q3");
					$('.radioGroup a:eq(0)').removeClass().addClass('r31');
					$('.radioGroup a:eq(1)').removeClass().addClass('r32');
					break;
				case 3:
					qState.currQ=1;
					qState.result+=sIndex;
					$(".qa").removeClass("q3").addClass("congrat");
					$('.radioGroup a:eq(0)').css({display:'none'});
					$('.radioGroup a:eq(1)').css({display:'none'});
					$('.radioGroup a:eq(2)').css({display:'none'});
					getResult(qState.result);
					break;
				default:
					break;
			}
			$('.radioGroup a').removeClass('selected');
			$('.radioGroup a').on('click',clickRadio);
			$(this).fadeIn(500);
		});
	};

	/*答完三道题后产生结果*/
	function getResult(resultStr){
		//if(!checkLogin()){resetTable();return false;}
		var param=getParam(resultStr);
		/*发送请求:*/
		//postData(param.pid);
		/*高亮座椅*/
		
		$('#lightBot')
			.removeClass().addClass(param.lightCla).css({display:'block'});
/*			.animate({
				width:'0px',
				left:(parseInt($(this).css('left'))+75*0.4)+'px'
			},500,function(){popResult(param);});
*/		
		var l=parseInt($('#lightBot').css('left'));
		$('#lightBot').animate({width:'0px',left:(l+75*0.4)+'px'},150)
			.animate({width:'75px',left:l+'px'},150,function(){popResult(param);});

		/*弹窗结果*/
		//window.setTimeout(function(){popResult(param);},500);

	}
	
	/*发送请求*/
	function postData(pid){
		var url="/aj/huodong/cus_create_twitter",
			data={
				pid:pid,
				actUrl:'/biz/huodong/bbrestaging/?frm=meibaolianBB02',
				actTitle:'你是哪种BB肌',
				actContent:'快来参加美宝莲BB霜肌肤测试，神秘大礼大派送',
				group_id:0,
				shareType:'1'
			};
		$.post(url,data,function(){});
	}

	/*撒花效果*/
	function conFlower(){
		var picUrl=Meilishuo.config.picture_url+"images/activity/meibaolian/suipian.gif";
		var ani={
				top:'100%',
				opacity:0.1
			};
		var table = $('#flowerTable')
		table.html('').css({display:'block',top:document.body.scrollTop});
		for(var i=0;i<5;i++){
			setTimeout(genFlower,100*i);
		}
		setTimeout(function(){table.css({display:'none'});},2000);

		function genFlower(){
			var c = '<img src="'+picUrl+'" />'
			for(var i=0;i<20;i++){
				rndFlower()
			}
			function rndFlower(){
			var left=(Math.random())*100,
				r2=Math.random();
			var size=r2*20,speed=r2*2000;
			var cssParam={
					position:'absolute',
					width:size+'px',
					height:size+'px',
					left:left+'%',
					top:'-20px'
				}
			$(c).appendTo(table)
				.css(cssParam).animate(ani,speed);
			}
		}
	}
	

	/*根据字串获取弹窗信息*/
	function getParam(rStr){
		var obj={};
		switch (rStr){
			case "000":
			case "001":
				obj.lightCla="lbot1";
				obj.tableCla="pop-r1";
				obj.botCla="bottle1";
				obj.pid=695872915;
				break;
			case "010":
			case "011":
				obj.lightCla="lbot1";
				obj.tableCla="pop-r2";
				obj.botCla="bottle1";
				obj.pid=695878447;
				break;
			case "100":
			case "101":
				obj.lightCla="lbot2";
				obj.tableCla="pop-r3";
				obj.botCla="bottle2";
				obj.pid=695882327
				break;
			case "110":
			case "111":
				obj.lightCla="lbot2";
				obj.tableCla="pop-r4";
				obj.botCla="bottle2";
				obj.pid=695883579;
				break;
			case "200":
			case "201":
				obj.lightCla="lbot3";
				obj.tableCla="pop-r5";
				obj.botCla="bottle3";
				obj.pid=695884895;
				break;
			case "210":
			case "211":
				obj.lightCla="lbot3";
				obj.tableCla="pop-r6";
				obj.botCla="bottle3";
				obj.pid=695886353;
				break;
			default:
				break;
		}
		return obj;
	}

	/*重置界面*/
	function resetTable(){
		qState.currQ=1;
		qState.result="";
		$(".qa").removeClass().addClass("qa q1");
		$('.radioGroup a:eq(0)').removeClass().addClass('r11').css({display:'block'});
		$('.radioGroup a:eq(1)').removeClass().addClass('r12').css({display:'block'});
		$('.radioGroup a:eq(2)').css({display:'block'});
		$('#lightBot').removeClass().css({display:'none'});
	}

	//result pop function
	function popResult(param){
		var tpl = shareTmp('popResult');
		var popDetail = new dialog({ 
			'content':tpl , 
			'width': '472px' , 
			'onStart':function(){
				$('#overlay').css({'background-color':'black'});
			},
			'onChange' : function(){
				$('.pop-result').addClass(param.tableCla);
				$('.pop-result .bottle').addClass(param.botCla);
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding-right' : '20px',filter:''});
				$('#dialogContent').css({'background':'none','padding-right':'20px',display:'none'})
					.fadeIn(500,conFlower);
			},
			'onClose' : function(){
				resetTable();
			}
		});	
		$('.closeButton').on('click' , function(){
			popDetail.drive.destroyModel();
			$(this).unbind();
		});
		$('#shareWB').on('click' , function(){
			var s_url=location.href,
				s_content="#你是哪种BB肌#男友吐槽假面人，同事直呼好“孔”怖，闺蜜替我“干”着急，都是因为用错了BB！现在就来美宝莲BB霜肌肤测试，让你的专属BB为你转身，还有神秘大礼喔！";
			share.shareToWeibo(s_url, s_content, false);
		});

		//tracking
		$('#shareWB').on('click',function(){
			logTrack.cr('meibaolian', {'frm': 'Share to Weibo'});
		});
		$('#buyNow').on('click',function(){
			logTrack.cr('meibaolian', {'frm': 'Buy now'});
		});
	}

	$('#detail').on('click' , function(){
		var tpl = shareTmp('popDetail');
		var popDetail = new dialog({ 
			'content':tpl , 
			'width': '824px' , 
			'onStart':function(){
				$('#overlay').css({'background-color':'black'});
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
				$('#dialogContent').css({'background':'none'});
			},
			'onClose' : function(){
			}
		});	
		$('.pop-detail .closeButton').on('click' , function(){
			popDetail.drive.destroyModel();
			$(this).unbind();
		});
	});

	//tracking
	$('.radioGroup a').on('click',function(){
		var qn=qState.currQ;
			index=$(this).index();
		if(qn==2){
			if(index==0)
				logTrack.cr('meibaolian', {'frm': 'Q11'});
			else if(index==1)
				logTrack.cr('meibaolian', {'frm': 'Q12'});
			else if(index==3)
				logTrack.cr('meibaolian', {'frm': 'Q13'});
		}else if(qn==3){
			if(index==0)
				logTrack.cr('meibaolian', {'frm': 'Q21'});
			else if(index==1)
				logTrack.cr('meibaolian', {'frm': 'Q22'});
		}else if(qn==1){
			if(index==0)
				logTrack.cr('meibaolian', {'frm': 'Q31'});
			else if(index==1)
				logTrack.cr('meibaolian', {'frm': 'Q32'});
		}
	});

	$('#detail').on('click',function(){
		logTrack.cr('meibaolian', {'frm': 'DETAIL'});
	});

	$('.bg1 .banner img').on('click',function(){
		var index=$(this).index();
		if(index==0)
			logTrack.cr('meibaolian', {'frm': 'Surprise 1'});
		else if(index==1)
			logTrack.cr('meibaolian', {'frm': 'Surprise 2'});
	});

	$('.bg3 .track a').on('click',function(){
		var cla=$(this).attr('class');
		switch (cla){
			case 'c1':
				logTrack.cr('meibaolian', {'frm': 'TMALL DRY'});
				break;
			case 'c2':
				logTrack.cr('meibaolian', {'frm': 'TMALL 18ml'});
				break;
			case 'c3':
				logTrack.cr('meibaolian', {'frm': 'TMALL OIL'});
				break;
			default:
				break;
		}
	});

	$('.bg5 .track div').on('click',function(){
		logTrack.cr('meibaolian', {'frm': 'KOL'});
	});


});
