/*common*/


var _cbk_stacks = {}
    ,_cbk_id = 0
	,actions = {}
function send(msg , cbk ){
    if (cbk){
        var id = new Date().getTime().toString(36) + '.'+ (++_cbk_id).toString(36)
        _cbk_stacks[id] = cbk
        msg.cbk = id
        }

    window.postMessage(msg , window.location.href)
    //window.postMessage({'child' :msg} , window.location.href)
}

if(fml.vars.im && fml.vars.im.imClient){

window.addEventListener("message", function(event){
	var eventData = event.data
	//if (!('lord' in eventData)) return
	//eventData = eventData.lord
	if ('file://' !== event.origin) return
    console.log('child receive' ,eventData)
	if ('cbk' in eventData){
		eventData = eventData.cbk
		var cbk = _cbk_stacks[eventData.id]
		if (cbk) {
			cbk(eventData.errs , eventData.data)
			delete _cbk_stacks[eventData.id]
			}

		delete eventData.cbk
		}
	for (var k in eventData){
		if (!(k in actions ) ) continue
		var ret = eventData[k]
		actions[k].forEach(function(act){
			act(ret)
			}) 	
		}

    $('#debug').html( $('#debug').html() + '<pre>'+ JSON.stringify(eventData) + '</pre>' )
    }, false);
}

exports.send = send
exports.on = function(act , cbk){
	if (! (act in actions))  actions[act] = [] 
	actions[act].push(cbk)	
	}
exports.off = function(act){
	delete actions[act]
	}
