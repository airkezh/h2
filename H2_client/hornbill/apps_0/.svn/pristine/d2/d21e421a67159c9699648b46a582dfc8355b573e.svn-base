function super_editor() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		var php = {
			"group" : "/famous/group_block",
			"editor" : "/famous/editor_block",
			"act" : "/famous/act_block",
			"user" : "/famous/user_block"
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.param = param;
			data._CSSLinks = ['super_edit'];
			data.pageTitle = '超级主编机制申请入口及解释说明页';
			mSelf.render('super_editor.html' , data);	
		});
	}
} 
exports.__create = controller.__create(super_editor, controlFns);
