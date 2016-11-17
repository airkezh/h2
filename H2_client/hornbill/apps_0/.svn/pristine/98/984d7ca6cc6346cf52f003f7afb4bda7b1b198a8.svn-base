function shake(){
	return this;
}

var controlFns = {}
var configs = {
	'runningmanTV' : {
		'test' : {
			'php':{
				'info' : '/weixin/weixin_running_assort_activity'
			},
			'images' : {
				background:'http://d05.res.meilishuo.net/pic/_o/17/c3/962938e3492a5307bb8367c00095_640_1008.cf.jpg',
				border:'http://d01.res.meilishuo.net/pic/_o/a5/87/30afcf3a3fda3d210c39eda42909_532_475.ch.png',
				redultbtn:'http://d03.res.meilishuo.net/pic/_o/5d/73/b1aea17f6fe4e2f356ab0aeb09a4_489_70.ch.png',
				logo:'http://d03.res.meilishuo.net/pic/_o/39/14/f8859f6c8a6fe9ef24323e4d0f27_640_128.cf.png',	
				link:'http://d05.res.meilishuo.net/pic/_o/11/00/4ea506b129805baf8738ff33e7bf_347_36.cg.png'
			}
		},
		'result' : {
			'php':{
				'info' : '/weixin/weixin_running_gifts'
			}
		}
	}
}

for(var name in configs){
	(function(name){
		controlFns[name] = function(args){
			args = args || 'index'
			var mSelf = this;
			var config = configs[name][args]
			var php = config.php || {};

			this.setMDefault(php);
			this.bridgeMuch(php);
			this.listenOver(function(data){
				data.info = data.info || {}
				console.log(data.info)

				data.name = name 
				data.state = args 
				data.images = config.images || {}

				if(args == 'index'){
					data._CSSLinks = []

				}else{
					data._CSSLinks = ['shake/default']
					config.css && data._CSSLinks.push('shake/'+name)
				}

				data.pageTitle = '看电视,玩微信摇电视';
				this.render('shake/' + data.state + '.html',data);
			});
		}
	})(name);
}

exports.__create = controller.__create(shake , controlFns);
