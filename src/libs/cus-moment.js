var moment = require("moment");
export function calculateCreateTime(_date, _justOneDay) {
  let date = new Date();
  let thisDate = date.getTime();
  let newDate = new Date(_date);
  let thatDate = newDate.getTime();
  // 获取当前时间与传入时间的时间差
  let timeApart = thisDate - thatDate;
  const timeStampDifference =
    moment(moment(date).format("YYYY-MM-DD")).valueOf() -
    moment(moment(newDate).format("YYYY-MM-DD")).valueOf();
  const ONE_DAY_TIMESTAMP = 86400000;

  console.log('timeStampDifference----', timeStampDifference, moment(moment(_date).format("YYYY-MM-DD")).valueOf());

  // 小于一分钟时
  if (timeApart < 60 * 1000 && !_justOneDay) {
    return "刚刚";
    // 大于一分钟且小于一小时时
  } else if (
    timeApart >= 60 * 1000 &&
    timeApart < 60 * 1000 * 60 &&
    !_justOneDay
  ) {
    return Math.floor(timeApart / 1000 / 60) + "分钟前";
    // 日期是同一天且相差小于24小时（1.21和2.21满足第一个条件所以要加上限制）
  } else if (timeStampDifference < ONE_DAY_TIMESTAMP) {
    if (_justOneDay) {
      return "今天";
    } else {
      return `今天 ${moment(newDate).format("HH:mm")}`
      // return (
      //   "今天" +
      //   newDate.getHours() +
      //   ":" +
      //   (newDate.getMinutes() / 10 < 1
      //     ? "0" + newDate.getMinutes()
      //     : newDate.getMinutes())
      // );
    }
    // 日期相隔一天且相差相遇2天时
  } else if (timeStampDifference < ONE_DAY_TIMESTAMP * 2) {
    if (_justOneDay) {
      return "昨天";
    } else {
      return `昨天 ${moment(newDate).format("HH:mm")}`;
    }
    // return '昨天' + newDate.getHours() + ':' + newDate.getMinutes()
    // 日期相隔两天且相差相遇2天时
  } else if (timeStampDifference < ONE_DAY_TIMESTAMP * 3) {
    if (_justOneDay) {
      return "前天";
    } else {
      return `前天 ${moment(newDate).format("HH:mm")}`;
    }
    // return '前天' + newDate.getHours() + ':' + newDate.getMinutes()
    // 当在同一年的同一个月时
  } else if (
    date.getMonth() === newDate.getMonth() &&
    date.getFullYear() === newDate.getFullYear()
  ) {
    if (_justOneDay) {
      return moment(newDate).format("MM-DD")
      // return newDate.getMonth() + 1 + "月" + newDate.getDate() + "日";
    } else {
      return moment(newDate).format("MM-DD HH:mm")
    }
    // return newDate.getMonth() + 1 + '/' + newDate.getDate() + ' ' + newDate.getHours()
    //   + ':' + newDate.getMinutes()
    // 当在同一年时
  } else if (date.getFullYear() === newDate.getFullYear()) {
    return newDate.getMonth() + 1 + "月" + newDate.getDate() + "日";
    // return newDate.getMonth() + 1 + '/' + newDate.getDate()
    // 相差一年以上时
  } else {
    return (
      newDate.getFullYear() +
      "年" +
      newDate.getMonth() +
      "月" +
      newDate.getDate() +
      "日"
    );
    // return newDate.getFullYear() + '/' + newDate.getMonth() + '/' + newDate.getDate()
  }
}
