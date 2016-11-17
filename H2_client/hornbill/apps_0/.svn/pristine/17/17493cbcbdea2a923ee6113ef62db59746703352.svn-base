fml.use('app/eventHover' , function(){
	this.hoverShow('.clear_box li' , '.arrow');
	this.hoverShow('.list_box div' , '.add_menu_leo');
});
fml.use(['app/doota/tab','jquery'] , function(){
	var $ = this.jquery
	var tle_ico = $('.tle_ico li')
		,con = $('.con li')
	this.tab.bind({
		'tagPnl' : '.list_box .add_menu_leo'
		,'tabTag' :'li>a'
		,'index' : 0
		,'onActive' : function(_pre , _index){
			tle_ico.hide().eq(_index).show()
			con.hide().eq(_index).show()
			}
		})
	})

