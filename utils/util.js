function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTimeMDHM(date) {
  if (!date) return '';
  var date = replaceDateString(date);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours()
  var minute = date.getMinutes()
  return `${formatNumber(month)}月${formatNumber(day)}日 ${[hour, minute].map(formatNumber).join(':')}`;
}

function deltaTime(stamp) {
  let delta = stamp - Math.floor(new Date().getTime() / 1000);
  if (delta < 0)
    delta = 0;

  return delta
}

function formatTimeMMSS(stamp) {
  const delta = deltaTime(stamp);
  const minute = Math.floor(delta/60);
  const second = Math.floor(delta%60);

  return [minute, second].map(formatNumber).join(':')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// replace '2018-03-20 11:32:10' to '2018/03/20 11:32:10'
function replaceDateString(date) {
  var d = new Date(date.replace(/-/g, '/'));
  return d;
}

function getDateTime(date) {
  if (!date) return 0;
  var d = replaceDateString(date);
  return (new Date(d)).getTime();
}

let screenWidth = 0;
function rpx2px(rpx) {
  if (screenWidth === 0) {
    screenWidth = wx.getSystemInfoSync().screenWidth;
  }
  return rpx * screenWidth / 750.0;
}

function onFormClicked(formId) {
  // todo submit formid
  if (formId !== 'the formId is a mock one') {
    console.log('onFormClicked ', formId)
  }
}


// 保留几位小数
function keepDecimal(num, a = 2) {
  return new Number(num.toFixed(a));
}

module.exports = {
  formatTime,
  deltaTime,
  formatTimeMMSS,
  formatTimeMDHM,
  rpx2px,
  replaceDateString,
  getDateTime,
  keepDecimal,
  onFormClicked
}
