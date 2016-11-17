/*common*/
var $ = require('wap/zepto');
var tracking = require('wap/app/tracking');
var share = require('wap/app/lark/wxShare')

$('.btn').on('click',function(){
	if (Meilishuo.config.os.mlsApp) {
		tracking.cr(' /cr/mapp/act_pay_cmbwechat', {'action' : 'merchantsBank', 'value' : '1'});
		setTimeout(function(){
			window.location.href = 'meilishuo://changetab.meilishuo?json_params=%7B%22r%22%3A%22%22%2C%22tab%22%3A%22%E9%80%9B%E6%B5%81%E8%A1%8C%22%7D';
		},300);
		if(e && e.preventDefault) {  
	        //阻止默认浏览器动作(W3C)  
	        e.preventDefault();  
	    } else {  
	        //IE中阻止函数器默认动作的方式   
	        window.event.returnValue = false;   
	    }
	    return false;
	}else{
		tracking.cr(' /cr/m/statistics_action', {'action' : 'merchantsBank', 'value' : '1'});
		setTimeout(function(){
			window.location.href = '/goto/open/?url=meilishuo%3A%2F%2F';
		},300);
	}
});
var opt = {
    'img_url' : Meilishuo.config.picture_url + '/images/wap/activity/merchants_bank/top-banner-new.png',
    'link' : window.location.href,
    'title' : '听说招行信用卡和微信勾搭上了，生了好多小红包',
    'desc' : '来美丽说购物发现惊喜',
    'appid' : 'wxd00a5f16e02bed58',
    'img_width' : '200',
    'img_height': '200'
}
share.init(opt);