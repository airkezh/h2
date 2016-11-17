/*common*/
var $ = require('jquery')
	,shareTmp = require('component/shareTmp')
	, emo2img = require('app/emoji').emo2img
	, htmlFilter = require('component/filterhtml')
	, intoView = require('app/im/intoView')
	, oldtimestamp=null;
/*require('component/snap_svg')
var svg = Snap('svg')
svg.paper.path('M0,5 Q7,5,8,4 Q5,10,0,13').attr({
    'stroke-width':1,
    'stroke':'#e6e6e6',
    'fill' : '#fff'
});*/

$('.main').on('click','.file_btn', function(){
	var _this = $(this)
		,fid = _this.data('fid')
	try{
		console.log(fileDataCache[fid])
		window.c_transmit_file(JSON.stringify(fileDataCache[fid]))
	}catch(e){
		console.log('has no c_transmit_file')
	}
	
})

var fileDataCache = {} //文件属性缓存



function formatMsg(o, type){
	var p = {
		msg_type : o.chatfrom!=Meilishuo.config.toid?'send':'receive',
		content : '',
		time : o.ctime,
		consultant_info:o.chatfrom_info,
		isNewSender:0,
		timestamp:o.timestamp,
		isShowTime:0,
        dataType : o.type

	}

	if(o.type=='img'){
		for(var i=0; i<o.picInfo.length; i++){
			p.content +=shareTmp('tmp_pic',{data:o.picInfo[i]})
		}
	} else if(o.type=='file'){
		if(type && o.chatfrom!=Meilishuo.config.toid){
			o.ext.file.ty = 'history'
			o.ext.file.type = 'send'
		}else{
			o.ext.file.ty = ''
			o.ext.file.type = 'receive'
		}
		var fileData =  o.ext.file || o.file
		fileData.msg_id = o.msg_id		
		p.file = fileDataFormat(fileData)
		p.content = shareTmp('file_tmp',{data : fileData}) || ''
	} else {
		p.content = o.msg
	}
	return p
}

Date.prototype.getT = function(){
	var h = this.getHours()+''
		,m = this.getMinutes() + ''
	if(h.length<2) h ='0'+h
	if(m.length<2) m ='0'+m
	return h+':'+m
}

function appendMessage(html,$wrapper,appendFn){
	$html = $(html)
	$wrapper = $wrapper || $('.message_wrapper')
	appendFn = appendFn || 'appendTo'
	$html[appendFn]($wrapper)
	intoView($html, $('.main'))
}

var showFn = {
	send : function(data){
		var $msg = $('[data-mid='+data.message_id+']')

		if($msg.length){
            var $cTime = $msg.parent().children(".ctime").eq(0);
            if ($cTime.length && data.send_time) {
                $cTime.text(data.send_time);
            }
			$msg.find('.bubble').removeClass('wait fail succ').addClass(data.send_status)
			if(data.message_type =='file'){
				data.file = fileDataFormat(data.ext.file || data.file)
				data.content = shareTmp('file_tmp',{data : data.ext.file || data.file}) || ''
				$msg.find('.bubble').html(data.content)
			}
			if(data.send_status=='succ' && data.content){
				$msg.find('.bubble').html(data.content)
			}
		} else {
			var now = new Date
			switch (data.message_type){
				case 'img':
					data.content = data.content.replace('_blank','_img')
					break;
				case 'file':
					data.file = fileDataFormat(data.ext.file || data.file)
					data.content = shareTmp('file_tmp',{data : data.file}) || ''
					break;
				case 'text':
				default:
					if(data.send_status!='succ'){
						data.content = data.content.replace(/\n/g,'<br>').replace(/\s/g,'&nbsp;') || ''
						data.content = emo2img(data.content)
					}
					break;
			}
			var isShowTime=0;
			if(oldtimestamp==null || parseInt(now.getTime()/60000)!=parseInt(oldtimestamp/60000 )){

				isShowTime=1;
				oldtimestamp=now.getTime();
			}

			var p = {
				data : {
					msg_type : 'send'
					,time : now.getT()
					,content : data.content
					,message_id : data.message_id
					,send_status : data.send_status
					,chatfrom_info : data.chatfrom_info
					,isShowTime:isShowTime
                    ,avatar : data.avatar
                    ,dataType : data.message_type
				}
			}	
			var html = shareTmp('tmp_msg',p)
			appendMessage(html)
		}
		return this
	}
	,resend : function(mid){
		try{
			window.c_resend(mid)
		}catch(e){
			console.log('has no fn c_resend')
		}
		return this
	}
	,history : function(res){
		var $hisBtn = $('.history_btn')
		$hisBtn.removeClass('loading')
		var hisArr = res.data
		if(hisArr.length) $('.d_history:hidden').show()
		var html = ''
		var oldConsultantID=null;
		
		for (var i = 0; i < hisArr.length; i++) {

			var msgData=formatMsg(hisArr[i], 'history');
			var type = hisArr[i].chatfrom!=Meilishuo.config.toid?'send':'receive';

			if(type=='send'){	
				if( oldConsultantID!=hisArr[i].chatfrom){
					msgData.isNewSender=1;
				}
				oldConsultantID=hisArr[i].chatfrom;
				
			}
			if(type=='receive'){
				if(oldConsultantID!=hisArr[i].chatto){
					msgData.isNewSender=1;
					msgData.isShowTime=1;

				}
				oldConsultantID=hisArr[i].chatto;
			}



			if(oldtimestamp==null || parseInt(msgData.timestamp/60)!=parseInt(oldtimestamp/60)){

				msgData.isShowTime=1;
				oldtimestamp=msgData.timestamp;
			}

				html +=shareTmp('tmp_msg',{data:msgData});
		}
		$(html).prependTo($('.history_list'))
		// appendMessage(html,$('.history_list'),'prependTo')
		if((res.has_history|0)==0) $hisBtn.hide()
		return this
	}
	,receive : function(res){
		var dataArr = res
		var html = ''
		for (var i = 0; i < dataArr.length; i++) {
			var RfileStatus = $('[data-msgid=' + dataArr[i].msg_id + ']')
			if(RfileStatus.length && dataArr[i].ext.file){
				var tip = ''
					,btn_content = ''
				$.extend(fileDataCache[dataArr[i].ext.file.id], dataArr[i].ext.file)
				switch(dataArr[i].ext.file.status+''){
					case '0':
						tip = ''
						btn_content = '下载'
						break;
					case '1':
						tip = '下载中..'
						break;
					case '2':
						tip = '下载完成'
						btn_content = '打开'
						break;
					case '3':
						tip = '下载失败'
						btn_content = '重新下载'
						break;
					default:
						break;
				}
				RfileStatus.children('.file_status').html(tip)
				RfileStatus.children('.file_btn').html(btn_content)
				intoView(RfileStatus, $('.main'))
				return
			}else{
				var msgData=formatMsg(dataArr[i]);
				if(oldtimestamp==null || parseInt(msgData.timestamp/60000)!=parseInt(oldtimestamp/60000 )){

					msgData.isShowTime=1;
					oldtimestamp=msgData.timestamp;
				}
				html +=shareTmp('tmp_msg',{data:msgData})
			}
		}
		appendMessage(html)
	}
	,trans : function(res){
		var html =shareTmp('tmp_trans',{data:res[0]})
		appendMessage(html)
	}
	,sys : function(data){
		var html =shareTmp('tmp_sys',{data:data})
		appendMessage(html)
	}
	,offline : function(){
		$('.offline_tip').fadeIn(300)
	}
	,online : function(){
		$('.offline_tip').fadeOut(300)
	}
}

function fileDataFormat(fileData){
	fileData = fileData || {}
	var tip ='', btn_content = ''
	if(fileData.id){
		fileDataCache[fileData.id] = fileData
	}
	if(fileData.type=='send' && fileData.ty != 'history'){
		console.log('1')
		switch(fileData.status+''){
			case '0':
				tip = '准备发送'
				break;
			case '1':
				tip = '发送中..'
				break;
			case '2':
				tip = '发送完成'
				btn_content = '打开'
				break;
			case '3':
				tip = '发送失败'
				btn_content = '重新发送'
				break;
			default:
				break;
		}
	} else if(fileData.ty == 'history'){
		console.log('2')
		tip = ''
		btn_content = '查看'
	} else {
		console.log('3')
		switch(fileData.status+''){
			case '0':
				tip = ''
				btn_content = '下载'
				break;
			case '1':
				tip = '下载中..'
				break;
			case '2':
				tip = '下载完成'
				btn_content = '打开'
				break;
			case '3':
				tip = '下载失败'
				btn_content = '重新下载'
				break;
			default:
				break;
		}
	}
	fileData.tip = tip
	fileData.btn_content = btn_content
	return fileData
}

$('body').on('click', '.bubble.fail', function(event) {
	var mid = $(this).parents('.con').attr('data-mid')
	showFn.send({message_id:mid,send_status:'wait'}).resend(mid)
}).on('click', '.history_btn', function(event) {
	if($(this).hasClass('loading')) return
	$(this).addClass('loading')
	try{
		window.c_history()
	} catch(e){
		console.log('has no fn c_history')
	}
})

$(".js_offline_tips_close").on("click", function() {
    $('.offline_tip').fadeOut(300);
});

MLS.showMessage = function(data){
    if(!data || !data.type) return
	switch(data.type){
		case 'send':
			showFn.send(data)
			break;
		case 'history':
			showFn.history(data)
			break;
		case 'receive':
			showFn.receive(data.data)
			break;
		case 'trans':
			showFn.trans(data.data)
			break;
		case 'sys':
			showFn.sys(data)
			break;
		case 'offline':
			showFn.offline(data)
			break;
		case 'online':
			showFn.online(data)
			break;
		default:
			break;
	}
}
//window.MLS.showMessage({"type":"receive", "data":[{"msg_id":783020685,"chatfrom":43690450,"chatto":79203161,"msg":"<img title=\"[委屈]\" src=\"http://i.meilishuo.net/css/images/face/20150108dynamic/委屈.gif\" class=\"facetableSetxy\"/>","ctime":"18:35","ext":"","source":"win","type":"text","timestamp":1432031738,"chatfrom_info":{"avatar":"http://d06.res.meilishuo.net/ap/a/de/5f/7997f7e6a59a273ea6257b012b4b_335_335.c1.jpg"},"chatto_info":{"avatar":"http://d05.res.meilishuo.net/ap/a/56/de/19e804632c91d96c684320171e31_256_256.cc.jpg"}}], "has_history":1})
//window.MLS.showMessage({"type":"sys", "content":"正在转接 综合客服2－专销美衣哈哈哈 ..."})
//window.MLS.showMessage({type:"history",data : [{"msg_id":782013273,"chatfrom":43690450,"chatto":79203161,"msg":"","ctime":"15:10","ext":{"picIds":[1655393813]},"source":"win","type":"img","timestamp":1432019434,"picInfo":[{"picid":"1655393813","n_pic_file":"pic/_o/c9/8c/596ec8e6d4efb0d5ebae0c563a51_262_182.cg.jpg","nwidth":"262","nheight":"182","o_pic_url":"http://d06.res.meilishuo.net/pic/_o/c9/8c/596ec8e6d4efb0d5ebae0c563a51_262_182.cg.jpg","pic_url":"http://d06.res.meilishuo.net/pic/b/c9/8c/596ec8e6d4efb0d5ebae0c563a51_262_182.cg.jpg"}],"chatto_info":{"nickname":"钢哥专用","user_id":79203161,"avatar":"http://d05.res.meilishuo.net/ap/a/56/de/19e804632c91d96c684320171e31_256_256.cc.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277},"chatfrom_info":{"nickname":"售后","user_id":43690450,"avatar":"http://d06.res.meilishuo.net/ap/a/de/5f/7997f7e6a59a273ea6257b012b4b_335_335.c1.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277}},{"msg_id":782018543,"chatfrom":43690450,"chatto":79203161,"msg":"","ctime":"15:11","ext":{"picIds":[1655395029]},"source":"win","type":"img","timestamp":1432019499,"picInfo":[{"picid":"1655395029","n_pic_file":"pic/_o/78/bb/ab37b06483ea851bd37e97346bd6_201_154.cg.jpg","nwidth":"201","nheight":"154","o_pic_url":"http://d06.res.meilishuo.net/pic/_o/78/bb/ab37b06483ea851bd37e97346bd6_201_154.cg.jpg","pic_url":"http://d06.res.meilishuo.net/pic/b/78/bb/ab37b06483ea851bd37e97346bd6_201_154.cg.jpg"}],"chatto_info":{"nickname":"钢哥专用","user_id":79203161,"avatar":"http://d05.res.meilishuo.net/ap/a/56/de/19e804632c91d96c684320171e31_256_256.cc.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277},"chatfrom_info":{"nickname":"售后","user_id":43690450,"avatar":"http://d06.res.meilishuo.net/ap/a/de/5f/7997f7e6a59a273ea6257b012b4b_335_335.c1.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277}},{"msg_id":782019693,"chatfrom":79203161,"chatto":43690450,"msg":"再发一个文件消息给我","ctime":"15:11","ext":"","source":"win","type":"text","timestamp":1432019514,"chatto_info":{"nickname":"售后","user_id":43690450,"avatar":"http://d06.res.meilishuo.net/ap/a/de/5f/7997f7e6a59a273ea6257b012b4b_335_335.c1.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277},"chatfrom_info":{"nickname":"钢哥专用","user_id":79203161,"avatar":"http://d05.res.meilishuo.net/ap/a/56/de/19e804632c91d96c684320171e31_256_256.cc.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277}},{"msg_id":782021517,"chatfrom":43690450,"chatto":79203161,"msg":"我给你发送了文件，请到Windows客户端接收","ctime":"15:12","ext":{"file":{"url":"http://imgtest-dl.meiliworks.com/tmp/b533c54717c670977d305040e6a2a085.ch.jpg","ctime":"2015-05-19 15:12:16","user_id":"43690450","id":"9779","name":"79689873.jpg","icon":"http://d06.res.meilishuo.net/img/_o/ba/44/d864aaa30829ff40272db82ec27c_23_32.cf.png","size":"3.56KB","status":0,"msg_id":782021517}},"source":"win","type":"file","timestamp":1432019536,"chatto_info":{"nickname":"钢哥专用","user_id":79203161,"avatar":"http://d05.res.meilishuo.net/ap/a/56/de/19e804632c91d96c684320171e31_256_256.cc.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277},"chatfrom_info":{"nickname":"售后","user_id":43690450,"avatar":"http://d06.res.meilishuo.net/ap/a/de/5f/7997f7e6a59a273ea6257b012b4b_335_335.c1.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277}},{"msg_id":782022661,"chatfrom":43690450,"chatto":79203161,"msg":"我给你发送了文件，请到Windows客户端接收","ctime":"15:12","ext":{"file":{"url":"http://imgtest-dl.meiliworks.com/tmp/b533c54717c670977d305040e6a2a085.ch.jpg","ctime":"2015-05-19 15:12:30","user_id":"43690450","id":"9781","name":"79689873.jpg","icon":"http://d06.res.meilishuo.net/img/_o/ba/44/d864aaa30829ff40272db82ec27c_23_32.cf.png","size":"3.56KB","status":0,"msg_id":782022661}},"source":"win","type":"file","timestamp":1432019550,"chatto_info":{"nickname":"钢哥专用","user_id":79203161,"avatar":"http://d05.res.meilishuo.net/ap/a/56/de/19e804632c91d96c684320171e31_256_256.cc.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277},"chatfrom_info":{"nickname":"售后","user_id":43690450,"avatar":"http://d06.res.meilishuo.net/ap/a/de/5f/7997f7e6a59a273ea6257b012b4b_335_335.c1.jpg","utype":"normal","shop_type":"b","is_shop":1,"shop_id":101277}}]});

//init
;(function(){
	try{
		// window.c_history()
		var params = (function(str){
			var obj = {};
			var arr = str.substring(1).split("&");
			for(var i = 0; i < arr.length; i++){
				obj[arr[i].split("=")[0]] = arr[i].split("=")[1];
			}
			return obj;
		})(location.search);
		window.c_receive(params.toid);
	} catch(e){
		console.log('has no fn c_history || receive')
	}
}())
