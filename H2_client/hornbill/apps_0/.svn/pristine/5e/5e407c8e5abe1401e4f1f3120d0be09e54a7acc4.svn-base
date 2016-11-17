/*common*/

function loadImage(url, cbk) {     
    var img = new Image()
    img.onload = function(){
        img.onload = null
        cbk && cbk(img)
    }
    img.src = url
}

return function(arr, fn, forc){
	var len = arr.length
		, force = (forc == undefined) ? len : (forc || 10)
		, done = 0
		, ok = 0
		, no = 0

	if(force > len) force = len

	if(len == 0)
		fn && fn(1, done, no, 0, force, len)
		

    var arr1 = arr.splice(0, force)
        , len0 = arr.length

	$.each(arr1, function(key,v){
		loadImage(v, function(img){
			no++

            if(no+1 == force && len0 == 0){
                ok = 1
                done = 1

                fn && fn(ok, done, no, key, force, len)

            }else if(no == force){
				ok = 1

				$.each(arr, function(key,v){
					loadImage(v, function(img){
						no++
						if(ok == 1) ok = 0
						if(no == len) done = 1
						fn && fn(ok, done, no, key+force, force, len)
					})
				})

			}else{
                fn && fn(ok, done, no, key, force, len)
            }
		})
	})
}
