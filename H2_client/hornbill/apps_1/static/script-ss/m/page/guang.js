/*common*/
fml.use(['m/app/posterWall', 'm/app/posterPa', 'm/component/lazyLoad'] , function(){
	var poster = this.posterPa
		, lazyLoad = this.lazyLoad

	var data = {
		url : '/aj/getGoods/' + fml.vars.poster.ptype
		, poster : poster
		, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
	}

	if(Meilishuo.config.controller != 'goods'){
		var idObj = {
			'catalog' : 'nid'	
			, 'attr' : 'attr_id'
			, 'search' : 'keyword'
			, 'group' : 'group_id'
		}
		data.url +=('?' + idObj[fml.vars.poster.ptype] + '=' + fml.vars.poster.pid) 
	}

	this.posterWall.scroll(data);
});

fml.use('m/app/frame' , function(){
	this.openClosedFn();
	this.searchFn();
	this.routeFn();
});
fml.use('m/app/search' , function(){
	this.check();
});

