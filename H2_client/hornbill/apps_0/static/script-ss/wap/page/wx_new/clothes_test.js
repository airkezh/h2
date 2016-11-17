/*common*/
var $ = require('wap/zepto')
	,Alert = require('wap/ui/alert')
var  btn_next = $(".btn_next")
	,btn_pre = $(".btn_pre")
	,btn_success = $(".btn_success")
	,i = 0
	,boxLi = $(".box > li")
	,qstLi = $(".qst_list li")
	,arr =[]
	,only_one = $(".only_one")
	,more_sel = $(".more_select_box").data("number")


/*下一步*/

btn_next.on("click",function(){
	if(i!=0 ){
		var box_s = $(".page" + i + " .box .selected");
		if(box_s.length ==0){
			new Alert({
				content : "请至少选择一个"
			});
			return;
		}	
	}
	if(i==0){
		arr[0]="";
		for(var j =0 ; j< $("[selected]").length;j++){
			var sid = $("select")[j].selectedIndex;
				arr[0] += $('.select_mask .select_html').eq(j).html()+",";				
			if(sid==0){
				new Alert({
						content : "请全部选择"
					});
				return;
			}
		}
		arr[0] = arr[0].substring(0,arr[0].length-1);
	}
	btn_pre.show();
	$(".page"+i).hide();
	i=i+1;
	$(".page"+i).show();
	if(i==5){
		btn_next.hide();
		btn_success.show();
	}
	
});
/*上一步*/
btn_pre.on("click",function(){
	if(i==1){
		btn_pre.hide();
	}
	$(".page"+i).hide();
	i=i-1;
	$(".page"+i).show();
	if(i==4){
		btn_success.hide();
		btn_next.show();

	}
});

/*page1,2,3,4*/
boxLi.on('click',function(){
	var select_src = $(this).children("img").attr("src");
	var select_img = $(this).children("img").data("img");
		if(!$(this).hasClass("selected")){
			var box_s = $(".page" + i + " .box .selected");
			if(box_s.length){
					var others_src = box_s.children("img").attr("src");
					var others_img = box_s.children("img").data("img");
					box_s.children("img").attr("src",others_img).data("img",others_src);
					box_s.removeClass("selected");
				}
		$(this).addClass("selected");
		$(this).children("img").attr("src",select_img).data("img",select_src);
		arr[$(this).data("num")]=$(this).data("value");
	}
})

$(".p_age,.p_height,.p_weight").on("change",function(){
	var se_val = $(this).val();
	if(!se_val){
		se_val = $(this).find('[selected]').text();
	}
	$(this).parent().children("span").html(se_val);
}).val('').trigger('change')

/*page5*/
qstLi.on("click",function(){
	only_one.on("click",function(){
		if(only_one.length!=1){
			$(this).siblings(".only_one").removeClass("on_select");
		}
	});	
	$(this).toggleClass("on_select");
});

/*完成*/
btn_success.on("click",function(){
	var answerVal=""
		,on_select = $(".page5 ul .on_select");
	if(on_select.length==0){
			new Alert({
				content : "请至少选择一个选项"
			});
			return;
	}
	arr[more_sel]="";
	on_select.each(function(index,data){
		arr[more_sel] += $(data).data("val")+",";
	});
	arr[more_sel] = arr[more_sel].substring(0,arr[more_sel].length-1);
	arr.forEach(function(data,index){                        
		answerVal += "&answer"+index+"="+ data;
	});
	var wx_from = fml.vars.wx_from ? ('&wx_from='+fml.vars.wx_from) : '';
	window.location.href= window.location.protocol+'//'+window.location.host+'/wx/clothes_test/result/?test='+answerVal+wx_from
})



