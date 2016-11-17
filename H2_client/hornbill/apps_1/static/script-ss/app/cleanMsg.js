fml.define('app/cleanMsg' , ['jquery','page/im/open' , 'core/animation' , 'component/iStorage' /*'component/audio','component/userstate'*/ , 'component/animate'] , function(require , exports){
	var user_id = Meilishuo.config.user_id;
	var $ = require('jquery');	
	var imOpen = require('page/im/open')
	///var userstate = require('component/userstate');
	var profileIndex = require('component/animate');
	var h_ico = $('#navbar .shining'),
		h_icotip = $('#navbar .h_ico');
	var delay = 60000;
	var delayP = 1;
	var msgData = {};
	var flashed = false;
	var tip_showed_key = 'app/cleanMsg_icotip';
	var timer;
	var hover_timer,newShareNum=0;
	/*
	var sound = audio.init(Meilishuo.config.picture_url+ 'images/im/imsoundfinal.mp3')
		,lastBeet
	*/

	h_icotip.hover(function(){
	if (Meilishuo.config.controller == 'home') return;
		hover_timer && window.clearTimeout(hover_timer);
		},function(){
			h_icotip.hide();
			});
	h_ico.parent().hover(function(){
	if (Meilishuo.config.controller == 'home') return;
		if (newShareNum)  h_icotip.show();
		},function(){
		if (newShareNum)  hover_timer = window.setTimeout(function(){h_icotip.hide()},200);
		});
	function show_tip(){
		var storage = require('component/iStorage');
		storage.get(tip_showed_key , function(v) {
			if(!v)	h_icotip.show();
			storage.set(tip_showed_key , true);
			});
		}
	var getProfileUpdate = function(newShare){
		newShareNum = newShare;
		if (Meilishuo.config.controller == 'home') {
			return;
		}
		if (newShare){
			h_ico.html(getShowNum(newShare));
			h_icotip.find('span.red_f').html(getShowNum(newShare));
			$('.home').attr('href', '/?frm=on_yellow_show');
			//你的首页有<span class="red_f">25</span>个新分享，点击去看看
			//profileIndex.twinkle('#navbar .h_ico',500,6,true);	
			if (!flashed ){
				flashed = true;
				profileIndex.twinkle(h_ico,500,6,true);	
				show_tip();
			}
		}else{
			h_ico.hide();
			h_icotip.hide();
			$('.home').attr('href', '/');
			flashed = false;
			}

		}
	function getShowNum(num){
		return num>99 ? '99+' : num;
		}
		
	function renderMsg(clear){
		var msgTitle = {
			"customer_num" : ["有%d个客服消息" ,"客服消息","/im/"],
			"fans_num" : ["有%d个新关注","关注","/ur/fans/"+user_id],
			"atme_num" : ["有%d个新@我的","@我的","/atme/"],
			"pmsg_num" : ["有%d条新私信","私信","/msg/main/user"],
			"sysmesg" : ["有%d条新系统消息","系统消息","/msg/main/syser"],
			"recommend_num" : ["有%d个喜欢我的","喜欢我的","/ur/like/"+user_id],
			"a_reply_num" : ["有%d条新的回复","回复我的","/club/recommend/"+user_id]

			}
		var toNotice = [] ,
			normal = [];
		var total_num = 0;
		for (var k in msgTitle){
			var num = (clear===true)? 0 : msgData[k]|0;
			num ? toNotice.push([k , num]) : normal.push(k);	
			total_num += num;
			}
		var j = toNotice.length;
		var listContent = '';	
		var listInTip = '';
		
		if (j){
			for (var i=0;i< j ; i++){
				var li = toNotice[i] ,
					k = li[0];
				listContent += '<li class="cleanOnce" dk="'+k+'" ><a  href="'+ (msgTitle[k][2]||'###') +'" '
				if ('customer_num' != k) listContent += 'target="_BLANK" '
				else listContent += 'class="openIM"'
				listContent +=	'>'+ msgTitle[k][0].replace('%d' , '<b class="msgCountNum red_f">'+ getShowNum(li[1]) +'</b>') +'</a></li>';
				}
			listContent += '<li class="b_line cleanOnce" dk="all"><span class="mes_know cursor_f right_f">知道了</span></li>';	
			listInTip = listContent;
			}
		j = normal.length;
		for (var i =0 ; i<j; i++){
			var k = normal[i];
			if (!msgTitle[k][2]) continue
			listContent += '<li ><a '+ ('customer_num' == k ?'class="openIM"':'')+'  href="'+ msgTitle[k][2] +'" target="_msg">查看'+ msgTitle[k][1] +'</a></li>';
			}

		if(total_num){
			$("#message .num_bgc").text(total_num).show();
		}else{
			$("#message .num_bgc").hide();
		}

		$("#moreMessageBox").html(listContent);
	}
	
	 $("#moreMessageBox").on('click', 'li.cleanOnce'  , liClick);
	 $("#moreMessageBox").on('click', 'a.openIM'  , function(){
			imOpen.reCallImWin({is_simple:!(Meilishuo.config.is_service)})
			$(this).parent().trigger('click')
			return false
		 
		 }) 



	 function liClick(){
		var k = $(this).attr('dk');
		if ('all' != k) {
			readK(k);
		}else {
			setUserMsgZero(true);
			renderMsg(true);
			}
		}

	 function readK(k){
		msgData[k] = 0;
		renderMsg();
		setUserMsgZero(k);
		 
		 }
	 function setUserMsgZero(msgParam){
		 var url = '/aj/msg/setzero';
		 var data = {'param': msgParam == true ? 'all' : msgParam}
		 $.post(url , data );
		 }
	 function adjustDelayP(newShare , msgTotal){
		 if (newShare) delayP *= 1.2;
		 if (msgTotal) delayP *= 1.2;
		 if (!newShare && !msgTotal) delayP = 1;
		 if (delayP >5) delayP = 5;
		 }
	

	///IM 
	var siteIM = $('.bot_cart .openIM')
		,siteImNm = $('.msg_nums' , siteIM)
	siteIM.click(function(){
		imOpen.reCallImWin({is_simple:!(Meilishuo.config.is_service)})
		imTip(0)
		return false
		})

	function shakeTip(tip){
		if (siteIM.length == 0 || siteImNm.length==0) return
		var i = 99999 
		function breath(){
			siteIM.stop()
			window.setTimeout(function(){
				siteIM.fadeOut(900,function(){
					siteIM.fadeIn(700 ,i-- ? breath : null)
					})
				},100)
			}
		breath()
		/*
		var requestFrame = require('core/animation').requestFrame
			,Tween = require('core/animation').Tween
		var ct = 0
			,start = -4 
			,move = 8 
			,duration = 5 
		var tt = 5 
		var oldStyle = siteImNm[0].style.cssText
		siteImNm.css({'position':'relative' , 'top': 0})
		function shake(){
			var t = Tween.Cubic.easeInOut(ct++ , start , move  , duration)
			siteImNm.css('top' ,t)
			if (ct <= duration) requestFrame(shake)
			else {
				ct = 0
				start = t
				move = -move
				if (tt--) {
					requestFrame(shake)
				} else {
					siteImNm[0].style.cssText = oldStyle 
					}
				}
			}
		shake()
		*/
		
		}

	function imTip(customer_num){
		if(customer_num > 0){
			siteImNm.text(customer_num).show() && shakeTip(siteImNm)
			siteIM.addClass('has_msg')
		} else {
			siteImNm.hide()
			siteIM.removeClass('has_msg')
		}
						
		
		}	
	function msgFunc(){

		var fliterPages = ['register_step3', 'register_step4'];
		for (var i in fliterPages) 
			if (Meilishuo.config.controller === fliterPages[i]) return;

		if (!user_id) return;
		if (timer) window.clearTimeout(timer);
		///if (userstate.activity()) {
			var msgUrl = Meilishuo.config.controller === 'home' ? '/aj/getMsg/msg' : '/aj/getMsg/';
			$.get(msgUrl , function(data){
				msgData = data.msg || data;
				if (typeof msgData.user_id != 'undefined' && msgData.user_id != Meilishuo.config.user_id) {
					location.reload();  
					return;
				}
				//测试
				///msgData.customer_num = 1
				imTip(msgData.customer_num)
				/*
				if (msgData.customer_num > 0 && (!lastBeet || new Date - lastBeet > 5000)) {
					lastBeet = new Date
					sound.play() 
				}
				*/


				var newShare = data.newshare ? data.newshare.num|0 : 0;
				getProfileUpdate(newShare);
				renderMsg();
				adjustDelayP(newShare , msgData.total_num|0);
				} , 'json');	
		///}
		timer = window.setTimeout(msgFunc , delay* delayP);
		
		}
	exports.msgFunc = function(){
		renderMsg();
		timer = window.setTimeout (msgFunc , delay/4);		//exe after 5 seconds
		//msgFunc();
	};
	exports.msgImmedialy = function(){
		msgFunc();
	};
});
