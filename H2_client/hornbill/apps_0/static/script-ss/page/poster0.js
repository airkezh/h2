fml.define('page/poster0' , ['jquery' ,'component/waterfall', 'component/shareTmp', 'app/rollPoster', 'app/adPoster']  , function(require,exports){
    var shareTmp = require('component/shareTmp')
        ,pin = require('component/waterfall')
        ,$ = require('jquery')
        , rollPoster = require('app/rollPoster')
        , adPoster = require('app/adPoster')

    if (Meilishuo.config.p4p){
        $('.poster_p4p')
            .append(shareTmp('posterWall' , Meilishuo.config.p4p))
            .children('.poster_wall').addClass('alpha omega')
            .css({'position':'relative', 'left':'0px', 'top':'0px'})
            .children('.new_poster').prepend('<span class="p4p"></span>')
    }

    var content_fluid = $('.content_fluid , .header_top , .header_b');
    var report_ad_hack = $('.report_ad_hack');


    fml.vars.colWidth && pin.setSettings({
        colWidth: fml.vars.colWidth,
        colHeight: fml.vars.colHeight,
        colNumMin: fml.vars.colNumMin
    })

    var colWidth   = pin.getSettings('colWidth');
    var colNumMin  = pin.getSettings('colNumMin');
    var autoResize = true;
    autoResize = false;
    /*初始化 好看+卖点2期 轮播效果*/
    function initRoll(colNum) {
        var $rec_roll = $('.rec_roll');
        if ($rec_roll.length === 0) return;
        autoResize = false;
        var $recs = $('.rec_item');
        if (colNum == 3) $recs.css('margin-left', 16);
        $rec_roll.css('width', colNum * $recs.outerWidth(true));
        if ($recs.length < colNum) {
            $rec_roll.siblings('.lt').hide();
            $rec_roll.siblings('.rt').hide();
        }
        initAdPoster();
    }
    function initAdPoster(){
        var $rec = $('.rec_roll');
        if ($rec.length == 0) return;
        var w = $rec.width();
        var $recs = $('.rec_item');
        var liDivNum = w/$recs.outerWidth(true);
        var lcm = getLCM(liDivNum, $recs.length);
        var liNum = lcm / liDivNum;
        function li() { return $('<li/>'); }
        var $fragment = $();
        var $recsFrag = $();
        for(var i=0; i<liDivNum; i++) $recsFrag = $recsFrag.add($recs.clone(true));
        for(var i=0, l=lcm; i<liNum; i++) {
            var $li = li();
            for(var j=0; j<liDivNum; j++) {
                if (i * liDivNum + j < l) $li.append($recsFrag[i*liDivNum+j]);
            }
            $fragment = $fragment.add($li);
        }
        $rec.find('ul').html($fragment);
        adPoster.carousel('.rec_roll', {width:w, height:142, gap:5000, type:2, left:'.lt', right:'.rt'});
        function getLCM(n1, n2) {
            var lcm = n1 * n2;
            var min = Math.min(n1, n2);
            for (var i = min; i > 1; i--) {
                if (n1 % i == 0 && n2 % i == 0) return lcm/i;
            }
            return lcm;
        }
    }
    var initRoll2 = function(colNum){
        rollPoster.catalogBanner('.catalog_rec_roll', {gap:5000, left:'.lt', right:'.rt'}, colNum);
    }
    function setWidth(){
        var windowWidth = fml.vars.posterWallWidth || ($(document).height() > $(window).height() ? $(window).width() : $(window).width() - 20);
        var colNum =  Math.floor(windowWidth / colWidth);
        initRoll(Math.max(colNum, colNumMin) - 1);
        initRoll2(Math.max(colNum, colNumMin) - 1);
        if(colNum < colNumMin) return;
        if(!fml.vars.notFluid){
            var content_width = colNum * colWidth;
            content_fluid.width(content_width);
        }
        report_ad_hack.width(content_width);
    }
    setWidth()
    pin.init({
        containerId : '.goods_wall',
        preLayout : {
            '.corner_notic' : 0,
            '.corner_nav' : [1,-1],
            '.corner_stamp' : -1
        },
        autoResize : autoResize,
        resizeCallback : function(){
            setWidth();
        }
    });
    $('.topSpinner').hide();
    content_fluid.removeClass('v_hidden');
    if (Meilishuo.config.poster0){
        pin.append(shareTmp('posterWall' , Meilishuo.config.poster0))
        $('.midSpinner').hide()
    }
});
