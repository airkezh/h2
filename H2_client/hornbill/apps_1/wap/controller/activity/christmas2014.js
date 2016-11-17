function christmas2014 () {
    return this
}

var controlFns = {
    'index': function() {
        'use strict'

        var php = {
                danmu: '/customactivity/CustomActivity_barrage_drifting'
            }

        this.debugSnake( {
            target: 'lab6'
        } )

        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver( function( data ) {
            var danmu = data.danmu

            if ( !danmu || danmu.error_code != 0 ) {
                this.errorPage()
            }

            data.pageTitle = '圣诞 bibibi~~~'
            data._CSSLinks = [ 'activity/christmas2014' ]
            this.render( 'activity/christmas2014.html', data )
        })
    }
}

exports.__create = controller.__create(christmas2014, controlFns)
