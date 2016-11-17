fml.define('app/doota/timedown',['jquery'] , function(require , exports){
	var heartBeatStack = {}

	function heartBeat(fn , ttl){
		if (! (ttl in heartBeatStack)){
			heartBeatStack[ttl] = [] 
			function beat(t ,times){
				//if (times> 5) return //pause
				if (!(t in heartBeatStack) ) return 
				window.setTimeout(function(){beat(t , ++times)} , t)
				if (!times) return
				for (var i = heartBeatStack[t].length-1; i >=0 ;i--){
					heartBeatStack[t][i]()	
					}		
				}
			beat(ttl , 0)
			}	
		heartBeatStack[ttl].push(fn)
		}
	function heartBeatStop(fn ,ttl){
		var stack = heartBeatStack[ttl]
		if (!stack) return
		for(var i = 0 ; i < stack.length; i++){
			if (stack[i] == fn){
				stack.splice(i,1)
				break
				}
			}
		if (! stack.length) delete heartBeatStack[ttl]
		}

	exports.down = function (pnl , remains ,format, formatUnit ){
		pnl = $(pnl)
		remains *= 1000 

		var ttl = 1000
			,step = 1000
		format = format || '0d-0h-0i-0s'
		formatUnit = formatUnit || ['年','月','天','小时','分','秒']
		var onTimeOver
			,onAction

		
		format = format.split('-')
		formatUnit = formatUnit.slice(-format.length)


		for (var i = 0 ;i< formatUnit.length;i++){
			if (formatUnit[i].indexOf('%v') <0 ) formatUnit[i] = '%v' + formatUnit[i]
			}

		var formatSeq = ['x','e' ,'s','i','h','d','m','y']
			,_FSU = {'x':1,'e':100 , 's': 10 ,'i':60 , 'h':60, 'd':24 ,'m':30 ,'y':12  }

		var _FLL 
		var _FND = {}
			,_FS = []
		for (var i = 0 ; i < format.length ; i++){
			var _foo  = format[i].slice(-1)
				,  _f = _foo.toLowerCase()
			_foo = _foo == _f
			if (!i) _FLL = _f
			_FS.push(_f)
			_FND[_f] = {
				'prev' : i< format.length- 1 ?format[i+1].slice(-1): null
				,'pos' : i
				, 'des': {
					'withZero' : format[i].charAt(0) == '0'
					,'hiddWhileZero' :_foo
					} 
				}
			
			}

			
		function getRemainShow(){
			var _c = {} 
			var _r = remains
				,_div = 1
			for (var i = 0 ; i < formatSeq.length; i ++){
				var _fc = formatSeq[i]

				_div *= _FSU[_fc] 
				if (!_FND[_fc]) continue;
				var _t = _r
				_r = Math.floor( _r / _div)
				_c[_fc] = _r
				if (_FND[_fc].prev)
				_c[_FND[_fc].prev] = _t - _r* _div
			
				_div = 1
				//console.log(_fc, _FND[_fc].prev ,_r,_div)
				if (_fc == _FLL) break;
				}
			return _c
			}
		function getShowTxt(_c){
			var ret = ''
			var t = 0
			for (var i = 0 ; i < _FS.length;i++){
				var v = _c[_FS[i]]
					,des = _FND[_FS[i]].des
				t = Math.max(t , v)
				if (!t && des.hiddWhileZero) continue 
				if (v < 10 && des.withZero) v = '0'+ v
				ret +=   formatUnit[i].replace('%v',v)
				}
			//console.log(_c ,ret)
			return ret
			}
		function getChged(pret , t){
			if (!pret) return t
			var ret = {}
			for (var i = 0 ; i < _FS.length;i++){
				var k = _FS[i]
				if (pret[k] != t[k]) ret[k] = t[k]
				}
			return ret
			}
		
		var pre_ret
		function init(){
			if (remains <=0 ){
				onTimeOver && onTimeOver()
				heartBeatStop(init , ttl)
				return
			}
			var ret = getRemainShow()
			if (onAction){
				//return changed / oldtime / nowtime/ formatFunction
				onAction(getChged(pre_ret , ret) ,pre_ret , ret , getShowTxt)
			}else{
				pnl.html(getShowTxt(ret));
			}
			remains -= step
			pre_ret = ret
		}
		//init()
		if ( pnl.length){ 
			// heartBeat(init , ttl)
			window.setTimeout(function(){
				heartBeat(init , ttl)
			},16)
		}
		//init()

		return {
			setHeartHum : function(p){

				ttl = p
				step = p

				return this
				},
			heartBeat : function(p){
				if (p){
					ttl = p * 1000
					step = ttl
					//step = p 
				}else
					return ttl
				return this
				}
			,onTimeOver : function(cbk){
				onTimeOver = cbk
				return this
				}
			,onAction : function(cbk){
				onAction = cbk
				return this
				}
			}
		}
	})
