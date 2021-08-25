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
  }
}
