function welcome_aj() {
    return this;
}

var controlFns = {
    guessYouLike : function(){
        this.ajaxTo('/welcome/Guess_you_like');
    }
}

exports.__create = controller.__create(welcome_aj, controlFns);
