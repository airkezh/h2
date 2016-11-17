fml.define('app/christmas', ['jquery', 'app/checkLogin', 'sum/fallLayer', 'ui/dialog', 'component/shareTmp'], function(require, exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var fall = require('sum/fallLayer');
	var check = require('app/checkLogin');
	var christ_pop = {'drop':'dropThing', 'code':'twoCodeP', 'medal':'medalP', 'gift':'awardP', 'mask':'awardP'};
	var christ_data = {
		'gift':{'type':'1','gift_name':'美丽说大礼包'}, 
		'mask':{'type':'2','gift_name':'美沫美莫尔睡眠面膜'}, 
		'medal87':{'medal_name':'圣诞袜','medal_pic':'images/medal/icons/small_sock.png'}, 
		'medal89':{'medal_name':'圣诞老人', 'medal_pic':'images/medal/icons/small_oldman.png'},
		'medal91':{'medal_name':'麋鹿小精灵', 'medal_pic':'images/medal/icons/small_jingling.png'},
		'medal93':{'medal_name':'胖胖企鹅', 'medal_pic':'images/medal/icons/small_fatqq.png'}
	};
	var christ_fun = {
		'dropThing': function($tpl, dia){
			$tpl.find('.chr_ready').click(function(){
				dia.drive.destroyModel();
				var icon = $(this).attr('ico');
				fall(icon);
			});
		},
		'twoCodeP' : function($tpl, dia){
			$tpl.find('.chr_ok').click(function(){
				dia.drive.destroyModel();
			});
		},
		'awardP' : function($tpl, dia) {
			$tpl.find('.chr_ok').click(function(){
				var type = $(this).attr('type');
				var name = $tpl.find('[name=name]').val();
				var addr = $tpl.find('[name=addr]').val();
				var phone = $tpl.find('[name=phone]').val();
				if (name==''||addr==''||phone==''){
					if($tpl.find('.tip_p').length == 0)
					$tpl.find('.panel_p').append('<p class="red_f c_f tip_p">请填写完所有选项~~</p>');
				}
				$tpl.find('input').focus(function(){
					if($tpl.find('.tip_p').length > 0) $tpl.find('.tip_p').remove();
				});
				$.get('/aj/huodong/christ_addr', {'name':name, 'addr':addr, 'phone':phone, 'type':type},function(){
				});
				dia.drive.destroyModel();
			});
		},
		'medalP' : function($tpl, dia) {
			$tpl.find('.chr_ok').click(function(){
				dia.drive.destroyModel();
			});
		}
	};

	$('.goods_wall').on('click', '.xmas_i', function(){
		$(this).remove();
		$.get('/aj/huodong/christ_ran', function(res){
			if (!res || !res.result) return;
			if (res.result != 'drop' && res.result != 'code'){
				if(!check()) return false;	
			}
			var tplN = christ_pop[res.result];
			if (!tplN) tplN = christ_pop['medal'];
			var $tpl = $(shareTmp(tplN, christ_data[res.result]));
			var dia = new dialog({'content':$tpl.show(), width:400});
			$('#dialogTitle').remove();
			$tpl.find('.close_z').click(function(){
				dia.drive.destroyModel();
			});
			christ_fun[tplN]($tpl, dia);
		}, 'json');	
	});
});
