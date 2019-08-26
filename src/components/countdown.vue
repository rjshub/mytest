<template>
  <div>倒计时 <span style="font-weight: bold">{{countTime}}</span></div>
</template>

<script>
  export default {
    name: "countdown",
    data() {
      return {
        countTime: '00:00:00',
      }
    },
    methods: {
      countdown() {
        const now = new Date().getTime()
        const end = new Date("2019-07-31 14:41:59").getTime()
        const leftTime = end - now
        let [d, h, m, s, timer] = []
        if (leftTime > 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          m = Math.floor(leftTime / 1000 / 60 % 60)
          s = Math.floor(leftTime / 1000 % 60)
          if (d) {
            this.countTime = `${d}天${h}小时${m}分${s}秒`
          } else {
            this.countTime = `${h}:${m}:${s}`
          }
          timer = setTimeout(this.countdown, 1000)
        } else {
          clearTimeout(timer)
        }
      }
    },
    mounted() {
      this.countdown()
    }
  }
</script>

<style scoped>

</style>
