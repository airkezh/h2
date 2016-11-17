/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');

var ruleData;
//活动规则数据
$.post("/aj/huodong/main_venue_rule",{"actid": 49}, function(data) {
    if (data.code == 0) {
        ruleData = data.data;
    }
}, "json");

//活动规则
//活动规则
$(".rule").on("click", function() {
    if (ruleData) {
        var tpl = shareTmp('rule_tpl',{"ruleData" : ruleData});
        $("body").append(tpl);
    }

});

$("body").on("click", ".rule_dialog_btn", function() {
    $(".rule_dialog").remove();
    $(".shade").remove();
});

$("body").on("click", ".rule_close_btn", function() {
    $(".rule_dialog").remove();
    $(".shade").remove();
});