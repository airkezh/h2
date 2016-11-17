function redpacket(){
	return this;
}
var controlFns = {
	'main' : function(){
        var cid = this.req.__get.cid || '';
		var php = {}
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.cid = cid 
            data.pageTitle     = '美丽说-千元红包领取页'
            data._CSSLinks     = [ 'redpacket' ]
            this.render( 'redpacket.html', data )
        } )
    },
    'new' : function(){
         var cid = this.req.__get.cid;
         var php = {
            'picInfo': '/customactivity/CustomActivity_common_tool_single?id=redpacket_easy&cid=' + cid
         }
         this.setMDefault( php )
         this.bridgeMuch( php )
         this.listenOver( function( data ) {
            if(!data.picInfo) return this.errorPage();
            data.use_rem_screen = true
            data.cid = cid 
            data.pageTitle     = data.picInfo.page_title || '美丽说-红包领取页'
            data._CSSLinks     = [ 'redpacket/new_redpacket' ]
            this.render( 'redpacket/new_redpacket.html', data )

        } )
    }
}

exports.__create = controller.__create(redpacket , controlFns);