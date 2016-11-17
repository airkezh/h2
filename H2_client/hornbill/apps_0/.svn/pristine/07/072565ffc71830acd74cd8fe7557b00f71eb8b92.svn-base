/*common*/
var data = ["说福利的放学别走",
	"没钱没钱没钱没钱没钱没钱没钱没钱没钱没钱没钱没钱",
	"杭州人民发来贺电",
	"看我看我看我看我！",
	"来自宇宙的M78星云发来贺电",
	"我是美丽说小美(*/ω＼*) 不买件新衣裳怎么在这个看脸的社会混下去~",
	"凯源盛世，千秋万代！",
	"我是美丽说小美(*/ω＼*) 冬天就应该吃热腾腾的火锅嘛~",
	"羞耻play",
	"哈哈哈哈提前圣诞快乐啊！",
	"我是美丽说小美(*/ω＼*) 你造吗~ 现在有376629人在同时看弹幕！",
	"几个意思啊~",
	"天了噜",
	"小新新幼儿园发来贺电",
	"动词大慈",
	"笑什么笑你也得掏钱包",
	"我是美丽说小美(*/ω＼*) 大家来晒晒领到多少红包啦~",
	"万岁万岁万岁万岁万岁万岁万岁万岁万岁万岁万岁万岁",
	"你TM在逗我哈哈哈",
	"我是美丽说小美(*/ω＼*) 据说发弹幕的妹纸都会瘦十斤呢！",
	"此处没檀木？",
	"火钳刘明！",
	"大锤我要给你生孩子",
	"节操已碎",
	"天花板坏了= =",
	"狠命报复社会！！",
	"我是美丽说小美(*/ω＼*) 圣诞小调查~ 此时此刻你在做什么！",
	"￥%#￥%￥#￥%￥#￥%",
	"我是美丽说小美(*/ω＼*) 祝大家节日快乐~常来看我哟 > <",
	"承德医学院路过",
	"我们为什么要刷屏",
	"好吧买买买也是拼了",
	"我是美丽说小美(*/ω＼*) 圣诞小调查~ 最近你最想买的是什么~",
	"只有白痴才看不到我发的弹幕",
	"大家都好腻害的样子",
	"我是美丽说小美(*/ω＼*) 你造吗~ 现在有428879人在同时看弹幕哟",
	"诶，怎么会有弹幕捏",
	"楼上请自重",
	"我是美丽说小美(*/ω＼*) 给大家发苹果啦 平平安安新年大吉~ 【苹果 苹果 苹果 苹果 苹果 苹果 苹果 苹果 ",
	"劳资有的是钱๑乛◡乛๑ ",
	"没看够啊哈哈哈哈",
	"我是美丽说小美(*/ω＼*) 告诉大家~ 认真玩弹幕会发大红包噢！",
	"为什么这儿没有BGM",
	"霸道学长爱上我",
	"我是美丽说小美(*/ω＼*) 你造吗~ 弹幕应该念dan幕而不是tan幕！",
	"莫名的怒火",
	"我勒个去",
	"啊~啊~ 你是风儿我是沙",
	"尼壕 小伙伴~",
	"再来看一次弹幕"
]

var Danmu = require('wap/component/danmu/index');
var index = 0;
var danmu = Danmu({
	el: "#wrap1",
	bulletHeight: 30,
	bulletTmpl: '<div><i data-name="icon"></i><span data-name="content"></span></div>',
	bulletClass: "bullet",
	initChannel: {
        offset: 20,
        height: 150,
        size: 3
    },
	getMessage: function() {
		index < data.length - 1 ? index++ : (index = 0);
		return data[index]
	},
	initBullet: function() {
		this.bullet.speed = -.15
		var bullet = this.bullet
            
        if ( bullet.type == 'user' ) { //用户发送的信息
            //bullet.els.el.className = 'user-send-bullet'
            bullet.els.content.innerHTML = this.content
        } else if  ( bullet.type == 'user2' ) {
        	bullet.els.content.innerHTML = this.content
        } else { //普通信息
            //bullet.els.el.className = 'normal-bullet'
        }
	}
});

danmu.load(function() {
    this.bullet.type = 'user' //设置子弹类型，type 为自定义属性
    this.content     = "11111111111111111111111"
})

danmu.load(function() {
    this.bullet.type = 'user2' //设置子弹类型，type 为自定义属性
    this.content     = "22222222222222222222222"
})