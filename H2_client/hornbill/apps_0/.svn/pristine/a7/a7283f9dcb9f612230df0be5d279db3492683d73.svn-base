var https = require('https');
var stringify = require('querystring').stringify;
var cookie = require(config.path.base + 'cookie.js');

function voice(){
	return this;	
}

var setAccessToken = function(http,cb){
    var cookieHandler = cookie.getHandler(http.req,http.res);

    if(cookieHandler.get('yy_token')){
        cb && cb();
        return;
    }
    var post_data = stringify({
        grant_type : "client_credentials",
        client_id : "HACrZsjMn2mOIi4mNFqIr4aK",
        client_secret : "d36d55cb200bd1953b92d77bbec9c705"
    });
    var opt = {
        host:'openapi.baidu.com',
        port:443,
        method:'POST',
        path:'/oauth/2.0/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
        }
    }
    var body = '';
    var req = https.request(opt, function(res) {
        // console.log("Got response: " + res.statusCode);
        res.on('data',function(d){
            body += d;
        }).on('end', function(){
            var data = JSON.parse(body);
            var dt = new Date;
            dt.setMonth(dt.getMonth() + data.expires_in / (1 * 60 * 60 * 24 * 30));
            cookieHandler.set('yy_token',data.access_token,dt);

            cb && cb();
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    
    req.write(post_data);
    req.end();
}

var controlFns = {
	tosay : function(){
        var self = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '语音合成';
            setAccessToken(this,function(){
                self.render('voice/tosay.html' , data);
            });
		});
	}
};

exports.__create = controller.__create(voice , controlFns);