fml.define('order_pc/order/app_pay' , ['jquery'] , function(require,exports){
  var $ = require('jquery')

  var order_id = $('#order_id').val()
  var tid = setInterval(function(){
    //和微信走同一个接口
    $.post('/aj/wx_pay/ispay',{order_id:order_id}, function(res, textStatus, xhr) {
      var status = res.status
      if(status==1){
        clearInterval(tid)
        if(order_id.length > 14){
          location.href = '/order'
        } else {
          location.href = '/order/detail/?order_id=' + order_id
        }
      }
    },'json');
  }, 2000);

  setTimeout(function(){
    clearInterval(tid);
  }, 1000 * 60 * 10);
});
