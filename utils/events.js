var Events = {

  _callbacks: {},

  on: function(ev, callback) {
    var evs = ev.split(' ');
    for (var i = 0, len = evs.length; i < len; i++) {
      var name = evs[i];
      this._callbacks[name] = [];
      this._callbacks[name].push(callback);
    }
    return this;
  },

  // todo
  one: function(ev, callback) {
    var handler;
    return this.on(ev, handler = function() {
      this.off(ev, handler);
      return callback.apply(this, arguments);
    });
  },

  trigger: function() {
    var args = [].slice.call(arguments),
        ev = args.shift(),
        list = this._callbacks[ev];
    if (!list) return;
    for (var j = 0, len = list.length; j < len; j++) {
      var callback = list[j];
      if (!callback.apply(this, args)) return false;
    }
    return true;
  },

  off: function(ev, callback) {
    if (arguments.length === 0) {
      this._callbacks = {};
      return this;
    }
    if (!ev) return this;
    var evs = ev.split(' ');
    for (var i = 0, len = evs.length; i < len; i++) {
      var name = evs[i];
      var list = this._callbacks[name];
      if (!list) continue;
      for (var j = 0, length = list.length; j < length; j++) {
        var cb = list[j];
        if (cb == callback) {
          list = list.slice();
          list.splice(i, 1);
          this._callbacks[name] = list;
          return;
        }
      }
    }
  },

};

module.exports = Events;