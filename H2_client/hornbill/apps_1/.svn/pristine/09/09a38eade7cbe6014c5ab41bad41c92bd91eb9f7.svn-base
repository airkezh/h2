fml.define('order_pc/cart/addToCart' ,['jquery','order_pc/common/shopping_carts'] ,function(require, exports){
	var $ = require('jquery'),
		shopping_carts = require('order_pc/common/shopping_carts');
        mod = {};

    mod.business = {
        linkData : [{
            name:"外套",
            url:"/biz/sale/act_list11/?cid=3719&pid=27&page=0&hdtrc=main11pc_dajian27&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"短靴",
            url:"/biz/sale/act_list11/?cid=3741&pid=57&page=0&hdtrc=main11pc_boot57&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"连衣裙",
            url:"/biz/sale/act_list11/?cid=3725&pid=73&page=0&hdtrc=main11pc_dress73&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"马丁靴",
            url:"/biz/sale/act_list11/?cid=3741&pid=81&page=0&hdtrc=main11pc_boot81&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"棉衣",
            url:"/biz/sale/act_list11/?cid=3719&pid=55&page=0&hdtrc=main11pc_dajian55&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"毛衣",
            url:"/biz/sale/act_list11/?cid=3719&pid=49&page=0&hdtrc=main11pc_dajian49&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"呢大衣",
            url:"/biz/sale/act_list11/?cid=3719&pid=43&page=0&hdtrc=main11pc_dajian43&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"小脚裤",
            url:"/biz/sale/act_list11/?cid=3723&pid=37&page=0&hdtrc=main11pc_dadixia37&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"靴子",
            url:"/biz/sale/act_list11/?cid=3741&pid=272&page=0&hdtrc=main11pc_boot272&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"牛仔裤",
            url:"/biz/sale/act_list11/?cid=3723&pid=71&page=0&hdtrc=main11pc_dadixia71&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"卫衣",
            url:"/biz/sale/act_list11/?cid=3721&pid=79&page=0&hdtrc=main11pc_dadiup79&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"短裙",
            url:"/biz/sale/act_list11/?cid=3725&pid=95&page=0&hdtrc=main11pc_dress95&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"雪地靴",
            url:"/biz/sale/act_list11/?cid=3739&pid=200&hdtrc=main11pc_snowshoes200&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0"
            },{
            name:"开衫",
            url:"/biz/sale/act_list11/?cid=3721&pid=131&page=0&hdtrc=main11pc_dadiup131&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"半身裙",
            url:"/biz/sale/act_list11/?cid=3725&pid=91&page=0&hdtrc=main11pc_dress91&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"高跟鞋",
            url:"/biz/sale/act_list11/?cid=3743&pid=115&page=0&hdtrc=main11pc_shoes115&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"衬衫",
            url:"/biz/sale/act_list11/?cid=3721&pid=159&page=0&hdtrc=main11pc_dadiup159&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"羽绒服",
            url:"/biz/sale/act_list11/?cid=3719&pid=19&page=0&hdtrc=main11pc_dajian19&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"长靴",
            url:"/biz/sale/act_list11/?cid=3741&pid=45&page=0&hdtrc=main11pc_boot45&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"单肩包",
            url:"/biz/sale/act_list11/?cid=3751&pid=51&page=0&hdtrc=main11pc_bag51&area=a_li3_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"呢子大衣",
            url:"/biz/sale/act_list11/?cid=3719&pid=43&page=0&hdtrc=main11pc_dajian43&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"卫衣",
            url:"/biz/sale/act_list11/?cid=3731&pid=127&page=0&hdtrc=main11pc_zhai127&area=a_li1_content&pstrc=fe_pos%3Awlc_banner_top_0#mp_firlook"
            },{
            name:"运动鞋",
            url:"/biz/sale/act_list11/?cid=3745&pid=225&hdtrc=main11pc_sportshoes225&area=a_li2_content&pstrc=fe_pos%3Awlc_banner_top_0"
        }],
        getRandom:function(arr,num){
            var newArr = [];
            rand(num);    //随机 x 个
         
            function rand(k){
                if(k==0){
                    return;
                }
                var index = Math.floor(Math.random() * arr.length);
                var flag = true;
                $.each(newArr,function(v){
                    if(v == arr[index]){
                        flag = false;
                    }
                });
                if(flag){
                    newArr.push(arr[index]);
                    k--;
                }
                rand(k);
            }
            return newArr;
        },
    	rendData : {
    		service:{
    			url:Meilishuo.config.domain.webapi+"/share/service_guarantee",
    			render:function(data){
    				var $ele = $('#promise_wrapper'),
    					$eleLine = $('#promise_proline'),
    					innerHTML = '',curDomain = Meilishuo.config.domain;

    				if(data && data.length>0){
    					for(var i= 0 ;i<data.length;i++){
		    				innerHTML += ''+
								'<li '+(i==data.length-1?'class="last"':'')+'>'+
									'<a href="'+curDomain.www+'/help/return/" target="_blank" class="pro_ico"><img src="'+data[i].icon_pc +'"></a>'+
									'<p class="pro_tle"><a href="'+curDomain.www+'/help/return/" target="_blank">'+data[i].text+'</a></p>'+
									'<p><a href="'+curDomain.www+'/help/return/" target="_blank">'+data[i].mini_text+'</a></p>'+
								'</li>';
    					}

    					$ele.html(innerHTML)
    				}else{
    					$ele.hide();
    					$eleLine.hide();
    				}
    			},
    			data:{
    				twitter_id:CONSTANT.twitter_id,
    				sid:CONSTANT.sid,
    				shop_id:CONSTANT.shop_id
    			}
    		},
    		may_like:{
    			url:Meilishuo.config.domain.webapi+"/recommend/recommend_shopping_cart",
    			render:function(data){
    				//console.log(data)
    				var $eleLikeList = $('#like_list'),
    					$eleAttrword = $('#attr_words'),
    					innerHTML,curDomain = Meilishuo.config.domain;

                    if(CONSTANT.isAct || CONSTANT.isActBack){
                        data.attr_words = mod.business.getRandom(mod.business.linkData,6)
                    }

                    if(data.attr_words && data.attr_words.length>0){
                        innerHTML = '';
                        for(var i=0;i<data.attr_words.length;i++){
                            innerHTML += '<a class="words" href="'+curDomain.www + data.attr_words[i].url+'" target="_blank">'+data.attr_words[i].name+'</a>'
                        }
                        $eleAttrword.html(innerHTML);
                    }

    				if(data.goods && data.goods.length>0){
    					innerHTML = '';
    					for(var j=0;j<data.goods.length;j++){
    						innerHTML +=''+
    							'<li class="'+(i==0?'first':((data.goods.length-1)==j?'last':''))+'">'+
									'<div class="s_picBox">'+
										'<a class="s_pic" href="'+curDomain.www+data.goods[j].link_url+'" target="_blank" title="'+data.goods[j].goods_title+'"><img src="'+data.goods[j].image+'" /></a>'+
										(data.goods[j].horizontal_mark.length > 0 ? ('<img src="'+data.goods[j].horizontal_mark[0].img_url+'" width="'+data.goods[j].horizontal_mark[0].img_width+'" height="'+data.goods[j].horizontal_mark[0].img_height+'" class="horizontal_mark"/>'):'')+
									'</div>'+
									'<a class="txt" href="'+curDomain.www+data.goods[j].link_url+'" target="_blank">'+data.goods[j].goods_title+'</a>'+
									((data.goods[j].price == '')?('<p class="price_box"><span class="price_red">¥'+data.goods[j].original_price+'</span></p>'):
																	('<p class="price_box"><span class="price_red">¥'+data.goods[j].price+'</span><span class="price">¥'+data.goods[j].original_price+'</span></p>'))+
									(CONSTANT.isAct?('<p class="buy-numbers">'+(data.goods[j].cart_num || 0) +'人已加入购物车</p>'):('<p class="buy-numbers">'+(data.goods[j].sale_num || 0) +'人已购买</p>'))+
								'</li>'
    					}

    					$eleLikeList.html(innerHTML);
    				}else{
    					$eleLikeList.find('.loading').html('没有可以推荐的商品了哦！');
    				}
    			},
    			data:{
    				twitter_id:CONSTANT.twitter_id,
    				sid:CONSTANT.sid,
    				shop_id:CONSTANT.shop_id,
                    needAttr:1
    			}
    		}
    	},
        buildDocData: function(){
        },
        updateDoc: function(){
        }
    };

    var init = function(){
        $(document).ready(function(){
            getData.call(mod);
            bindEvents.call(mod);
            initComponents.call(mod);
        })
    }

    var getData = function() {
    	var rendData = mod.business.rendData,
    		callbackName;

        shopping_carts.clearCartsNumCache();//获取购物车数据

    	for(var item in rendData){
    		if(mod.business.rendData.hasOwnProperty(item)){
    			requestUrl = '?';
    			//callbackName = 'callback_' + new Date().getTime(),requestUrl;
    			callbackName = 'callback_' + item;

    			for(var subItem in rendData[item].data){
    				requestUrl +=  subItem + '=' + rendData[item].data[subItem] + '&';
    			}

    			CONSTANT = CONSTANT || {};

    			CONSTANT[callbackName] = (function(curItem){
    				return function(data){
    					rendData[curItem].render(data);
    				}
				})(item)

    			requestUrl += '__callback=CONSTANT.'+callbackName;

    			$.getScript(rendData[item].url + requestUrl)
    		}
    	}
    }

    var bindEvents = function() {

    }

    var initComponents = function(){
    }

    init();
});