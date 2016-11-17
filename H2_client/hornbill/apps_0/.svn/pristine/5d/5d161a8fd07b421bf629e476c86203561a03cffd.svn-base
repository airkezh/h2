fml.define('ui/select' , ['jquery'] , function(){
	var $ = require('jquery');	
	function Select(options){
		this.model = options.model || '.selectList';
		this.selPanel = options.selPanel || 'selectPanel';
		this.sel = options.sel || 'select';
		this.selOpt = options.selOpt || 'options'; 
		return this;
	}
	//new select
	Select.prototype.sync = function(){
		var mSelf = this;
		$.each($(this.model) , function(){
			var html = createSelect.call(this , mSelf);	
			$(this).before(html);	
		});
	}
	//Helper
	function createSelect (mSelf){
		var html =  '<div class="' + mSelf.selPanel + '">';
			html += '	<div class="' + mSelf.sel + '">';
			html += '		<div class="selectText"><div class="selectBtn"></div></div>';
			html += '	</div>';
			html += '	<div class="'+ mSelf.selOpt +'"><ul></ul></div>';
			html += '</div>';
		return html;
	}
});
