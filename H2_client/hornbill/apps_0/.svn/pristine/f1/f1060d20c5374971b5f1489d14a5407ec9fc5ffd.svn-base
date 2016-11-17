/*common*/

var $             = require( 'jquery' ),
    ShareTmp      = require( 'component/shareTmp' ),
    AutoComplete  = require( 'component/search/autocomplete' ),

    defaultConfig = {
        widgets: [ AutoComplete ]
    }

function Search( conf ) {
    this.init( conf )
}

Search.prototype = {
    constructor: Search,

    init: function( conf ) {
        var widgets = conf.widgets || [],
            len     = widgets.length,
            $el, widget

        conf.container = this
        this.widgets   = {}
        $el            = this.$el = $( conf.el )

        $el.html( ShareTmp( conf.tmpl ) )

        while ( len-- ) {
            widget                      = widgets[ len ].init( conf )
            this.widgets[ widget.name ] = widget
        }
    }
}

exports.init = function( conf ) {
    return new Search( $.extend( {}, defaultConfig, conf ) )
}
