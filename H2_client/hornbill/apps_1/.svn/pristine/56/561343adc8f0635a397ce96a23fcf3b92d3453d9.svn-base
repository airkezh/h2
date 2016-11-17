var http = require('http')
/*test*/
function r(){
	return this;	
}
function httpGet(url , onSuccess, onErr , res){
		http.get(url , function(response) {
			if (200  != response.statusCode) return onErr && onErr() 
			if (res){
				return response.pipe(res)
				}
		    var result = '';
			response.on('data', function (chunk) {
				result += chunk;
				}).on('end' , function(){
				try{
					result = JSON.parse(result)
					result = result.list || result.data
	
				}catch(err){
					result = false
				}
				result ? onSuccess(result) : (onErr && onErr())

				})

			}).end()

	}
var cache
var controlFns = {
	'scrash-card' : function(){
		var mSelf = this
		function onErr(err){
			mSelf.res.end(err || 'oops~')
		}
		if (this.req.__get.readUrl){
			httpGet(this.req.__get.readUrl , null ,null,this.res)
			return
		}
		if  (!this.req.__get.newImg){
			var data = {
				//img : '?readUrl='+ encodeURIComponent(img)
				'JCSTATIC_BASE' : config.site.JCSTATIC_BASE 
				,'SVERSION' : config.site.SVERSION
				}
			
			mSelf.render('r/scrash_card.html',data)
			
			}
		if (cache){
			render(cache)
			return
		}
		var pn = Math.floor(Math.random()*100)
		var rn = Math.floor(Math.random()*30) + 50
		var d = 'http://image.baidu.com/channel/listjson?fr=channel&tag1=%E7%BE%8E%E5%A5%B3&tag2=%E5%86%99%E7%9C%9F&sorttype=0&pn='+pn+'&rn='+rn+'&ie=utf8&oe=utf-8&app=img.browse.channel.general&1388653549048'

		//var d = 'http://image.so.com/zj?ch=beauty&sn='

		function render(result){
			if (!cache){
				cache = result
				setTimeout(function(){
					cache = null
					},60000 * 5)
			}
			var img = result[Math.round(Math.random() * result.length)]
			img = img.cover_imgurl || img.download_url
			return mSelf.res.end(img)
			}
		httpGet(d , render ,onErr)
		}
	,puzzle : function(){
		var data = {
			'JCSTATIC_BASE' : config.site.JCSTATIC_BASE 
			,'SVERSION' : config.site.SVERSION
			}
		this.render('r/puzzle.html' , data)
		}
	,svg : function(){
		var data = {
			'JCSTATIC_BASE' : config.site.JCSTATIC_BASE 
			,'SVERSION' : config.site.SVERSION
			}
		this.render('r/svg.html',data)
		}
}
exports.__create = controller.__create(r , controlFns);
