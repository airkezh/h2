/*common*/
/**
 * 当前的音频格式都是 amr，只能在 Android 平台下播放
 * 在 iOS 平台下要根据音频 id 动态获取
 * 在音频能够播放前，执行加载动画，此时播放按钮不可点击
 *
 * preload 方法可以通过在 document 下触发 “audio-preload” 事件来执行
 *
 * http://stackoverflow.com/questions/12517000/no-sound-on-ios-6-web-audio-api
 *
 * iOS 下的播放音/视频必须由用户的动作触发，即：
 *      当用户的动作发生(如 touchstart)后，同步调用 audio.play() 可以播放成功
 *      如果是在异步操作(ajax 或定时器)中调用 play() 则系统会静音。
 *
 * Android 不能使用 audio.onended 绑定事件，必须用 addEventListener()
 */
var $                  = require( 'circle/zepto/touch' ),
    $doc               = $( document ),

    os                 = Meilishuo.config.os,
    isAndroid          = os.android,

    API_CONVERT        = '/aj/circle/convert_audio',
    AUDIO_ID           = 'audioid',
    PLAYING            = 'playing',
    IS_PLAYING         = 'is-playing',
    IS_LOADING         = 'is-loading',

    ATTR_CONVERTED     = 'data-converted',
    BIND_EVENT         = 'bindevent',
    SEL_ATTR_CONVERTED = '[data-converted]',
    CLASS_AUDIO        = '.js-audio',

    $curPlayingBtn, timeoutID, preload, eventName

if ( os.phone || os.tablet ) {
    eventName = 'tap'
} else {
    eventName = 'click'
}

/**
 * 执行方法后，寻找页面中所有未加载的音频，进行格式转换
 */
preload = !isAndroid ? function preload() {
    $doc.find( CLASS_AUDIO ).not( SEL_ATTR_CONVERTED ).each( function( _, el ) {
        var $el, audio
        $el   = $( el )
        audio = $el.find( 'audio' )[ 0 ]
        $el.addClass( IS_LOADING )

        $.ajax( {
            url: API_CONVERT,
            type: 'get',
            data: {
                'audio_id': $el.data( AUDIO_ID )
            },
            dataType: 'json',
            success: function( resp ) {
                if ( resp.data ) {
                    audio.oncanplay = audio.oncanplaythrough = function() {
                        audio.oncanplay = audio.oncanplaythrough = null

                        $el.removeClass( IS_LOADING )
                            .attr( ATTR_CONVERTED, 1 )
                    }

                    audio.src        = resp.data.mp3_url
                    audio.autobuffer = true
                    audio.load()
                }
            }
        } )
    } )
} : function NOOP() {
    return true
}

function play( $el ) {
    if ( $curPlayingBtn ) {
        clearTimeout( timeoutID )

        if ( $el[ 0 ] === $curPlayingBtn[ 0 ] ) {
            return stop( $el )
        } else {
            stop( $curPlayingBtn )
        }
    }

    var audio

    if ( $el ) {
        audio = $el.find( 'audio' )[ 0 ]

        $el.addClass( IS_PLAYING )
            .data( PLAYING, '1' )

        if ( !$el.data( BIND_EVENT ) ) {
            $el.data( BIND_EVENT, 1 )
            audio.addEventListener( 'ended', function() {
                audio.onended = null
                stop( $el )
            } )
        }

        audio.play()

        $curPlayingBtn = $el
    }
}

function stop( $el ) {
    var audio

    if ( $el ) {
        audio = $el.find( 'audio' )[ 0 ]

        $el.removeClass( IS_PLAYING )
            .data( PLAYING, '' )

        audio.pause()

        $curPlayingBtn = null
    }
}

$doc.on( eventName, CLASS_AUDIO, function() {
    var $el = $( this )

    if ( !isAndroid && !$el.is( SEL_ATTR_CONVERTED ) ) {
        return
    }

    if ( $el.data( PLAYING ) ) {
        stop( $el )
    } else {
        play( $el )
    }
} ).on( 'audio-preload', preload )
