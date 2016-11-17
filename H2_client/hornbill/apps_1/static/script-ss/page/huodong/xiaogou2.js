fml.use('app/countdown', function(){
    this();
});
fml.use('app/welfare_apply' , function(){});
fml.define('page/huodong/xiaogou2' , ['jquery' , 'ui/dialog', 'component/shareTmp', 'app/shareTo', 'app/checkLogin'] , function(require , exports){
	var $ = require('jquery')
	 	,dialog = require('ui/dialog')
	 	,shareTmp = require('component/shareTmp')
	 	,share = require('app/shareTo')
	 	,checkLogin= require('app/checkLogin')

 	$('.show-rule').on('click',function(){
 		pop('activityRule');
 	});

	$('.show-result').on('click',function(){
		if(!checkLogin()){return false;}
		var r = "";
		$("[class^=q1-]").each(ra);
		$("[class^=q2-]").each(ra);
		$("[class^=q3-]").each(ra);
		if(r.length<3){
			alert("亲，不要着急，一步一步才能得大奖哦！~");
		} else {
			var s_img;
			if(r=='010' || r=='110'){
				pop('popResult1');
				postData(750700311);
				s_img=Meilishuo.config.picture_url+"images/activity/xiaogou2/wali.jpg";
			}else{
				pop('popResult2');
				postData(750703107);
				s_img=Meilishuo.config.picture_url+"images/activity/xiaogou2/yiwa.jpg";
			}
			$('.shareWB').on('click' , function(){
				var s_url=location.protocol + '//' + location.host + '/biz/huodong/xiaogou2/?frm=xiaogou2103'
					,s_content="茫茫人海中，寻找到自己的天生一对不容易，幸好有小狗扫地机器人来帮我！你的告白助手是“真爱•白”还是“初恋•粉”？快来试试吧！"
				share.shareToWeibo(s_url, s_content, s_img);
			});
		}
		
		function ra(i,e){ if(e.checked == true) r+=i;}
	});

	function pop(sid){
		var tpl = shareTmp(sid);
		var popRule = new dialog({ 
			'content':tpl , 
			'width': '580px' , 
			'onStart':function(){
				$('#overlay').css({'background-color':'white'});
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background':'none' , 'padding-right':'20px','filter':''});
				$('#dialogContent').css({'background':'none', 'padding-top':'100px'});
			},
			'onClose' : function(){}
		});
		$('.pop-closeBtn').on('click' , function(){
			popRule.drive.destroyModel();
		});
	}

	/* 发推 */
	function postData(pid){
		var url="/aj/huodong/cus_create_twitter",
			data={
				pid:pid,
				actUrl:'/biz/huodong/xiaogou2/?frm=xiaogou2102',
				actTitle:'小狗V-M600，为爱而生',
				actContent:'',
				group_id:0,
				shareType:'1'
			};
		$.post(url,data,function(){});
	}
});
