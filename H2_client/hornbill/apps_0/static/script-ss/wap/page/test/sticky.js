/*common*/

var sticky = require('wap/component/sticky')

var a = sticky.init('.sticky_title, .sticky_title_2')

console.log(a)
a[1].destroy()
