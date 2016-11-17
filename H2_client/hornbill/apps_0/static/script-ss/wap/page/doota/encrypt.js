/*common*/

/**
 * @name encryptData
 * @userfor 加密数据
 * @param params      所有的表单字段
 * @param encryptArr  需要加密的表单字段
 * @example  encryptData({username:'wilee',password:'wileetest'},['password'])
 */
var mod         = {};
mod.encryptData = function( params, encryptArr ) {
    if ( params && (typeof params).toLowerCase() == 'object' ) {
        var RSA_PUB_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChDzcjw/rWgFwnxunbKp7/4e8w\n/UmXx2jk6qEEn69t6N2R1i/LmcyDT1xr/T2AHGOiXNQ5V8W4iCaaeNawi7aJaRht\nVx1uOH/2U378fscEESEG8XDqll0GCfB1/TjKI2aitVSzXOtRs8kYgGU78f7VmDNg\nXIlk3gdhnzh+uoEQywIDAQAB';
        var encryptArr  = encryptArr || [],
            dataString  = '',
            dataArr     = {},
            Arr         = [],
            rsaCrypt    = new JSEncrypt(),//实例化RSA加密算法
            _3DES_KEY   = _3DES.generate( 24 );//生成3DES KEY

        var isInArray = function( item, arr ) {
            for ( var i = 0; i < arr.length; i++ ) {
                if ( item == arr[ i ] ) {
                    return true;
                }
            }
            return false;
        }

        //加密需要加密的字段
        for ( var item in params ) {
            if ( params[ item ] ) {
                Arr.push( item );
                if ( isInArray( item, encryptArr ) ) {
                    params[ item ]  = params[ item ] || '';
                    dataArr[ item ] = _3DES.encrypt( _3DES_KEY, params[ item ].toString() );
                } else {
                    params[ item ]  = params[ item ] || '';
                    dataArr[ item ] = params[ item ].toString();
                }
            }
        }
        //将字段按照ASC码排序,并生成校验串
        Arr.sort();//console.log(Arr)
        for ( var i = 0; i < Arr.length; i++ ) {
            dataString += Arr[ i ] + '=' + dataArr[ Arr[ i ] ].toString() + (i == Arr.length - 1 ? '' : '&');
        }

        //console.log(_3DES_KEY)
        try {
            rsaCrypt.setPublicKey( RSA_PUB_KEY );//设置RSA公钥
            // console.log(_3DES_KEY);
            dataArr.key = rsaCrypt.encrypt( _3DES_KEY );//使用RSA加密3DES KEY
            //console.log(dataArr)
        } catch ( err ) {
            alert( err.toString() );
        }

        //生成SHA-1签名，并取前16位
        // console.log( SHA_1(dataString + _3DES_KEY,true));
        dataArr.sign = SHA_1( dataString + _3DES_KEY, true ).substr( 0, 16 );

        return dataArr;
    }
};
return mod;
