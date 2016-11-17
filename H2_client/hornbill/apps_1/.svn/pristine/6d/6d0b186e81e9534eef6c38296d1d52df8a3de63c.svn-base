/*common*/
var filterhtml = require('component/filterhtml')
var dataURItoBlob = require('component/dataURItoBlob')
var uploadImg = require('ui/uploadImg')

exports.bind = function(opt) {
	var $input = $(opt.input)

	function paste_img(e) {
		if (e.clipboardData && e.clipboardData.items ) {
		// google-chrome 
		//	alert('support clipboardData.items(chrome ...)');
			ele = e.clipboardData.items
			for (var i = 0; i < ele.length; ++i) {
				if ( ele[i].kind == 'file' && ele[i].type.indexOf('image/') !== -1 ) {
					var blob = ele[i].getAsFile();
					window.URL = window.URL || window.webkitURL;
					var blobUrl = window.URL.createObjectURL(blob);

					var $img = $('<img/>', { 'src' : blobUrl })

					$input.append($img)

					uploadImg(ele[i].getAsFile(), opt, $img)
				}

			}
		} else {
		//	alert('non-chrome');
			window.setTimeout(function(){
				var imgs = $input.children('img') 
				for (var i = 0,j = imgs.length ; i<j ; i++){
					var $img = $(imgs[i])
					var blob = dataURItoBlob($img.attr('src'))
					console.log(blob)

					uploadImg(blob, opt, $img)
				}
			}, 0 )
		}
		setTimeout(function(){
			$input.html(filterhtml.filterRecieveHtml($input.html()))
				.focus()
		}, 10)
	}
	$input[0].onpaste = paste_img
}

