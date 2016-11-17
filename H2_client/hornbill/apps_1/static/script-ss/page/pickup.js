/*common*/
	var $ = require("jquery");
	$pickuptool = $(".pickup_tool");
	$pickuptool.click(function(){
		// alert(location.hostname)
		if(location.hostname.indexOf("meilishuo.com")>0){
			alert("你就在美丽说呢,不能采集本站哦!")
			return false;
		}
	})