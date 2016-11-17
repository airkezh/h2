function korea() {
	return this;	
}
/**
 * 这个文件是从 /www/controller/guang.js 中的 attr 方法复制过来
 * 『40479』就是韩国馆下的商品
 */
var controlFns = {
	'index': function() {
        return this.redirectTo( '/guang/new', true )
	}
};

exports.__create = controller.__create(korea, controlFns);
