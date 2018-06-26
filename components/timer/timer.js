Component({

  properties: {
    totalSeconds: { // 总的秒数
      type: Number,
      value: 0
    },
    midSeconds: {  // 到某一秒，可以触发一个事件
      type: Number,
      value: 0
    },
    refresh: {
      type: Number, 
      value: 1000 // 1秒
    },
    path: {
      type: Number,
      value: 0 // 0是倒计时 ， 1为增计时
    },
    auto: { // 是否自动启动计时器
      type: Boolean,
      value: true 
    }
  },

  data: {
    // 这里是一些组件内部数据
    mins: '',  // 分
    secs: '',  // 秒
  },

  methods: {
    // 这里是一个自定义方法
    customMethod: function(){},

    start: function() {
      if (this._interval) return;
      this.triggerEvent('timerstart');
      this._timeLeft = this.properties.totalSeconds;
      this._path = this.properties.path;
      this._midSeconds = this.properties.midSeconds;
      this._render();
      this._interval = setInterval(() => {
        this._render();
        if (this._midSeconds > 0 && (this._timeLeft - 1) === this._midSeconds) {
          this.triggerEvent('tomidseconds', this._interval);
        }
      }, this.properties.refresh);
    },

    stop: function() {
      // console.log('stop');
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = false;
      }
    },

    _render: function() {
      var date = this._getDiffDate();
      this.setData(date);
    },

    _getDiffDate: function() {
      var diff = (this._path == 0 ? this._timeLeft-- : this._timeLeft++);
      if (diff <= 0) {
        if (this._interval) {
          this.stop();
          this._onEnd();
        }
        return {
          mins: "00",
          secs: "00"
        };
      }
      if (diff >= 60) {
        var mins = Math.floor(diff / 60);
        diff -= mins * 60;
      }
      var seconds = Math.floor(diff);
      return {
        mins: this._addZero(mins || 0),
        secs: this._addZero(seconds)
      };
    },

    _onEnd: function() {
      console.log('on end');
      this.triggerEvent('toend');
    },

    _addZero: function(num) {
      num += '';
      if (num.length === 2) return num;
      return '0' + num;
    },
  },

  ready: function() {
    if (this.properties.auto) this.start();
  },

  detached: function() {
    console.log('detached');
    this.stop();
  }


});