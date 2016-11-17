/*common*/

/**
 * 目前不考虑多个实例的问题
 * @type {exports}
 */
var $                 = require( 'circle/zepto' ),

    updateList        = [],
    guid              = 1,

    NO_NEED_TO_UPDATE = 'data-no-need-update',

    ONE_MIN           = 60 * 1000,
    TWO_MIN           = 2 * ONE_MIN,
    TEN_MIN           = 10 * ONE_MIN,
    ONE_DAY           = 24 * 60 * ONE_MIN,
    THREE_DAY         = 3 * ONE_DAY,

    UPDATE_FREQUENCE  = ONE_MIN

/**
 * 将其余时间单位转成毫秒
 * TODO 目前只处理秒
 * @param time
 * @param unit
 */
function unitConvert( time, unit ) {
    if ( unit == 'second' ) {
        return time * 1000
    }

    return time
}

/**
 * 时间比较
 * @param originTime  需要比较的时间
 * @param anotherTime 一般是当前时间
 * @returns {string}
 */
function compare( originTime, anotherTime ) {
    var oDate = new Date( originTime ),
        aDate = new Date( anotherTime ),
        text  = '刚刚',

        oYear, aYear, oMonth, aMonth, oDay, aDay, tmp, elapse, today, todayTime

    if ( originTime > anotherTime ) {
        tmp         = originTime
        originTime  = anotherTime
        anotherTime = tmp
    }

    oYear  = oDate.getFullYear()
    aYear  = aDate.getFullYear()
    oMonth = oDate.getMonth() + 1
    aMonth = aDate.getMonth() + 1
    oDay   = oDate.getDate()
    aDay   = aDate.getDate()

    today     = new Date( aYear, aMonth - 1, aDay, 0, 0, 0 )
    todayTime = +today

    elapse = anotherTime - originTime

    /**
     * 小于两分钟以内
     */
    if ( elapse < TWO_MIN ) {
        return text
    }

    /**
     * 在十分钟之内，显示『x分钟前』
     */
    if ( elapse < TEN_MIN ) {
        return parseInt( elapse / ONE_MIN ) + '分钟前'
    }

    text = getHoursAndMinutes( oDate )

    if ( originTime >= todayTime ) {
        /**
         * 在今天之内，只显示小时：分钟
         */
        return text
    } else {
        text = ' ' + text

        if ( originTime < todayTime && originTime >= ( todayTime - ONE_DAY ) ) {
            return '昨天' + text
        }

        todayTime -= ONE_DAY

        if ( originTime < todayTime && originTime >= ( todayTime - ONE_DAY ) ) {
            return '前天' + text
        }
    }

    /**
     * 在同一年
     */
    if ( oYear === aYear ) {
        return oMonth + '月' + oDay + '日' + text
    } else {
        return oYear + '年 ' + oMonth + '月' + oDay + '日' + text
    }

}

function format( time ) {
    return compare( +new Date( time ), +new Date() )
}

function getHoursAndMinutes( time ) {
    var hours   = time.getHours(),
        minutes = time.getMinutes()

    if ( hours < 10 ) {
        hours = '0' + hours
    }

    if ( minutes < 10 ) {
        minutes = '0' + minutes
    }

    return hours + ':' + minutes
}

/**
 * 自动更新元素内的时间，目前每一分钟更新一次
 * 返回值是一个对象：
 *      stopId: 数字，可以传入 stopUpdate() 中来停止定时更新
 *      update: 函数，可以执行它进行手动更新
 * @param el 需要更新的元素
 * @param itemSelector 子元素的选择器
 * @param attrName 保存时间信息的属性名，需要是 data-name 形式
 * @param attrUnit 时间进制，如果是毫秒就不用传，其余可选值：second
 */
function autoUpdate( el, itemSelector, attrName, attrUnit ) {
    var $el = $( el ),
        id  = guid++

    attrName = attrName || 'data-time'
    attrUnit = attrUnit || 'data-unit'

    function update() {
        stopUpdate( id )

        var $items  = $el.find( itemSelector ).not( '[' + NO_NEED_TO_UPDATE + ']' ),
            curTime = +new Date

        /* @TODO: 超过三天的信息就不更新了，跨年的事儿再说…… */
        $items.forEach( function( item ) {
            var $item   = $( item ),
                time    = +$item.attr( attrName ),
                unit    = $item.attr( attrUnit ),
                oldHTML = $item.html(),
                newHTML

            if ( unit ) {
                time = unitConvert( time, unit )
            }

            if ( oldHTML != ( newHTML = compare( time, curTime ) ) ) {
                $item.html( newHTML )
            }

            if ( curTime - time >= THREE_DAY ) {
                $item.attr( NO_NEED_TO_UPDATE, 1 )
            }
        } )

        updateList[ id ] = setTimeout( update, UPDATE_FREQUENCE )
    }

    update()

    return {
        stopId: id,
        update: update
    }
}

function stopUpdate( id ) {
    clearTimeout( updateList[ id ] )
    updateList[ id ] = -1
}

exports.format     = format
exports.autoUpdate = autoUpdate
exports.stopUpdate = stopUpdate
