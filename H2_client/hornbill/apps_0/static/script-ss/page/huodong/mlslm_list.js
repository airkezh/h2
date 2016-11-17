/*common*/
var $ = require('jquery'),
        scroll = require('component/windowScroll'),
        subNav = $('.head-top'),
        subOrgParent = subNav.parent(),
        subHolder = $('#navbar .sec_nav'),
        wheader = $('#navbar').find('.wheader,.sale_nav');

    if (!subNav.length) return
    var frstNavHeight = $('#navbar').find('.wheader').height();
    var y = subNav.offset().top - frstNavHeight
    scroll.yIn(y, function() {
        subHolder.append(subNav)
        wheader.stop().animate({
            'margin-top': -frstNavHeight
        }, function() {
            if (subNav.parent().is(subHolder)) $(this).hide()
        })
        $('#head').css('height', '100px');
        subNav.addClass('shadow');
    }, function() {
        subOrgParent.prepend(subNav)
        wheader.show().stop().animate({
            'margin-top': 0
        })
        $('#head').css('height', '');
        subNav.removeClass('shadow');
    });

    $('#headIcon a').on('click', function() {
        var $that = $(this),
            active = $that.attr('class'),
            Top = $('#'+ active).offset().top,
            sibingsDom = $that.parent('li').siblings().children('a');
        window.aaa = $('#headIcon a').index($(this));
        $('html,body').scrollTop(Top - 150);
        sibingsDom.children('.normal').show();
        sibingsDom.children('.hover').hide();

        $that.children('.normal').hide();
        $that.children('.hover').show();

    });
    $('#headIcon a').on('mouseover', function() {
        var $that = $(this), 
            sibingsDom = $that.parent('li').siblings().children('a');
        sibingsDom.children('.normal').show();
        sibingsDom.children('.hover').hide();

        $that.children('.normal').hide();
        $that.children('.hover').show();     
    });
    $('#headIcon').on('mouseout', function() {
        var $that = $(this);
        $.each($that.find('a'), function(i, v){
            var v = $(v),
                _img = v.find('img');
            if(i != window.aaa)_img.eq(1).hide() && _img.eq(0).show();
            else _img.eq(0).hide() && _img.eq(1).show();
        })
    });
   

