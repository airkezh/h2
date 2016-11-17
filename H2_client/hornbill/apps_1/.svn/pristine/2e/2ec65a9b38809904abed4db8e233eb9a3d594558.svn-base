fml.define('order_pc/order/orderList', ['jquery',
  'component/focus',
  'component/shareTmp',
  'ui/alert', 'ui/confirm', 'ui/dialog', 'ui/uploadBtn'
], function(require, exports) {
  var $ = require('jquery');
  var Alert = require('ui/alert');
  var Confirm = require('ui/confirm');
  var shareTmp = require(
    'component/shareTmp')
  var Focus = require(
      'component/focus'),
    dialog = require('ui/dialog');
  $(function() {
    var form = $('#orderListForm'),
      selectStatus = $('#orderStatus')

    selectStatus.on('change', function() {
      form.submit();
    });

    $('.well .js-close-tip-btn').click(function(){
      $(this).parent().remove();
    });

    /*付款成功跳转列表页提前显示二维码弹窗*/
    // if( location.href.search('is_popup')!=-1 && success_pay==1){
    // 	var html = shareTmp("shaidan_alert");
    // 	var close = new dialog({title : "温馨提示" , width : 385 , content : html });


    // 	$('#closeDialog').click(function(){
    // 		if($('#no_tips').is(':checked')){
    // 			$.ajax({
    // 				type:'post'
    // 				,url:'/aj/doota/qr_close'
    // 			})
    // 		}
    // 	});
    // }


    $('.extend_receive_btn').click(function() {
      var tip = "确定要延长收货时间吗？<br/>系统默认延长5天，一个订单只能延长一次！";
      var dlg = new Confirm({
        title: "延长收货",
        width: 360,
        content: tip,
        confirmTxt: "确认延长"
      });
      var order_id = $(this).data('orderid');
      var btn = $(this);
      dlg.onSure(function() {
        $.get('/aj/order/extend_receive?order_id=' + order_id + '&type=2', function(data) {
          if (data.code == '0') {
            var alertDlg = new dialog({
              width: 370,
              content: '<p style="padding: 20px 10px;text-align:center;">您已经申请延长5天收货，请耐心等待！^_^</p>'
            });
            btn.remove();
            setTimeout(function() {
              alertDlg.destory();
            }, 3000)
          } else {
            new Alert({
              width: 370,
              content: '延长收货失败'
            });
          }
        }, 'json');
      });
    });

    $('.confirm_receive_btn').click(function(event) {
      var btn = $(this);
      event.preventDefault();
      var confirmPanel = new Confirm({
        width: 380,
        content: '您是否要对当前订单中的商品确认收货？',
        discover: true
      });
      confirmPanel.onSure(function() {
        var goods = [];
        var parents = btn.parents('tbody.order_list');
        $.each($('.order_goods_list', parents), function(index, item) {
          goods.push($(item).data('mid'));
        });
        var data = {
          order_id: btn.data('orderid'),
          mid: goods.join(',')
        };
        $.post('/aj/doota/order_recv', data, function(result) {
          if (result.code == 0) {
            window.location.reload();
          } else {
            new Alert({
              width: 370,
              content: '确认收货失败'
            });
          }
        }, 'json');
      });
    });

    //我要投诉弹窗
    $('.opinion').on('click', function() {
      var self = $(this);
      var html = shareTmp("complain_dialog");
      var close = new dialog({
        title: "我要投诉",
        width: 610,
        content: html
      });
      Focus.inputFocus('#complain_info');
      //上传图片
      var uploadButton = $('#uploadImg'),
        uploadBtn = require('ui/uploadBtn');
      $('.imgUpload span.close').live('click', function() {
        $(this).parent().remove();
      });
      uploadBtn.bind(uploadButton, {
        'behind': Meilishuo.config.domain.webapi + '/imageupload/pic_upload?big=1'
          //'behind' : 'http://webapi.pmlab1.meilishuo.com/imageupload/pic_upload?big=1'
          ,
        crossDomain: true
          //,backuri : 'http://order_pc.fedevot.meilishuo.com/aw/proxy/'
          ,
        backuri: Meilishuo.config.domain.order + '/aw/proxy/',
        'success': function(data, obj) {
          if (typeof data.code != 'number') {
            var imgWrapper = $('.evidence');
            if (imgWrapper.children().length >= 4) {
              return new Alert({
                width: 370,
                content: '最多上传4张图片！'
              });
            } else {
              imgWrapper.append(shareTmp('imgTmp', data));
              imgWrapper.nextAll('.wrong_tip').html('');
            }
          } else {
            return new Alert({
              width: 370,
              content: data.msg
            });
          }
        },
        'error': function() {

        },
        'timeout': 30000
      });
      uploadButton.parent('.ntBdaolpu').css({
        width: '92px',
        height: '30px',
        float: 'left'
      });

      //取消按钮
      $('.com_cancel').on('click', function() {
        $('#closeDialog').click();
      })

      //radio click
      $(':radio[name="feed_type"]').click(function() {
        if ($(this).attr('must')) {
          $('.optional').show();
        } else {
          $('.optional').hide();
        }
      })


      $('#complain_info').keyup(function() {
          $('.text_num span').text($(this).val().length);
          if ($(this).val().length > 500) {
            $(this).val($(this).val().substring(0, 500));
            new Alert({
              width: 370,
              content: '文字不能超过500个字符'
            })
          }
        })
        //确定按钮
      $('.com_submit').on('click', function() {
        //投诉内容
        var feed_detail = $.trim($('#complain_info').val());
        if (feed_detail.length < 1 || feed_detail == $('#complain_info').attr('placeholder')) {
          new Alert({
            width: 380,
            content: '投诉内容不能为空'
          });
          return false;
        }
        //上图图片凭证
        var complain_evidence = $('.evidence img').map(function(i, img) {
          return $(img).attr('data-src');
        }).toArray();
        if ($('.optional').is(':visible')) {
          if (complain_evidence.length < 1) {
            new Alert({
              width: 380,
              content: '请上传图片'
            });
            return false;
          }
        }

        $.ajax({
          type: 'post',
          url: '/aj/doota/feedback_add',
          data: {
            bat_order_id: self.attr('order_id'),
            feed_type: $('input[name="feed_type"]:checked').val(),
            feed_detail: feed_detail,
            feed_img: complain_evidence
          },
          dataType: 'json',
          success: function(data) {
            if (data.code == 0) {
              // var html = shareTmp("complain_suc");
              var TipText = '';
              if (data.info.is_push == 1) { // 推动给平台
                TipText = {'TipText': '感谢您的反馈！您在购物中遇到的不愉快经历，客服会联系您进行处理！'};
              } else { // 推动给商家
                TipText = {'TipText': '您的投诉将由商家为您处理，如商家在48小时内未解决您的问题，将由美丽说平台介入处理！'};
              }
              var html = shareTmp("complain_suc", TipText);

              var close = new dialog({
                title: "美丽提示",
                width: 360,
                content: html
              });
              $('#closeDialog').click(function() {
                self.text('投诉详情');
                self.removeClass('opinion').addClass('red_f');
                self.attr('href', '/complain/?bat_order_id=' + self.attr('order_id')).off('click');
              });
              $('.suc_close').click(function() {
                $('#closeDialog').click();
              });
            } else {
              new Alert({
                width: 380,
                content: data.msg
              });
            }
          },
          error: function(data) {
            new Alert({
              width: 380,
              content: '系统错误，请重新提交'
            });
          }
        })

      });

    })

    /* 合并支付的订单：取消订单 */
    $('.merged_order_cancel').click(function(e) {
      e.preventDefault();
      var self = $(this);
      var confDlg = new Confirm({
        title: '温馨提示',
        width: 360,
        content: '<div class="order-cancel-dlg">您确定要取消订单吗？（如果您完成了支付，取消订单后，系统将在3-15个工作日内自动为您退款）' +
          '<div class="ckb-container"><input type="checkbox" id="x_goto_cart"><label for="x_goto_cart">取消后将商品重新加入购物车</label></div></div>'
      });
      confDlg.onSure(function() {
        $.post('/aj/doota/order_close_multi', {
          total_id: self.attr('data-totalid'),
          back_to_cart: $('#x_goto_cart').is(':checked') ? 1 : 0
        }, function(res) {
          if (res.code == 0) {
            if (res.select_sid) {
              location.href = '/cart/?select_sid=' + res.select_sid;
            } else {
              location.reload(true);
            }
          } else {
            new Alert({
              content: res.msg || '当前操作无效！',
              width: 360
            });
          }
        }, 'json');
      });
    });
  });
});
