fml.define('component/placeholder',['jquery'],function(require , exports){

    var $ = require('jquery');

    //feature detection
    var hasPlaceholder = 'placeholder' in document.createElement('input');

    //sniffy sniff sniff -- just to give extra left padding for the older
    //graphics for type=email and type=url
    // var isOldOpera = window.opera && parseFloat(window.opera.version()) < 10.5;

    $.fn.placeholder = function (options) {
        var inheritStyle = false;//assume that default styling should be set

        if (options && "undefined" !== typeof options.inheritStyle) {

            if (options.inheritStyle) {
                inheritStyle = true;
            }
            else {//it was passed, but as a falsy value
                delete options.inheritStyle; //remove so it's not added to element later
            }
        }

        //这里改动 做了下深复制
        //merge in passed in options, if any and inheritStyle was not specified
        options = inheritStyle ? {} : $.extend(true,{}, $.fn.placeholder.defaults, options);

        //cache the original 'left' value, for use by Opera later
        var o_left = options.placeholderCSS && options.placeholderCSS.left || 'auto';

        //first test for native placeholder support before continuing
        //feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
        return (hasPlaceholder) ? this : this.each(function () {
            //TODO: if this element already has a placeholder, exit

            //local vars
            var $this = $(this),
                inputVal = $.trim($this.val()),
                inputWidth = $this.width(),
                inputHeight = $this.height(),

            //grab the inputs id for the <label @for>, or make a new one from the Date
                inputId = (this.id) ? this.id : 'placeholder' + (Math.floor(Math.random() * 1123456789)),
                placeholderText = $this.attr('placeholder'),
                placeholderClass = 'placeholder-polyfill',
                placeholder = $('<label for=' + inputId + ' class="' + placeholderClass + '">' + placeholderText + '</label>');

            if('undefined' === typeof options.placeholderCSS){
                options.placeholderCSS = {};
            }
            //stuff in some calculated values into the placeholderCSS object
            options.placeholderCSS['width'] = inputWidth;
            options.placeholderCSS['height'] = inputHeight;
            options.placeholderCSS['color'] = options.placeholderCSS.color;

            // adjust position of placeholder
            // options.placeholderCSS.left = (isOldOpera && (this.type == 'email' || this.type == 'url')) ?
            //     '11%' : o_left;

            //根据padding-left值来动态设置
            options.placeholderCSS.left = $this.css('padding-left');

            placeholder.css(options.placeholderCSS);

            //加个配置项
            if(options.needWrap){
                $this.wrap(options.inputWrapper);
            }

            $this.attr('id', inputId).after(placeholder);

            //if the input isn't empty
            if (inputVal) {
                placeholder.hide();
            };

            //hide placeholder on focus
            $this.focus(function () {
                if (!$.trim($this.val())) {
                    placeholder.hide();
                };
            });

            //show placeholder if the input is empty
            $this.blur(function () {
                if (!$.trim($this.val())) {
                    placeholder.show();
                };
            });
        });
    };

    //expose defaults
    $.fn.placeholder.defaults = {
        //you can pass in a custom wrapper
        inputWrapper: '<span style="position:relative; display:block;"></span>',

        //more or less just emulating what webkit does here
        //tweak to your hearts content
        placeholderCSS: {
            'font': '12px Arial',
            'color': '#bababa',
            'position': 'absolute',
            'top': '2px',
            'overflow-x': 'hidden',
            'display': 'block',
            'cursor': 'text'
        }
    };

});
