function order_aw(){
	return this;
}
var controlFns = {
	proxy : function(){
        this.res.write('<script>')
        this.res.write('parent.' +this.req.__get['__callback'] + '('+ JSON.stringify(this.req.__get.data)+')')
        this.res.write('</script>')
        this.res.end()
    },
	test : function(){
		//this.ajaxTo('/systems/reflect_request')
		var php = {
			'query' : '/systems/reflect_request'
			}

		this.bridgeMuch(php)
		 this.listenOver(function(data){
			 this.res.end(JSON.stringify(data))
		 },true)
		},
	updateDecl : function(){
		var php = {
			'about_me' : '/person/update_about_me'	
		}
		this.ajaxTo(php);
	},
	updateLabel : function(){
		var php = {
			'label_operation' : '/person/label_operation'
		}	
		this.ajaxTo(php);
	},
	reportTwitter : function(){
		this.ajaxTo('/twitter/complaint');	
	},
	poster_dm_del : function(){
        this.ajaxTo('/goods/goods_delete_request');
    },
    twitter : function(params){
    	var php = {
    		'like' : '/twitter/like',
			'destroy' : '/twitter/destroy',
			'destroy_spam' : '/twitter/destroy_spam',
			'create' : '/twitter/create'
    	}
    	this.ajaxTo(php[params]);
    },
	group : function(params){
		var php = {
			'remove' : '/group/remove',
			'follow_groups' : '/group/follow_groups',
			'create' : '/group/create'
		}
		this.ajaxTo(php[params])
	},
	club : function(params){
		var php = {
			'create' : '/club/article_post',
			'delete' : '/club/article_delete ',
			'like' : '/club/article_like',
			'reply' : '/club/article_reply',
			'club_guide' : '/club/close_tips',
			'user_block' : '/club/user_block',
			'article_update_board' : '/club/article_update_board',
			'article_shopping_check' : '/club/article_shopping_check',
			'shoppingshow_post': '/club/shoppingshow_post'
		}
		this.ajaxTo(php[params])
	},
	topic : function(params) {
        var php = {
            'create' : '/topic/Topic_add_twitter'
        };
        this.ajaxTo(php[params]);
    },
	user : function(params){
		var php = {
			'follow' : '/user/relation_create',
			'unfollow' : '/user/relation_destroy',
			'logon' : '/user/user_log_on',
			'captcha' : '/user/logon_need_captcha',
			'reactive' : '/user/reactive',
			'reactive_send_sms' : '/user/reactive_send_sms',
			'reg_validate' : '/register/register_validate'
		}
		// this.debugSnake({'target':'devlab3'});
		this.ajaxTo(php[params])
	},
	sku : function(p){
		var php = {
			'ready_tobuy' : '/connect/tobuy_sku_cache'
			}
		this.ajaxTo(php[p])
		
		}
	,'doota' : function(p){
		var php = {
			'addToCarts' : 'doota::/cart/add'
			}
		this.ajaxTo(php[p])
	},
    vote : function(params){
        var php = {
            'cupGod': '/customactivity/CustomActivity_World_Cup_Man'
        }
        this.ajaxTo(php[params]);
    }
}
exports.__create = controller.__create(order_aw , controlFns);
