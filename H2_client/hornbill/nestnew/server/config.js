var path = require('path')
	,fs = require('fs')
	,querystring = require('querystring')
var cPath = require ('./config/path.json')

exports.path = cPath;
exports.session = require ('./config/session.json'); 
    

exports.site = require ('./config/site.json'); 

exports.etc = require ('./config/etc.json') 
exports.api = require ('./config/api.json'); ;

var db = {
	mysql : null,
	mongo : null
}
if (fs.existsSync('./config/db.json')) {
	db = require ('./config/db.json')
}

if (fs.existsSync('./config/dbini.json')) {
	var dbini  = require ('./config/dbini.json')
	if (dbini.mongo) {
        db.mongo = dbini.mongo
    }
	if (dbini.mysql) {
		var ini = fs.readFileSync(dbini.mysql).toString().split("\n")	
		var mysql = {
			master : []
			,slave : []
		}
		ini.forEach(function(set){
			set = set.trim()
			if ('#' == set[0]) return
			set = querystring.parse(set, ' ')
			if (dbini.mysqlbase && dbini.mysqlbase != set.db) return

			set.password = set.pass
			set.database = set.db
			
			if (1 == set.master) mysql.master.push(set)
			else mysql.slave.push(set)

		})

		db.mysql = {
			master : getSet.bind(null , mysql.master) 
			,slave : getSet.bind(null , mysql.slave) 

			}
		function getSet(sets){
			if (1 == sets.length) return sets[0]
			return sets[Math.floor(Math.random() * sets.length)]
		}
	}
}

exports.db = db
exports.virtualHost = require('./config/virtual_host.json'); 


exports.setAbsPath = function (webRoot) {
	webRoot += '/';
	for (var p in cPath){
		if ('appPath' == p || 'views' == p || 'model' == p || 'controller' == p){
			continue
			}
		if (p != 'webRoot' && cPath[p][0] != '/') {
			cPath[p] = webRoot + cPath[p];
			}
		}
	if (cPath.appPath) cPath.appPath = path.resolve(cPath.appPath) + '/' 
	else cPath.appPath = ''
	cPath.webRoot = webRoot;
	
}
