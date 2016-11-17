/*common*/
var $             = require( 'jquery' ),

    defaultConfig = {
        delayTime: 500,
        url:       '/ja/search/'
    },

    ACTIVE        = 'active',
    EVENT_PREFIX  = 'autocomplete.'

/*
 * TODO: customize selector
 */
function AutoComplete( conf ) {
    this.init( this.conf = $.extend( {}, defaultConfig, conf ) )
}

AutoComplete.prototype = {
    constructor: AutoComplete,
    name:        'AutoComplete',

    init: function( conf ) {
        var $container, $el

        this.container = conf.container
        $container     = this.container.$el
        $el            = this.$el = $container.find( '#shop-search' )
        this.$input       = $el.find( 'input' )
        this.$list        = $el.find( '.suggest-box' )
        this.EVENT_PREFIX = EVENT_PREFIX
        this.state        = {
            disabled: false
        }
        this.cache        = {}

        if ( !$el.length ) {
            this.disable()
        } else {
            this.bindEvent()
        }
    },

    bindEvent: function() {
        var _this      = this,
            $container = _this.container.$el

        this.$input.on( 'focus', function() {
            _this.fetch()
            $container.triggerHandler( EVENT_PREFIX + 'focus' )
        } ).on( 'blur', function() {
            setTimeout( function() {
                _this.hideList()
                $container.triggerHandler( EVENT_PREFIX + 'blur' )
            }, 100 )
        } ).on( 'input', function() {
            _this.fetch()
            $container.triggerHandler( EVENT_PREFIX + 'input' )
        } ).on( 'keyup', function( e ) {
            var keyCode = e.keyCode

            if ( keyCode == 38 || keyCode == 40 ) {
                var dir = keyCode == 38 ? 'up' : 'down'
                _this.select( dir )
            } else if ( keyCode == 13 ) {
                _this.jump( $( this ) )
            }
        } )

        this.$list.on( 'mouseenter', '.item', function( e ) {
            _this.active( $( e.target ) )
            $container.triggerHandler( EVENT_PREFIX + 'mouseenter' )
        } ).on( 'click', function( e ) {
            _this.jump( $( e.target ) )
            $container.triggerHandler( EVENT_PREFIX + 'click' )
        } )

        return this
    },

    active: function( $el ) {
        if ( !$el.hasClass( ACTIVE ) ) {
            $el.addClass( ACTIVE )
            this.$activeEl && this.$activeEl.removeClass( ACTIVE )
            this.$activeEl = $el
        }
    },

    disable: function() {
        //TODO
        this.state.disabled = true
        this.hideList()
    },

    enable: function() {
        this.state.disabled = false
    },

    fetch: function() {
        var _this  = this,
            conf   = _this.conf,
            $input = _this.$input,
            $list  = _this.$list,
            val    = $.trim( $input.val() )

        if ( !val ) {
            return
        }

        if ( val === this.lastVal ) {
            return $list.show()
        }

        this.lastVal = val

        if ( _this.cache[ val ] ) {
            return $list.html( _this.cache[ val ] ).show()
        }

        clearTimeout( _this.fetchID )

        _this.fetchID = setTimeout( function() {
            $.ajax( {
                url:      conf.url,
                dataType: 'jsonp',
                data:     {
                    searchKey: encodeURIComponent( val )
                },
                success:  function( data ) {
                    if ( data && data.total ) {
                        var html = _this.renderList( data )
                        $list.html( html ).show()
                        _this.cache[ val ] = html
                    } else {
                        $list.hide()
                    }
                    _this.showList()
                }
            } )
        }, conf.delayTime )
    },

    renderList: function( data ) {
        var html = ''
        for ( var i = 0; i < data.prompt.length; i++ ) {
            var tags    = data.prompt[ i ].tags,
                tagsDom = ''

            for ( var j = 0; j < tags.length; j++ ) {
                tagsDom += '<span>' + tags[ j ] + '</span>'
            }

            html += '<div class="item" data-title="' + data.prompt[ i ].title + '">'
                + data.prompt[ i ].title
                + '<div class="tags">' + tagsDom + '</div>'
                + '</div>'
        }
        return html
    },

    select: function( dir ) {
        var $list     = this.$list,
            $el       = this.$activeEl,
            $children = $list.children()

        if ( !$el || !$el.length ) {
            $el = $children.first()
        } else {
            if ( dir == 'up' ) {
                $el = $el.prev()
                if ( !$el.length ) {
                    $el = $children.last()
                }
            } else {
                $el = $el.next()
                if ( !$el.length ) {
                    $el = $children.first()
                }
            }
        }
        this.active( $el )
        this.$input.val( $el.data( 'title' ) )
    },

    //TODO
    jump: function( $el ) {
        var searchKey

        if ( $el ) {
            if ( $el.parent().hasClass( 'tags' ) ) {
                searchKey = $.trim( $el.parents( '.item' ).data( 'title' ) + ' ' + $el.html() )
            } else {
                searchKey = $.trim( $el.data( 'title' ) )
            }

            this.$input.val( searchKey )
        } else {
            searchKey = $.trim( this.$input.val() )
        }

        if ( !searchKey ) return

        var sk    = '&searchKey=' + encodeURIComponent( searchKey )
        var pstrc = '&pstrc=' + encodeURIComponent( 'searchgoods=' + searchKey )

        var url       = '/search/baobei/?filter=goods'
        location.href = url + sk + pstrc
    },

    showList: function() {
        this.$list.show()
        return this
    },

    hideList: function() {
        this.$list.hide()
        return this
    },

    destroy: function() {
        //TODO
    }
}

exports.init = function( conf ) {
    return new AutoComplete( conf )
}
