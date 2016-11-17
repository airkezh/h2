/*common*/
/**
 * canvas图片压缩
 * @author yaoyao
 */
var canvasSupported = isCanvasSupported()

function dataURItoBlob(dataURI) {
	// convert base64 to raw binary data held in a string
	var byteString 
		,mimestring 

	if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
		byteString = atob(dataURI.split(',')[1])
	} else {
		byteString = decodeURI(dataURI.split(',')[1])
	}

	mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

	var content = new Array();
	for (var i = 0; i < byteString.length; i++) {
		content[i] = byteString.charCodeAt(i)
	}

	return new Blob([new Uint8Array(content)], {type: mimestring});
}

function imgScale (src , scale,cbk) {
	if (!src) return cbk(false)
	var _canvas = document.createElement('canvas')
	var tImg = new Image
    tImg.onload = function(){
        var _context = _canvas.getContext('2d');
        _context.drawImage(tImg,0,0);
		var type = 'image/jpeg'
		src = _canvas.toDataURL(type , scale)
		var blob = dataURItoBlob(src)
		cbk(blob)
		/*
		var r = _canvas.mozGetAsFile('f' , type)
		cbk(r)
		*/
    };
	tImg.src = src

}

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

exports.support = canvasSupported 

/* opt {scale :0-1}*/
exports.zip = function(files ,opt,cbk){
	opt = opt || {}
	var scale = opt.scale
	if (!canvasSupported) return cbk(files)
	if (!scale || 1 == scale ) return cbk(files)
	var files_count = files.length	
		,ret = []
	
	for (var i = 0 ,j = files.length ; i<j ; i++){
	    var fReader = new FileReader();
	    fReader.onload = function (e){
			var result = e.target.result
	        imgScale(result , scale ,function(file){
				file && ret.push(file)
				files_count--
				if (files_count <= 0 ) cbk && cbk(ret)

				})
	    };
	    fReader.readAsDataURL(files[i]);
	}
}

