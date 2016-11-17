fml.define('ui/prompt' , ['jquery' , 'component/shareTmp' , 'component/position'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');
	var Position = require('component/position');
	function Prompt(options){
		options = options || {};
		// must id typeof string
		this.current = options.current || '.floatingWindow';
		this.target = options.target || '';
		this.content = options.content || '';
		this.contentPanel = options.contentPanel || '.group_rec';
		this.width = options.width ||  'auto';
		this.height = options.height || 'auto';
		this.position = options.position || [];
		this.closeId = options.closeId || '.close_z';
		$(this.current).remove();
		this.prompt = createPrompt.call(this);
		this.prompt.appendTo(document.body)
	}
	Prompt.prototype.sync = function(){
		this.prompt.find(this.contentPanel).append(this.content);
		this.prompt.find(this.contentPanel).css({
			width : this.width,
			height : this.height
		});
		Position.depend(this.current , this.target , this.position);	
		this.close();
	}
	Prompt.prototype.destroy = function(){
		this.prompt.remove();	
		delete this.current;
	}
	Prompt.prototype.close = function(){
		this.prompt.on('click' , this.closeId , $.proxy(function(){
			if(this.onClose) this.onClose();	
			this.destroy();
		} , this));
	}
	// Helpers
	function createPrompt(){
		return $(shareTmp(this.current.replace('.' , '')));	
	}
	return Prompt;
});
