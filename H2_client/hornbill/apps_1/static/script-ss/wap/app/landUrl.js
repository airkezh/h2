fml.define('wap/app/landUrl', ['wap/component/storage' ,'component/urlHandle'] , function(require , exports){
	 var storage = require('wap/component/storage')
     var query = require('urlHandle').getParams(window.location.href.toString())
        ,land = query.land

     if (land){
         //?land=uc #6271
         storage.setSession('land', land)
     } else {
         storage.getSession('land' ,function(v){
             land = v
             })
     }	
	 exports.getLandPlat = function(url){
		return  land 
		}
	})
