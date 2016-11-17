/*common*/

/*
获取随机数

参数：
Min ，选填，默认为0
Max，选填，默认为1

*/

function random(){
	var args = arguments,
		len = args.length;
		
	if(len == 0){
		return Math.random();
	}

	var Min = (len == 2 && args[0]) || (len == 1 && 0) || 0,
		Max = (len == 2 && args[1]) || (len == 1 && args[0]) || 1;

	return (Min + Math.round(Math.random() * (Max - Min)));
};

return random;



