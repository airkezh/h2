fml.define('order_app/appeal/appeal', ['order_app/common/zepto', 'order_app/common/zepto/touch', 'order_app/common/component/callQQ',
    'order_app/common/component/uploadBtn', 'order_app/common/app/alert', 'order_app/common/client/common',
    'order_app/common/app/loading', 'order_app/common/client/clientUse'], function (require, exports) {
    var callQQ = require('order_app/common/component/callQQ')
        , uploadBtn = require('order_app/common/component/uploadBtn')
        , m_alert = require('order_app/common/app/alert')
        , common = require('order_app/common/client/common')
        , loading = require('order_app/common/app/loading')
        , clientUse = require('order_app/common/client/clientUse');
    var uploadButton = $('.pic_upload');
    if (!CONSTANT.flow) {
        $(".status h3").css('margin-top','0px');
    };
    if (Meilishuo.config.isNewest || Meilishuo.config.isApad) {
        //4.2调用客户端
        function bindUploadParam(data, btn) {
            var imgWrapper = $('#img_wrapper')
                , nowUpBtn = $(btn);
            if (nowUpBtn.hasClass('addBtn')) {
                if (imgWrapper.children().length < 6) {
                    clientUse.callClient.bindUpload($('<a class="pic pic_upload addBtn" href="javascript:;"></a>').insertAfter(nowUpBtn), bindUploadParam);
                }
                nowUpBtn.removeClass('addBtn').prepend('<img class="imgUpload" width="100%" height="100%" src="' + data.H_pic_url + '" data="' + data.o_pic_url + '"/>')
            } else {
                nowUpBtn.find('.imgUpload').attr({'src': data.H_pic_url, 'data': data.o_pic_url });
            }
        }
        clientUse.callClient.bindUpload(uploadButton, bindUploadParam);
    } else {
        var uploadFn = {
            'behind': '/imageupload/pic_upload', 'success': function (data, obj) {
                if (typeof data.code != 'number') {
                    var imgWrapper = $('#img_wrapper')
                        , nowUpBtn = $(obj);
                    if (nowUpBtn.hasClass('addBtn')) {
                        if (imgWrapper.children().length < 6) {
                            uploadBtn.bind($('<a class="pic pic_upload addBtn" href="javascript:;"></a>').insertAfter(nowUpBtn), uploadFn);
                        }
                        nowUpBtn.removeClass('addBtn').prepend('<img class="imgUpload" width="100%" height="100%" src="' + data.H_pic_url + '" data="' + data.o_pic_url + '"/>')
                    } else {
                        nowUpBtn.find('.imgUpload').attr({'src': data.H_pic_url, 'data': data.o_pic_url });
                    }
                } else {
                    m_alert({ dialogContent: data.msg });
                }
            }, 'error': function (p) {
                m_alert({dialogContent: p.description});
            }, plusData: {'big': 1}, start: function () {
                loading.start();
            }, final: function () {
                loading.stop();
            }
        };
        uploadBtn.bind(uploadButton, uploadFn);
    }

    callQQ($('.qq'));

    //提交举证
    $('.js_submit_appeal').on('tap', function () {
        var wrapper = $('.js_prove_info')

        //验证非空
        var notNulls = [
            {name: 'description', tip: '请填写申诉说明'}
            ,
            {name: 'concact', tip: '请填写联系人'}
            ,
            {name: 'phone', tip: '请填写手机号'}
        ];
        for (var i = 0; i < notNulls.length; i++) {
            var name = notNulls[i].name
                , tip = notNulls[i].tip
            var $name = wrapper.find('[name=' + name + ']')
            if (!$.trim($name.val())) {
                return m_alert({ dialogContent: tip  });
            }
        }
        if (!common.isLowVersion() && !wrapper.find('.imgUpload').length) {
            m_alert({ dialogContent: '请上传申诉凭证' });
            return;
        }

        //手机号
        if (!/1\d{10}/g.test(wrapper.find('[name=phone]').val())) {
            return m_alert({ dialogContent: '手机号格式不正确' });
        }

        postForm();

        function postForm() {
            var pics = []
                , as = wrapper.find('.imgUpload')
            for (var i = 0; i < as.length; i++) {
                pics.push(as.eq(i).attr('data'));
            }
            var data = {
                description: wrapper.find('[name=description]').val(),
                concact: wrapper.find('[name=concact]').val(),
                phone: wrapper.find('[name=phone]').val(),
                pics: pics,
                refund_id: Meilishuo.config.refundId
            };
            $.post('/bizaj/doota/appeal_initiate', data, function (data, textStatus, xhr) {
                m_alert({
                    dialogContent: '提交成功',
                    onClose: function () {
                        window.location.href = '/app/refund/detail/?refund_id=' + Meilishuo.config.refundId;
                    }
                });
            }, 'json');
        }
    });
});
