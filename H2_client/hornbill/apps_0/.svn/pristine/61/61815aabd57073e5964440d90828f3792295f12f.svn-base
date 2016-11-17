fml.define('order_pc/shop/shop_comment_change' , ['jquery','ui/alert','component/serializeObject'] , function(require , exports){
    var alert = require('ui/alert');
    $('.com_btn').click(function(){
        var _this = $(this),
            _main = $('.comment-main'),
            _form = _main.find('.j-form'),
            _service = $('.j-form-service'),
            _textarea = _main.find('textarea'),
            data = {},
            _tip = 0,
            _arr = [];

        for (var i = _textarea.length - 1; i >= 0; i--) {
            if(_textarea.eq(i).val().length > 500){
                _textarea.eq(i).parents('.j-form').find('.comment_notice').show().children('b').text('评论文字过长，请修改后重新提交。');
                _textarea.eq(i).parents('.j-form').find('textarea').css('border','2px #f69 solid');
                var _scrollTop = _textarea.eq(i).parents('.j-form').find('textarea');
                $('body,html').stop(true , true).animate({ scrollTop: _scrollTop.offset().top - _scrollTop.height()}, 300);
                _tip ++;
            }else if($.trim(_textarea.eq(i).val()) =='' && _textarea.eq(i).parents('.j-form').find('input[name = level]').val() == 1){
                _textarea.eq(i).parents('.j-form').find('.comment_notice').show().children('b').text('请对不满意的商品填写评价内容');
                _textarea.eq(i).parents('.j-form').find('textarea').css('border','2px #f69 solid');
                var _scrollTop = _textarea.eq(i).parents('.j-form').find('textarea');
                $('body,html').stop(true , true).animate({ scrollTop: _scrollTop.offset().top - _scrollTop.height()}, 300);
                _tip ++;
            }else {
                _textarea.eq(i).parents('.j-form').find('.comment_notice').hide();
                _textarea.eq(i).parents('.j-form').find('textarea').css('border','1px #e6e6e6 solid');
            }
        }
        if (_tip) {
            return;
        };
        for (var i = 0; i < _form.length; i++) {
            _arr[i] = _form.eq(i).serializeObject();
        };
        data.goodsComments = _arr;
        data.shopComments = _service.eq(0).serializeObject();
        data.order_id = _main.find('.order-id').attr('data');
        data.anonymous = $('.check_box').attr('checked') ? 1 : 0;
        //console.log(data);
        $.post('/aj/comment_new/save',data,function(msg){
            if (msg.error_code) {
                if (msg.data && msg.data.mid) {
                    var _this = $('input[value="' + msg.data.mid + '"]').prev('.comment-cont').find('.comment_notice');
                    _this.children('b').text(msg.message);
                    _this.show();
                    $('body,html').stop(true , true).animate({ scrollTop:_this.offset().top - _this.parents('.comment-cont').height()}, 300);
                }else{
                    new alert({
                        content: '亲，你还未完成全部商品或服务的评分哦',
                        width: 370
                    });
                }
            }else{
                $('.com_btn').val('评论成功');
                setTimeout(function(){
                  window.location.href = '/order/';
                },2000);
            }
        },'json')
    });
    var tipbubble=$('.tipbubble');
    var scoreinfo=['1分&nbsp;很不满意','2分&nbsp;不满意','3分&nbsp;一般','4分&nbsp;满意','5分&nbsp;很满意'];
    $('.starItem li').hover(function(){
        var _this = $(this),
            _parent = _this.parents('.starItem'),
            _li = _parent.find('li'),
            _gray = _li.index(_this);
        for (var i = 0; i < _gray + 1; i++) {
            _li.eq(i).addClass('yellow_star').removeClass('gray_star');
        };
        for (var i = _gray + 1; i < _li.length; i++) {
            _li.eq(i).addClass('gray_star').removeClass('yellow_star');
        };
        tipbubble.find('.tipcontent span').html(scoreinfo[_gray]||'').end().find('.tipcontent p').html(_this.attr('info')||'');
        if(!tipbubble.hasClass('tshow')){
            tipbubble.addClass('tshow').css({'top': _this.offset().top+_this.height()+15+'px','left':_this.offset().left-(tipbubble.width()/2)+_this.width()/2+'px'});}
    }, function() {
        var _this = $(this),
            _parent = _this.parents('.starItem'),
            _li = _parent.find('li'),
            _gray = _li.index(_parent.find('.j-gray'));
        if (_gray === -1) {_gray = 5};
        for (var i = 0; i < _gray; i++) {
            _li.eq(i).addClass('yellow_star').removeClass('gray_star');
        };
        for (var i = _gray; i < _li.length; i++) {
            _li.eq(i).addClass('gray_star').removeClass(['yellow_star','j-gray']);
        };
        tipbubble.css('left','-999px').removeClass('tshow');
    }).click(function(event) {
        var _this = $(this),
            _parent = _this.parents('.starItem'),
            _li = _parent.find('li'),
            _gray = _li.index(_this),
            _array = ['很不满意','不满意','一般','满意','很满意'];
        if(_parent.parents('dl').hasClass('shop-info')){
            if(_gray<=1){
                _this.parent('ul').attr('mark','1');
            }else{
                _this.parent('ul').attr('mark','0');
            }
            var markcount=0;
            _parent.parents('.shop-info').find('.starItem').each(function(){
                markcount+=window.parseInt($(this).find('ul').attr('mark'));
            })
            if(markcount>0){
                _parent.parent().next().find('.txtarea .placeholder').html('一次不愉快的购物体验，我要写出不满意的原因 ಠ_ಠ');
            }else{
                _parent.parent().next().find('.txtarea .placeholder').html('分享购物体验，帮助众多爱美丽 (*^_^*)');
            }
        }
        for (var i = 0; i < _gray + 1; i++) {
            _li.eq(i).addClass('yellow_star').removeClass(['gray_star','j-gray']);
        };
        for (var i = _gray + 1; i < _li.length; i++) {
            _li.eq(i).addClass('gray_star').removeClass(['yellow_star','j-gray']);
        };
        _li.removeClass('j-gray');
        _this.next().addClass('j-gray');
        _this.parents('ul').next('input').val(_gray + 1);
        var _em = _this.parents('ul').nextAll('.point').find('em');
        _em.eq(0).html((_gray + 1) + '分');
        _em.eq(1).html(_array[_gray]);
    });
    $('.placeholder').on('click',function(){
        $(this).next().focus();
    });
    $('textarea').on({
        keyup:function(){
            var _this = $(this);
            _this.parents('.j-form').find('input[name="content"]').val(_this.val());
        },
        focus:function(){
            $(this).prev().hide();
        },
        blur:function(){
            if($.trim($(this).val()) == ''){
                $(this).prev().show();
            }
        }
    });


    $('.flower').click(function(){
        var _score = $(this).attr('score');
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings('input').val( _score );
        if(_score == 1){
            $(this).parents('.comment-cont').find('.txtarea .placeholder').html('一次不愉快的购物体验，我要写出不满意的原因 ಠ_ಠ');   
        }else if( _score == 3){
            $(this).parents('.comment-cont').find('.txtarea .placeholder').html('分享购物体验，帮助众多爱美丽 (*^_^*)');   
        }else{
            $(this).parents('.comment-cont').find('.txtarea .placeholder').html('买到好东西了！马上写点评价得瑟一下（≧≦）');   
        }
    });

      $('.rate-tag').click(function(){
        var $this = $(this);
        if( $this.hasClass('active') ){
            $this.removeClass('active');
        }else{
            $this.addClass('active');
        }
        var arr = [];
        $this.parent().find('.active').each(function(){
            arr.push($(this).attr('tag'));
        });
        $(this).siblings('input').val( arr.join(',') );
    });
});
