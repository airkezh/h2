fml.use(['component/windowScroll','jquery' , 'component/position'] , function(){
    var $ = this.jquery;
    var scroll = this.windowScroll;
	var position = this.position;
    var is6 = $.browser.msie && $.browser.version=='6.0';
	//head nav
    var nag = $('#navbar');
	var header_top = $('.header_top:first');
	var nagheight = nag.height();
    var lt80 = is6? function(){
	      nag.css({'position':'relative','top':0});
	      scroll.unBind('logonfloat');
		  header_top.css({'margin-bottom': 0});
	     } : function(){
	      nag.css({'position':'relative','top':0,'height':'auto'});
		  header_top.css({'margin-bottom': 0});
         };
    var gt80 = is6? function(pos){
         nag.css({'position':'absolute', 'left' : 0 , 'top':pos + 'px','z-index':100});
         scroll.bind(function(pos){
              nag.css({'top':pos + 'px'});
	            },'logonfloat');
//		if($.browser.msie)
			header_top.css({'margin-bottom': nagheight  });
//		else
//			header_top.css({'margin-bottom': nagheight   + 14});
        }:function(){
			nag.css({'position':'fixed' , 'left' : 0});
//			if($.browser.msie)
				header_top.css({'margin-bottom': nagheight  });
//			else
//				header_top.css({'margin-bottom': nagheight   + 14});
			};
    lt80();
    var nagMt = nag.offset();
    if (nagMt) scroll.yIn( nagMt.top , gt80, lt80);

	//gotop
	var goTop = $("#goTop");
	var feedback = $('#feedback');
	var go_top = $('#go_top');
	var win  =$(window);
	var shareGroup = $('.share_group');
	var browse = $('.browse');
	goTop.show();
	$('#go_top').bind("click" , function(){
	     /*var scrollWin = window.setInterval(function(){
	      win.scrollTop(win.scrollTop() / 6);
	      if($(window).scrollTop() < 1){
	            clearInterval(scrollWin);
	           }
		   },1)*/
		   $('body,html').stop(true , true).animate({ scrollTop: 0 }, 300);
		   return false;
	    });
     scroll.yIn(100 , function(){
          go_top.stop(true,true).fadeIn("fast");
        } , function(){
          go_top.stop(true,true).fadeOut("fast");
        });

	if (is6){
		goTop.css("position","absolute");
		$('#feedback').css('position','absolute');
		browse.show();
		browse.find('.close_z').bind('click' , function(){
			browse.hide();
		}); 
		var offset = {
			top : shareGroup.size() > 0 ? shareGroup.offset().top : 0
		}
		var offset1 = {
			top : browse.size() > 0 ? browse.offset().top : 0,
			left : ($(window).width() - browse.width()) / 2
		}
		browse.css('left' , offset1.left)
        scroll.bind(function(pos){
            goTop.css({"top" : (pos + win.height()-230) + 'px'})
            $('#feedback').css({"top" : (pos + win.height()-230) + 'px'})
			offset.top && position.toFixed(shareGroup , offset);
			offset1.top && position.toFixed(browse, offset1);
        });
		
	}
});

fml.use(['component/iStorage'], function(){
	var storage = this.iStorage;
	var t = new Date;
	t = parseInt(t.getTime()/86400000);
	storage.get('isShowLogin', function(v) {
		if (v && (t-v < 1)) return;
		fml.eventProxy('showLoginWin', function(cbk){
			storage.get('isShowLogin', function(v) {		//for page turning, or open many pages
				if (v && (t-v < 1)) return;
				cbk();
				storage.set('isShowLogin', t);
			});
		});
	});
});


fml.define('page/paipai/global',[] ,function(){});
