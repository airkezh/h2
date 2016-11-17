function pc_mob_aj() {
    return this;
}
var controlFns = {
    pc_mob : function(params){
		var php = {
			'close' : '/newcomer/set_page_display'
			,'check_show' : '/newcomer/get_activity_play_status'
		}
		this.ajaxTo(php[params]);
	}
}

exports.__create = controller.__create(pc_mob_aj, controlFns);
