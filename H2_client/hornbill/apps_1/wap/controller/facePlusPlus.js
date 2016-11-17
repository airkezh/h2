function facePlusPlus() {
	return this;
}
var controlFns = {
	index: function(params) {
		var _this = this
		var http = require('http');
		http.get("http://apicn.faceplusplus.com/v2/detection/detect?api_key=c50579ed735edc566adb52c070768eab&api_secret=1sE-VDpLBL9jCX52vOm0PmWnylHLqRTn&url=http%3A%2F%2Fd04.res.meilishuo.net%2Fpic%2F_o%2F7a%2F76%2Fdda50cf3f0eeb59a8e6f6ec6be02_1500_1000.ch.jpg&attribute=gender%2Cage&callback=jsonp1", function(res) {
			var body = ''
			res.on('data', function(chunk) {
				body+=chunk
			});
			res.on('end', function() {
				_this.res.write(body.replace('jsonp1(','').replace(');',''))
				_this.res.end();
			});　　
		})
	}
};
exports.__create = controller.__create(facePlusPlus, controlFns);