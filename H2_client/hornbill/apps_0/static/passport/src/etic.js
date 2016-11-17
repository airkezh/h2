Passport.prototype.etic = function(tpl, data){
	tpl = tpl 
		.replace(/[\r\t\n]/g, " ")
		.split("<\?").join("\t")
		.replace(/((^|\?>)[^\t]*)'/g, "$1\r")
		.replace(/\t=(.*?)\?>/g, "',$1,'")
		.split("\t").join("');")
		.split("\?>").join("p.push('")
		.split("\r").join("\\'")

	try{
		var fn = new Function("",
			"var p=[];p.push('" + tpl + "');return p.join('');");
	}catch(e){
		if (console){
			console.log(e)
			console.log(tpl)
		}
	}

	if (data){
		try{
			return fn.apply( data )
		}catch(e){
			if (console){
				console.log(e)
				console.log(data)
				}
			}
	}else
		return fn
};
