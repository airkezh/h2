/**
 * jQuery Masonry v2.1.03
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2011 David DeSandro
 */

/*jshint browser: true, curly: true, eqeqeq: true, forin: false,
 * immed: false, newcap: true, noempty: true, strict: true, undef:
 * true */
/*global jQuery: false */
fml.define('component/pin' , ['jquery'] , function(require , exports){
		var $ = require('jquery');	
		(function( window, $, undefined ){
		 'use strict';
		 var $event = $.event,
		 resizeTimeout;
		 $event.special.smartresize = {
setup: function() {
$(this).bind( "resize", $event.special.smartresize.handler );
},
teardown: function() {
$(this).unbind( "resize", $event.special.smartresize.handler );
},
handler: function( event, execAsap ) {
var context = this,
args = arguments;
event.type = "smartresize";

if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
resizeTimeout = setTimeout(function() {
	jQuery.event.handle.apply( context, args );
	}, execAsap === "execAsap"? 0 : 100 );
}
};

$.fn.smartresize = function( fn ) {
	return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
};
$.Mason = function( options, element ){
	this.element = $( element );
	this._create( options );
	this._init();
};

$.Mason.settings = {
	isResizable: true,
	isAnimated: false,
	animationOptions: {
		queue: false,
		duration: 500
	},
	gutterWidth: 0,
	isRTL: false,
	isFitWidth: false,
	containerStyle: {
		position: 'relative'
	}
};

$.Mason.prototype = {

_filterFindBricks: function( $elems ) {
					   var selector = this.options.itemSelector;
					   return !selector ? $elems : $elems.filter( selector ).add( $elems.find( selector ) );
				   },

_getBricks: function( $elems ) {
				var $bricks = this._filterFindBricks( $elems )
					.css({ position: 'absolute' })
					.addClass('pins');
				return $bricks;
			},

_create : function( options ) {

			  this.options = $.extend( true, {}, $.Mason.settings, options );
			  this.styleQueue = [];
			  var elemStyle = this.element[0].style;
			  this.originalStyle = {
height: elemStyle.height || ''
			  };
			  var containerStyle = this.options.containerStyle;
			  for ( var prop in containerStyle ) {
				  this.originalStyle[ prop ] = elemStyle[ prop ] || '';
			  }

			  this.element.css( containerStyle );

			  this.horizontalDirection = this.options.isRTL ? 'right' : 'left';

			  this.offset = {
x: parseInt( this.element.css( 'padding-' + this.horizontalDirection ), 10 ),
   y: parseInt( this.element.css( 'padding-top' ), 10 )
			  };

			  this.isFluid = this.options.columnWidth && typeof this.options.columnWidth === 'function';
			  var instance = this;
			  setTimeout( function() {
					  instance.element.addClass('mlsWall');
					  }, 0 );

			  if ( this.options.isResizable ) {
				  $(window).bind( 'smartresize.masonry', function() { 
						  instance.resize();
						  });
			  }


			  this.reloadItems();

		  },

_init : function( callback ) {
			this._getColumns();
			this._reLayout( callback );
		},

option: function( key, value ){
			if ( $.isPlainObject( key ) ){
				this.options = $.extend(true, this.options, key);
			} 
		},
layout : function( $bricks, callback ) {
			 for (var i=0, len = $bricks.length; i < len; i++) {
				 this._placeBrick( $bricks[i] );
			 }
			 var containerSize = {};
			 containerSize.height = Math.max.apply( Math, this.colYs );
			 if ( this.options.isFitWidth ) {
				 var unusedCols = 0;
				 i = this.cols;
				 while ( --i ) {
					 if ( this.colYs[i] !== 0 ) {
						 break;
					 }
					 unusedCols++;
				 }
				 containerSize.width = (this.cols - unusedCols) * this.columnWidth - this.options.gutterWidth;
			 }
			 this.styleQueue.push({ $el: this.element, style: containerSize });
			 var styleFn = !this.isLaidOut ? 'css' : (
					 this.options.isAnimated ? 'animate' : 'css'
					 ),
				 animOpts = this.options.animationOptions;
			 var obj;
			 for (i=0, len = this.styleQueue.length; i < len; i++) {
				 obj = this.styleQueue[i];
				 obj.$el[ styleFn ]( obj.style, animOpts );
			 }
			 this.styleQueue = [];
			 if ( callback ) {
				 callback.call( $bricks );
			 }

			 this.isLaidOut = true;
		 },
_getColumns : function() {
				  var container = this.options.isFitWidth ? this.element.parent() : this.element,
				  containerWidth = container.width();
				  this.columnWidth = this.isFluid ? this.options.columnWidth( containerWidth ) :
					  this.options.columnWidth ||
					  this.$bricks.outerWidth(true) ||
					  containerWidth;

				  this.columnWidth += this.options.gutterWidth;

				  this.cols = Math.floor( ( containerWidth + this.options.gutterWidth ) / this.columnWidth );
				  this.cols = Math.max( this.cols, 1 );

			  },
_placeBrick: function( brick ) {
				 var $brick = $(brick),
				 colSpan, groupCount, groupY, groupColY, j;
				 colSpan = Math.ceil( $brick.outerWidth(true) /
						 ( this.columnWidth + this.options.gutterWidth ) );
				 colSpan = Math.min( colSpan, this.cols );
				 if ( colSpan === 1 ) {
					 groupY = this.colYs;
				 } else {
					 groupCount = this.cols + 1 - colSpan;
					 groupY = [];
					 for ( j=0; j < groupCount; j++ ) {
						 groupColY = this.colYs.slice( j, j+colSpan );
						 groupY[j] = Math.max.apply( Math, groupColY );
					 }
				 }
				 var minimumY = Math.min.apply( Math, groupY ),
					 shortCol = 0;
				 for (var i=0, len = groupY.length; i < len; i++) {
					 if ( groupY[i] === minimumY ) {
						 shortCol = i;
						 break;
					 }
				 }
				 var position = {
					top: minimumY + this.offset.y
				 };
				 position[ this.horizontalDirection ] = this.columnWidth * shortCol + this.offset.x;
				 this.styleQueue.push({ $el: $brick, style: position });
				 var setHeight = minimumY + $brick.outerHeight(true),
					 setSpan = this.cols + 1 - len;
				 for ( i=0; i < setSpan; i++ ) {
					 this.colYs[ shortCol + i ] = setHeight;
				 }
			 },
		getHeight : function(varRef){
			return Math.min.apply( Math, this.colYs );
		},
		resize: function() {
			var prevColCount = this.cols;
			this._getColumns();
			if ( this.isFluid || this.cols !== prevColCount ) {
				this._reLayout();
			}
		},
_reLayout : function( callback ) {
				var i = this.cols;
				this.colYs = [];
				while (i--) {
					this.colYs.push( 0 );
				}
				this.layout( this.$bricks, callback );
			},
reloadItems : function() {
				  this.$bricks = this._getBricks( this.element.children() );
			  },


reload : function( callback ) {
			 this.reloadItems();
			 this._init( callback );
		 },
appended : function( $content, isAnimatedFromBottom, callback ) {
			   if ( isAnimatedFromBottom ) {
				   this._filterFindBricks( $content ).css({ top: this.element.height() });
				   var instance = this;
				   setTimeout( function(){
						   instance._appended( $content, callback );
						   }, 1 );
			   } else {
				   this._appended( $content, callback );
			   }
		   },

_appended : function( $content, callback ) {
				var $newBricks = this._getBricks( $content );
				this.$bricks = this.$bricks.add( $newBricks );
				this.layout( $newBricks, callback );
			},
remove : function( $content ) {
			 this.$bricks = this.$bricks.not( $content );
			 $content.remove();
		 },
destroy : function() {

			  this.$bricks
				  .removeClass('pins')
				  .each(function(){
						  this.style.position = '';
						  this.style.top = '';
						  this.style.left = '';
						  });
			  var elemStyle = this.element[0].style;
			  for ( var prop in this.originalStyle ) {
				  elemStyle[ prop ] = this.originalStyle[ prop ];
			  }

			  this.element
				  .unbind('.masonry')
				  .removeClass('masonry')
				  .removeData('masonry');

			  $(window).unbind('.masonry');

		  }

};
$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		$images = $this.find('img').add( $this.filter('img') ),
		len = $images.length,
		blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
		loaded = [];

	function triggerCallback() {
		callback.call( $this, $images );
	}

	function imgLoaded( event ) {
		var img = event.target;
		if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
			loaded.push( img );
			if ( --len <= 0 ){
				setTimeout( triggerCallback );
				$images.unbind( '.imagesLoaded', imgLoaded );
			}
		}
	}
	if ( !len ) {
		triggerCallback();
	}

	$images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
			var src = this.src;
			this.src = blank;
			this.src = src;
	});

	return $this;
};


var logError = function( message ) {
	if ( window.console ) {
		window.console.error( message );
	}
};


$.fn.masonry = function( options ) {
	if ( typeof options === 'string' ) {
		var args = Array.prototype.slice.call( arguments, 1 );

		this.each(function(){
				var instance = $.data( this, 'masonry' );
				if ( !instance ) {
				logError( "cannot call methods on masonry prior to initialization; " +
					"attempted to call method '" + options + "'" );
				return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
				logError( "no such method '" + options + "' for masonry instance" );
				return;
				}
				instance[ options ].apply( instance, args );
				});
	} else {
		this.each(function() {
				var instance = $.data( this, 'masonry' );
				if ( instance ) {
				instance.option( options || {} );
				instance._init();
				} else {
				$.data( this, 'masonry', new $.Mason( options, this ) );
				}
				});
	}
	return this;
};

})( window, jQuery );
return $;
});
