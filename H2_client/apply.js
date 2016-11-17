

var sys = require('sys')
	,fs = require('fs')
	,path = require('path')
	,exec = require('child_process').exec
	,http = require('http')

var prom = require('./prompt.js')
var print = prom.print

var userInpt ={}
var action = {
		'hPath' : hPath 
		,'hPort': hPort
		,'hDomain' : hDomain
		,'reConfig': reConfig
		}
prom.init(action)

function httpGet(action , cbk , onFail){
	var _serve = 'http://192.168.128.13:2016/'
	var req = http.get(_serve + action  , function(res){
		if (200 != res.statusCode)  return print(action+ ' 失败') && onFail && onFail(res.statusCode)
			var ret = ''
			res.on('data', function (chunk) {
					ret += chunk
				}).on('end' ,function(){
					cbk && cbk(ret)
				})
		})	
	req.on('error' , function(e){
		onFail && onFail(e)
		})
	}

var ip
	,macIp
httpGet('ip' ,  function(mip){
	ip = mip
	})

exec("ifconfig en0| grep ether| awk '{print $NF}'" , function(err, stdout){
	if (err) {
		print('mac 获取失败')
		process.exit()
		}
	macIp = stdout.trim()	
	})

function update(){
	print('update ip to server')
	httpGet('update?ukey='+macIp , function(R){
		try {
			R = JSON.parse(R)
			var userPort = require(userInpt.path + '/server/config/etc.json').onPort
			var js = 'http://'+ ip + ':' + (userPort + 1) + '/'
        	updateConfig('server/config/site.json' , {'JCSTATIC_BASE' : js, 'M_JCSTATIC_BASE' : js } )
		} catch (err){
			return print(err)
			}
		print('ip update to ' + R.ip)
		print(R.updated)
		process.exit()
		
		})
	
	}
function reConfig(){
	if ('-' == userInpt.port) userInpt.port = false
	if (userInpt.port && ('random' == userInpt.port || 'r' == userInpt.port )){
		userInpt.port = Math.random()*1000 | 0 + 6000
		}
	userInpt.path += '/'

	//print(userInpt)
	print('ip:', ip,'mac:' , macIp)

	//update port
	if (userInpt.port) {
		userInpt.port = userInpt.port | 0 
		// server/config/etc.json  onPort
		// server/config/site.json JCSTATIC_BASE M_JCSTATIC_BASE
		// jserver/config/service.json onPort
		updateConfig('server/config/etc.json' , 'onPort' , userInpt.port)
		updateConfig('jserver/config/service.json' , 'onPort' , userInpt.port + 1)
		var js = 'http://'+ ip + ':' + (userInpt.port + 1) + '/'
		updateConfig('server/config/site.json' , {'JCSTATIC_BASE' : js, 'M_JCSTATIC_BASE' : js } )
	}else{
		userInpt.port = require(userInpt.path +'server/config/etc.json').onPort
		}

	//update virtual_host
	var d = []
		,rm = false
		,vhost = require(userInpt.path +'server/config/virtual_host.json')
	for (var domain in userInpt.domain){
		if ('ip' == domain) domain = ip
		if ('d' == userInpt.domain[domain]) {
			rm = true
			}
		d.push('host='+domain)

		var hfolder = userInpt.domain[domain]
		domain += '.fedevot.meilishuo.com'

		if (rm)
			delete vhost[domain]
		else
			vhost[domain] = hfolder 
		}

	if ( ! (ip in userInpt.domain) ) vhost[ip] = 'mls.com'
		

	if (rm) d.push('rm=1')
	d = d.join('&')

	httpGet('host?port='+ userInpt.port +'&ukey='+macIp+'&'+d , function(R){
		if (R){
			try {
				R = JSON.parse(R)
				for (var domain in userInpt.domain){
					domain += '.fedevot.meilishuo.com'
					var t = R[domain]
					print(domain + ':' , t || '')
					}
			}catch(err){
				print (err)
				}
			}
		console.log(vhost)
		updateConfig('server/config/virtual_host.json' , vhost )
		restart()
		})

	function restart(){
		//restart
		var todo = 'cd '+ userInpt.path + 'cmd && ./service2.sh restart'
		print(todo)
		print ('open http://%s:%s/' ,ip , userInpt.port)
		exec(todo , function(err){
			if (err) return print (err)
			process.exit()
			})
	}

}
function updateConfig(cf ,key  ,val){
	var cf = userInpt.path + cf 
	var c1 = require(cf)
	if ('object' == typeof key){
		for (var k in key) {
			c1[k] = key[k]
			}
	}else {
		c1[key] =  val
		}
	var backup = fs.readFileSync( cf)
	try{
		fs.writeFileSync(cf , JSON.stringify(c1 ,null , 4))
	}catch(err){
		print(err)
		fs.writeFile(cf , backup)
		}
	}
function hDomain(domain){
	//read virtual_host
	var virtual_host = require(userInpt.path + '/server/config/virtual_host.json')
	if (!domain){
		print(virtual_host)
		return print('请选择域; 比如: \n www \n wdev wap \n wdev d;\n输入esc 结束')
		}
	if (!userInpt.domain) userInpt.domain = {}
	if ('esc' != domain &&  "\u001b" != domain){
		domain =  domain.replace(/ +/g,' ').split(' ')
		if (!domain[1]){
			//match  local ip 
			domain = [ip , domain[0]] 
			}
		userInpt.domain[domain[0]] = domain[1].trim()
		print (userInpt.domain)
		print ('继续输入或者  输入esc 结束')
	}else {
		prom.next()
		}
	
	}
function hPort(port){
	if (!port) return print('请输入端口号 ,random 随机,- 保留原端口,update 更新 IP')
	if ('update' == port) return update()
	userInpt.port = port
	prom.next()
	
	}
function  hPath(to){
	if (to) to =  path.resolve(to)
	if (!to || !fs.existsSync(to)) return print('请输入 hornbill 顶层目录')

	userInpt.path = to + '/nest/'
	prom.next()
	}
hPath()

