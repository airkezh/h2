var sys = require('sys');
var fs = require('fs');
var path = require('path');
var http = require('http');
var exec = require('child_process').exec;

var config;
var lastConfig;
var tmpName = './tmp';

function print(){
	console.log.apply(console , arguments);
}

function httpGet(action, cbk, onFail) {
	var serve = 'http://192.168.128.13:2016/';
	var req = http.get(serve + action, function(res) {
		if (200 != res.statusCode) return print(action + ' 失败') && onFail && onFail(res.statusCode);
		var ret = '';
		res.on('data', function(chunk) {
			ret += chunk;
		}).on('end', function() {
			cbk && cbk(ret);
		})
	})
	req.on('error', function(e) {
		onFail && onFail(e);
	});
}

function copyConfig(next) {
	print('初始化配置中。。。');
	var tmp = config.nest + '/tmp/';
	var node_modules = config.nest + '/node_modules/';

	!fs.existsSync(tmp) && fs.mkdirSync(tmp);
	!fs.existsSync(node_modules) && fs.mkdirSync(node_modules);

	var todo = ['cp ./_lib/* ' + node_modules,
		'cd ' + node_modules,
		'tar zxvf less.tar.gz',
		'tar zxvf uglify.tar.gz'
	].join('&&');

	exec(todo, function(error) {
		if (error) {
			print(error);
			return;
		}
		print('配置完成。');
		next();
	});
}

function updateConfig(path, key, val) {
	path = (config.nest || lastConfig.nest) + path;
	var obj = require(path);

	if ('object' == typeof key) {
		for (var k in key) {
			obj[k] = key[k];
		}
	} else {
		obj[key] = val;
	}

	fs.writeFileSync(path,JSON.stringify(obj, null, 4));
}

function proxyConfig(next) {
	var port = require(config.nest + '/server/config/etc.json').onPort;
	if (config.port == 'r') {
		port = Math.random() * 1000 | 0 + 6000;

		var uri = 'http://' + config.ip + ':' + (port + 1) + '/';
		updateConfig('/server/config/site.json', {
			'JCSTATIC_BASE': uri,
			'M_JCSTATIC_BASE': uri
		});
		updateConfig('/server/config/etc.json', 'onPort', port);
		updateConfig('/jserver/config/service.json', 'onPort', port + 1);
	}
	config.port = port;
	var hostParam = [],
		vhost = require(config.nest + '/server/config/virtual_host.json');
	for (var key in config.domain) {
		hostParam.push('host=' + key);
		vhost[key + '.fedevot.meilishuo.com'] = config.domain[key];
	}

	updateConfig('/server/config/virtual_host.json', vhost);

	//暂时不管删除host功能
	httpGet('host?port=' + port + '&ukey=' + config.macip + '&' + hostParam.join('&'), function() {
		print('代理更新完成。');
		next();
	});
}

function getIp(next) {
	httpGet('ip', function(ip) {
		config.ip = ip;
		print('ip 获取完成。');
		next();
	});
}

function getMacIp(next) {
	exec("ifconfig en0| grep ether| awk '{print $NF}'", function(err, macip) {
		if (err) {
			print('mac 获取失败');
			process.exit();
		}
		config.macip = macip.trim();
		print('mac 获取完成。');
		next();
	});
}

function checkIp(next){
	lastConfig = fs.readFileSync(tmpName,'utf-8');
	lastConfig = JSON.parse(lastConfig);
	if(lastConfig.ip == config.ip){
		print('ip 无变化');
		process.exit(0);
	}else{
		lastConfig.ip = config.ip;
		fs.writeFileSync(tmpName,JSON.stringify(lastConfig, null, 4));
		next();
	}
}

function updateIp(next){
	httpGet('update?ukey='+lastConfig.macip,function(data){
		try {
			data = JSON.parse(data);
			if(data.updated){
				var userPort = require(lastConfig.nest + '/server/config/etc.json').onPort;
				var js = 'http://'+ data.ip + ':' + (userPort + 1) + '/';
	    		updateConfig('/server/config/site.json' , {'JCSTATIC_BASE' : js, 'M_JCSTATIC_BASE' : js });
				print('ip 已改变,已完成更新');
				process.exit(0);
			}
		}catch(err){
			print(err);
		}
	});
}

function end() {
	var todo = 'cd ' + config.nest + '/cmd && ./service2.sh restart';
	var handle = exec(todo);
	handle.on('exit', function (err) {
		if (err) return print(err);
  		print('================================================');
		print('配置完成,重启请执行\ncd ' + config.nest + '/cmd && ./service2.sh restart');
		print('环境访问,如 域名配置ygm www\n则访问 ygm.fedevot.meilishuo.com');
		print('good luck！');
		fs.writeFileSync(tmpName,JSON.stringify(config, null, 4));
		process.exit();
  	});
}

function queue(arr) {
	function fire() {
		arr.length && arr.shift().call(null, next);
	}

	function next() {
		fire();
	}
	next();
}

exports.init = function(cfg) {
	config = cfg;
	queue([copyConfig, getIp, getMacIp, proxyConfig, end]);
}

exports.checkIp = function(cfg){
	config = cfg || {};
	queue([getIp,checkIp,updateIp]);
}


