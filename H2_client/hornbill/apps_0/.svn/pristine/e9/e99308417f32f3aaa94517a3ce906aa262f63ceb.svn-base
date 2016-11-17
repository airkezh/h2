/*common*/
var events = {
    hasId: {},
    noId: {}
};
var $ = require('jquery');
var EventEmitter = {
    pub: function (name, scope, param, fn, id) {
        !id && Object.prototype.toString.call(fn) != '[object Function]' && (id = fn, fn = undefined);
        if (!EventEmitter.getWareHouse(id).hasOwnProperty(name))return;
        EventEmitter.triggerFn(name, id).forEach(function (fun) {
            fun.apply(scope, param, fn);
        });
        return this;
    },
    sub: function (name, fn, id) {
        var fns;
        if (id) {
            fns = {
                id: id, fn: fn
            }
        } else {
            fns = fn;
        }
        var hasChannel;
        if (EventEmitter.getWareHouse(id).hasOwnProperty(name)) {
            hasChannel = true;
        } else {
            hasChannel = false;
        }
        EventEmitter.store(name, fns, id, hasChannel);
        return this;
    },
    store: function (name, fn, id, hasChannel) {
        var warehouse = EventEmitter.getWareHouse(id);
        if (hasChannel) {
            warehouse[name].push(fn);
        } else {
            warehouse[name] = [];
            warehouse[name].push(fn);
        }
    },
    triggerFn: function (name, id) {
        var fns = [];
        if (id) {
            $.each(events.hasId[name], function (index, s) {
                if (s.id == id) {
                    fns.push(s.fn);
                }
            })
        } else {
            fns = events.noId[name];
        }
        return fns;
    },
    getWareHouse: function (id) {
        var warehouse;
        if (id) {
            warehouse = events.hasId;
        } else {
            warehouse = events.noId;
        }
        return warehouse;
    },
    unSub: function (name, id) {
        if (id) {
            $.each(events.hasId[name], function (index, s) {
                if (s.id == id) {
                    events.hasId[name].splice(index, 1);
                }
            })
        } else {
            delete  events.noId[name];
        }
    },
    Once: function (name, fn, id) {
    }
}

return {
    pub: EventEmitter.pub,
    sub: EventEmitter.sub,
    unSub: EventEmitter.unSub,
    once: EventEmitter.Once
};
