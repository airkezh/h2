fml.define('wap/app/wapWalls' , ['component/iStorage', 'wap/jquery'] , function(require , exports){
	var storage = require('component/iStorage');

	var data = []
	var wall = $('.wall'),
		col_flag = wall.children('.col_flag'),
		colNum = col_flag.css('z-index') | 0,
		colNo = 0,
		colNum_new,
		col

	var createPoster = function(data){
		str = '<figure>' +
			'<img src="' + data + '" alt="">' +
			'<figcaption></figcaption>' +
			'</figure>'
		return $(str)
	};
	var addPoster = function(data, no, done){
		var list
		for(var i in data){
			list = (i % colNum + no) % colNum
			console.log(i, no, list)
			createPoster(data[i]).appendTo(col.eq(list))
		}
		colNo = list + 1
		done();
	};
	var getPoster = function(urlData, url, done, isFresh){
		if(isFresh){
			urlData.frame = 0;
			urlData.page = 0;
			colNo = 0
			var str = ''
			for(var i = 0; i < colNum; i++){
				str += '<div></div>'
			}
		}
		$.get(url, urlData, function(r){
			var i = 0
				, len = r.tInfo.length
				, data = []
			for(i = 0; i < len; i++){
				data.push(r.tInfo[i].ginfo.goods_pic_url)	
			}
			if(isFresh){
				wall.html(str)
				col = wall.children('div')
				col.css({'width' : 100 / colNum + '%'})
			}
			console.log(urlData)
			urlData.frame++;
			if(urlData.frame >= 8){
				urlData.frame = 0
				urlData.page++;
			}
			addPoster(data, colNo, done)
		}, 'json')
	};
	var freshWall = function(urlData, url, done){
		getPoster(urlData, url, done, true);
	};
	var ajaxWall = function(urlData, url, done){
		getPoster(urlData, url, done);
	}
	/*
	return function(urlData , posterUrl , options){
	}
	*/
	exports.freshWall = freshWall;
	exports.ajaxWall = ajaxWall;
});
