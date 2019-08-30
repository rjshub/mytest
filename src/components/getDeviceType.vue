<template>
  <div>
    <button @click="getDeviceType">点击获取</button>
    <span>当前设备类型为：{{device}}</span>
  </div>
</template>

<script>
  export default {
    name: "getDeviceType",
    data() {
      return {
        device: ''
      }
    },
    methods: {
      getDeviceType() {
        let userType = ''
        let ua = navigator.userAgent.toLowerCase()       // 获取设备类型
        if (ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1) {
          userType = 'android'
        } else if (ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/)) {
          userType = 'ios'
        }
        this.device = userType
      }
    }
  }
</script>

<style scoped>

</style>
