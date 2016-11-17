/*common*/
/**
 * @title: 设置wap页面在客户端的title
 * @author: qianyun
 * @date: 2015-01-07
 */

var set_title = function( title ) {
	if( Meilishuo.config.os.mlsApp && document.title != '美丽说' ) {
		title = title || document.title
		var title_params = encodeURIComponent( '{"title": "' + title + '"}' )
		//window.location.href = 'meilishuo://set_title.meilishuo?json_params=' + title_params
	}
}

exports.set_title = set_title
