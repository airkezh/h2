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
        , force = forc || 10
        , done = 0
        , ok = 0
        , no = 0

    if(force > len) force = len

    $.each(arr.splice(0, force), function(key,v){
        loadImage(v, function(img){
            no++

            if(no == force){
                ok = 1

                $.each(arr, function(key,v){
                    loadImage(v, function(img){
                        no++
						if(ok == 1) ok = 0
						if(no == len) done = 1
                        fn && fn(ok, done, no, key+force, force, len)
                    })
                })
            }

            fn && fn(ok, done, no, key, force, len)
        })
    })
}
