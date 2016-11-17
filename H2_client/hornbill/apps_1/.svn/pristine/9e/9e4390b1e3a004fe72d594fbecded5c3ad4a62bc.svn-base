function dict(){
	return this;	
}
var controlFns = {
	'index' :function(catalogid){
		this.show(catalogid);
		}
	,'price': function (catalogid){
		return	this.show(catalogid , 1)
		}
	,'discuss' : function(catalogid){
		return	this.show(catalogid , 2)
		}
	,'show' : function(catalogid , sptype){
		if (!catalogid || 'undefined' == catalogid) 
			return	this.errorPage()
			
		var pricePg = 	(1 === sptype)
			,discussPg = (2 === sptype) 

		var php = {
			//'goods' : '/goods/catalog_poster',
			'attr_words' : '/welcome/attr_words',
			'attr_hot_keywords' : '/goods/popular_keywords_new',
			'recommend' : '/dict/recommend'
		};
		php['goods'] = '/dict/show/'+catalogid
		if (pricePg)
			php['goods'] += '?s=price'
		else if (discussPg)
			php['goods'] += '?c=discuss'
			
			
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		//var urlpre = this.req.url.indexOf('dict') > -1 ? '/dict/show/' : '/book/'
		this.listenOver(function(data){
			if (!data.goods) return mSelf.errorPage();
			data.pricePg = !!pricePg
			data.discussPg = !!discussPg

			data._CSSLinks = ['page_guang'];
			data.bookId = catalogid
			var keyword = data.goods.wordname;
			if (302 == data.goods.code && data.goods.message) {
				return mSelf.redirectTo( data.goods.message)
				}
			//if (!keyword) return  mSelf.errorPage() 
		
				
			if (pricePg && keyword.indexOf('价格')<0){
				if (keyword.indexOf(' ') > 0 )
					data.pageTitle = keyword+' 价格-美丽说';
				else
					data.pageTitle = keyword+'价格-美丽说';
			}else
				data.pageTitle = '【多图】'+keyword+' - '+keyword+'品牌|价格|评论,'+keyword+'图片|搭配|排行榜-美丽说';
			if (pricePg){
				data.keywords = keyword + '价格';
				data.meta_description = keyword 
				var tInfo = data.goods.tInfo
				if (tInfo){
					var i = 0
					while (i <= 1){
						if (!tInfo[i]) break
						data.meta_description += ' ' + tInfo[i].uinfo.nickname + '分享' +  tInfo[i].ginfo.goods_title.substr(0,10) + tInfo[i].ginfo.goods_price.replace('¥','')
						i+= 4
						}
					}
			}else if (discussPg){
				data.pageTitle = keyword + '怎么样';
				data.meta_description = keyword + '怎么样?'
				data.keywords = keyword ;
				var tInfo = data.goods.tdk
				if (tInfo){
					var i = 0
						,k = 0
					while (true){
						if (!tInfo[i]) break
						if (k++ >= 2) break

						var comments = tInfo[i].comments
						if (comments && comments.length){
							data.meta_description += ' ' + comments[0].author.nickname + '对' + keyword + '评论为' +  comments[0].twitter_htmlcontent.substr(0,10) 
						}else if(tInfo[i].count_like){
							data.meta_description += ' 有'+ tInfo[i].count_like+'人喜欢' + tInfo[i].ginfo.goods_title 
						}else{
							k--
							}
						i++
						}
					}

			}else{
               data.pageTitle = keyword+' : '+keyword+'图片及搭配,'+keyword+'价格-美丽说';
                data.keywords = keyword;
                data.meta_description = keyword+'是当前流行的时尚元素,如'
                var tInfo = data.goods.tdk
                if (tInfo){
                    var i = 0
                        ,k = 0
                    while (true){
                        if (!tInfo[i]) break
                        if (k++ >= 2) break
                        data.meta_description += tInfo[i].uinfo.nickname +'分享'+ tInfo[i].ginfo.goods_title
                        if (i == 0)
                            data.meta_description += '包含'+keyword+'图片,'+keyword +'价格'+ tInfo[i].ginfo.goods_price + '元,'
                        else
                            data.meta_description += '价格'+ tInfo[i].ginfo.goods_price +'元及图片'

                        i ++
                        }
                    }
			}

			data['_mobileAgent'] = '/book/' + catalogid;
			data.headTag = 'book';
			// true 宽屏 
			data.fluid = true;
			data.isMagFavor = true;
			data.catalogid = catalogid;
			data.tplName = true;
			mSelf.render('dict.html' , data);	
		});
	}
};

exports.__create = controller.__create(dict , controlFns);
