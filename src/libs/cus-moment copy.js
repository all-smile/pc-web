const moment = require("moment");

// 判断日期是不是今天、昨天， 0:今天 -1:昨天 1-明天
// str: 2023-02-07 14:09:27.0
export function isWhichDay(str) {
  const date = new Date();
  const that = moment(moment(str).format("YYYY-MM-DD")).valueOf();
  const today = moment(moment(date).format("YYYY-MM-DD")).valueOf();
  const timeStampDiff = that - today;
  const obj = {
    "-86400000": "-1",
    0: "0",
    86400000: "1",
  };
  return obj[timeStampDiff] || null;
}

// 判断是不是当年
export function isCurYear(str) {
  return moment().format("YYYY") === moment(str).format("YYYY");
}

/**
 * 格式化时间 YYYY-MM-DD HH:mm:ss
 * 1、当天时间显示如 10:00
 * 2、昨天显示如 昨天10:00
 * 3、昨天之前且当年的，显示如，05-01 10:00
 * 4、昨天之前且跨年的，显示如， 2022-05-01 10:00
 * @param {string} time  "2022-05-01 10:00:01.0"
 * @returns {string}
 */
export function formatTime(time) {
  const t = isWhichDay(time);
  if (t === "0") {
    return moment(time).format("HH:mm");
  } else if (t === "-1") {
    return `昨天 ${moment(time).format("HH:mm")}`;
  } else if (
    isCurYear(time) &&
    moment(time).valueOf() < moment(new Date()).valueOf()
  ) {
    return moment(time).format("MM-DD HH:mm");
  } else {
    return moment(time).format("YYYY-MM-DD HH:mm");
  }
}
