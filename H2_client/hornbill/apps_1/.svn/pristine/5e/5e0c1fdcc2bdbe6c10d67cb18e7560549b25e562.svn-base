/**
 * 图像上传功能
 * 原作者懒得写注释，帮他补上
 * 要是注释写的好，请感谢yaoyao
 * 要是注释看不懂或者代码有任何疑问，不要犹豫，请尽情责怪原作者dongjie
 * @author chu dongjie
 * 
 * @use-method
 * imgPreviewSelect(btn, elements, opts, fun);
 * btn : 调用上传按钮样式
 * elements : {
		img, //显示上传图片的img节点，默认为$('#thumbn')
		previewImg, // 截取预览区域的img节点，默认为$('.preview')
		originImg, // 原始图片存放img节点，默认为$('.original')
		previewDiv // 预览截取div，默认为$('.preview_pic')
	};
 * opts : {
		width, //后台截取图片宽度
		height, //后台截取图片高度
		pre_w, //预览宽度
		pre_h, //预览高度
		aspectRatio, //截取高宽比
		parent //父节点，默认为body
	}
 * fun : 回调函数
 *
 * 默认参数 : {
 		$('#x1'); //截取部分x坐标起点坐标存放input节点
		$('#x2'); //截取部分x坐标终点坐标存放input节点
		$('#y1'); //截取部分y坐标起点坐标存放input节点
		$('#y2'); //截取部分y坐标终点坐标存放input节点
		$('#w'); //截取部分宽度存放input节点
		$('#h'); //截取部分高度存放input节点
		$('#get_upload_file'); //默认iframe接收提交表单数据
		form表单参数 : {
			action : "/imageupload/group_avatar_save", //提交接口地址
			target : "upload_file", //iframe的name属性
			enctype : "multipart/form-data" // 提交方式
		}
 	}
 * 
 * @example
 * var opts = { 
		width: 920, 
		pre_w: 922, 
		pre_h: 243, 
		aspectRatio: '9.5:2.5',
		parent: '.set_ava'
	};
	var elements = {
		img: '#thumbn',
		previewImg: '.preview',
		originImg: '.original',
		previewDiv: '.preview_pic'
	};
	imgPreviewSelect('.attach', elements, opts, function(){
		$preview_pic.show();
		$('.header_pic').hide();
	});
 */
fml.define('app/imgPreviewSelect', ['component/imgAreaSelect', 'jquery'], function(requrie, exports){
	var $ = requrie('jquery'),
		imgAreaSelect = requrie('component/imgAreaSelect');

	var opt = { parent: 'body' },		// width, height, pre_w, pre_h, aspectRatio, parent
		real_w, //实际宽度
		real_h,	//实际高度
		$img = $('#thumbn'), 			// 显示上传图片的img
		$preview = $('.preview'), 	// 截取预览区域的img
		$originImg = $('.original'),	// 原始图片
		$previewDiv = $('.preview_pic');// 预览截取div

	function init(elements, opts) {
		$.extend(opt, opts);
		if(elements.img) $img = $(elements.img);
		if(elements.previewImg) $preview = $(elements.previewImg);
		if(elements.originImg) $originImg = $(elements.originImg);
		if(elements.previewDiv) $previewDiv = $(elements.previewDiv)
	}

	function clearAreaSelect() {
		if ($('.imgareaselect-outer').length > 0) {
			$('.imgareaselect-selection').parent().remove();
			$('.imgareaselect-outer').remove();
		}
	}

	function viewImg(obj, cbk, selectImg) {
		if ($.browser.msie && $.browser.version < 10) {
			cbk();	//ie下使用js通过滤镜显示的图片如果是隐藏的，没有高度
	//		if ($.browser.version === '6.0') {
	//			$img.attr('src', obj.value);
	//			$preview.attr('src', obj.value);
	//		}
			//ie6,7,8,9 滤镜实现 
			obj.select();
			$img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src='" + document.selection.createRange().text + "')";
			//setTimeout to get original image width&height
			setTimeout(function(){	
				real_w = $img.width(), real_h = $img.height();
				//ie下直接在img标签中使用滤镜展示上传图片会在左上角多出一个小图标，
				//因此下面创建了一个同样式的div来展示图片并删掉原有的img标签
				var thu = document.createElement('div');
				var imgId = $img.attr('id'), imgClass = $img.attr('class');
				imgId && thu.setAttribute('id', imgId);
				imgClass && thu.setAttribute('class', imgClass);
				$(thu).insertBefore($img);
				$img.remove();
				$img = $(thu);
				opt.height = opt.width*real_h/real_w;
				$img.css({'width': opt.width, 'height': opt.height});
				thu.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
				//同样的道理，创建一个同样式的div替换掉img标签来预览截取的图片
				var preDiv = document.createElement('div');
				var preId = $preview.attr('id'), preClass = $preview.attr('class')
				preId && preDiv.setAttribute('id', preId);
				preClass && preDiv.setAttribute('class', preClass);
				$(preDiv).insertBefore($preview);
				$preview.remove();
				$preview = $(preDiv);
				$preview[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
				selectImg();
			}, 100);	
			return;
		}
		//html5实现
		var fr = new FileReader();
		fr.onload = function(e) {
			if(e.total < 8192 || e.total > 2097152) {
				alert('要上传8K到2M之间大小的图片哦~~');
				return false;
			}
			/*to get the real width & height of the image*/
			var image = new Image();
        	image.onload = function(evt) {
            	real_w = this.width;
            	real_h = this.height;
        	};
        	image.src = e.target.result; 
			cbk();
			$img.attr('src', e.target.result);
			$preview.attr('src', e.target.result);
			selectImg();
		}
		fr.readAsDataURL(obj.files[0]);
	}

	function preview(img, selection) {
		if (selection.width == 0 || selection.height == 0) { return false;}
		var scaleX = opt.pre_w/selection.width;
		var scaleY = opt.pre_h/selection.height;
		opt.height = opt.height ? opt.height : $img.height();
		$preview.css({
			'width' : Math.round(scaleX * opt.width) + 'px',
			'height' : Math.round(scaleY * opt.height) + 'px',
			'margin-left' : '-' + Math.round(scaleX * selection.x1) + 'px',
			'margin-top' : '-' + Math.round(scaleY * selection.y1) + 'px'
		});
		$('#x1').val(Math.round(selection.x1 * real_w / opt.width));
		$('#y1').val(Math.round(selection.y1 * real_h / opt.height));
		$('#w').val(Math.round(selection.width * real_w / opt.width));
		$('#h').val(Math.round(selection.height * real_h / opt.height));
	}

	function onChange(file, cbk) {
		$(file).on('change', function(){
			var allowExt = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名
			var ext = this.value.substring(this.value.lastIndexOf(".") + 1).toLowerCase();
			if (allowExt.indexOf(ext) == -1) {
				alert('请上传jpg、gif或者png格式的图片哦~~');
				return;
			}
			viewImg(this, cbk, function(){
				opt.height = 0;
				clearAreaSelect();
				if($img.data('imgAreaSelect')) $img.removeData('imgAreaSelect');
				imgAreaSelect($img[0], {aspectRatio: opt.aspectRatio, parent: opt.parent, onSelectChange: preview, onInit: preview, x1: 0, y1: 0, x2: opt.pre_w/2, y2: opt.pre_h/2 });
			});
		});
	}

	//after upload
	var getFile = document.getElementById('get_upload_file');
	var afterUpload = function() {
		if (this.readyState && this.readyState != 'complete') return;
		var iframe = getFile.contentDocument || getFile.contentWindow.document;
		var res = iframe.body.innerHTML.replace(/<.*?>/g,'');
		if(!res) return;
		res = $.parseJSON(res);
		if (res.pic) {
			revertOriginal();
			$originImg.attr({'src': res.pic, 'width': opt.pre_w, 'height': opt.pre_h}).show();
		} else {
			revertOriginal();
			$originImg.show();
			if(res.content)
				alert(res.content);
			else
				alert('亲，你上传的图片太奇葩，超出了我们的预期，请换张大小适中的图片~~');
		}
		//恢复页面初始状态
		function revertOriginal() {	
			$(document).scrollTop(0);
			clearAreaSelect();
			$previewDiv.hide();		//隐藏截取图片的预览区域
		}
	}
	if (getFile) {
		getFile.attachEvent ? getFile.attachEvent('onload', afterUpload) : getFile.onload = afterUpload;
	}
	/*
		file: 上传文件的input,
	*/
	return function(file, elements, opts, cbk) {
		init(elements, opts);
		onChange(file, cbk);
	}
})