/**
 * 实现编辑订单信息功能的API
 * @author xiongwilee
 * @time 2014-06-26
 * @method render(renderid,sid) 获取实例化单品的颜色及尺码信息，并渲到renderid的节点中
 * @method switchTo(sid) 切换到sid当前实例化单品
 */

fml.define('component/editOrderInfo' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	function editOrderInfo(options){
		this.opts = options || {
			renderId:'',//插入到的节点
			sid:''//产品的ID
		};
		this.orderInfo = {};//保存核心信息

		this.url = {
			getGoodsInfo : '/aj/doota/goods_prop',//获取产品信息的接口
			updateInfo : '/aj/doota/update_prop'//更新产品信息的接口
		}
		this.curRenderid = this.opts.renderId;
		this.curSid = this.opts.sid;

		this.init();
		return this;
	}
	editOrderInfo.prototype = {
        on: function(type, handler) {
            if (!$.isFunction(handler)) {
                return this;
            }

            var list, t = this._listeners_;
            !t && (t = this._listeners_ = {});

            type.indexOf("on") && (type = "on" + type);

            !$.isArray(list = t[type]) && (list = t[type] = []);
            t[type].unshift( {handler: handler} );

            return this;
        },
		fire:function(event,options){
            var baseEvent = function(type, target){
                this.type = type;
                this.returnValue = true;
                this.target = target || null;
                this.currentTarget = null;
                this.preventDefault = function() {this.returnValue = false;};
            }

            event && (event = new baseEvent(event));

            var i, n, list, item
                , t=this._listeners_
                , type=event.type
                // 20121023 mz 修正事件派发多参数时，参数的正确性验证
                , argu=[event].concat( Array.prototype.slice.call(arguments, 1) );
            !t && (t = this._listeners_ = {});

            // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
            $.extend(event, options || {});

            event.target = event.target || this;
            event.currentTarget = this;

            type.indexOf("on") && (type = "on" + type);

            $.isFunction(this[type]) && this[type].apply(this, argu);
            (i=this._options) && $.isFunction(i[type]) && i[type].apply(this, argu);

            if ($.isArray(list = t[type])) {
                for ( i=list.length-1; i>-1; i-- ) {
                    item = list[i];
                    item && item.handler.apply( this, argu );
                    item && item.once && list.splice( i, 1 );
                }
            }

            return event.returnValue;            
        },
		init : function(){
			var me = this;
			if(me.opts.isAsync && me.curSid){
				me.getInit(function(){
					me.renderTo(me.curRenderid)
				})
			}
		},
		getInit : function(callback){
			var me = this;

			renderId = me.curRenderid;
			sid = me.curSid;

			if(me.orderInfo[sid] && me.orderInfo[sid].ele){
				//如果已经存在了产品信息，就直接返回执行callback
				callback && callback();
				return;
			}

			me.getGoodsinfo(callback);
		},
		renderEle : function(callback){
			var me = this,
				infoData = me.orderInfo[me.curSid].infoData;

			var getDefaultData = function(num,i){
				item = infoData.prop[num];
				select = infoData.select[num];
				if(item.value[i] == select.value){
					me.orderInfo[me.curSid].currentData = me.orderInfo[me.curSid].currentData || {};
					me.orderInfo[me.curSid].defaultData = me.orderInfo[me.curSid].defaultData || {};
					me.orderInfo[me.curSid].currentData[num] = i.toString();
					me.orderInfo[me.curSid].defaultData[num] = i.toString();

					if(item.image && item.image.length>0){//用以判断当前是否有图片的子列
						me.orderInfo[me.curSid].imageInfo = {
							propid:num.toString(),
							itemid:i.toString()
						}
					}
					return true;
				}
			}
			
			/*生成选择列表*/
			var itemTpl = '';
			for(var num in infoData.prop){
				var item = infoData.prop[num];
				if(parseInt(item.is_show) != 1) continue;
				itemTpl += '<dl class="panel_item panel_item_'+num+'">'+
								'<dt class="panel_item_name">'+item.name+'</dt>'+
								'<dd class="panel_item_dd">'+
									'<ul class="panel_item_ul">',
							isCurrent = false;
				if(item.color_image && item.color_image.length>0){
					for(var i=0;i<item.color_image.length;i++){
						isCurrent = getDefaultData(num,i);
						itemTpl += '<li class="panel_item_list panel_item_list_'+i+(isCurrent?' panel_item_list_active':'')+' panel_item_list_image" data-propid="'+num+'" data-itemid="'+i+'"><img class="panel_item_list_img" title="'+item.value[i]+'" src='+item.color_image[i]+'></li>'
						
					}
				}else {
					for(var j=0;j<item.value.length;j++){
						isCurrent = getDefaultData(num,j);
						itemTpl += '<li class="panel_item_list panel_item_list_'+j+(isCurrent?' panel_item_list_active':'')+'" data-propid="'+num+'" data-itemid="'+j+'" title="'+item.value[j]+'">'+item.value[j]+'</li>'
					}
				}

				itemTpl 		+= '</ul>'+
								'</dd>'+
							'</dl>';
			}

			/*提交按钮*/
			itemTpl += '<dl class="panel_item panel_item_footer">'+
							'<button class="panel_button panel_button_submit">确认</button>'+
							'<button class="panel_button panel_button_cancel">取消</button>'+
						'</dl>';

			/*生成预览图片*/
			var previewTpl = '',
				defaultSelectData = me.orderInfo[me.curSid].defaultData[0],
				imageInfo = me.orderInfo[me.curSid].imageInfo,//当前预览图片的propid，如果存在对应预览图则显示，否则现实默认图片
				previewImg = me.getPreviewImg().previewImg;
			previewTpl += '<img class="goods_info_preview_img" title="'+infoData.prop[0].value[defaultSelectData]+'" src="'+previewImg+'">'

			eleTpl = 	'<div class="goods_info_wrapper goods_info_'+me.curSid+'" >'+
							'<div class="goods_info_panel">'+itemTpl+'</div>'+
							'<div class="goods_info_preview">'+previewTpl+'</div>'
						'</div>';

			$ele = me.orderInfo[me.curSid].ele = $(eleTpl);

			callback && callback();
		},
		switchTo : function(sid){
			if($.inArray(sid,this.orderInfo)>-1){
				this.curSid = sid;
			}
		},
		cutWord : function(text,len,endStr){
			var getLength = function(){ for (var i = str.length, n = 0; i--; ) {
			        n += str.charCodeAt(i) > 255 ? 2 : 1;
			    }
			    return n;
			}
			
			var len = +len
		        ,endStr = typeof(endStr) == 'undefined' ? "..." : endStr.toString();

		    function n2(a){ var n = a / 2 | 0; return (n > 0 ? n : 1)} //用于二分法查找
		    if(!(str+"").length || !len || len<=0){return "";}
		    if(this.getBlength(str) <= len){return str;} //整个函数中最耗时的一个判断,欢迎优化
		    var lenS = len - this.getBlength(endStr)
		        ,_lenS = 0
		        , _strl = 0
		    while (_strl <= lenS){
		        var _lenS1 = n2(lenS -_strl)
		        _strl += this.getBlength(str.substr(_lenS,_lenS1))
		        _lenS += _lenS1
		    }
		    return str.substr(0,_lenS-1) + endStr
		},
		getSoldout : function(){
			var me = this,
				infoData = me.orderInfo[me.curSid].infoData;
			me.orderInfo[me.curSid].soldout = {};
			for(var i = 0;i<infoData.stock.length;i++){
				for(var j in infoData.stock[i].color){
					if(infoData.stock[i].color[j]<1){
						j--;
						me.orderInfo[me.curSid].soldout[i] = me.orderInfo[me.curSid].soldout[i] || [];
						me.orderInfo[me.curSid].soldout[i].push(j)
					}
				}
			}
		},
		changeSoldoutView : function(){
			var me = this,
				$thisEle = me.orderInfo[me.curSid].ele,
				propData = this.orderInfo[this.curSid].infoData.prop,
				currentData = this.orderInfo[this.curSid].currentData,
				soldoutData = this.orderInfo[this.curSid].soldout,
				sizeId = currentData[1],
				colorId = currentData[0];

			$(me.curRenderid+' .panel_item_0 .panel_item_list_disable').removeClass('panel_item_list_disable');
			$(me.curRenderid+' .panel_item_1 .panel_item_list_disable').removeClass('panel_item_list_disable');

			for(var i in soldoutData[parseInt(sizeId)+1]){
				$thisEle.find('.panel_item_0 .panel_item_list_'+soldoutData[parseInt(sizeId)+1][i]).addClass('panel_item_list_disable');
			}
			for(var j in soldoutData){
				if( $.inArray( parseInt(colorId) , soldoutData[j] ) > -1){
					$thisEle.find('.panel_item_1 .panel_item_list_'+(parseInt(j)-1)).addClass('panel_item_list_disable');
				}
			}
		},
		getPreviewImg : function(){
			var currentData = this.orderInfo[this.curSid].currentData,
				infoData = this.orderInfo[this.curSid].infoData,
				propItem,itemid;
			for(var i in currentData){
				propItem = infoData.prop[i];
				itemid = currentData[i];
				if(propItem && propItem.image && propItem.image[itemid]){
					return {
						previewImg:propItem.image[itemid],
						smallImg:propItem.color_image[itemid]
					}
				}
			}
			return {
				previewImg:infoData.image.image[0],
				smallImg:infoData.image.small_image[0]
			}
		},
		getFormData : function(){
			var me = this,
				propData = me.orderInfo[me.curSid].infoData.prop,
				currentData = me.orderInfo[me.curSid].currentData,formData=[];
			for(var i in currentData){
				formData.push({
					key:i,
					value:propData[i].value[currentData[i]],
					name:propData[i].name
				})
			}
			return formData;
		},
		submitForm:function(){
			var me = this,
				defaultData = me.orderInfo[me.curSid].defaultData,
				currentData = me.orderInfo[me.curSid].currentData
				formData = me.getFormData(),
				flag = false;

			for(var i in defaultData){
				if(defaultData[i] != currentData[i]){
					flag = true;
					break;
				}
			}

			if(flag){
				//触发提交已修改事件
				var returnValue = me.fire('submitChange',{
					cursid:me.curSid,
					curInfo:me.orderInfo[me.curSid],
					formData:me.getFormData()
				})
				if(!returnValue){
					return;
				}

				$.post(me.url.updateInfo,{
					sid:me.curSid,
					color:formData[0].value,
					size:formData[1]?formData[1].value:''
				},function(data){
					var imgUrl = me.getPreviewImg();
					if(data.code == 0){
						for(var i in defaultData){
							me.orderInfo[me.curSid].defaultData[i] = currentData[i];
						}

						//触发提交成功的事件
						var returnValue = me.fire('submitSuccess',{
							cursid:me.curSid,
							data:data,
							imgUrl:imgUrl,
							curInfo:me.orderInfo[me.curSid],
							formData:formData
						})
						if(!returnValue){
							return;
						}
					}else{
						//触发提交失败的事件
						var returnValue = me.fire('submitError',{
							cursid:me.curSid,
							data:data,
							imgUrl:imgUrl,
							curInfo:me.orderInfo[me.curSid],
							formData:formData
						})
						if(!returnValue){
							return;
						}
					}
				},'json')
			}else{
				//触发提交未修改事件
				var returnValue = me.fire('submitNochange',{
					cursid:me.curSid,
					curInfo:me.orderInfo[me.curSid],
					formData:me.getFormData()
				})
				if(!returnValue){
					return;
				}
			}
		},
		bindEvent:function(){
			var me = this;

			me.orderInfo[me.curSid].ele.delegate('.panel_item_list','click',function(evt){
				var propid = $(this).data('propid'),
					itemid = $(this).data('itemid');

				if($(this).hasClass('panel_item_list_disable')){
					return;
				}

				//触发选择事件
				var returnValue = me.fire('select',{
					cursid:me.curSid,
					curInfo:me.orderInfo[me.curSid]
				})
				if(!returnValue){
					return;
				}

				me.changeSelectView(propid,itemid);
			})
			me.orderInfo[me.curSid].ele.find('.panel_item_footer .panel_button_submit').on('click',function(evt){
				//触发提交事件
				var returnValue = me.fire('submit',{
					cursid:me.curSid,
					curInfo:me.orderInfo[me.curSid],
					formData:me.getFormData()
				})
				if(!returnValue){
					return;
				}
				me.submitForm();

				$(document.body).css({
					height:'auto'
				});
			})
			me.orderInfo[me.curSid].ele.find('.panel_item_footer .panel_button_cancel').on('click',function(evt){
				//触发点击取消按钮的事件
				var returnValue = me.fire('cancel',{
					cursid:me.curSid,
					curInfo:me.orderInfo[me.curSid],
					formData:me.getFormData()
				})
				if(!returnValue){
					return;
				}

				$(document.body).css({
					height:'auto'
				});
			})

			//解决360 6.3版本不能自适应高度的问题
			setTimeout(function(){
				var thisHeight = $(me.orderInfo[me.curSid].ele).height(),
					thisPosition = $(me.orderInfo[me.curSid].ele).offset().top;
				if($(document.body).height()<thisPosition+thisHeight){
					$(document.body).css({
						height:thisHeight+thisPosition+'px'
					});
				}else{
					$(document.body).css({
						height:'auto'
					});
				}
			},300)
		},
		changeSelectView :function(propid,itemid){
			var me = this,
				$thisEle = me.orderInfo[me.curSid].ele,
				defaultData = me.orderInfo[me.curSid].defaultData,
				currentData = me.orderInfo[me.curSid].currentData,
				imgUrl;
			
			propid = propid.toString();
			itemid = itemid.toString();

			if(propid && itemid){

				me.orderInfo[me.curSid].currentData[propid] = currentData[propid] = itemid;

				imgUrl = me.getPreviewImg();

				//触发修改了购物车信息的事件
				var returnValue = me.fire('change',{
					cursid:me.curSid,
					infoData:me.orderInfo[me.curSid].infoData,
					currentInfo:{
						select:currentData,
						imgUrl:imgUrl,
						formData:me.getFormData()
					}
				})
				if(!returnValue){
					return;
				}

				me.getSoldout();//剥出手空的商品
				me.changeSoldoutView();//修改不可用商品展示

				$thisEle.find('.panel_item_'+propid+' .panel_item_list_active').removeClass('panel_item_list_active');
				$($thisEle.find('.panel_item_'+propid+' .panel_item_ul').children()[itemid]).addClass('panel_item_list_active');
				$thisEle.find('.goods_info_preview_img').attr({
					src:imgUrl.previewImg
				})				
			}
		}, 
		getGoodsinfo : function(callback){
			var me = this;
			if(me.orderInfo[me.curSid]){
				callback && callback();
			}else{
				$.get(me.url.getGoodsInfo,{
					sid:me.curSid
				},function(data){
					me.orderInfo[me.curSid] = {
						infoData : data
					};
					me.renderEle();//第一次获取数据需要先生成节点
					me.bindEvent();//绑定事件

					me.getSoldout();//剥出手空的商品
					me.changeSoldoutView();//修改不可用商品展示
					callback && callback()
				},'JSON')
			}
		},
		renderTo : function(renderId){
			var me = this;

			if( me.orderInfo[me.curSid] 
				&& me.orderInfo[me.curSid].eleIds
				&& $.inArray( renderId, me.orderInfo[me.curSid].eleIds)>-1 )
			{
				return
			}
			
			var $ele =$(renderId);
			
			$ele.append(me.orderInfo[me.curSid].ele);

			me.orderInfo[me.curSid].eleIds = me.orderInfo[me.curSid].eleIds || [];
			me.orderInfo[me.curSid].eleIds.push(renderId);
			
			//触发render事件
			var returnValue = me.fire('render',{
				cursid:me.curSid,
				curInfo:me.orderInfo[me.curSid]
			})
			if(!returnValue){
				return;
			}
		},
		render : function(renderId,sid){
			var me = this;
			
			me.curRenderid = renderId || me.opts.renderId;
			me.curSid = sid || me.opts.sid;

			if( me.orderInfo[me.curSid] 
				&& me.orderInfo[me.curSid].eleIds
				&& $.inArray(me.curRenderid,me.orderInfo[me.curSid].eleIds)>-1 ){
				return;
			}

			me.getInit(function(){
				me.renderTo(me.curRenderid)
			});
		}
	}
	return editOrderInfo;
});
