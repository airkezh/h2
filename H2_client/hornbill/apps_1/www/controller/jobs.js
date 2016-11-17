function jobs(){
	return this;
}

var controlFns = {
	'index' : function (){
		this.campus_welcome();
	},
	'campus_recruitment' : function (){
		var php ={
			'job_info' : '/hiring/CampusJobList'
		};
		var mSelf = this;
		//this.debugSnake({'target':'devlab1'});
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data._CSSLinks = ['jobs/campus_recruitment'];
			mSelf.render('jobs/campus_recruitment.html',data);
		});
	},
	'campus_welcome' : function (){
		var php ={};
		var mSelf = this;
		//this.debugSnake({'target':'devlab1'});
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data._CSSLinks = ['jobs/campus_welcome'];
			mSelf.render('jobs/campus_welcome.html',data);
		});
	}
};

exports.__create = controller.__create(jobs, controlFns);