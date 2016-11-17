fml.define('wap/page/nphone' , ['wap/zepto/touch'] , function(require , exports){

window.MLS = {
	'onCalendarEventActionEnd' : function(res){
      if(res.result==1){
         alert('成功');
      }
      else{
         alert('失败');
      }
	}
}
   $('.btn').on('tap',function(){
   	var a2=$('.a2').val();
   	var a3=$('.a3').val();
   	var a4=$('.a4').val();
   	var a5=$('.a5').val();
   	var a6=$('.a6').val();
   	console.log(a2+a3+a4+a5+a6);
   	var jsonParams='{"actionType":"add","eventTitle":'+'"'+a2+'"'+', "startTime":'+'"'+a3+'"'+',"endTime":'+'"'+a4+'"'+',"alarmOffset":'+'"'+a5+'"'+',"recurrenceType":'+'"'+a6+'"'+'}';
	window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(jsonParams);
	})

   $('.btn2').on('tap',function(){
      var a2=$('.a2').val();
      var a3=$('.a3').val();
      var a4=$('.a4').val();
      var a5=$('.a5').val();
      var a6=$('.a6').val();
	var jsonParams='{"actionType":"remove","eventTitle":'+'"'+a2+'"'+'}';
	window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(jsonParams);
	})
});

