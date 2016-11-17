/*common*/
var win = window,
    uploadQueue = {},
    UPLOAD_URL = 'meilishuo://upload.meilishuo?json_params='

if ( !win.MLS ) {
    win.MLS = {}
}

function addUploadQueue( id, btn, cb ) {
    uploadQueue[ id ] = {
        btn: btn,
        cb: cb
    }
}

win.MLS.onUploadComplete = function( dataStr ) {
    var data = JSON.parse( dataStr ),
        uploadId = data.json_params.upload_id,
        uploadTask

    if ( uploadQueue[ uploadId ] ) {
        uploadTask = uploadQueue[ uploadId ]
        uploadTask.cb( data, uploadTask.btn )
    }
}

function getNewId() {
    return ~~( Math.random() * 100000 ) + '';
}

function bindUpload( btn, cb ) {
    var btn = $( btn ),
        uploadId = getNewId(),
        jsonParams

    while ( uploadQueue[ uploadId ] ) {
        uploadId = getNewId()
    }
    addUploadQueue( uploadId, btn, cb )
    jsonParams = '{"upload_id":"' + uploadId + '"}'
    btn.on( 'touchstart', function() {
        if ( fml.vars.isLogin ) {
            win.location.href = UPLOAD_URL + encodeURIComponent( jsonParams )
        } else {
            alert( '登录后才能上传图片' )
        }
    })
}

exports.bindUpload = bindUpload
