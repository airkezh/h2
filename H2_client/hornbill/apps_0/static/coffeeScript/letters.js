(function() {

  fml.define('app/letters', ['jquery', 'app/sendMessage', 'component/regString', 'app/login', 'component/shareTmp', 'ui/dialog'], function(require, exports) {
    var $, dialog, login, regString, send, shareTmp;
    $ = require('jquery');
    shareTmp = require('component/shareTmp');
    dialog = require('ui/dialog');
    login = require('app/login');
    regString = require('component/regString');
    send = require('app/sendMessage');
    return function() {
      return $("#sendPrivateLetter").live(function() {
        var close, html, showCode;
        if (Meilishuo.config.user_id === 0) {
          login.showLoginWin();
          return false;
        }
        showCode();
        html = shareTmp("loginMessage");
        close = new dialog({
          title: "发送私信",
          width: 470,
          content: html
        });
        $(".toNickName").val($(this).attr('name'));
        $('.codeimg').bind('click', function() {
          return showCode();
        });
        $(".sendsubmit").bind('click', function() {
          var errorMsg;
          if ($('.toMsgCont').val() === '') {
            errorMsg = '内容不能为空';
            $('.tipBox').html(errorMsg.show());
            return false;
          }
          if ($('.checkCodeText').val() === '') {
            errorMsg = '验证码不能为空';
            $('.tipBox').html(errorMsg.show());
            reutrn(false);
          }
          if (!regString.WidthCheck($('.toMsgCont').val(), 200)) {
            $('.tipBox').html('您输入的字数超过200字').show();
            reutrn(false);
          }
          return send.sendMessage('.toNickName', '.toMsgCont', '.tipBox', function() {
            return close.drive.destroyModel();
          });
        });
        return showCode = function() {
          var callback, data, url;
          url = '/server/ajax_changeCheckCode';
          data = {};
          callback = function(response) {
            return $('.codeimg').html(response);
          };
          return $.post(url, data, callback);
        };
      });
    };
  });

}).call(this);
