fml.use(['component/windowScroll' , 'component/position', 'component/iStorage'] , function(){
	var scroll = this.windowScroll;
	var position = this.position;
	var is6 = $.browser.msie && $.browser.version=='6.0';
	var nag = $('.wrap-right');
	var nags = $('#navbar');
	var top = $('.main .up').offset().top;
	var nagheight = nag.height();
    var lt30 = is6? function(){
	      nag.css({'position':'absolute','top' : top + 'px', 'left' : '50%', 'margin-left' : '331px'});
	      scroll.unBind('leftfloat');
	     } : function(){
	      nag.css({'position':'static', 'margin-left' : '4px'});
         };
    var gt30 = is6? function(pos){
         nag.css({'position':'absolute', 'left' : '50%', 'margin-left' : '331px', 'top':pos + nags.height()  + 'px','z-index':100});
         scroll.bind(function(pos){
             nag.css({'top':pos + nags.height() + 'px'});
	           },'leftfloat');
        }:function(){
			nag.css({'position':'fixed' , 'left' : '50%', 'top': nags.height() + 'px', 'margin-left' : '331px'});
			};
    lt30();
    var nagMt = nags.offset();
    if (nagMt) scroll.yIn( nagMt.top , gt30, lt30);
});
fml.define('page/huodong/meili99sed' , [] , function(){});