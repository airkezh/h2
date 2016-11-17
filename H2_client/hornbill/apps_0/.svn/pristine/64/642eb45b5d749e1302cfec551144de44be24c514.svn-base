/*common*/
var data = {
	'笑': 1,
	'色色': 24,
	'酷': 9,
	'流泪': 6,
	'抓狂': 8,
	'坏笑': 11,
	'害羞': 4,
	'财迷': 19,
	'猪头': 13,
	'调皮': 25,
	'转眼珠': 16,
	'泪汪汪': 3,
	'星星眼': 20,
	'飞吻': 23,
	'长草': 18,
	'晕死': 2,
	'问号': 5,
	'刚巴德': 17,
	'拒绝': 26,
	'得意': 7,
	'鄙视': 22,
	'猥琐': 14,
	'囧': 15,
	'怒': 10,
	'心碎': 12,
	'白菜': 21,
	'骷髅': 27,
	'泪': 28,
	'汗': 29,
	'么么': 30,
	'如花': 31,
	'思考': 32
}

var data_new = {
	dynamic: {
		path: '20150108dynamic/',
		data: {
			'OK':'OK.gif'
			,'大哭':'大哭.gif'	
			,'擦汗':'擦汗.gif'
			,'害羞ing':'害羞ing.gif'
			,'好样的':'好样的.gif'
			,'被安慰':'被安慰.gif'
			,'糗':'糗.gif'
			,'大笑':'大笑.gif'
			,'查找':'查找.gif'
			,'得意ing':'得意ing.gif'
			,'害羞啦':'害羞啦.gif'
			,'送飞吻':'送飞吻.gif'
			,'耶':'耶.gif'
			,'委屈':'委屈.gif'
			,'欣慰':'欣慰.gif'
			,'愤怒ing':'愤怒ing.gif'
			,'对手指':'对手指.gif'
			,'逛街去':'逛街去.gif'
			,'赞':'赞.gif'
			,'小贵':'小贵.gif'
			,'生日':'生日.gif'
			,'抓狂ing':'抓狂ing.gif'
			,'心碎啦':'心碎啦.gif'
			,'鄙视你':'鄙视你.gif'
			,'雷':'雷.gif'
			,'干杯':'干杯.gif'
			,'生气':'生气.gif'
			,'一般般':'一般般.gif'
			,'抓狂啦':'抓狂啦.gif'
			,'长草啦':'长草啦.gif'
			,'乐奔':'乐奔.gif'
			,'广播':'广播.gif'
			,'疑问':'疑问.gif'
			,'偷偷笑':'偷偷笑.gif'
			,'抠鼻孔':'抠鼻孔.gif'
			,'骷髅啊':'骷髅啊.gif'
			,'亲亲':'亲亲.gif'
			,'得意':'得意.gif'
			,'睡觉':'睡觉.gif'
			,'发福利':'发福利.gif'
			,'晕死啦':'晕死啦.gif'
			,'囧的一笔':'囧的一笔.gif'
			,'再见':'再见.gif'
			,'微笑':'微笑.gif'
			,'花痴':'花痴.gif'
			,'吃零食':'吃零食.gif'
			,'有疑问':'有疑问.gif'
			,'星星眼啊':'星星眼啊.gif'
			,'叫兽':'叫兽.gif'
			,'思考':'思考.gif'
			,'调皮':'调皮.gif'
			,'吐舌头':'吐舌头.gif'
			,'汗。。':'汗。。.gif'
			,'欢迎光临':'欢迎光临.gif'
			,'可怜':'可怜.gif'
			,'抱抱':'抱抱.gif'
			,'谢谢':'谢谢.gif'
			,'在路上':'在路上.gif'
			,'没钱了':'没钱了.gif'
			,'泪汪汪的':'泪汪汪的.gif'
			,'叹气':'叹气.gif'
			,'抱歉':'抱歉.gif'
			,'转眼':'转眼.gif'
			,'坏笑中':'坏笑中.gif'
			,'流口水':'流口水.gif'
			,'猥琐大花':'猥琐大花.gif'
			,'呕吐':'呕吐.gif'
			,'握手':'握手.gif'
			,'闭嘴':'闭嘴.gif'
			,'大哭中':'大哭中.gif'
			,'流鼻血':'流鼻血.gif'
			,'哭泣':'哭泣.gif'
			,'握爪':'握爪.gif'
			,'震惊':'震惊.gif'
			,'大白菜':'大白菜.gif'
			,'甩头发':'甩头发.gif'
			,'坏笑':'坏笑.gif'
			,'摊手':'摊手.gif'
			,'鼓掌':'鼓掌.gif'
			,'大笑中':'大笑中.gif'
			,'色色的':'色色的.gif'
			,'感谢' : '感谢.gif'
		}
	}
}

var img = function(k,data_obj){
	data_obj.path = data_obj.path || ''
	return '<img class="facetableSetxy" title="[' + k + ']" src="http://i.meilishuo.net/css/images/face/' + data_obj.path + data_obj.data[k] + '">'
}

var emo2img = function(text){
	var reg,data_obj
	for(var l in data_new){
		data_obj = data_new[l]
		for(var k in data_obj.data){
			reg = new RegExp("\\[" + k + "\\]","g")
			text = text.replace(reg, img(k,data_obj))
		}
	}
	return text	
}

exports.data = data
exports.data_new =  data_new
exports.emo2img = emo2img

/*
var test = '[么么]你好亲[如花]hah哈[][[]][][[]]'
var reg = function(text){
	var reg
	for(var k in data){
		reg = new RegExp("\\[" + k + "\\]","g")
		text = text.replace(reg, img(k))
	}
	return text	
}

//console.log(reg(test))
*/

