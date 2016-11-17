/*common*/
var $ = require('jquery')
    ,shareTmp = require('component/shareTmp')
    ,urlHandle = require("wap/component/urlHandle")
    ,urlParams = urlHandle.getParams(window.location.search);


var $userInfoObj = $(".tdc");
$userInfoObj.eq(0).append(urlParams.nickname);
$userInfoObj.eq(1).append(urlParams.toid) ;
var virtual_data;
aa();
$.ajax({
    url : "/windows/aj/recent_order",
    data:{
        to : urlParams.toid
    },
    type : "get",
    dataType : "json",
    timeout : 5000,
    success : function(res) {
        var orders = (res.data && res.data.datas) ? res.data.datas : []
        $('.order-list').append(shareTmp('order_list_tpl',{data:orders}))
    },
    complete : function(xhr, status) {
        if (status == "timeout") {
            alert("请求超时！");
        } else if (status == "error") {
            console.error("请求订单出错:" + xhr.responseText);
            //$(".order-list").append(shareTmp("order_list_tpl", {data : virtual_data.data.datas}));
        }
    }
});


function aa() {
    virtual_data = {
        "code":0,
        "data":{
            "datas":[
                {
                    "id":14111886898661,
                    "url":"https:\/\/shop.meilishuo.com\/order\/order_detail\/14111886898661",
                    "goods":[
                        {
                            "twitter_id":"2160157427",
                            "title":"【测试商品】【内测商品】不退款...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/22\/47\/feccca5a3889c0cbd66aad80346b_400_541.c6.jpg",
                            "price":"9699.03",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"军绿色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"均码",
                                    "is_show":1
                                }
                            ]
                        },
                        {
                            "twitter_id":"2160157427",
                            "title":"【测试商品】【内测商品】不退款...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/22\/47\/feccca5a3889c0cbd66aad80346b_400_541.c6.jpg",
                            "price":"9699.03",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"军绿色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"均码",
                                    "is_show":1
                                }
                            ]
                        }
                    ],
                    "goods_count":"1",
                    "total_price":"9699.03",
                    "status":"交易关闭",
                    "date":"2014-11-18 13:04",
                    "income":"0.00",
                    "comment ":"留言测试",
                    "charge":0,
                    "pay_time":"",
                    "service":[
                        {
                            "sid":"9029416",
                            "order_id":"14111886898661",
                            "service_uid":"765",
                            "service_nickname":"商家备注",
                            "service_type":"10",
                            "comment":"订单备注",
                            "send_message":"2",
                            "ctime":"2014-11-18 15:32"
                        }
                    ],
                    "coupons":{
                        "shop":"",
                        "plat":""
                    },
                    "address":{
                        "addr_id":"27861780",
                        "postcode":"100000",
                        "is_default":"1",
                        "nickname":"徐妹妹",
                        "phone":"18801101231",
                        "pid":"1",
                        "cid":"1",
                        "did":"5",
                        "address":"北京市朝阳区北京市朝阳区 ",
                        "street":"北京市朝阳区 百子湾西里 403号 ",
                        "province":"北京",
                        "city":"北京",
                        "district":"朝阳区",
                        "id_number":0
                    }
                },
                {
                    "id":141020539579,
                    "url":"https:\/\/shop.meilishuo.com\/order\/order_detail\/141020539579",
                    "goods":[
                        {
                            "twitter_id":"2683289117",
                            "title":"【测试商品】【内测商品】测试商...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/eb\/b3\/069daee516c2a96b6ab964b8a6d8_667_900.c6.jpg",
                            "price":"800.00",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"黑色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"-",
                                    "is_show":0
                                }
                            ]
                        }
                    ],
                    "goods_count":"1",
                    "total_price":"800.00",
                    "status":"交易关闭",
                    "date":"2014-10-20 15:08",
                    "income":"0.00",
                    "comment ":"",
                    "charge":0,
                    "pay_time":"",
                    "service":[

                    ],
                    "coupons":{
                        "shop":"",
                        "plat":""
                    },
                    "address":{
                        "addr_id":"13484245",
                        "postcode":"",
                        "is_default":"-1",
                        "nickname":"受严",
                        "phone":"15010990600",
                        "pid":"4",
                        "cid":"16",
                        "did":"250",
                        "address":"山西省阳泉市平定县222",
                        "street":"222",
                        "province":"山西",
                        "city":"阳泉",
                        "district":"平定县",
                        "id_number":0
                    }
                },
                {
                    "id":141020240927,
                    "url":"https:\/\/shop.meilishuo.com\/order\/order_detail\/141020240927",
                    "goods":[
                        {
                            "twitter_id":"2683289117",
                            "title":"【测试商品】【内测商品】测试商...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/eb\/b3\/069daee516c2a96b6ab964b8a6d8_667_900.c6.jpg",
                            "price":"800.00",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"黑色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"-",
                                    "is_show":0
                                }
                            ]
                        },
                        {
                            "twitter_id":"2160157427",
                            "title":"【测试商品】【内测商品】不退款...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/22\/47\/feccca5a3889c0cbd66aad80346b_400_541.c6.jpg",
                            "price":"9699.03",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"军绿色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"均码",
                                    "is_show":1
                                }
                            ]
                        },
                        {
                            "twitter_id":"2160157427",
                            "title":"【测试商品】【内测商品】不退款...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/22\/47\/feccca5a3889c0cbd66aad80346b_400_541.c6.jpg",
                            "price":"9699.03",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"军绿色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"均码",
                                    "is_show":1
                                }
                            ]
                        },
                        {
                            "twitter_id":"2160157427",
                            "title":"【测试商品】【内测商品】不退款...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/22\/47\/feccca5a3889c0cbd66aad80346b_400_541.c6.jpg",
                            "price":"9699.03",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"军绿色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"均码",
                                    "is_show":1
                                }
                            ]
                        }
                    ],
                    "goods_count":"1",
                    "total_price":"800.00",
                    "status":"交易关闭",
                    "date":"2014-10-20 14:56",
                    "income":"0.00",
                    "comment ":"",
                    "charge":0,
                    "pay_time":"",
                    "service":[

                    ],
                    "coupons":{
                        "shop":"",
                        "plat":""
                    },
                    "address":{
                        "addr_id":"13484245",
                        "postcode":"",
                        "is_default":"-1",
                        "nickname":"受严",
                        "phone":"15010990600",
                        "pid":"4",
                        "cid":"16",
                        "did":"250",
                        "address":"山西省阳泉市平定县222",
                        "street":"222",
                        "province":"山西",
                        "city":"阳泉",
                        "district":"平定县",
                        "id_number":0
                    }
                },
                {
                    "id":141020810165,
                    "url":"https:\/\/shop.meilishuo.com\/order\/order_detail\/141020810165",
                    "goods":[
                        {
                            "twitter_id":"2683289117",
                            "title":"【测试商品】【内测商品】测试商...",
                            "thumb":"http:\/\/124.202.144.17\/pic\/b\/eb\/b3\/069daee516c2a96b6ab964b8a6d8_667_900.c6.jpg",
                            "price":"800.00",
                            "attr":[
                                {
                                    "name":"颜色",
                                    "value":"黑色",
                                    "is_show":1
                                },
                                {
                                    "name":"尺码",
                                    "value":"-",
                                    "is_show":0
                                }
                            ]
                        }
                    ],
                    "goods_count":"1",
                    "total_price":"800.00",
                    "status":"交易关闭",
                    "date":"2014-10-20 14:56",
                    "income":"0.00",
                    "comment ":"",
                    "charge":0,
                    "pay_time":"",
                    "service":[

                    ],
                    "coupons":{
                        "shop":"",
                        "plat":""
                    },
                    "address":{
                        "addr_id":"13484245",
                        "postcode":"",
                        "is_default":"-1",
                        "nickname":"受严",
                        "phone":"15010990600",
                        "pid":"4",
                        "cid":"16",
                        "did":"250",
                        "address":"山西省阳泉市平定县222",
                        "street":"222",
                        "province":"山西",
                        "city":"阳泉",
                        "district":"平定县",
                        "id_number":0
                    }
                }
            ],
            "url":"https:\/\/shop.meilishuo.com\/order\/?buyer_nickname=%E7%94%B5%E5%8A%A8%E5%B0%8F%E5%96%B5%E8%BE%BE",
            "offset":4,
            "is_last":0
        }
    }
}

