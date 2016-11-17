/*common*/
/**
 * @name: 分页
 * @author: zhidongsun
 * @date: 2015-1-13
 * @how-to-use:
 *      var Paging = require( 'app/paging' )
 *
 *      var paging = Paging({
 *          el: '#pagingNav',    //分页组件元素
 *          tmpl: '#pagingTmpl', //分页组件的模板，如果不提供，默认值为 pagingNav
 *          pageSize: 20,        //每页显示条目
 *          totalPage: 100,      //最大页数，如果不提供，那么根据接口返回值来设置
 *          onChange: function( el, pageNum ) {
 *              //翻页操作，el 表示上面的分页组件元素，是 DOM 对象
 *              //pageNum 为翻页后的页数
 *          }
 *      })
 *
 *      注意：如果没有在 config 中提供 totalPage 属性，那么请手动调用 setTotalPage() 方法
 *
 *      分页组件模板中必须包含以下内容：
 *          <div>
 *              <a data-action="prev">前一页</a>
 *              <a data-action="jump" data-page="2">2</a>
 *              <a data-action="jump" data-page="3">3</a>
 *              <a data-action="next">后一页</a>
 *          </div>
 *
 *      在模板中，this 拥有如下属性( this 其实就是更新后的 config 对象 )：
 *          page: 当前页数
 *          totalPage: 最大页数
 */

var $        = require( 'jquery' ),
    shareTmp = require( 'component/shareTmp' ),

    NOOP     = function() {
        return true
    }

function Paging( config ) {
    this.config = $.extend( {}, {
        el: '#pageNav',
        tmpl: 'pagingNav',
        change: NOOP,
        totalPage: 0,
        pageSize: fml.vars.newShare == '1' ? 20 : 8,
        page: 0
    }, config )

    this.init()
}

Paging.prototype = {
    init: function() {
        var el,
            that     = this,
            handlers = that.handlers,
            cfg      = this.config

        el = this.el = $( cfg.el )

        el.on( 'click', '[data-action]', function( e ) {
            e.preventDefault()

            var action = $( this ).data( 'action' )
            if ( handlers[ action ] && handlers[ action ].call( that, this ) !== false ) {
                that.render()
            }
        })

        if ( this.totalPage ) {
            cfg.pageLen = Math.ceil( this.totalPage / cfg.pageSize )
            this.render()
        }
    },

    handlers: {
        prev: function() {
            var cfg        = this.config,
                curPageNum = cfg.page

            if ( curPageNum == 0 ) {
                return false
            } else {
                cfg.onChange.call( this, this.el, --cfg.page )
            }
        },

        next: function() {
            var cfg        = this.config,
                curPageNum = cfg.page

            if ( curPageNum == cfg.totalPage - 1 ) {
                return false
            } else {
                cfg.onChange.call( this, this.el, ++cfg.page )
            }
        },

        jump: function( el ) {
            var cfg = this.config

            cfg.onChange.call( this, this.el, cfg.page = +$( el ).data( 'page' ) - 1 )
        }
    },

    setTotalPage: function( totalPage ) {
        var cfg = this.config

        totalPage = parseInt( totalPage, 10 )

        if ( !isNaN( totalPage ) ) {
            cfg.totalPage = totalPage
            cfg.pageLen = Math.ceil( totalPage / cfg.pageSize )
            this.render()
        }
    },

    render: function() {
        var el  = this.el,
            cfg = this.config

        if ( cfg.totalPage && cfg.pageLen > 1 ) {
            el.html( shareTmp( cfg.tmpl, cfg ) )
        } else {
            el.html( '' )
        }
    },

    destroy: function() {
        this.el.off( 'click' )
    }
}

return function( config ) {
    return new Paging( config )
}
