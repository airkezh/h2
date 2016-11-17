/*
 @desc: dolphin 接口迁移
 @author: sunzhidong
 @date: 2014-7-7
 */
function subject() {
    return this;
}

var controlFns = {
    'index' : function(tid) {
        var mSelf = this,
            page  = this.readData('page', this.req.__get, 0),
            req   = this.req;

        var php  = {
            'topic' : '/topic/album?album_id=' + tid
        };

        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.isSale = true;
            data.SaleChannel = true;
            data.isTopcart = true;
            data._CSSLinks = ['subject'];
            data.pageTitle = '美丽说';
            data.secondNavHold = true;
            mSelf.render('subject.html', data);
        });

    }
};
exports.__create = controller.__create(subject, controlFns);
