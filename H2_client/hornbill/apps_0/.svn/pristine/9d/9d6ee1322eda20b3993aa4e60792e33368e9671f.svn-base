/*common*/

/**
 * @file 通知类型弹窗
 * @name notice
 * @desc 根据内容展现弹窗
 * @import wap/zepto.js
 */

var $ = require('wap/zepto')

function Notice(options){
	var defaults = {
		dialogType : 'notice',
		dialogClass : '',
		duration : options.duration || 1500
	}

	this.opts = $.extend({}, defaults, options)

	this.sync()

	var mSelf = this

	setTimeout(function(){
		mSelf.drive.animate({opacity: 0}, 500, 'ease-out', function(){ mSelf.drive.remove() })
	}, this.opts.duration)

	return this
}
Notice.prototype.sync = function(){
	var mSelf = this
	this.drive = $('<div class="ui_notice_wrap"><div class="ui_auto_notice '+ this.opts.dialogClass +'">'+ this.opts.content +'</div></div>')
	$('body').append(this.drive)
	this.drive.animate({opacity: 1}, 500, 'ease-out')
}

return Notice