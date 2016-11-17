/*common*/
var $ = require('jquery')
$(function(){
var height=$(window).height()-30,
	width=$(window).width(),
	head=$("#head"),
	box=$(".box"),
	list=$("#list>li"),
	pic=$(".pic"),
	content=$("#content"),
	barrier=$(".barrier"),
	timeEnd=$("#timeEnd"),
	time1,
	time2=[null,null,null,null,null],
	time3=[null,null,null,null,null],
	num,
	allBarrier,
	w,
	h,
	cBox,
	node,
	boxLength,
	score=0,
	index=1;
	list.click(function(){	
     	$(".box").remove();
		$(this).addClass("first").siblings().removeClass("first");
		num=$(this).index()+3;
		head.hide();
		createBox();
		cBox=$(".box");	
		for(var i=0;i<cBox.length;i++){
			move(i);
		}
		time1=setInterval(function(){
			score++;
			timeEnd.text(score++);	
		},100);
		
		findpic();
			
});
	jump();

function move(i){
	time3[i]=setTimeout(function(){
			cBox=$(".box");	
			w=random(5,15),
			h=random(10,40);			
			barrier.clone().appendTo(cBox.eq(i)).css({
				"height":h+"px",
				"width":w+"px",
				"top":height/num-h+"px",
				"left":width+60+"px"
			}).animate({'left':"-20px"},5000,"linear",function(){
				$(this).detach();
			})	
		move(i);

	}, random(3000,6000));
	
}
function findpic(){
	var allPic=$(".pic");
	for(var i=0;i<allPic.length;i++){
		stopjump(allPic.eq(i),i);


	}
}
function stopjump(obj,i){	
	node=i;
	time2[i]=setInterval(function(){
		allBarrier=$(".barrier");		
		for(var i=0;i<allBarrier.length;i++){
		if(!judge(obj,allBarrier.eq(i))){	
			clear();
			}
		}	
	},30)
	
}
function clear(){
	for(var i = 0;i<6;i++){
	clearTimeout(time3[i]);		
	clearInterval(time2[i]);
	
	}
	allBarrier.stop();
	head.show();
	clearInterval(time1);
	$('#timeEnd').text('');
	score = 0;
}

function jump(){
	$("body").on("touchstart",".box",function(){
		$(this).find(".pic").animate({"top":0},function(){
			$(this).animate({"top":height/num-28+"px"},300);
		});		
	});
}
function judge(n1,n2){
	var pleft=n1.offset().left+n1.width(),
	plefty=n1.offset().left,
	ptop=n1.offset().top+n1.height(),
	ptopy=n1.offset().top,
	btopy=n2.offset().top,
	btop=n2.offset().top+n2.height(),
	bleft=n2.offset().left+n2.width(),
	blefty=n2.offset().left;

	return pleft<blefty||ptop<btopy||bleft<plefty||btop<ptopy?true:false;	
}

function createBox(){
	box.css({
		"width":width+"px",
		"height":height/num+"px"
		}).show();
	pic.css({
		"top":height/num-28+"px"
	}).show();
	for(var i=0;i<num-1;i++){
		 box.clone(true).appendTo(content);
		 index=index+1;
	};
	boxLength=index;
	for(var i=1;i<box.length;i++){
		pic.clone().appendTo(box);

	}

}
function random(n,m){
	return  Math.floor(Math.random()*(m-n))+n;
}


});