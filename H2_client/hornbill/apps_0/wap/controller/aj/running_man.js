var controlFns = {
	barrage: function(params) {
		var php = {
			'get' : '/customactivity/customActivity_barrage_get'
			,'store' : '/customactivity/customActivity_barrage_store'
		}
		this.ajaxTo(php[params])
	}
	,vote:function(params) {
		var php = {
			'store' : '/customactivity/customActivity_runner_vote'
			,'phone' : '/customactivity/customActivity_huodong_phone'
		}
		this.ajaxTo(php[params])
	}
	,vote_shake:function(params){
		var php = {
			'vote' : '/customactivity/customActivity_runner_vote?actname=shake'
			,'phone' : '/customactivity/customActivity_huodong_phone?actname=shake'
		}
		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(new Function(), controlFns);