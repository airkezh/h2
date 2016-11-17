function answer(){
	return this;
}

var controlFns = {
	question : function(){
		var cid = this.readData('cid',this.req.__get, 0);
		var php = {
			answer : '/customactivity/CustomActivity_common_tool_singleNew?id=common_answer&cid=' + cid
		};
		this.setMDefault(php);
		this.bridgeMuch(php);

		function randomData(question,count){
			var map = randomData.map = randomData.map || {};
			var rtn = randomData.rtn = randomData.rtn || [];
			if(rtn.length < count){
				var rnum = parseInt(Math.random() * question.length);
				if(map[rnum]){
					question.splice(rnum,1);
				}else{
					map[rnum] = 1;
					rtn.push(question[rnum]);
				}
				return randomData(question,count);
			}else{
				return rtn;
			}
		}

		function processData(answer){
			var limit = parseInt(answer.questionInfo.limit);
			if(!isNaN(limit) && answer.question.length > limit){
				answer.question = randomData(answer.question,limit);
			}
		}

		this.listenOver(function(data){

			processData(data.answer);

			data.pageTitle = data.answer.homeInfo.title;

			data._CSSLinks = ['activity/answer/question'];
			this.render('activity/answer/question.html' , data);
		});
	},
	result : function(){
		var cid = this.readData('cid',this.req.__get, 0);
		var score = parseInt(this.readData('score',this.req.__get, 0));
		var php = {
			answer : '/customactivity/CustomActivity_common_tool_singleNew?id=common_answer&cid=' + cid
		};

		var wapMod = this.loadModel('tools.js');

		function processData(answer){
			var curShare;
			var valShare;
			var rangeShare;
			var totalScore = 100;

			var resultShare = answer.resultShare;

			for (var i = 0; i < resultShare.length; i++) {
				var keyArr = resultShare[i].key.split('-');
				if(keyArr.length == 1){
					if(keyArr[0] == score){
						valShare = resultShare[i];
						break;
					}
				}else if(keyArr.length == 2){
					var isTotal = (score == keyArr[1] && score == totalScore);
					if(score >= keyArr[0] && (score < keyArr[1] || isTotal)){
						rangeShare = resultShare[i];
					}
				}
			};

			answer.resultShare = valShare || rangeShare;
		}

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			
			processData(data.answer);

			var shareItem = data.answer.resultShare.items[0];
			
			var params = {
				'title' : shareItem.title,
				'text' : shareItem.desc,
				'pic' : shareItem.imgUrl,
				'url' : shareItem.link
			}

			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline','weixin']);

			data.pageTitle = data.answer.resultInfo.title;

			data._CSSLinks = ['activity/answer/result'];
			this.render('activity/answer/result.html' , data);
		});
	}
}

exports.__create = controller.__create(answer, controlFns);
