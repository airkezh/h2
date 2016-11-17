fml.use('app/tracking' , function(){
	    this.logClick('.pins' , 'twitter_id' , 'cr/pin')
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

fml.define('page/lmsearch' , [] , function(){});
