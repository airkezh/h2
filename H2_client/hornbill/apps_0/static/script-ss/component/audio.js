/*common*/

var supportH5 = (function(){
	var a = document.createElement('audio');
	return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
	})()

//should be mp3
exports.init = function(audio ,opt){
	var id = opt.tag || 'reyalp'
	var audioWidget = supportH5
			? '<audio hidden=true preload="auto" id="'+id+'" autobuffer><source src="'+audio+'" /></audio>'
			: '<embed hidden=true autostart=true src="' + audio + '"></embed>'
	//		? '<audio  preload="auto" id="'+id+'" autobuffer><source src="'+audio+'" /></audio>'
	//		: '<embed autostart="true" src="' + audio + '"></embed>'
		//	:'<embed autostart=true src="'+audio+'" />'
		//	:'<bgsound  loop=1 src="'+audio+'" />'
	var control = document.createElement('div')
//	control.style.marginLeft = '-10000px'
	document.body.appendChild(control)
	if (supportH5){
		control.innerHTML = audioWidget
		var foo = document.getElementById(id)
		}
	function play(){
		if (foo) {
			foo.play()
		}else{
			control.innerHTML = audioWidget
			}
		}
	function stop(){
		if (foo){
			foo.stop
		}else{
			control.innerHTML = '' 
			}
		}
	return {'play': play ,'stop':stop}
	}
