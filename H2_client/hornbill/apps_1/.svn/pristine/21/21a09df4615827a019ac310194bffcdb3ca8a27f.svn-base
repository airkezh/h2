function massivevoice(){
	return this;
}
var controlFns = {
	'dress' : function(params){
		var mSelf = this,
			php = {
				'all': '/customactivity/CustomActivity_wap_voice'
			};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.audio = {audio:{}};
			data.audio.audio.audio_url = 'http://d02.res.meilishuo.net/audio/64611c98954926f549aeba350e62058d.c1.mp3';
			data.audio.audio.audio_duration = '56';
			data.pageTitle = '夏日显瘦连衣裙';
			data._CSSLinks = ['activity/massivevoice'];
			mSelf.render('activity/massivevoice/massivevoice.html' , data);
		});
	}
}
exports.__create = controller.__create(massivevoice , controlFns);