// 存放全局的mixin， 可拆分到模块独享

import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapMutations({
      set_headerTitle: 'SET_HEADERTITLE'
    }),
    setHeaderTitle(title) {
      this.set_headerTitle(title)
    },
    ParseMoney(s, n) { // 金额展示fmoney(s, n) {
      if (s == 0) {
        return '0.00'
      }
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let rIndex = -1
      // for (let i = 0; i < r.length; i++) {
      //   if (r.charAt(i) != 0) {
      //     rIndex = i
      //   }
      // }
      // r = r.slice(0, rIndex + 1)
      if (r != '') {
        r = '.' + r
      }
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + r
    },
    getSize(size) {
      if (size > 1024) {
        return parseFloat(size / 1024).toFixed(2) + ' M'
      } else {
        return parseFloat(size).toFixed(2) + ' KB'
      }
    },
    converSize(limit) {
      // 传入字节单位
      var size = ''
      if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
        size = limit.toFixed(2) + 'B'
      } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + 'KB'
      } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
      } else { // 其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
      }

      var sizestr = size + ''
      var len = sizestr.indexOf('\.')
      var dec = sizestr.substr(len + 1, 2)
      if (dec == '00') { // 当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
      }
      return sizestr
    },

    // 判断IE浏览器
    isIE() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else {
        return false;
      }
    },

    // 判断IE并给出相应的版本
    IEVersion() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
          return 7;
        } else if (fIEVersion == 8) {
          return 8;
        } else if (fIEVersion == 9) {
          return 9;
        } else if (fIEVersion == 10) {
          return 10;
        } else {
          return 6;//IE版本<=7
        }
      } else if (isEdge) {
        return 'edge';//edge
      } else if (isIE11) {
        return 11; //IE11
      } else {
        return -1;//不是ie浏览器
      }
    },

    // 判断主流浏览器版本
    browserVersion() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
      var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
      var isOpera = userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1; //Opera浏览器
      var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Chrome浏览器
      var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Safari浏览器
      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
          return 'IE7';
        } else if (fIEVersion == 8) {
          return 'IE8';
        } else if (fIEVersion == 9) {
          return 'IE9';
        } else if (fIEVersion == 10) {
          return 'IE10';
        } else {
          return 'IE6';//IE版本<7
        }
      } else if (isIE11) {
        return 'IE11';
      } else if (isEdge) {
        return 'Edge' + userAgent.split('Edge/')[1].split('.')[0];
      } else if (isFirefox) {
        return 'Firefox' + userAgent.split('Firefox/')[1].split('.')[0];
      } else if (isOpera) {
        return 'Opera' + userAgent.split('OPR/')[1].split('.')[0];
      } else if (isChrome) {
        return 'Chrome' + userAgent.split('Chrome/')[1].split('.')[0];
      } else if (isSafari) {
        return 'Safari'; +userAgent.split('Safari/')[1].split('.')[0];
      } else {
        return -1;//不是ie浏览器
      }
    },
  }
}
