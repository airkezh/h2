var controlFns = {
   'cooper' : function(args){
        var self = this;
		var isnew = this.req.__get.isnew || 0
        var php = {
            'list':'cooper::/api/pages/list/wd?sence=1'
        }

        this.bindDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data.list = data.list.data || []

			if(data.list.length == 0){
				data.showBanner = 1
				if(isnew)
					data.isnew = 1
			}

            data.pageTitle = '微杂志';
            data._CSSLinks = ['wd/cooperlist'];

            this.render('wd/cooperlist.html' , data);
        })
    }
}

exports.__create = controller.__create(new Function(), controlFns);
