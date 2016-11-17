function freeze_aj() {
    return this;
}
var controlFns = {
    index : function(params){
    	// this.debugSnake({'target':'maoanli.rdlab'});
		var php = {
			'apply_unfreeze' : '/risk/user_apply_unfreeze'
			,'userReset' : '/user/find_pass_reset'
			,'captcha' : '/user/Find_pass_validate_sm_captcha'
		}
		this.ajaxTo(php[params]);
	},

    hd_dongfeng: function (params) {
        var php = {
            'addNewVote':'/huodong/Dongfeng_Ballot3'
        }
        this.ajaxTo(php[params])
    }

}

exports.__create = controller.__create(freeze_aj, controlFns);
