/*common*/
var ex = require("wap/app/lark/splitImg");
var pt = require("wap/app/lark/pt");
$("input").css({"margin-top":$(".banner img").css("height")});
var opt = {
    "file" : "abc",//上传文件控件
    "split" : 3,//切分成5*5的图
    "cbk" : function(code,arr){
    	if (code == 0) {
    		$('#test').remove();
    		var imgWidth = ($(window).width()-(opt.split+1))/opt.split;
    		console.log($(window).width());
    		console.log($(window).width()-(opt.split+1)/opt.split);

    		var testSize = imgWidth*opt.split+(opt.split+1);
    		$('body').append($('<div id="test" style="width:100%;">'));
    		$('#test').css({"margin":"0 auto","position":"relative","width":testSize,"height":testSize});
	    	for(var i = 0; i < opt.split*opt.split; i++){
				$('#test').append($('<img style="width:'+imgWidth+'px'+';float:left;margin-right:1px;margin-bottom:1px;">').attr({'src':arr[i],'num':i+1}))
			}
			setTimeout(function(){
				var aImg = $("#test img");
				pt.start(opt.split,aImg);
			},1000);
			// setTimeout(function(){
			// 	$(".popup").css("display","block");
			// 	var time = 3;
			// 	var timer = setInterval(function(){
			// 		$(".popup h1").html(time--);
			// 	},1000);
			// },3000);
    	}else{
    		alert('error');
    	}
    }
}
ex(opt);