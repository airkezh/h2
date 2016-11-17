fml.use( [ 'app/register_new', 'app/registerLike' ], function() {
    switch ( Meilishuo.config.controller ) {
        case 'register_form':
            this.register_new.init();
            break;
        case 'register_success':
            this.registerLike.success();
            break;
        case 'register_step3':
            this.registerLike.selectStyle();
            break;
        case 'register_step4':
            this.registerLike.selectGroup();
            break;
        default:
            break;
    }
} );

//应该和step3与step4相关,先保留
fml.use( 'app/cleanMsg', function( mod ) {
    mod.msgFunc();
} );

//目测没用，先注掉
//fml.use('app/setting' , function(){});

/**
 * 记录：
 *        1，点击的 input
 *        2，提交前的鼠标轨迹
 *        3，记录用户在注册页停留的时长
 */
fml.use( [ 'jquery', 'app/tracking' ], function( mod ) {
    'use strict'

    if ( Meilishuo.config.controller != 'register_form' ) {
        return
    }

    var $            = mod.jquery,
        track        = mod.tracking,
        $body        = $( document.body ),
        $form        = $( '#registerForm' ),

        enterTime    = new Date,
        //成功发送短信验证码
        sendTextCodeTime,

        inputCheck   = {
            mobile: 0,
            nickname: 0,
            password: 0,
            conf_password: 0
        },

        isMoving     = false,
        paths        = [],

        MAX_PATH_NUM = 30,
        RECORD_RATE  = 30,

        CLICK        = 'click'

    $body.on( 'register.ok', function() {
        //四个 input 是否被鼠标点击过，并填写过内容
        var key,
            flag = 1
        //用户在注册页停留的时长
        track.cr( 'register_stay_time_' + ( new Date - enterTime ) )
        track.cr( 'register_get_text_code_' + ( new Date - sendTextCodeTime ) )
        track.cr( 'register_mouse_track_' + paths.join( ';' ) )

        for ( key in inputCheck ) {
            if ( inputCheck.hasOwnProperty( key ) &&
                ( !inputCheck[ key ] || !$form.find( '#' + key ).val() ) ) {
                flag = 0
                break
            }
        }

        track.cr( 'register_fill_all_inputs_' + flag )
    } )
        //开始获取短信验证码(『获取短信验证码』确认框提交成功)
        .on( 'getTextCode.ok', function() {
            sendTextCodeTime = new Date;
        } )
        .on( 'mouseover', function( e ) {
            if ( !isMoving ) {
                isMoving = true
                paths.push( [
                    'x=',
                    e.pageX,
                    ',y=',
                    e.pageY, '' +
                    ',time=',
                    +new Date
                ].join( '' ) )

                if ( paths.length > MAX_PATH_NUM ) {
                    paths.shift()
                }

                setTimeout( function() {
                    isMoving = false;
                }, RECORD_RATE )
            }
        } )

    $form.on( CLICK, 'input', function() {
        var name = this.name
        inputCheck.hasOwnProperty( name ) && ( inputCheck[ name ] = 1 )
    } )
} )

fml.define( 'page/register', [], function() {
} );
