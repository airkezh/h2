function ja(){
	return this;
}
var controlFns = {
	proxy : function(){
        this.res.write('<script>')
        this.res.write('parent.' +this.req.__get['__callback'] + '('+ JSON.stringify(this.req.__get.data)+')')
        this.res.write('</script>')
        this.res.end()
        },
	topic : function(params) {
        var php = {
            'create' : '/topic/Topic_add_twitter'
        };
        this.ajaxTo(php[params]);
    },	
	twitter : function(params) {
		var php = {
			'verify' : '/twitter/verify'
	//		,'fetch' : '/twitter/fetch'
	//		,'pick' : '/twitter/pick'
	//		,'create' : '/twitter/create'
		};
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(ja , controlFns);
