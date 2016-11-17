var TimeInputPrefix='K_'
function importCss(file){
	 var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = file+'?t=1210' //+ (new Date).getTime()
    head.appendChild(link);
	}
function importJS(file , cbk){
	 var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('script');
    link.src = file +'?t=1030'
	link.onload = link.onreadystatechange = function() {
				if (!cbk) return
                var state = this.readyState;
                if (!state || 'loaded' == state || 'complete' == state) {
                    cbk();
                    head.removeChild(link)
					}
				}
    head.appendChild(link)
	}
function toFullData(descript , reqData ){
	function pollFill(key , reqItem , des){
		if ( des.multiple && des.item && reqItem[key]){
			///console.log(key ,reqItem[key])
			function getLen(o){
				var itemLens = 0
				$.each(o , function(k,v){
					if ('object' == typeof v && ! v.length){
						return
					}
					itemLens = Math.max(itemLens , 'object' == typeof v ? v.length:0)
					})
				return itemLens
			}
			var itemLens = getLen(reqItem[key])
			var newItem = []

			for(var i = 0 ;i< itemLens;i++){
				var t ={}
				$.each(des.item ,function(k){
					//	'object' == typeof des.item[k]
					if ('object' == typeof des.item[k]){
						//console.log(reqItem[key][k])
						var items = reqItem[key][k].shift()
						var itemSLen = getLen(items)
						var p = []
						for (var ii = 0 ;ii < itemSLen;ii++){
							var tt = {}
							Object.keys(items).forEach(function(kk){
								tt[kk] = items[kk][ii]
							})
							p.push(tt)

							}
						t[k] = p

					}else{
						t[k] = reqItem[key][k][i]
					}
					})
				newItem.push(t)
				}
			reqItem[key] = newItem
			}
		if (key in reqItem) return
		var defaultV = des.multiple ? [] : (des.default ?des.default :'')
		reqItem[key] = defaultV
	}
	$.each(descript.item, function (key ,des ){
		if (descript.multiple){
			$.each(reqData , function(i ,reqi){
				pollFill(key , reqi , des)
			})

		} else pollFill(key , reqData , des)
	})
	return reqData
	}
function checkInput(input , rule){
	var val = $(input).val()
	if (rule.trim)  $(input).val(val = $.trim(val))
	var ret = true
	for (var r in rule){
		switch (r){
			case 'required':
				if (rule[r]) ret = val != ''
				break;
			case 'reg':
				ret = rule[r].test(val)
				break;
			}
		if (!ret) break
		}
	return ret
	}
function hEncode(o){
	if (undefined === o || null === o || 'object' == typeof o) return ''
	if (0 !== o && !o) return ''
	return $.trim(o.toString().replace(/"/g,'&quot;').replace(/'/g,'&#39;'))
	}
function toJSONstr(o){
	var r = []
	for (var k in o){
		if (!o.hasOwnProperty(k)) continue
		if (typeof o[k] != 'object')
			r.push( k +':' + o[k])
		}

	r = '{' + r.join(',') + '}'
	return r
	}
var global ={
	validRuls : {}
	,li :0
	,descriptor  : {}
}


function operateBuild(pnl){
	$(' table.multiple' , pnl).each(function(){
		})
	$('.smulti',pnl).each(function(){
		var spnl = $(this).closest('.dataintable')
		spnl.parent().children('.upable').remove()

		})
	$(' .operation .multiple' , pnl).each(function(){
		var firstLine = $(this).closest('td').prev().find('li')
		firstLine = firstLine.eq(0)
		var newLineParent = firstLine.parent()
		var newLine = firstLine.clone()
		newLine.find('input,textarea').val('')

		if (firstLine.is('.unit') ) {
		 window.setTimeout(function(){
			 firstLine.remove()
		 },50)
		}
		var bself = this
		this.onclick = function(){
			var _t = newLine.clone()
			newLineParent.append(_t)
			if ($(bself).is('.smulti')) {
				var ci = _t.index()
				$('input.skey', _t).each(function(i , input){
					var name = input.name
					input.name = name.replace(/\[0\]\[(\w+)\]\[\]$/,'['+ci+'][$1][]')
					input.name = name.replace(/\[\-1\]\[(\w+)\]\[\]$/,'['+ci+'][$1][]')

					})
			}
			operateBuild(_t)
			_t = null
			}
		})
	$(' .deunit .multiple',pnl).click(function(){
		$(this).closest('table.dataintable').remove()
		})
	$(pnl).on('mousedown' ,' .upable',function(){
		document.body.onselectstart = function(){
			return false
			}
		var insertTo
			,toMove = $(this).closest('.cell').addClass('moving')
			,li = toMove.parent().find('.cell')
		li.mouseover(function(){
			if (!$(this).is('.moving'))	insertTo = $(this).addClass('movingto')
			}).mouseout(function(){
				$(this).removeClass('movingto')
				})
		$('body').mouseup(function(){
			document.body.onselectstart = null
			li.unbind('mouseover').unbind('mouseout')
			$(this).unbind('mouseup',arguments.callee)
			toMove.removeClass('moving')
			if (insertTo){
				var moveDirect = insertTo.index() < toMove.index() ? 'insertBefore' : 'insertAfter'
				toMove[moveDirect](insertTo)
				}
			li.removeClass('movingto')
			})
		})
	pnl.on('change','input.disable',function(){
			var toOpt = $(this).closest('td').prev().find('input,textarea,select')

			this.checked ? toOpt.attr('disabled',true)
						: toOpt.removeAttr('disabled')
		})
	pnl.on('input click' , 'input[type=text]' , function(){
		var inp = $(this)
		!inp.attr('orginWidth') && inp.attr('orginWidth' , inp.width())
		window.setTimeout(function(){
			var val = inp.val()
			inp.prev('.preview').remove()
			inp.width('calc(97%)')
			if (/\.(jpg|png|gif|jpeg)$/i.test(val)){
				inp.before('<a href="'+val+'" target=_blank title="'+val+'" class="preview" ><img  src="'+val+'"/></a>')
				.width(inp.attr('orginWidth') - 60)
				}
			})
		})
	$(".form_datetime",pnl).datetimepicker({
        autoclose: true,
        todayBtn: true,
        minuteStep: 10
    });
	pnl.on('click' , '.toRemove',function(){
		$(this).closest('.cell').remove()
		})
	}
function _formBuild(pnl , descriptor , data ,timeSaved ,id){
	global.descriptor = descriptor
	var item = formDesc.item
	var dataTitle = '<legend class="">'+ formDesc.title +'</legend> \
	<input type=hidden name=\'setting[multiple]\' value=\''+(descriptor.multiple?'1':'0')+'\' /> \
	<input type=hidden name=\'setting[sort]\' id=sortIpt value=\'\' /> \
	<input type=hidden name=id value=\''+(id||'')+'\' />'

	var appendData = {}
	var cellTpl = ';__time = __time ||{start:null,end:null};var iKeyPlus=\'\''
	if (descriptor.multiple){
		cellTpl += ';iKeyPlus = \'[\'+global.li++ +\']\''
		}

	cellTpl += '; __idata = __idata || {};var _h =""; \
			_h += "<table ci=\'"+iKeyPlus+"\' class=\'dataintable cell '+ (descriptor.multiple?'multiple':'') +'\'> \
			<tr class=pure-control-group><td class=pure-label>"; if ('+(!!descriptor.multiple)+'){_h += "<span class=\'upable icon-circle-arrow-right\'></span>"}; \
			_h += "</td><td colspan=2 class=dateCell> <div class=\'input-append date form_datetime\'> \
			<input placeholder=开始时间 value=\'"+ (__time.start||"") +"\' name=time"+iKeyPlus+"[start] readonly  ><span class=add-on> \
<i class=icon-remove></i></span><span class=add-on><i class=icon-calendar></i></span></div> \
			<div class=\'input-append date form_datetime\'><input placeholder=结束时间 value=\'"+ (__time.end||"") +"\' name=time"+iKeyPlus+"[end] readonly  ><span class=add-on> \
<i class=icon-remove></i></span><span class=add-on><i class=icon-calendar></i></span></div>  \
			<td class=deunit>"; if ('+(!!descriptor.multiple)+'){_h += "<span class=\'multiple i-minus\'>-</span>"};_h +="</td></tr>"'
	for (var key in item){
		if (!item.hasOwnProperty(key)) continue
		var itemv = item[key]
		appendData[key] = itemv.multiple ? [''] : ''
		var inputAttr = ''
		if (itemv.maxLength)
			inputAttr += ' maxlength='+itemv.maxLength
		if (itemv.place)
			inputAttr += ' placeholder=\''+itemv.place+'\''

		if (itemv.validor) {
			global.validRuls[key] = itemv.validor
			inputAttr += ' validor=\''+ key + '\''
			}

		cellTpl += ';_h +="<tr class=pure-control-group><td class=pure-label>'+ itemv.desc+ '</td><td>"'
		switch (itemv.type){
			case  'radio':
			case 'checkbox':
					cellTpl += ';_h += "<div class=cellBox>";if (! (\''+key+'\' in __idata)){ __idata[\''+key+'\'] =\''+itemv.default+'\'};'
					for (var sval in itemv.item){
						cellTpl += ';_h += "<label><input name=\'data"+iKeyPlus+"['+key+']\'";var isCheck =\'\' ;\
						if (\''+sval+'\' ==__idata[\''+key+'\'] ){isCheck=\'checked=true\'}; _h += isCheck+" value=\''+sval+'\' type='+ itemv.type +' /> '+itemv.item[sval]+'</label>";'
						}
					cellTpl += ';_h += "</div>";'
					break
			case 'textarea':
					cellTpl += ';_h += "<textarea style=\'width:100%;\' name=\'data"+iKeyPlus+"['+ key  +']\' '+ inputAttr +' \
						>"+ hEncode(__idata[\''+key+'\'])'+ '+"  </textarea>"'
					break
			default:
				inputType = 'text'
				if (itemv.multiple){
					cellTpl += ';_h += "<ol>"; \
					var j = __idata[\''+key+'\']?__idata[\''+key+'\'].length : 0; \
					var i = 0;if(!j) i = -1,j=0; \
					for ( ;i < j ;i++){ \
						_h += "<li class=\'cell "+(-1==i?\'unit\':\'\')+"\'><span class=\'upable icon-circle-arrow-right\'></span>'
						if (itemv.item){
							for (var skey in itemv.item){
								if ('string' != typeof itemv.item[skey] && 'item' in itemv.item[skey]){
									var itemvi = itemv.item[skey]
									itemvi = itemvi.item
									cellTpl += '<table class=\'dataintable cell\'><tr><td><h3>'+itemv.desc+'</h3><ol>"; \
									var __lidata =  __idata[\''+key+'\'] && __idata[\''+key+'\'][i] && __idata[\''+key+'\'][i][\''+skey+'\']; \
									var jj = __lidata?__lidata.length : 0; \
									var ii = 0;if(!jj) ii = -1,jj=0; \
									for ( ;ii < jj ;ii++){ \
								      _h += "<li class=\'cell "+(-1==i?\'unit\':\'\')+"\'><span class=\'upable icon-circle-arrow-right\'></span>'

									for (var skeyi in itemvi){
									cellTpl += '<label class=\'cellItem\'>'+itemvi[skeyi]+'<input class=\'skey\' type='+inputType+' \
									name=\'data"+iKeyPlus+"['+ key  +']['+skey+']["+i+"]['+skeyi+'][]\' ' +inputAttr +' \
									value=\'"+hEncode(__lidata && __lidata[ii] && __lidata[ii][\''+skeyi+'\'] )+"\' /></label>'

										}
									cellTpl += '<span class=\'toRemove i-minus\'>-</span></li>" }'

									cellTpl += ';_h += "</ol></td><td class=\'operation\'><span class=\'multiple smulti i-plus\'>+</span></td></tr></table>'

								}else {
										if ('br' == itemv.item[skey]){
											cellTpl += '<br style=clear:both />'
										}else{
											cellTpl += '<label class=\'cellItem\'>'+itemv.item[skey]+'<input class=\'\' type='+inputType+' name=\'data"+iKeyPlus+"['+ key  +']['+skey+'][]\' ' +inputAttr +' \
											value=\'"+hEncode(__idata[\''+key+'\'] && __idata[\''+key+'\'][i] && __idata[\''+key+'\'][i][\''+skey+'\'])+"\' /></label>'
										}
									}
								}
						}else{
							cellTpl += '<input type='+inputType+' name=\'data"+iKeyPlus+"['+ key  +'][]\' ' +inputAttr +' value=\'"+hEncode(__idata[\''+key+'\'] && __idata[\''+key+'\'][i])+"\' />'
						}
						cellTpl += '<span class=\'toRemove i-minus\'>-</span></li>\
						" } \
						_h += "</ol>"'
				}else{
						if (itemv.item){
							for (var skey in itemv.item){
								if ('br' == itemv.item[skey]){
									cellTpl += ';_h += "<br style=clear:both />";'
								}else{
							cellTpl += ';_h += "<label class=\'cellItem\'>'+itemv.item[skey]+'<input type='+inputType+' name=\'data"+iKeyPlus+"['+ key  +']['+skey+']\' '+ inputAttr +' \
								value=\'"+ hEncode(__idata[\''+key+'\'] && __idata[\''+key+'\'][\''+skey+'\'])'+ '+"\'  ></label>"'
								}
							}
						}else {
							cellTpl += ';_h += "<input type='+inputType+' name=\'data"+iKeyPlus+"['+ key  +']\' '+ inputAttr +' \
								value=\'"+ hEncode(__idata[\''+key+'\'])'+ '+"\'  >"'
						}
					}
			}
		cellTpl +=';_h += "</td><td class=\'operation\'> \
				<span class=\'\'><input title=\'diable data\' '+ (itemv.required?'disabled=true':'')+' class=\'disable\' type=checkbox /></span>'
				+'<span class=\''+(itemv.multiple?'multiple i-plus':'')+'\'>'+(itemv.multiple?'+':'')+'</span></td> \
				<td class=\'note\'>'+(itemv.note||'')+'</td></tr>"'
	}
	cellTpl +='; _h += "</table>"; return _h '
	//console.log(cellTpl)

	cellTpl = new Function('__idata,__time' ,cellTpl)
	global.cellTpl = cellTpl
	//console.log(cellTpl.toString())

	var _h = ''
	if (!descriptor.multiple) {
		var tt = {}
		tt[TimeInputPrefix+'0'] = timeSaved
		timeSaved = tt
		data = [data]
	}
	if (data && data.length){
		for (var i=0,j=data.length;i<j;i++){
			_h += cellTpl(data[i],timeSaved && timeSaved[TimeInputPrefix+i])
			}
	}
	if (!_h) _h = cellTpl(appendData)

	//console.log(dataTitle ,_h)
	pnl = $(pnl)
	pnl.html(pnl.html() + '<fieldset>' + dataTitle + '</fieldset> '
	+ (descriptor.multiple ? '<p class=unit><span class=\'multiple i-plus\'>+</span></p>' :'')+
	'<div class=pure-controls><button type="submit" class="pure-button pure-button-primary">Save</button></div>')
	_h = $(_h)
	$(' fieldset',pnl).append(_h)
	operateBuild(_h)

	var field = $(' fieldset',pnl)
	$(' .unit .multiple',pnl).on('click',function(){
		var _h = $(global.cellTpl() )
		operateBuild(_h)
		field.append(_h)
		})
	$(pnl).closest('form').submit(function(){
		$('input[validor]',this).trigger('change')
		var errInps = $('.warning').not(':disabled')
		if (errInps.length){
			errInps[0].focus()
			return false
			}
		var form = $(this)
		$.ajax({
				type: 'POST',
				url: form.attr('getJson'),
				data: form.serialize(),
				dataType: "json"
				,success: sendForm
			})
		function sendForm(req){
			if (req['data']) {
				req['data'] = JSON.stringify( toFullData( descriptor,req['data']) )
			}else{
				req['data'] = ''
				}
			//console.log(re)
			if (descriptor.multiple){
				var timeSet = {}
				if (req.time){
					$.each(req.time , function(i , v){
						if (v.start || v.end) timeSet[TimeInputPrefix + i] =  req.time[i]
					})
				}
				req.time = timeSet
			}else{
				if (!req.time.start && !req.time.end) delete req.time
				}
			$.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: req,
				dataType: "json"
				,success: function(res){
					if (res.code == 1){
						alert('保存成功')
						window.location.reload()
					}else{
						alert('失败:\n' +res.message)
					}
					}
				,error :function(){
					alert('something fail -_-!')
					}
				})
			}
	/*
		var sendData = toFullData(descriptor , $(this).serializeArray())
		console.log(sendData)
		var sort = []
		$('table.multiple').each(function(){
			var i = $(this).attr('ci').replace(/\D/g,'')
			sort.push(i)
			})

		$('#sortIpt').val(sort.join(','))
	*/
		return false
		})

	$(document).on('change','input[validor]',function(){
		if (this.disabled) return
		var validorRule  = global.validRuls[$(this).attr('validor')]
		if (!validorRule) return
		var isValid = checkInput(this, validorRule)
		if (!isValid)
			$(this).addClass('warning')
		else
			$(this).removeClass('warning')


		})


	return cellTpl

}


function uploadBuild(pnl,php , opt){
	var upfiles = $('<p id="upload_pnl"></p>').append($('<span class="btn"></span>').click(function(){
			upfiles.addClass('opt')
			return false;
		})).click(function(){
			upfiles.removeClass('opt')
			})

	pnl = $(pnl)
			.html('<form class="upload_form"><input name=upload type=file multiple /></form>')
			.append(upfiles)
			.append('<br style="clear:both;" />')
			.addClass('upload')
	var src
	upfiles.on('dragstart' ,'a' ,function(){
			src = $(this ).attr('src')
		}).on('dragend' ,'a' , function(evt){
			src = null
			upfiles.append($(this).addClass('draged'))
		}).on('dblclick' ,'a' , function(){
			if (window.prompt('',$(this).attr('href'))) $(this).remove()
		}).on('click','a' ,function(){
			return false
		})
	$(document).on('drop','input', function(evt){
		var inp = $(this)
		window.setTimeout(function(){
			src && inp.val(src)
			},0)
		})

	function listImg(upfile){
		if (upfile.error) return alert(upfile.error);
		upfiles.append('<a  href="'+upfile.src+'"><img src="'+upfile.src+'" alt="'+upfile.name+'" /></a>')
		}
	var input = $('input[type=file]' , pnl).bind('change' , function(){
		var datas = new FormData();
		if (opt) {
			for (var k in opt) datas.append(k , opt[k])
		}

		for (var i = 0, j = this.files.length ; i< j ;i ++){
			file = this.files[i]
			datas.append('Filedata[]', file);
		}
		var xhr = new XMLHttpRequest();
		xhr.open("POST", php);
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4 && xhr.status==200) {
				var res = JSON.parse(xhr.responseText)
				res.forEach(function(upfile){
					listImg(upfile)
					})
				}
			}
		xhr.send(datas)
			//console.log(this.files)
	})


	}

function getScriptDomain(){
	var scriptEls = document.getElementsByTagName( 'script' );
	var thisScriptEl = scriptEls[scriptEls.length - 1];
	var scriptPath = thisScriptEl.src;
	var a = document.createElement('A')
	a.href = scriptPath
	return a.hostname
	}
var scrDomain = getScriptDomain()

var evts = []
	,_ready = false

importCss('//'+ scrDomain +'/css/pure_form.css')
importCss('//'+ scrDomain +'/css/formor.css')
importCss('//'+scrDomain+'/css/datetimepicker.css')

importJS('//'+ scrDomain +'/js/datetimepicker.js' ,function(){
	_ready = true
	evts.length && $.each(evts ,function(k , evt){
		evt()
	})

})
function formBuild(){
	var args = arguments
	if (_ready){
		_formBuild.apply(null,args)
	}else{
		evts.push(function(){
			_formBuild.apply(null,args)
			})
	}
}
