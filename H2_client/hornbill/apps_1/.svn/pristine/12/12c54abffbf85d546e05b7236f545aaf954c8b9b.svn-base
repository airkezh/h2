/*common*/
require('wap/zepto');
require('wap/zepto/fastclick');
if(Meilishuo.config.user_id){
  $('.login_go').hide();
  $('.number_content').show();
  setTimeout(function(){
  $('.go_share').show()
  },2000)
}
$('.sign_btn').click(function(event) {
	window.location.href = "/download/latest/wap?channel=30920";
});
$('.login_btn').click(function(event) {
  window.location.href = "/user/login";
});
$('.go_share').on('click', function(){
  $(this).hide();
})
