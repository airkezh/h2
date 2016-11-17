function play(){
    return this;
}
var controlFns = {
    'video' : function(args){
        var php = {
			'h5_video' : '/customactivity/CustomActivity_common_tool_single?id=h5_video'
			}

        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			var title = data.h5_video && data.h5_video.title || 'video'
			data.pageTitle = title + ' - 美丽说';
			//data._CSSLinks = ['activity/video'];
			this.render('activity/video.html' , data);
        });
    }
};
exports.__create = controller.__create(play , controlFns);
