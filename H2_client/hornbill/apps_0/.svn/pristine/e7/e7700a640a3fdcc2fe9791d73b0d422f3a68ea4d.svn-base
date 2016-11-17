function page(){
	return this;
}
var controlFns = {
	'index' : function(id) {
		var php = {'pagebody': 'jungle::/page/body/' + id}
		this.bindDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data){
			//console.log(this.req.headers['user-agent']) //Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B466 QQ/5.9.1.405 Pixel/750 NetType/WIFI Mem/651
			//data.jQueryConflict = true
			data.use_rem_screen = true;
			this.render('page/sq.html' , data)
		})



	}
}
exports.__create = controller.__create(page , controlFns);
