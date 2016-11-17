/**
 * 实现编辑订单信息功能的API
 * @author xiongwilee
 * @time 2014-06-26
 * @method render(renderid,sid) 获取实例化单品的颜色及尺码信息，并渲到renderid的节点中
 * @method switchTo(sid) 切换到sid当前实例化单品
 */

fml.define('order_pc/common/editOrderInfo', ['jquery'], function(require, exports) {
	var $ = require('jquery');

	function editOrderInfo(options) {
		this.opts = options || {
			renderId: '', //插入到的节点
			sid: '' //产品的ID
		};
		this.orderInfo = {}; //保存核心信息

		this.url = {
			getGoodsInfo: '/aj/doota/goods_prop', //获取产品信息的接口
			updateInfo: '/aj/doota/update_prop' //更新产品信息的接口
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
			t[type].unshift({
				handler: handler
			});

			return this;
		},
		fire: function(event, options) {
			var baseEvent = function(type, target) {
				this.type = type;
				this.returnValue = true;
				this.target = target || null;
				this.currentTarget = null;
				this.preventDefault = function() {
					this.returnValue = false;
				};
			}

			event && (event = new baseEvent(event));

			var i, n, list, item, t = this._listeners_,
				type = event.type
				// 20121023 mz 修正事件派发多参数时，参数的正确性验证
				,
				argu = [event].concat(Array.prototype.slice.call(arguments, 1));
			!t && (t = this._listeners_ = {});

			// 20100603 添加本方法的第二个参数，将 options extend到event中去传递
			$.extend(event, options || {});

			event.target = event.target || this;
			event.currentTarget = this;

			type.indexOf("on") && (type = "on" + type);

			$.isFunction(this[type]) && this[type].apply(this, argu);
			(i = this._options) && $.isFunction(i[type]) && i[type].apply(this, argu);

			if ($.isArray(list = t[type])) {
				for (i = list.length - 1; i > -1; i--) {
					item = list[i];
					item && item.handler.apply(this, argu);
					item && item.once && list.splice(i, 1);
				}
			}

			return event.returnValue;
		},
		init: function() {
			var me = this;
			if (me.opts.isAsync && me.curSid) {
				me.getInit(function() {
					me.renderTo(me.curRenderid)
				})
			}
		},
		getInit: function(callback) {
			var me = this;

			renderId = me.curRenderid;
			sid = me.curSid;

			if (me.orderInfo[sid] && me.orderInfo[sid].ele) {
				//如果已经存在了产品信息，就直接返回执行callback
				callback && callback();
				return;
			}
			me.getGoodsinfo(callback);
		},
		dataFormat: function(data) {
			var resultData = {},
				stackList = {
					color: [],
					size: []
				};

			resultData.twitter_id = data.twitter_id;
			resultData.goods_id = data.goods_id;
			resultData.select = data.select;
			resultData.image = data.image;
			resultData.prop = [];
			resultData.sku_prop = [];
			resultData.stock = [];
			resultData.color = data.color;
			resultData.size = data.size;
			resultData.sku = data.sku;

			for (var i in data.color) {
				stackList.color.push(i);

				resultData.sku_prop[0] = resultData.sku_prop[0] || {};
				resultData.sku_prop[0].values = resultData.sku_prop[0].values || [];
				resultData.sku_prop[0].values.push(data.color[i]);

				resultData.prop[0] = resultData.prop[0] || {};
				resultData.prop[0].name = data.color[i].meta_title;
				resultData.prop[0].is_show = 1;
				resultData.prop[0].value = resultData.prop[0].value || [];
				resultData.prop[0].value.push(data.color[i].meta_name);
			}

			for (var j in data.size) {
				stackList.size.push(j);

				resultData.sku_prop[1] = resultData.sku_prop[1] || {};
				resultData.sku_prop[1].values = resultData.sku_prop[1].values || [];
				resultData.sku_prop[1].values.push(data.size[j]);

				resultData.prop[1] = resultData.prop[1] || {};
				resultData.prop[1].name = data.size[j].meta_title;
				resultData.prop[1].is_show = 1;
				resultData.prop[1].value = resultData.prop[1].value || [];
				resultData.prop[1].value.push(data.size[j].meta_name)
			}

			if (stackList.size && stackList.size.length > 0) {
				//既有color也有size
				for (var k = 0; k < stackList.size.length; k++) {
					var curId = stackList.size[k],
						curData = {
							sum: data.sku[curId].repertory,
							color: {}
						};

					for (var l = 0; l < stackList.color.length; l++) {
						curData.color[l + 1] = {
							repertory: data.sku[stackList.color[l] + '_' + curId].repertory,
							price: data.sku[stackList.color[l] + '_' + curId].price,
							sku_id: data.sku[stackList.color[l] + '_' + curId].sku_id
						};
						if (data.sku[stackList.color[l] + '_' + curId].campaign_price != null) {
							curData.color[l + 1].campaign_price = data.sku[stackList.color[l] + '_' + curId].campaign_price;
						}
					}

					resultData.stock.push(curData)
				}
			} else {
				//只有color
				var curData = {
					sum: 0,
					color: {}
				};

				for (var l = 0; l < stackList.color.length; l++) {
					curData.color[l + 1] = {
						repertory: data.sku[stackList.color[l] + '_'].repertory,
						price: data.sku[stackList.color[l] + '_'].price,
						sku_id: data.sku[stackList.color[l] + '_'].sku_id
					};
					if (data.sku[stackList.color[l] + '_'].campaign_price != null) {
						curData.color[l + 1].campaign_price = data.sku[stackList.color[l] + '_'].campaign_price;
					}
				}

				resultData.stock.push(curData)
			}

			return resultData;
		},
		renderEle: function(callback) {
			var me = this,
				infoData = me.orderInfo[me.curSid].infoData,
				curPrice;

			//当前数据
			me.orderInfo[me.curSid].currentData = me.orderInfo[me.curSid].currentData || [0, 0];
			//默认数据
			me.orderInfo[me.curSid].defaultData = me.orderInfo[me.curSid].defaultData || [0, 0];

			var getDefaultData = function(num, i) {
				item = infoData.prop[num];
				select = infoData.select[num];
				if (item.value[i] == select.value) {
					me.orderInfo[me.curSid].currentData[num] = i.toString();
					me.orderInfo[me.curSid].defaultData[num] = i.toString();

					if (item.image && item.image.length > 0) { //用以判断当前是否有图片的子列
						me.orderInfo[me.curSid].imageInfo = {
							propid: num.toString(),
							itemid: i.toString()
						}
					}
					return true;
				}
			}

			/*生成选择列表*/
			var itemTpl = '';
			for (var num in infoData.prop) {
				var item = infoData.prop[num];
				var sku_item = infoData.sku_prop[num];
				var imgStr = '';
				if (parseInt(item.is_show) != 1) continue;
				itemTpl += '<dl class="panel_item panel_item_' + num + '">' +
					'<dt class="panel_item_name">' + item.name + '</dt>' +
					'<dd class="panel_item_dd">' +
					'<ul class="panel_item_ul">',
					isCurrent = false;
				if (sku_item.values && sku_item.values.length > 0) {
					for (var i = 0; i < sku_item.values.length; i++) {
						isCurrent = getDefaultData(num, i);
						if (sku_item.values[i].color_image) {
							itemTpl += '<li class="panel_item_list panel_item_list_' + i + (isCurrent ? ' panel_item_list_active' : '') + ' panel_item_list_image" data-propid="' + num + '" data-itemid="' + i + '"><img class="panel_item_list_img" title="' + item.value[i] + '" src=' + sku_item.values[i].color_image + '></li>';
						} else {
							itemTpl += '<li class="panel_item_list panel_item_list_' + i + (isCurrent ? ' panel_item_list_active' : '') + '" data-propid="' + num + '" data-itemid="' + i + '" title="' + item.value[i] + '">' + item.value[i] + '</li>';
						}
					}
				}

				itemTpl += '</ul>' +
					'</dd>' +
					'</dl>';
			}


			curPrice = me.getCurPrice();

			/*显示价格*/
			itemTpl += '<dl class="panel_item panel_item_price">' +
				'<dt class="panel_item_name">价格</dt>' +
				'<dd class="panel_item_dd panel_item_price_preview">' + curPrice.price + '</dd>' +
				'</dl>';

			/*提交按钮*/
			itemTpl += '<dl class="panel_item panel_item_footer">' +
				'<button class="panel_button panel_button_submit">确认</button>' +
				'<button class="panel_button panel_button_cancel">取消</button>' +
				'</dl>';

			/*生成预览图片*/
			var gContent = "#g_content_"+ me.curSid;
			var orderDefaultImage = $(gContent).find("a img").attr("asrc");
			var previewTpl = '',
				defaultSelectData = me.orderInfo[me.curSid].defaultData[0],
				imageInfo = me.orderInfo[me.curSid].imageInfo, //当前预览图片的propid，如果存在对应预览图则显示，否则现实默认图片
				previewImg = me.getPreviewImg().previewImg||orderDefaultImage;
			//console.log(me.getPreviewImg(),"=====");
			previewTpl += '<img class="goods_info_preview_img" title="' + infoData.prop[0].value[defaultSelectData] + '" src="' + previewImg + '">'

			eleTpl = '<div class="goods_info_wrapper goods_info_' + me.curSid + '" >' +
				'<div class="goods_info_panel">' + itemTpl + '</div>' +
				'<div class="goods_info_preview">' + previewTpl + '</div>'
			'</div>';

			$ele = me.orderInfo[me.curSid].ele = $(eleTpl);

			callback && callback();
		},
		/*
		 @ 切换到sid当前实例化单品
		 @ return null
		*/
		switchTo: function(sid) {
			if ($.inArray(sid, this.orderInfo) > -1) {
				this.curSid = sid;
			}
		},
		cutWord: function(text, len, endStr) {
			var getLength = function() {
				for (var i = str.length, n = 0; i--;) {
					n += str.charCodeAt(i) > 255 ? 2 : 1;
				}
				return n;
			}

			var len = +len,
				endStr = typeof(endStr) == 'undefined' ? "..." : endStr.toString();

			function n2(a) {
				var n = a / 2 | 0;
				return (n > 0 ? n : 1)
			} //用于二分法查找
			if (!(str + "").length || !len || len <= 0) {
				return "";
			}
			if (this.getBlength(str) <= len) {
				return str;
			} //整个函数中最耗时的一个判断,欢迎优化
			var lenS = len - this.getBlength(endStr),
				_lenS = 0,
				_strl = 0
			while (_strl <= lenS) {
				var _lenS1 = n2(lenS - _strl)
				_strl += this.getBlength(str.substr(_lenS, _lenS1))
				_lenS += _lenS1
			}
			return str.substr(0, _lenS - 1) + endStr
		},
		/*
		 @ 获取已经卖完了的单品
		 @ return null
		*/
		getSoldout: function() {
			var me = this,
				infoData = me.orderInfo[me.curSid].infoData;
			me.orderInfo[me.curSid].soldout = {};
			for (var i = 0; i < infoData.stock.length; i++) {
				for (var j in infoData.stock[i].color) {
					if (infoData.stock[i].color[j] && infoData.stock[i].color[j].repertory < 1) {
						j--;
						me.orderInfo[me.curSid].soldout[i] = me.orderInfo[me.curSid].soldout[i] || [];
						me.orderInfo[me.curSid].soldout[i].push(j)
					}
				}
			}
		},
		getCurPrice: function() {
			var me = this,
				result = {},
				curInfo = this.orderInfo[this.curSid].infoData.stock,
				currentData = this.orderInfo[this.curSid].currentData || [0, 0],
				curPrice = '正在加载…',
				curSkuid;

			if (curInfo && curInfo[currentData[1]] && curInfo[currentData[1]].color && curInfo[currentData[1]].color[currentData[0] * 1 + 1]) {
				curPrice = curInfo[currentData[1]].color[currentData[0] * 1 + 1].campaign_price;
				if (curPrice == null) {
					curPrice = curInfo[currentData[1]].color[currentData[0] * 1 + 1].price;
				} else {
					result.campaignPrice = curInfo[currentData[1]].color[currentData[0] * 1 + 1].campaign_price;
				}
				result.originalPrice = curInfo[currentData[1]].color[currentData[0] * 1 + 1].price;
				curSkuid = curInfo[currentData[1]].color[currentData[0] * 1 + 1].sku_id;
				curStock = curInfo[currentData[1]].color[currentData[0] * 1 + 1].repertory;
			}

			result.price = curPrice;
			result.sku_id = curSkuid;
			result.stock = curStock;

			return result;
		},
		changePriceView: function() {
			var me = this,
				curSku = me.getCurPrice() || {};

			me.orderInfo[me.curSid].currentPrice = curSku.price;
			me.orderInfo[me.curSid].currentCampaignPrice = curSku.campaignPrice;
			me.orderInfo[me.curSid].currentOriginalPrice = curSku.originalPrice;
			me.orderInfo[me.curSid].currentSkuid = curSku.sku_id;
			me.orderInfo[me.curSid].stock = curSku.stock;

			$(me.curRenderid + ' .panel_item_price_preview').html(curSku.price)
		},
		changeSoldoutView: function() {
			var me = this,
				$thisEle = me.orderInfo[me.curSid].ele,
				propData = this.orderInfo[this.curSid].infoData.prop,
				currentData = this.orderInfo[this.curSid].currentData,
				soldoutData = this.orderInfo[this.curSid].soldout,
				sizeId = currentData[1],
				colorId = currentData[0];

			$(me.curRenderid + ' .panel_item_0 .panel_item_list_disable').removeClass('panel_item_list_disable');
			$(me.curRenderid + ' .panel_item_1 .panel_item_list_disable').removeClass('panel_item_list_disable');

			$thisEle.find('.panel_button_submit').prop('disabled', false).removeClass('disabled').text('确定');

			/*
			for(var i in soldoutData[parseInt(sizeId)+1]){
				$thisEle.find('.panel_item_0 .panel_item_list_'+soldoutData[parseInt(sizeId)+1][i]).addClass('panel_item_list_disable');
			}

			for(var j in soldoutData){
				if( $.inArray( parseInt(currentData[j-1]) , soldoutData[j] ) > -1){
					$thisEle.find('.panel_item_' + (j-1) + ' .panel_item_list_'+(parseInt(j)-1)).addClass('panel_item_list_disable');
				}
			}*/

			if ($.inArray(parseInt(colorId), soldoutData[sizeId]) > -1) {
				$thisEle.find('.panel_item_1 .panel_item_list_' + sizeId).addClass('panel_item_list_disable');
				$thisEle.find('.panel_button_submit').prop('disabled', true).addClass('disabled').text('库存不足');
			}

			if (soldoutData[sizeId]) {
				$.each(soldoutData[sizeId], function(index, item) {
					$thisEle.find('.panel_item_0' + ' .panel_item_list_' + item).addClass('panel_item_list_disable');
				});
			}

			for (var j in soldoutData) {
				if ($.inArray(parseInt(colorId), soldoutData[j]) > -1) {
					$thisEle.find('.panel_item_1' + ' .panel_item_list_' + j).addClass('panel_item_list_disable');
				}
			}
		},
		getPreviewImg: function() {
			var currentData = this.orderInfo[this.curSid].currentData,
				infoData = this.orderInfo[this.curSid].infoData,
				propItem, itemid;
			for (var i in currentData) {
				propItem = infoData.sku_prop[i];
				itemid = currentData[i];
				if (propItem && propItem.values && propItem.values[itemid]) {
					return {
						previewImg: (propItem.values[itemid].image || infoData.image.image[0]),
						smallImg: propItem.values[itemid].color_image
					}
				}
			}
			return {
				previewImg: infoData.image.image[0],
				smallImg: infoData.image.small_image[0]
			}
		},
		/*
		 @ 获取可提交到后端的formData
		 @ return formData
		*/
		getFormData: function() {
			var me = this,
				propData = me.orderInfo[me.curSid].infoData.prop,
				currentData = me.orderInfo[me.curSid].currentData,
				formData = [];
			for (var i in currentData) {
				if (propData[i] && propData[i].value) {
					formData.push({
						key: i,
						value: propData[i].value[currentData[i]],
						name: propData[i].name
					})
				}
			}
			return formData;
		},
		/*
		 @ 提交购物车修改信息
		 @ return null
		*/
		submitForm: function() {
			var me = this,
				defaultData = me.orderInfo[me.curSid].defaultData,
				currentData = me.orderInfo[me.curSid].currentData
			formData = me.getFormData(),
				flag = false;

			for (var i in defaultData) {
				if (defaultData[i] != currentData[i]) {
					flag = true;
					break;
				}
			}

			if (flag) {
				//触发提交已修改事件
				var returnValue = me.fire('submitChange', {
					cursid: me.curSid,
					curInfo: me.orderInfo[me.curSid],
					formData: me.getFormData()
				})
				if (!returnValue) {
					return;
				}

				$.post(me.url.updateInfo, {
					sid: me.curSid,
					color: formData[0].value,
					size: formData[1] ? formData[1].value : '',
					price: me.orderInfo[me.curSid].currentPrice,
					sku_id: me.orderInfo[me.curSid].currentSkuid
				}, function(data) {
					var imgUrl = me.getPreviewImg();
					if (data.code == 0) {
						for (var i in defaultData) {
							me.orderInfo[me.curSid].defaultData[i] = currentData[i];
						}

						//触发提交成功的事件
						var returnValue = me.fire('submitSuccess', {
							cursid: me.curSid,
							data: data,
							imgUrl: imgUrl,
							curInfo: me.orderInfo[me.curSid],
							formData: formData
						})
						if (!returnValue) {
							return;
						}
					} else {
						//触发提交失败的事件
						var returnValue = me.fire('submitError', {
							cursid: me.curSid,
							data: data,
							imgUrl: imgUrl,
							curInfo: me.orderInfo[me.curSid],
							formData: formData
						})
						if (!returnValue) {
							return;
						}
					}
				}, 'json')
			} else {
				//触发提交未修改事件
				var returnValue = me.fire('submitNochange', {
					cursid: me.curSid,
					curInfo: me.orderInfo[me.curSid],
					formData: me.getFormData()
				})
				if (!returnValue) {
					return;
				}
			}
		},
		bindEvent: function() {
			var me = this;

			me.orderInfo[me.curSid].ele.delegate('.panel_item_list', 'click', function(evt) {
				var propid = $(this).data('propid'),
					itemid = $(this).data('itemid');

				if ($(this).hasClass('panel_item_list_disable')) {
					return;
				}

				$('.promo_sale', me.orderInfo[me.curSid].ele.parents('tr')[0]).parent().hide();

				//触发选择事件
				var returnValue = me.fire('select', {
					cursid: me.curSid,
					curInfo: me.orderInfo[me.curSid]
				})
				if (!returnValue) {
					return;
				}

				me.changeSelectView(propid, itemid);
			})
			me.orderInfo[me.curSid].ele.find('.panel_item_footer .panel_button_submit').on('click', function(evt) {
				//触发提交事件
				var returnValue = me.fire('submit', {
					cursid: me.curSid,
					curInfo: me.orderInfo[me.curSid],
					formData: me.getFormData()
				})
				if (!returnValue) {
					return;
				}
				me.submitForm();
				$(document.body).css({
					height: 'auto'
				});
			})
			me.orderInfo[me.curSid].ele.find('.panel_item_footer .panel_button_cancel').on('click', function(evt) {
				//触发点击取消按钮的事件
				var returnValue = me.fire('cancel', {
					cursid: me.curSid,
					curInfo: me.orderInfo[me.curSid],
					formData: me.getFormData()
				})
				if (!returnValue) {
					return;
				}
				$(document.body).css({
					height: 'auto'
				});
			})

			//解决360 6.3版本不能自适应高度的问题
			setTimeout(function() {
				var thisHeight = $(me.orderInfo[me.curSid].ele).height(),
					thisPosition = $(me.orderInfo[me.curSid].ele).offset().top;
				if ($(document.body).height() < thisPosition + thisHeight) {
					$(document.body).css({
						height: thisHeight + thisPosition + 'px'
					});
				} else {
					$(document.body).css({
						height: 'auto'
					});
				}
			}, 300)
		},
		changeSelectView: function(propid, itemid) {
			var me = this,
				$thisEle = me.orderInfo[me.curSid].ele,
				defaultData = me.orderInfo[me.curSid].defaultData,
				currentData = me.orderInfo[me.curSid].currentData,
				imgUrl;

			propid = propid.toString();
			itemid = itemid.toString();

			if (propid && itemid) {

				me.orderInfo[me.curSid].currentData[propid] = currentData[propid] = itemid;

				imgUrl = me.getPreviewImg();

				//触发修改了购物车信息的事件
				var returnValue = me.fire('change', {
					cursid: me.curSid,
					infoData: me.orderInfo[me.curSid].infoData,
					currentInfo: {
						select: currentData,
						imgUrl: imgUrl,
						formData: me.getFormData()
					}
				})
				if (!returnValue) {
					return;
				}

				me.getSoldout(); //剥出手空的商品
				me.changeSoldoutView(); //修改不可用商品展示
				me.changePriceView(); //修改价格显示

				$thisEle.find('.panel_item_' + propid + ' .panel_item_list_active').removeClass('panel_item_list_active');
				$($thisEle.find('.panel_item_' + propid + ' .panel_item_ul').children()[itemid]).addClass('panel_item_list_active');
				$thisEle.find('.goods_info_preview_img').attr({
					src: imgUrl.previewImg
				})
			}
		},
		getGoodsinfo: function(callback) {
			var me = this;
			if (me.orderInfo[me.curSid]) {
				callback && callback();
			} else {
				$.get(me.url.getGoodsInfo, {
					sid: me.curSid
				}, function(data) {
					var resData = me.dataFormat(data);
					me.orderInfo[me.curSid] = {
						infoData: resData
					};

					me.renderEle(); //第一次获取数据需要先生成节点
					me.bindEvent(); //绑定事件

					me.getSoldout(); //剥出手空的商品
					me.changeSoldoutView(); //修改不可用商品展示
					me.changePriceView(); //修改价格显示

					callback && callback()
				}, 'JSON')
			}
		},
		renderTo: function(renderId) {
			var me = this;

			if (me.orderInfo[me.curSid] && me.orderInfo[me.curSid].eleIds && $.inArray(renderId, me.orderInfo[me.curSid].eleIds) > -1) {
				return
			}

			var $ele = $(renderId);

			$ele.append(me.orderInfo[me.curSid].ele);

			me.orderInfo[me.curSid].eleIds = me.orderInfo[me.curSid].eleIds || [];
			me.orderInfo[me.curSid].eleIds.push(renderId);

			//触发render事件
			var returnValue = me.fire('render', {
				cursid: me.curSid,
				curInfo: me.orderInfo[me.curSid]
			})
			if (!returnValue) {
				return;
			}
		},
		render: function(renderId, sid) {
			var me = this,
				skus, price;

			me.curRenderid = renderId || me.opts.renderId;
			me.curSid = sid || me.opts.sid;

			if (me.orderInfo[me.curSid] && me.orderInfo[me.curSid].eleIds && $.inArray(me.curRenderid, me.orderInfo[me.curSid].eleIds) > -1) {
				skus = me.orderInfo[me.curSid].defaultData;
				price = me.orderInfo[me.curSid].infoData.stock[(skus[1] || 0)].color[+skus[0] + 1];
				$('.panel_item_list', $(me.curRenderid)).removeClass('panel_item_list_active');
				$('.panel_item_price_preview', $(me.curRenderid)).text(price.campaign_price || price.price);
				for (var i = 0; i < skus.length; i++) {
					$('.panel_item_' + i + ' .panel_item_list_' + skus[i]).addClass('panel_item_list_active');
				}
				return;
			}

			me.getInit(function() {
				me.renderTo(me.curRenderid)
			});
		}
	}
	return editOrderInfo;
});