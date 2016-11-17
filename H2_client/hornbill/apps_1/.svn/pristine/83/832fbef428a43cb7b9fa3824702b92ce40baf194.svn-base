function welcome(){
	return this;
}
var controlFns = {
	'_index' : function() {
		this.download();
	},
	download: function() {
        var php = {};
        var wapMod = this.loadModel('tools.js');
        var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res));
        var mlsApp = os.mlsApp;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.mlsApp = mlsApp;
            data.onlyShowGoTop = true
            data._CSSLinks = [ 'download' ]
            this.render( 'download.html', data )
        })
    }

}
exports.__create = controller.__create(welcome , controlFns);
