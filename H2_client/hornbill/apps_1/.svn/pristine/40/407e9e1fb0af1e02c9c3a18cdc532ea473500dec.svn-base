/*common*/
var $=require('jquery');
$.fn.fullpage({
			'verticalCentered': false,
			'anchors': ['page1', 'page2', 'page3', 'page4', 'page5'],
			'css3': true,
			'slidesColor': ['#F0F2F4', '#fff', '#fff', '#fff'],
			'navigation': true,
			'navigationPosition': 'right',
			'navigationTooltips': ['', '', '', ''],
			
			'afterLoad': function(anchorLink, index){
				if(index == 2){
					$('#iphone3, #iphone2, #iphone4').addClass('active');
				}
				$('#infoMenu').toggleClass('whiteLinks', index ==5);
				
			},
			
			'onLeave': function(index, direction){
				if (index == 3 && direction == 'down'){
					$('.section').eq(index -1).removeClass('moveDown').addClass('moveUp');
				}
				else if(index == 3 && direction == 'up'){
					$('.section').eq(index -1).removeClass('moveUp').addClass('moveDown');
				}
				
				$('#staticImg').toggleClass('active', (index == 2 && direction == 'down' ) || (index == 5 && direction == 'up'));
				$('#staticImg').toggleClass('moveDown', index == 3 && direction == 'down');	
			},
			
			afterRender: function(){
				$('#infoMenu').appendTo('body');
				
				$('#githubLink, .twitter-share-button').appendTo('body');
			}

		});
// var hm = document.createElement("script");
// hm.src = "http://www.dowebok.com/demo/2014/77/js/jquery.fullPage.min.js";
// var s = document.getElementsByTagName("script")[0];
// s.parentNode.insertBefore(hm, s);

var dialogUI = require('ui/dialog');
var check = require('app/checkLogin');
var shareTmp = require('component/shareTmp');
var Alert = require('ui/alert');
var a = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}



		


$(".font_yellow").on( "click" , function(){
	// var _this = $(this).attr('data-type');
	var tpl = shareTmp('apply_layer');
	var html = tpl;
	var shop_Layer = new dialogUI({ 
		'content':html , 
		'width': '600px' , 
		'onStart':function(){
			$('#overlay').addClass('overblack');
		},
		'onChange' : function(){
			$('#dialogTitle').hide();  
			$(".maskLayer").css({'opacity':'.4'});
			$(".dialogContent").css({'background':'none'});	
			$('#dialogLayer').css({'background' : 'none' , 'padding' : '0' , 'top' : '20px'});
		},
		'onClose' : function(){
			$('#overlay').removeClass('overblack');	
		}
	});
	$('.close_apply').on('click' , function(){
		shop_Layer.drive.destroyModel();	
	});

})



