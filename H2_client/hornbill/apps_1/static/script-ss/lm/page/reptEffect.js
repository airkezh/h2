fml.use(['jquery', 'component/urlHandle', 'store/app/datepicker'] , function(){
	var $ = this.jquery,
		urlHandle = this.urlHandle,
		datepicker = this.datepicker;
	new datepicker('begin_time', {divId:"datepicker0",needTime:false,format:'yyyy/MM/dd'});
	new datepicker('end_time', {divId:"datepicker1",needTime:false,format:'yyyy/MM/dd'});
});

fml.define('lm/page/reptEffect' , [] , function(){});
