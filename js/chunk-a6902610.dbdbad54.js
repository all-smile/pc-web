(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a6902610"],{"1ef1":function(t,e,a){},"30a2":function(t,e,a){},"3a51":function(t,e,a){"use strict";a("7bc7")},"5ee0":function(t,e,a){"use strict";a("1ef1")},6861:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return l}));var s=a("b1d0");function i(t,e={}){return s.a.post({url:"/pcApi/file/upload",mockUrl:""},t,e)}function l(t){return s.a.get({url:"getListAPI",mockUrl:"./mock/listData.json"},t)}},"7bc7":function(t,e,a){},c885:function(t,e,a){"use strict";a.r(e);var s={name:"TextCard",props:{cardData:{type:Object,require:!0}},components:{},data(){return{}},computed:{},watch:{},created(){},mounted(){},methods:{},updated(){},beforeDestroy(){}},i=(a("d2bf"),a("2877")),l=(s=Object(i.a)(s,(function(){var t=this._self._c;return t("div",{staticClass:"textCard"},[t("div",{staticClass:"ellipsis card-name"},[this._v(this._s(this.cardData.name))]),t("i",{directives:[{name:"moreIcon",rawName:"v-moreIcon"}],staticClass:"el-icon-arrow-down icon_down"})])}),[],!1,null,"001428ae",null).exports,{props:{myvNode:{type:[Array,String,Object,Number]}},render(t){return"object"==typeof this.myvNode?this.myvNode:t("div",{class:"ellipsis"},this.myvNode)}}),n=(l={name:"TableList",props:{tableData:{type:Array,required:!0},fieldList:{type:Array,required:!0},align:{type:String,default:"left"}},components:{"render-dom":l},data(){return{}},computed:{},watch:{},created(){},mounted(){},methods:{rowClickToDetail(t){}},updated(){},beforeDestroy(){}},l=(a("5ee0"),Object(i.a)(l,(function(){var t=this,e=t._self._c;return e("ul",{staticClass:"listV2"},[e("li",{staticClass:"listV2_row-title"},t._l(t.fieldList,(function(a,s){return e("span",{key:s,staticClass:"listV2_cell ellipsis",attrs:{name:a.fieldName}},[t._v(" "+t._s(a.fieldLabel)+" ")])})),0),0===t.tableData.length?e("div",{staticClass:"nodata"},[t._v("暂无数据")]):t._e(),t._l(t.tableData,(function(a,s){return e("li",{key:s,staticClass:"listV2_row pointer",on:{click:function(e){return t.rowClickToDetail(a)}}},t._l(t.fieldList,(function(t,s){return e("span",{key:s,staticClass:"listV2_cell ellipsis",attrs:{name:t.fieldName}},[e("render-dom",{attrs:{myvNode:a[t.fieldName]||"-"}})],1)})),0)}))],2)}),[],!1,null,"4cd7c48f",null).exports),a("6861")),r=[{fieldName:"name",fieldLabel:"名字",callbackFn:"toDetail",extra:{}},{fieldName:"sex",fieldLabel:"性别"},{fieldName:"age",fieldLabel:"年龄"}];s={name:"Customer",props:{},components:{card:s,"table-list":l},mixins:[{data(){return{p_category:[],listdata:[],p_total:0,p_loading:!1}},computed:{p_listdata(){const t=this.$createElement;var e=this.listdata;return e.forEach(e=>{2===e.status||3===e.status?e.status=t("span",{style:{color:"#999"}},["停售"]):e.status=e.status,e.age<=25&&(e.age=t("span",{class:"badge_info"},[e.age])),"Man"===e.sex&&(e.sex=t("span",{class:"badge_default"},[e.sex]))}),e}},methods:{async getProductList(t={}){try{this.p_loading=!0,this.listdata=[];var e,a,s=await Object(n.a)(t);0===s.code?(({data:e=[],total:a=0}=s||{}),Array.isArray(e)?(this.listdata=[...e],this.p_total=a):(this.listdata=[],this.p_total=0)):(this.listdata=[],this.p_total=0,this.$message.error(s.message||"出错了")),this.p_loading=!1}catch(t){this.p_loading=!1,this.listdata=[],this.p_total=0}}}}],data(){return{tableData:[],fieldList:Object.freeze(r),listData:Object.freeze([{name:"阿三发射点"},{name:"阿三"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"},{name:"阿三发射点无法支付的"}])}},computed:{},watch:{},created(){},mounted(){this.initData()},methods:{initData(){this.getProductList()}},updated(){},beforeDestroy(){}},a("3a51"),l=Object(i.a)(s,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"customer"},[e("div",{staticClass:"card_view"},t._l(t.listData,(function(t,a){return e("div",{key:a,staticClass:"card_view-item"},[e("card",{attrs:{cardData:{name:t.name}}})],1)})),0),e("vxe-table",{attrs:{data:t.p_listdata}},[e("vxe-column",{attrs:{type:"seq",width:"60"}}),e("vxe-column",{attrs:{field:"name",title:"Name"}}),e("vxe-column",{attrs:{field:"sex",title:"Sex"}}),e("vxe-column",{attrs:{field:"age",title:"Age"}})],1),e("table-list",{directives:[{name:"loading",rawName:"v-loading",value:t.p_loading,expression:"p_loading"}],staticClass:"table_list",attrs:{tableData:t.p_listdata,fieldList:t.fieldList}})],1)}),[],!1,null,"6db858ee",null);e.default=l.exports},d2bf:function(t,e,a){"use strict";a("30a2")}}]);