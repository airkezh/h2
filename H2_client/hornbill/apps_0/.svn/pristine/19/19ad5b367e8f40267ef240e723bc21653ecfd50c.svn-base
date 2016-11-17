/*common*/
return {
    trimLR: function (str) {
        return str.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
    },
    keyCode: {
        BACKSPACE: 8,
        ENTER: 13,
        ESCAPE: 27,
        LEFT: 37,
        Right: 39,
        UP: 38,
        DOWN: 40
    },
    subs: function (str, len, hasDot) {
        var newLength = 0;
        var newStr = "";

        var singleChar = "";
        var strLength = str.replace(/[^\x00-\xff]/g, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(/[^\x00-\xff]/g) != null) {
                newLength += 2;
            }
            else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;

    },
    overlay: function (btn, text) {
        var c_err = $('.comment-err'),
            height = btn.height(),
            width = btn.width();
        !text && (text = '请勾选原因或给MIXI反馈,谢谢~~');
        var css = {
            top: btn.offset().top - height + 'px',
            left: btn.offset().left + width / 2 + 'px'
        }
        if (c_err.length == 0) {
            var tmp = $('<div class="comment-err">' + text + '</div>').css(css);
            tmp.appendTo($('body'));
            setTimeout(function () {
                tmp.hide();
            }, 1000)
        } else {
            c_err.text(text).css(css).show();
            setTimeout(function () {
                c_err.hide();
            }, 1000)
        }
    },
    strLen: function (str) {
            return str.replace(/[^\x00-\xff]/g, "**").length;
    }
}