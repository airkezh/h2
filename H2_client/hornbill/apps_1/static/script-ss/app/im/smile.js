/*common*/
var $ = require('jquery');    
var shareTmp = require('component/shareTmp');
var insertAtDiv = require('app/insertAtDiv');
var emoji = require('app/emoji')
var pal = require('app/im/pal')

var toInsert = function(){}

var init = function(parentObj , btn){

	var $pal = $(shareTmp("loginSmile" , {smileys : emoji.data_new}))
		, $parentObj = $(parentObj)

	var fn = function(hidePal){
		$pal
			.on('click' ,'.smiley img',function(){
				toInsert.call(this);
			})

		$parentObj
			.on('mouseenter click' , btn , function(event){
				var $btn = $(this)
				toInsert = function(){
					insertAtDiv($btn.parents('.im_inputbox').find('.im_inputbox_input') , $(this).attr('emotion'));
					hidePal(10)
				}
			})
	}
	pal.init($parentObj , btn , $pal, {
		fn : fn
	})
}
exports.init = init 
