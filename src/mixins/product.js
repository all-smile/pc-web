// 存放全局的mixin， 可拆分到模块独享

import { mapGetters } from 'vuex'
import { fetchListData } from '@/api/global/api.js'
export default {
  data() {
    return {
      p_category: [],
      listdata: [],
      p_total: 0,
      p_loading: false,
    }
  },
  computed: {
    // ...mapGetters(['productLevel', 'productLevelInfo']),
    p_listdata() {
      const data = this.listdata;
      data.forEach((item) => {
        // ...
        if (item.status === 2 || item.status === 3) {
          // jsx 方式，打标签
          item.status = <span style={{color: '#999'}}>停售</span>
        } else {
          item.status = item.status
        }
        if (item.age <= 25) {
          item.age = <span style={{ color: '#4760f0' }}>{item.age}</span>
        }
        if (item.sex === 'Man') {
          item.sex = <span style={{ color: '#4760f0' }}>{item.sex}</span>
        }
      })
      return data;
    }
  },
  methods: {
    async getProductList(params = {}) {
      try {
        this.p_loading = true
        this.listdata = []
        const res = await fetchListData(params)
        if (res.code === 0) {
          const { data = [], total = 0 } = res || {}
          if (Array.isArray(data)) {
            this.listdata = [...data]
            this.p_total = total
          } else {
            this.listdata = []
            this.p_total = 0
          }
        } else {
          this.listdata = []
          this.p_total = 0
          this.$message.error(res.message || '出错了')
        }
        this.p_loading = false;
      } catch (err) {
        this.p_loading = false
        this.listdata = []
        this.p_total = 0
        console.log(err);
      }
    }
  }
}
