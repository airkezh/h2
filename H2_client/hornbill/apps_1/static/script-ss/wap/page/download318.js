/*common*/
require('wap/zepto/fastclick')

var openApp = require('wap/app/openApp')

$('section').on('click',function(){
    openApp(fml.vars.jump_link, '', fml.vars.alert)  
})