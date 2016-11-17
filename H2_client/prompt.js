function print(){
	console.log.apply(console , arguments)
	}

var step  
    ,_lstStp
    ,_onConfirmInput
    ,_secret

var action , step_keys
	,step_index = 0

function confirmDo(input){
	if (!_onConfirmInput || ! _onConfirmInput[input] ) return print(_lstStp + ' 输入未响应')
		
	_onConfirmInput[input]()
	}

function toConfirm(tip , onY , onN){
	_lstStp = step
	step = '_confirm'
	print(tip , '确认 y ,取消 n')
	if ('function' != typeof onY) 
		_onConfirmInput = onY
	else 
 		_onConfirmInput = {
			'y' : onY
			,'n' :onN 
			}
	}

var stdin = process.openStdin()

process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.setRawMode(false)

var userInput = ''
process.stdin.on("data", function(input)    {
	///console.log('input:' ,input ,'user:' , userInput)
	if (!_secret) {
		userInput = input
		onInput()
		return
		}
	input = input + ""
	function onInput(){
			userInput = userInput.toString().trim()
			if (step in action)
				action[step](userInput)
			else
				print('enter:' ,userInput)
			userInput = ''
		}
	switch (input) {
		case "\n": case "\r": case "\u0004":
			//process.stdin.setRawMode(false)
			print('\n')
			onInput()
			break
		case "\u0003":
			// Ctrl C
			print('Cancelled')
			process.exit()
			break
		default:
			if (_secret) {
				process.stdout.write('*')
				userInput += input 
			}
			//process.stdout.write(_secret ? '*' : input)
			break
		}
	})

exports.print = print
exports.toConfirm = toConfirm

exports.next = function(secret ){
	process.stdin.setRawMode(secret)
	step_index++
	step = step_keys[step_index]
	if (step){
		action[step] && action[step]()
		_secret = !!secret
	}else{
		process.stdin.resume()

		}
	}
exports.init = function (actMap , firstStep){
	action = actMap
	action._confirm = confirmDo
	step_keys =  Object.keys(action)
	step = step_keys[firstStep || step_index]
	}
