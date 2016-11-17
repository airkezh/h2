/*common*/
require('wap/zepto/touch')
require('wap/zepto/fx_methods')

var shareTmp = require('wap/component/shareTmp')
    , confirmDialog = require('wap/ui/confirm')
    , Alert = require('wap/ui/alert')

var $cooper = $('.cooper')
	, $cooper_list = $cooper.find('.cooper_list')
	, $cooper_notice = $cooper.find('.cooper_notice')

var url = Meilishuo.config.cooper_url + '/cooper/'

if(fml.vars.isnew){
	$.get('/aj/cooper/add_default', {appid:'wd'}, function(res){
		$cooper_list.append(shareTmp('cooperitem_tpl', res.data))

	}, 'json')	
}

$cooper.find('.public').parents('.cooper_grid').prependTo($cooper)

$cooper
    .on('tap', '.deleteBtn', function(){
        var $box = $(this).parents('.cooper_grid')
            , id = $box.attr('cooper_id')

        var showConfirm = new confirmDialog({
            content : shareTmp('delete_info_tpl'),
            width : 370,
            isOverflow : true,
			onSure : function(){
				$.post('/aj/cooper/delete_item', {id:id}, function(res){
					if(res.code != 0){
						new Alert({content:'删除失败！', width:370});
						return;
					}
					$box.remove()

					if(!$cooper_list.children()[0])
						$cooper_notice.show()

				}, 'json')
			}
        });
	})
	.on('tap', '.shareBtn, .editBtn', function(){

		var url = $(this).attr('url')

		window.location.href = 'meilishuo://openURL.meilishuo?json_params=' + encodeURIComponent(JSON.stringify({url:url}))

	})

	.on('tap', '.previewBtn', function(){
		var url = $(this).parents('.cooper_grid').attr('cooper_url')

		window.location.href = 'meilishuo://openURL.meilishuo?json_params=' + encodeURIComponent(JSON.stringify({
			url:url + '?coopertime=' + (new Date()).valueOf() + '&preview=1&activity_has_gesture=1'
		}))	
	})



$('.addBtn').on('tap', function(){
	if(!Meilishuo.config.user_id){
		new Alert({content:'获取用户信息失败！', width:370});
		return;
	}

	var url = $(this).attr('url')

	window.location.href = 'meilishuo://openURL.meilishuo?json_params=' + encodeURIComponent(JSON.stringify({url:url}))

	
})

/*
window.MLS.onDataBridgeComplete = function(res){
//  alert(JSON.stringify(res))
    var data = res
    try{
        data = JSON.parse(res)
    }catch(err){
    //  alert(err)
    }

    switch(data.name){
        case 'reloadCooperList' :
			window.location.reload()
            break;

        default :
            break;
    }
}
*/
