var controlFns = {
	'index' : function(id){
		if(!id) return this.errorPage()
		
		var php = {
			'rapid':'jungle::/pine/data/?id='+id
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.rapid.code!==0) return this.errorPage();
			if(data.rapid.data.plat!='wap') return this.errorPage();
			var rapidData = data.rapid.data;
			data.XR = true
			data.pageTitle = rapidData.pageTitle

			/*--start--客户端分享---*/
			if(rapidData.needWxShare && rapidData.wxShareInfo){
				var wapMod = base.loadModel('wap/tools.js')
				var param = {
					'title' : rapidData.wxShareInfo.wxshare_title||'',
					'text' : rapidData.wxShareInfo.wxshare_desc||'',
					'pic' : rapidData.wxShareInfo.wxshare_imgurl||'',
					'url' : rapidData.wxShareInfo.wxshare_link||''
				};
				data.share = wapMod.shareTo(this.req , param, false);
			}
			/*--end--客户端分享---*/

			data._CSSLinks = ['rapid'];
			data.use_rem_screen = true
			this.render('rapid.html' , data);
		})
	}
}
exports.__create = controller.__create(new Function() , controlFns);
