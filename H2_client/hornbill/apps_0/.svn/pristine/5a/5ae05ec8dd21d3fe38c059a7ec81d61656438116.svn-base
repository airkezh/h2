/*common*/
var signWX = require('wx/sign')
var shareWX = require('wx/share')

signWX()
/**
 * iPhone 5s，系统为 IOS 7 的手机拍照上传的图片操作后会有问题，所以直接禁止该手机上的拍照功能。
 */
if ( screen.width == 320 && screen.height == 568 && navigator.userAgent.toString().match(/iphone os 7_\d+_\d+/i) ) {
    $( 'input[type="file"]' ).attr( 'multiple', true )
}

fml.vars.shareData = {
	'desc':'新年最佳礼物（整蛊利器）在此！帮TA一秒成就白日梦',
	'imgUrl':'http://d06.res.meilishuo.net/img/_o/6d/bc/b5eb23e721c96096692ecd197511_200_200.cg.png',
	'title':'上传头像，5秒实现梦想'
}

shareWX.bind(fml.vars.shareData)


var EXIF = require('component/exif')
var BinaryFile = require('component/binaryajax')

require('wap/zepto');
require('wap/zepto/fastclick');
//var uploadImg = require('wap/ui/uploadImg');
var dataURItoBlob = require('component/dataURItoBlob');

var head_url,
    cropCanvas  = document.createElement('canvas'),
    resizeCanvas = document.createElement('canvas');

var clientH = $(window).height() + 100,
    $paBox  = $( '.pa-box' ),
    pWidth  = $paBox.width();
    loadingBox = $('.loading-box');

$paBox.css({ 'width': pWidth, 'overflow' : 'hidden' , 'height' : pWidth*(370/584) });
$('.btn-box').css({'margin-top' : pWidth*0.71});
$('.model-box').css({'height' : pWidth*0.85});
loadingBox.css({'height' : clientH});

var fileElem = $('.fileElem');
var modelImg = $('#model-img')
var $oImg = $('#origin-img');
var oImg = $oImg[0];

var baseScale = 0.3;
var initialScale = baseScale;
var currentScale = baseScale;
var dx=0, dy=0;
var offx=0, offy=0;	

function genUrl( file ) {
	return ( window.URL || window.webkitURL ).createObjectURL(file);
}

function rote( file, cb ) {
	var fr = new FileReader();
	fr.readAsDataURL(file); 

	fr.onload = function(fe){ 
		var result = this.result;
		var img = new Image();
	 	var exif;
		img.onload = function() {
			var orientation = exif ? exif.Orientation : 1;
			var imgRotation = 0;
			// 判断拍照设备持有方向调整照片角度
			switch(orientation) {
				case 3: 
					imgRotation = 180; 
					break;
				case 6: 
					imgRotation = 90; 
					break;
				case 8: 
					imgRotation = 270; 
				break;
			}
			rote.imgRotation = imgRotation;
			cb && cb();
		};

		// 转换二进制数据
		var base64 = result.replace(/^.*?,/,'');
		var binary = atob(base64); 
		var binaryData = new BinaryFile(binary);

		// 获取exif信息
		exif = EXIF.readFromBinaryFile(binaryData);

		img.src = result;
	};
}

//上传图片
fileElem.on('change' , function(){
	dx=0, dy=0;
	offx=0, offy=0;
	initialScale = baseScale;
	currentScale = baseScale;
	var file = this.files[0];
	if (!file) {return false};
	// var fReader = new FileReader();
	// fReader.readAsDataURL(file);
	// fReader.onload = function(){
		// var _self = this;
	rote(file,function(){
		$oImg.attr('src' , genUrl(file));
		oImg.style.webkitTransform = getTranslate(0,0,baseScale);
		$('.btn-box1').hide();
		$('.btn-box2').show();
		$('.step2').hide();
		$('.step3').show();
		$('.photo').hide();
		$('.btn-box3').attr('class' , 'btn-box btn-box4');
	});
});
modelImg.on('touchstart', function(ev){
	ev.preventDefault();
	$(this).addClass('front');
});
modelImg.on('touchend' , function(){
	$(this).removeClass('front');
});

var maxScale = 2;
var minScale = 0.1;
touch.on('#model-img', 'pinch', function(ev){
	$(this).addClass('front');
	currentScale = ev.scale - 1;
	currentScale = initialScale + currentScale;
	if(currentScale > maxScale){
		currentScale = maxScale;
	}
	if(currentScale < minScale){
		currentScale = minScale;
	}
	oImg.style.webkitTransform = getTranslate(offx,offy,currentScale);
});
touch.on('#model-img', 'pinchend', function(ev){
	ev.preventDefault();
	$(this).removeClass('front');	
	initialScale = currentScale;
});
touch.on('#model-img', 'drag', function(ev){
	$(this).addClass('front');
	dx = dx || 0;
	dy = dy || 0;
	offx = dx + ev.x;
	offy = dy + ev.y;
	oImg.style.webkitTransform = getTranslate(offx,offy,currentScale);
});
touch.on('#model-img', 'dragend', function(ev){
	ev.preventDefault();
	$(this).removeClass('front');	
	dx = dx + ev.x;
	dy = dy + ev.y;
});  
function getTranslate(x,y,scale){
	return "translate(" + x + "px," + y + "px) scale("+scale+")"
}

function resize( swidth, sheight ) {

	resizeCanvas.width = swidth;
	resizeCanvas.height = sheight;
	var ctx1 = resizeCanvas.getContext('2d');

	if ( rote.imgRotation == 90 ) {
		ctx1.rotate( 0.5 * Math.PI )
		ctx1.translate( 0, -swidth)
	}

	ctx1.drawImage( oImg, 0, 0, swidth, sheight )

	var bb  = dataURItoBlob( resizeCanvas.toDataURL()),
	    src = genUrl(bb)

	$oImg.attr('src', src);
	//$oImg.attr('src', resizeCanvas.toDataURL());
    //$('#ca').attr('src', resizeCanvas.toDataURL());
//	$('#ca').attr('src', src);
	oImg.style.webkitTransform = getTranslate(offx,offy,1);
}

function crop_head() {
	var imgWidth = pWidth * (146/584);
	var imgHeight = pWidth * (184/584);
	cropCanvas.width = imgWidth;
	cropCanvas.height = imgHeight;
	var ctx = cropCanvas.getContext('2d');
	var ox = pWidth * (222/584) + $('.pa-box').offset().left;
	var oy = pWidth * (7/584) + $('.pa-box').offset().top;
	var px = $oImg.offset().left;
	var py = $oImg.offset().top;

    function callback() {
        oImg.onload = null

        var opx = ox - px,
            opy = oy - py

        try {
            ctx.drawImage(oImg,opx, opy, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight)
        } catch( e ) {}

        head_url = cropCanvas.toDataURL()
        fml.emit('headurl_load')
    }

	if ( oImg.complete ) {
        callback()
	} else {
		oImg.onload = callback
	}
}
function loading() {
	loadingBox.show()
        .find('li').each(function( i ) {
            $( this ).css( '-webkit-animation-delay', i * 300 + 'ms' )
        })
}
$( '.btn3' ).on( 'click', function() {
	var	swidth = $oImg.width(),
	    sheight = $oImg.height(),

        //截取区域的宽和高
	    imgWidth  = pWidth * (146 / 584),
	    imgHeight = pWidth * (184 / 584)

	if ( swidth < imgWidth || sheight < imgHeight ) {
		alert('图片太小, 请重新缩放')
		return false
	}
        //截取区域的左上角坐标
    var ox = pWidth * (222 / 584) + $paBox.offset().left,
        oy = pWidth * (7 / 584) + $paBox.offset().top,
        px = $oImg.offset().left,
        py = $oImg.offset().top,
        opx     = ox - px,
        opy     = oy - py,
        iWidth  = $oImg.width(),
        iHeight = $oImg.height(),
        minX = ox + imgWidth,
        minY = oy + imgHeight

    if ( opx < 0 || opy < 0 ||
        ( px + iWidth ) < minX ||
        ( py + iHeight ) < minY ) {
        return alert( '红色头像区域需被照片占满哦' )
    }

	resize( swidth, sheight )
	crop_head();
});
var tid = [61,63,57,67,73,65,71,69];
fml.on('headurl_load', function(){
    loading();
	if ( !head_url ) {
		alert('系统错误请重新上传')
		return false
	}
	$.post('/aj/huodong/wx_upload' , {'img_contents' : head_url} , function(data){
		if(data.o_pic_url){
			var pic_url = encodeURIComponent(data.o_pic_url);
			var t = setTimeout(function(){
				window.location.href = 'http://pages.w.meilishuo.com/h5/qietou?template_id='+tid[fml.vars.param]+'&awatar='+pic_url;
				loadingBox.hide();
			}, 1000)
		}else{
			alert(data.msg);	
		}
	} , 'json');
})

