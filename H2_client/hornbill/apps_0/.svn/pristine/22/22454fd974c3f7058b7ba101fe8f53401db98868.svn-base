/*common*/

/*
 Tab 组件

 html:
 <div class="js-tab">
     <div class="tab">
         <div class="js-tab-item">Tab-0</div>
         <div class="js-tab-item">Tab-1</div>
         <div class="js-tab-item">Tab-2</div>
     </div>

     <div class="js-tab-content"></div>
     <div class="js-tab-content"></div>
     <div class="js-tab-content"></div>
 </div>

 js-tab-item 与 js-tab-content 需要放置在 js-tab 下
 */

var $              = require( 'wap/zepto' ),
    NOOP           = function() {
        return true
    },

    TAB_PREFIX     = 'tab-',

    defaultConfig  = {
        autoInit:      true,//TODO: need to remove
        rememberState: false,
        stateName:     'state',
        event:         'click',
        tab:           '.js-tab',
        'tab-item':    '.js-tab-item',
        content:       '.js-tab-content',
        activeClass:   'active',
        beforeChange:  NOOP,
        afterChange:   NOOP
    },

    needFixedProps = [ 'tab', 'tab-item', 'content', 'activeClass' ],
    rhash          = /#.*$/

function Tab( config ) {
    this.init( this.config = config )
}

Tab.prototype = {
    constructor: Tab,

    init: function( config ) {
        this.fixClass( config )

        var $p        = $( config.tab ),
            $tabs     = $p.find( config[ 'tab-item' ] ),
            $contents = $p.find( config.content ),
            stName    = config.stateName,
            _this     = this,
            $curTab, $hashTab, $curContent

        if ( config.autoInit ) {
            $hashTab = this.getHashTab( $tabs )
            $curTab  = $tabs.filter( config.activeClass )

            if ( $hashTab ) {
                $curTab.removeClass( config.activeClassValue )
                $curTab = $hashTab
                setTimeout( function() {
                    $curTab.trigger( config.event, [ {
                        isAuto: true
                    } ] )
                }, 0 )
            }

            if ( !$curTab.length ) {
                $curTab = $tabs.eq( 0 )
            }

            $curContent = $contents.eq( $curTab.index() )

            $contents.hide()
            $curContent.show()
        }

        this.els = {
            parent:     $p,
            tabs:       $tabs,
            contents:   $contents,
            curTab:     $curTab,
            curContent: $curContent
        }

        $( config.tab ).on( config.event, config[ 'tab-item' ], function() {
            _this.eventHandler.apply( _this, arguments )
        } )

        if ( config.rememberState ) {
            $tabs.each( function( i, el ) {
                var $el = $( el )
                if ( !$el.data( stName ) ) {
                    $el.attr( 'data-' + stName, TAB_PREFIX + i )
                }
            } )

            this.handleState()
        }
    },

    getHashTab: function( $tabs ) {
        var hash   = location.hash,
            config = this.config

        if ( hash ) {
            hash = hash.slice( 1 )
            return ( $tabs || this.els.tabs ).filter( '[data-' + config.stateName + '="' + hash + '"]' )
        }

        return null
    },

    handleState: function() {
        var config = this.config,
            tab    = this.getHashTab()

        setTimeout( function() {
            tab && tab.trigger( config.event )
        }, 0 )
    },

    fixClass: function( config ) {
        needFixedProps.map( function( value ) {
            config[ value ] = ( value = config[ value ].trim() ).indexOf( '.' ) == 0 ? value : ( '.' + value )
        } )

        config.activeClassValue = config.activeClass.substring( 1 )
    },

    eventHandler: function( e, data ) {
        var config           = this.config,
            els              = this.els,
            $el              = $( e.target ),
            isRememberState  = config.rememberState,
            activeClassValue = config.activeClassValue,
            href             = location.href,
            $curContent

        if ( isRememberState ) {
            location.replace( href.replace( rhash, '' ) + '#' + $el.data( config.stateName ) )
        }

        if ( !$el.hasClass( activeClassValue ) ) {
            if ( !config.beforeChange( $el, els.curContent, config ) ) {
                return
            }

            els.curTab.removeClass( activeClassValue )
            els.curContent.hide()

            $el.addClass( activeClassValue )
            $curContent = els.contents.eq( $el.index() ).show()

            els.curTab     = $el
            els.curContent = $curContent

            config.afterChange( $el, $curContent, config, data && data.isAuto )
        }
    },

    getCurTab: function() {
        return this.els.curTab.data( this.config.stateName )
    },

    destroy: function() {
        var config = this.config
        $( config.tab ).off( config.event )
    }
}

exports.init = function( config ) {
    return new Tab( $.extend( true, defaultConfig, config ) )
}
