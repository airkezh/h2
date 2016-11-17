var sys = require('sys');
var fs = require('fs');
var path = require('path');
var prompt = require('./prompt.js');
var runConfig = require('./runConfig');

var print = prompt.print;
var next = prompt.next;

var config = {};

var action = {
	'proPath': proPath,
	'proPort': proPort,
	'proDomain': proDomain,
	'end': end
}

function proPath(to) {
	if (!to) {
		print('请输入项目所在目录！');
		return;
	}
	to = path.resolve(to);
	if (!fs.existsSync(to)) {
		print('项目路径不存在，请重新输入！');
	} else {
		if (to.substr(-1) == '/') {
			to = to.substr(0, -1);
		}
		config.to = to;
		config.nest = to + '/nest';
		config.apps = to + '/apps';
		next();
	}
}

function proPort(port) {
	if (!port) {
		print('请输入端口号，- 表示默认，r 表示随机');
		return;
	}
	config.port = port;
	next();
}

function proDomain(domain) {
	if (!domain) {
		print('请配置你的访问域名，如 \nygm www \nm.ygm wap \n输入 n 进行下一步');
		return;
	}
	if (domain == 'n') {
		next();
		return;
	}
	config.domain = config.domain || {};
	domain = domain.trim().replace(/\s+/g, ' ').split(' ');
	config.domain[domain[0]] = domain[1];
	print(config.domain);
	print('继续输入或输入 n 进行下一步');
}

function end() {
	runConfig.init(config);
}

var start = function() {
	print('请输入项目所在目录！');
	prompt.init(action);
}

var checkIp = function(){
	runConfig.checkIp();
}

var arg = process.argv.splice(2);

if(arg[0] === 'checkip'){
	checkIp();
}else{
	start();
}

