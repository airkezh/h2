fml.define('core/etic',[],function(require , exports){
    var cache = {};
    return function (str, data, isCheck){
        if (isCheck) checkTemplate(str,data);
		if (!cache[str] ){
			var tpl = document.getElementById(str).innerHTML
			tpl = tpl 
			.replace(/[\r\t\n]/g, " ")
			.split("<\?").join("\t")
			.replace(/((^|\?>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)\?>/g, "',$1,'")
			.split("\t").join("');")
			.split("\?>").join(";p.push('")
			.split("\r").join("\\'")
			try{
			cache[str] = new Function("",
				"var p=[];p.push('" + tpl + "');return p.join('');");
			}catch(e){
				if (console){
					console.log(e)
					var err = tpl.replace(/^[ ]*\'\)|p.push\(\'[ ]*\'\)|p.push\(\'/g,'').replace(/^[ ]*;|;[ ]*$/g,'');
					console.log(e.message + "   :   " + err)
					var errNode = document.createElement('script');
					errNode.innerHTML = err;
					try{
						// document.body.appendChild(errNode);
						var s = new Function('',err);
					}catch(e){

					}
				}
			}
				
		}
    var fn = cache[str]
	if (data){
		try{
			return fn.apply( data )
		}catch(e){
			if (console){
				console.log(e)
				console.log(data)
				}
			}
	}else
		return fn
 };
 function checkTemplate(str, data) {
        'use strict';
 
        var source  = document.getElementById(str).innerHTML,
                sourceLines;
 
        source      = source ? source.trim() : '';
        sourceLines = source.split(/[\r\n]/);
        data = data || {};
 
        var len     = source.length,
                i       = 0,
                lineNum = 1,
                line    = [],
                codePieces  = [],
                placeholder = 0,
                stmts = '',
                c,
                isBegin = false,
                isQuestionMark = false,
                isInExpression = false,
                isInStatement  = false;
 
        codePieces[0] = line;
        line.extraPlaceHolder = 0;
 
        for(; i < len; i++) {
            c = source[i];
            switch(c) {
                case '\n':
                    line = codePieces[lineNum++] = [];
                    line.extraPlaceHolder = 0;
                    break;
                case '<':
                    isBegin = true;
                    placeholder++;
                    break;
                case '?':
                    isQuestionMark = true;
                    if(isBegin) {
                        placeholder++;
                        line.push(new Array(placeholder + 1).join(' '));
                        isInStatement = true;
                        placeholder = 0;
                        break;
                    }
                    placeholder++;
                    break;
                case '=':
                    if(isInStatement && isQuestionMark) {
                        isInExpression = true;
                        break;
                    }
                case '>':
                    if(isQuestionMark) {
                        if(isInExpression) {
                            stmts += ';';
                            line.extraPlaceHolder++;
                        }
                        line.push(stmts);
                        isQuestionMark = isInStatement = isInExpression = false;
                        stmts = '';
                        break;
                    }
                default:
                    if(isInStatement) {
                        stmts += c;
                    } else {
                        placeholder++;
                    }
                    isBegin = isQuestionMark = false;
                    break;
            }
        }
 
        var fn = '(function() {\r\n';
        codePieces.forEach(function(v, i) {
            fn += v.join('') + '\r\n';
        });
 
        fn += "}.call(JSON.parse('" + JSON.stringify(data) + "')))";
 
        /*
         onerror arguments：https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onerror
         */
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.setAttribute('id','iframe');
        document.body.appendChild(iframe);
        iframe.contentWindow.onerror = function(msg, _, line, col, error) {
            var code,
                prePos = 10,
                errorMessageStyle = 'color:#fff;font-weight:bold;background-color:#f00;';
            /*
             上面 fn 中在定义函数名后有换行，所以这里减 2
             */
            line = line && line > 2 ? (line - 2) : 0;
            if(line > codePieces.length) return false;
 
            var extraCol = codePieces[line].extraPlaceHolder;
            code = sourceLines[line]
 
            col  = col ? (col - extraCol) : 0;
            var start = col > prePos ? (col - prePos) : 0;
 
            console.group('Error');
            console.log('Error occurs at Line:', line + 1, ' Col:', col);
            if(line != 0) {
                console.log(sourceLines[line - 1]);
            }
            console.log(code.substring(0, start) + '%c' + code.substring(start, col + prePos) + '...', errorMessageStyle);
            if(line != sourceLines.length - 1) {
                console.log(sourceLines[line + 1]);
            }
            requestAnimationFrame(function() {
                console.groupEnd();
            });
            
            return false;
        };
 
        var doc = iframe.contentDocument;
        var s   = doc.createElement('script');
        s.innerHTML = fn;
        doc.body.appendChild(s);
 
        return codePieces;
    }
})
