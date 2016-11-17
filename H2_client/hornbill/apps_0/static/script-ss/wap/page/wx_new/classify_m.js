/*common*/

var lazyLoad = require('m/component/lazyLoad');
lazyLoad = lazyLoad.init({loadStyle:'img',xpath:'.lazyload',step_x:30,step_y:30});
lazyLoad.load();
lazyLoad.scroll();
