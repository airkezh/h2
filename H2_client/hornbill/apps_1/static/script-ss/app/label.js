fml.define('app/label' , ['component/shareTmp' , 'ui/alert' , 'jquery' , 'component/waterfall' , 'component/slideTab'] , function(require , exports){
	var $ = require('jquery');
	var pin = require('component/waterfall');
	var shareTmp = require('component/shareTmp');
	var Alert = require('ui/alert');
	var slideTab = require('component/slideTab');
	var delArr = [];
	var addArr = [];
	var newArr = [];
	return function(){

		var corner_notic = $('.corner_notic').get(0)
		$('.showLabel').bind('click' , function(){
			var html = shareTmp('mytabs');	
			var alertDialog = new Alert({
				width : 710,	
				title : '我的标签',
				content : html,
				discover : true
			});
			createLabel();
			if($('.labelList .showLabel').size() == 0 ){
				$('.defaultText').hide();
			}
			//绑定标签滑动
			var labelDesc = ['告诉大家自己最擅长的美丽技能吧' , '自己的那些美丽小情结' , '大声告诉全世界，你爱什么范儿？' , '我是时尚从业者！']
			var index = 0;
			slideTab({leftClick : function(){
				$('.labelDesc').html(labelDesc[--index])	
			} , rightClick : function(){
				$('.labelDesc').html(labelDesc[++index])	
			}});	
			delLabel();
			addLabel();
			newLabel();
			var labelitem = '';
			$.each($('.labelList .label') , function(){
				labelitem += '<li class="delLabel"><span class="active" labelid="'+ $(this).attr('labelid') +'">'+ $(this).text() +'</span></li>';
			});
			$('.sel_tab').html(labelitem);
			$.each($('.sel_tab .delLabel') , function(data){
				eachLabel($('.tab_container .tab_item .addLabel') , $(this).text()).addClass('normal').removeClass('active')
			});
			$('.sel_tab li').live({ mouseenter : function(){
				$(this).addClass('mouseon');	
			},mouseleave : function(){
				$(this).removeClass('mouseon');	
			}});
			alertDialog.onSure(function(){
				var labelName = [];
				$.each($('.sel_tab [labelId]') , function(data){
					addArr.push($(this).attr('labelId'));
					labelName.push('<a class="label active">' + $(this).text() + '</a>');
				});
				$.each($('.sel_tab [labelName]') , function(data){
					newArr.push($(this).attr('labelName'));
					labelName.push('<a class="label active">' + $(this).text() + '</a>');
				});
				var url = '/aw/updateLabel/'
				var data = {
					'newLabel' : newArr.join(","),
					'addLabel' : addArr.join(",")
				}
				var callback = function(){
					
				}
				$('.labelList').html(labelName.join(""));
				$('.firstLabel').show();
				$.get(url , data , callback);
				//$('.goods_wall').masonry('reload');
				pin.colReload(corner_notic);
			});
		});
		function createLabel(){

		}
		function delLabel(){
			$('#dialogContent').on('click' , '.delLabel' , function(){
				$('.labelerror').html('');
				eachLabel($('.tab_list li span') , $(this).text()).addClass('active').removeClass('normal');
				$(this).remove();		
			});	
		}
		function addLabel(){
			$('#dialogContent').on('click' , '.addLabel' , function(){
				$('.defaultText').hide();
				if($(this).is('.active')){
					if($('.sel_tab .delLabel').length >= 20){
						$('.labelerror').html('标签已有20个啦！');
						return false;
					}
					$(this).addClass('normal');
					$(this).removeClass('active');
					$('.sel_tab').append($('<li class="delLabel"></li>').append($('<span labelId="'+ $(this).attr('labelId') +'" class="active"></span>').html($(this).html())));
					return false;
				}else{
					eachLabel($('.sel_tab li') , $(this).text()).remove();
					$(this).addClass('active');
					$(this).removeClass('normal');
					$('.labelerror').html('');
				}
			});	
		}
		function eachLabel(arr , name){
			return $($.map(arr , function(data){
				if($(data).text() == name){
					return data;	
				}	
			}));	
		}
		function newLabel(){
			$('.newLabel').bind('click' , function(){
				if($('.sel_tab .delLabel').length >= 20){
					$('.labelerror').html('标签已有20个啦！');
					return false;
				}
				$('.labelerror').html('');
				$('.defaultText').hide();
				var newName = $('.newLabelName').val();	
				if(eachLabel($('.sel_tab li') , newName).size() > 0){
					$('.labelerror').html('要输入的标签名称已经存在！');
					return false;
				}
				if(newName.replace(/ /g , '') == ''){
					$('.labelerror').html('标签不能为空或者超过10个字!');
					return false;
				}
				if(eachLabel($('.tab_list li span') , newName).size() > 0){
					var hasLabel = eachLabel($('.tab_list li span') , newName);
					hasLabel.addClass('normal').removeClass('active');	
					$('.sel_tab').append($('<li class="delLabel"></li>').append($('<span labelId="'+ hasLabel.attr('labelId') +'" class="active"></span>').html(hasLabel.html())));
				}else{
					
				$('.sel_tab').append($('<li class="delLabel"></li>').append($('<span labelName="'+ newName +'" class="active"></span>').html(newName)));
				}
				$('.newLabelName').val('');
				$('.addLabelSucess').show();
				window.setTimeout(function(){
					$('.addLabelSucess').hide();	
				} , 3000)
			});	
		}
	}
});
