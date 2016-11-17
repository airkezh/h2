fml.use('app/tracking' , function(){
	    this.logClick('.pins' , 'twitter_id' , 'cr/pin')
	 });
fml.use(['jquery', 'app/searchWall' , 'component/urlHandle', 'component/shareTmp' , 'component/waterfall'] , function(){
	var shareTmp = this.shareTmp
	var pin = this.waterfall;
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'filter' : query.filter,
		'searchType' : query.searchType,
		'searchKey' : query.searchKey
	};
	var url = '/search/getPosters/result';
	if(fml.vars.search_totalNum[urlData.filter] == 0)
		url = '/search/getPosters/recommend';

	if (urlData.filter == 'goods') {
		$.get('/aj/getGoods/ads_poster', { 'word':urlData.searchKey, 'page':urlData.page }, function(response){
			var cpt,commerce;
			/*
			if (response['cpt'] && response['cpt'].length){
				$('.poster_cpt').html(shareTmp('tmp_cpt' , response) || '')
				cpt = true;
			}
			*/
			if (response['commerce'] && response['commerce'].length){
				$('.cata_brands').html(shareTmp('tmp_brand' , response) || '')
				commerce = true;
			}
			if(cpt || commerce) pin.reload(); 
		}, 'json');
	}
	if($.trim(urlData.searchKey) === ''){
		$('.content_fluid').removeClass('v_hidden');
		$('.topSpinner').hide();
		$('.midSpinner').hide();
	}else{
		this.searchWall(urlData , url);
	}
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
});
fml.use('app/personFollow' , function(){
	this(true);	
});
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/userFollow' , function(){
	this('.addBrand' , '.removeBrand' , '.removeBrand', 'red_follow' , 'pink_follow');
	this('.addAds' , '.removeAds' , '.removeAds', 'red_sbtn' , 'pink_sbtn');
});
fml.use('app/admClick', function(){
	this.monitor();
})
fml.use('app/eventHover' , function(){
	this.hoverShow('.showChangeHead' , '.change');  
});

fml.use(['jquery', 'app/followShop'], function() {
    "use strict";
    var follow = this.followShop;

    this.jquery(function() {
        follow({
            el: '.goods_wall',
            follow: '<i class="icon-add">+</i>关注',
            unfollow: '取消关注',
            followed: '已关注'
        });
    })
})

fml.define('page/search' , [] , function(){});
