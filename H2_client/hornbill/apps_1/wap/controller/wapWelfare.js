function wapWelfare(){
	return this;	
}

var controlFns = {
	welfare_show : function(activity_id){
		var mSelf = this;
		var php = {
			'wlfWapDetail' : '/welfare/Welfare_wap_detail?activity_id='+ activity_id;
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			
			data.activity_id =activity_id;
			data.wlfWapDetail = data.wlfWapDetail.data;
			data.headTag = 'wapWelfare';
			data._CSSLinks = ['welfare'];
			mSelf.render("welfare/welfare_details.html" , data);	  
		});
	},
	welfare_apply : function(activity_id){
		var mSelf = this;
		var php = {
			
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.headTag = 'wapWelfare';
			data.activity_id = activity_id;
			data._CSSLinks = ['welfare'];
			mSelf.render("welfare/welfare_apply.html" , data);	  
		});
	},
	welfare_questionnaire : function(activity_id){
		var mSelf = this;
		var php = {
			'wlfWapQuestions': '/welfare/Welfare_wap_question'			
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.activity_id =activity_id;
			data.wlfWapQuestions = data.wlfWapQuestions.data;
			data.headTag = 'wapWelfare';
			data._CSSLinks = ['welfare'];
			mSelf.render("welfare/welfare_questionnaire.html" , data);	  
		});
	},
	welfare_submit : function(){
		var mSelf = this;
		var php = {
			
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.headTag = 'wapWelfare';
			data._CSSLinks = ['welfare'];
			mSelf.render("welfare/welfare_submit.html" , data);	  
		});
	},
	show_trial_report : function(){
		var mSelf = this;
		var php = {
			
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.headTag = 'wapWelfare';
			data._CSSLinks = ['welfare'];
			mSelf.render("welfare/welfare_report.html" , data);	  
		});
	}

};
exports.__create = controller.__create(wapWelfare , controlFns);
