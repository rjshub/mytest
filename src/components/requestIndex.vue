<template>
  <div>
    <button @click="getList">点击请求数据</button>
    <ul>
      <li v-if="result.length" v-for="(item, index) in result" :key="index">{{item.headline}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "requestIndex",
    data() {
      return {
        result: []
      }
    },
    methods: {
      getList() {
        //    简单方式
        // this.$http.get('https://easy-mock.com/mock/5d6395ad5abfb4446ff8a998/demo-allsense/workItem').then(res => {
        //   if (res.status === 200) {
        //     console.log(res.body.data, 123)
        //   }
        // })

        //   标准格式
        const THIS = this
        function createXMLHttpRequest() {
          var xmlHttp
          if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest()
          } else if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
          }
          return xmlHttp
        }

        let xmlHttp = createXMLHttpRequest()
        let url = 'https://easy-mock.com/mock/5d6395ad5abfb4446ff8a998/demo-allsense/workItem'

        xmlHttp.onreadystatechange = function () {
          // readyState == 4说明请求已完成
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200 || xmlHttp.status === 304) {
            // 从服务器获得数据
            console.log(JSON.parse(xmlHttp.responseText).data, 12312)
            THIS.result = JSON.parse(xmlHttp.responseText).data
          }
        }
        xmlHttp.open('GET', url, true)
        xmlHttp.setRequestHeader('Content-Type', 'application/json;utf-8')
        xmlHttp.send()
      }
    }
  }
</script>

<style scoped>

</style>
