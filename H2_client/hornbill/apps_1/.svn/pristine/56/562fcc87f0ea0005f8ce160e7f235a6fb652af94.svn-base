/*common*/
require('wap/app/lark/filter');
require('wap/zepto');
bian.onclick = function(){
	canvas.width = cropbox.width;
	canvas.height = cropbox.height;
	var context = canvas.getContext("2d");
	context.drawImage(cropbox, 0, 0, cropbox.width, cropbox.height);
	//drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	context.globalAlpha = 0.9;
	var gradient = context.createLinearGradient(0, 0, 550, 0); //横向渐变
	gradient.addColorStop(0, "rgb(0, 0, 0)");
	gradient.addColorStop(1, "rgb(255, 255, 255)");
	context.fillStyle = gradient; 
	context.fillRect(0, 0, 550, 120); //fillRect(x,y,width,height)
	context.font = "72px serif";
	context.fillStyle = "rgb(255, 255, 255)";
	context.fillText("滤镜test", 40, 100); //fillText(text,x,y,maxWidth)
}

var canvas1 = $('#thecanvas')[0];
var canvas2 = document.getElementById('thecanvas1');
var $canvasTxt = document.getElementById('canvas_txt')
var $textbox,val;
var saveTxt = document.getElementById('save_txt');
// console.log(saveTxt);
var newImgs = document.getElementById('img1'); //egg	
var newImgs2 = document.getElementById('img2');
// console.log(canvas1.offset());
canvas1.onclick = function(e){
	var e = e || event;
	disX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	disY = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	console.log(disX+','+disY);
	$textbox = $('<input type="text" id="txt">')
	$textbox.css({"width":"80px","height":"20px","position":"absolute","top":disY,"left":disX,"opacity":"0.7"});
	$textbox.appendTo($canvasTxt);
};
saveTxt.onclick = function(){
	val = $textbox.val();
	// console.log(disX+','+disY);
	var img = new Watermark(canvas1,newImgs,{text:val,color:'#000',family:'italic small-caps bold 20px 楷体',left:$('#txt').offset().left,top:($('#txt').offset().top-$('#txt').parent().offset().top),
		width:newImgs2.width,
		height:newImgs2.height
	});
	$textbox.remove();
}
//文字水印
var img = new Watermark(canvas1,newImgs,{text:'',color:'#000',family:'italic small-caps bold 20px 楷体',left:100,top:100,
	width:newImgs2.width,
	height:newImgs2.height
});

//图片水印
// var img2 = new Watermark(canvas2,newImgs,{arrImg:newImgs2,left:50,top:50,
// 	width:newImgs2.width,
// 	height:newImgs2.height
// });
