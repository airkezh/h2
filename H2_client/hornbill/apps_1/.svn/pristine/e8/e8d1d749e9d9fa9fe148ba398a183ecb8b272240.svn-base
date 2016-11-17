fml.define('app/magaCommon', ['jquery', 'component/urlHandle', 'app/followMagazine', 'component/menu'], function(require, exports){
	var $ = require('jquery');
	var goUrl = require('component/urlHandle');
	var folMag = require('app/followMagazine');
	var menu = require('component/menu');

	if($(".notesText").height() > 19){
		$(".putUp").show(); 
	}
	$(".putUp").bind("click" , function(){
		$(".notes").stop(true , true).animate({'height' : $('.notesText').height()});
		$(this).hide();
		$(".putDown").show();
	});
	$(".putDown").bind("click" , function(){
		$(".notes").stop(true , true).animate({'height' : 19});
		$(this).hide();
		$(".putUp").show();
	});
	$('[name=elite]').click(function(){
		var elite = $(this).is(':checked') ? 1 : 0;
		goUrl.redirect('/group/'+Meilishuo.config.mag_id+'?poster=0&elite='+elite);
	});

	menu('.show_edit' , 'edit_magazine' , function(obj){
		return {
			left : $(obj).offset().left,
			top : $(obj).offset().top + $(obj).height() - 10
		}	
	});

	folMag();	
});