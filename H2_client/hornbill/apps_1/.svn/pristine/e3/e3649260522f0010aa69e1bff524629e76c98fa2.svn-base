/*common*/
var $ = require('wap/zepto');
var nameBox=$(".name"),
		picBox=$(".pic"),
		start=$(".start"),
		timestart=$(".time"),
		level=$(".level"),
		picB=$('.pic-box'),
		pic = $('.pic'),
		count=1,
		time=null;
		startFlag  = false;

		init();	
	start.on("click",function(){
		end();
		startFlag = true;
	});
	/*===================倒计时==============*/
	function end(){
		var endTime=60;
		    time=setInterval(function(){
			endTime--;
			timestart.html(" "+endTime);
			if(endTime<=0){
				clearInterval(time);
				startFlag  = false;
			}
		},500);
	}	
	/*==================初始化==================*/

	function init(){
		var arr = [{
				'cletter' : 'F',
				'chinese' : '明明',
				'letter':'fang'
				},
				{
				'cletter' : 'N',
				'chinese' : '财神',
				'letter':'ning'

				},
				{
				'cletter' : 'K',
				'chinese' : '东东',
				'letter':'ke'

				},
				{
				'cletter' : 'L',
				'chinese' : '沫沫',
				'letter':'li'

				},
				{
				'cletter' : 'Z',
				'chinese' : '默默',
				'letter':'zhang'

				},
				{
				'cletter' : 'G',
				'chinese' : '美美',
				'letter':'guo'

			}]
		
		if(pic.find('img')){
			pic.find('img').remove();
			pic.find('span').remove();
		}

		var hrr = [];
		for (var i = 0; i < 3; i++) {
			var random=Math.floor(Math.random()*100)%arr.length;
			var num=arr[random];
			arr.splice(random,1);
			hrr.push(num);//新的不重复的数组
		};
		for(var i=0;i<3;i++){
			$("<img class='chinese'  data-ch="+ hrr[i].cletter + " src=http://i.meilishuo.net/css//images/yaoyaotest/"+hrr[i].letter+".jpg>").appendTo(picBox[i]);
			$("<span>"+hrr[i].chinese+"</span>").appendTo(picBox[i]);
		}
		/* 从底部随机信息放在顶部 */
		var randNum =Math.floor(Math.random()*3);
				topInfo = hrr[randNum];
				nameBox.html(topInfo.cletter);
	}

	match();
function match(){
		picB.on('click','.chinese',function(){
			if(startFlag){
				var index = $(this).data("ch");
				var first=nameBox.html();
				if(index == first ){
					level.html(count++);
					init();
				}
				else{
					alert("是不是是傻!");
					clearInterval(time);
					picB.unbind("click");
				}
			}
		})	
}