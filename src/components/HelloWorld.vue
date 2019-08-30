<template>
  <div class="hello">
    <button @click="toDragging">拖动排序(dragging)</button>
    <button @click="toDraggable">拖动排序(draggable)</button>
    <button @click="toNewMap">new map 测试</button>
    <button @click="toRegular">正则 测试</button>
    <button @click="toFlex">flex 布局</button>
    <button @click="toCountdown">时分秒倒计时</button>
    <button @click="toReceiverList" title="移动端，仿钉钉组织架构并结合elementUI树型组件复选框">选择接受人</button>
    <button @click="toSortList">列表排序</button>
    <button @click="toAlloyFinger">AlloyFinger</button>
    <button @click="toRequestIndex">数据请求</button>
    <button @click="toVideoIndex">视频播放</button>
    <button @click="toGetDeviceType">获取设备类型</button>
    <button @click="toSomeCss">一些CSS样式</button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        key: 'address',
      }
    },
    methods: {
      toDragging() {
        this.$router.push({path: '/Dragging'})
      },
      toDraggable() {
        this.$router.push({path: '/Draggable'})
      },
      toNewMap() {
        this.$router.push({path: '/mapIndex'})
      },
      toRegular() {
        this.$router.push({path: '/RegularIndex'})
      },
      toFlex() {
        this.$router.push({path: '/flexIndex'})
      },
      toCountdown() {
        this.$router.push({path: '/countdown'})
      },
      toReceiverList() {
        this.$router.push({path: '/receiverList'})
      },
      toSortList() {
        this.$router.push({path: '/sortList'})
      },
      toAlloyFinger() {
        this.$router.push({path: '/alloyFinger'})
      },
      toRequestIndex() {
        this.$router.push({path: '/requestIndex'})
      },
      toVideoIndex() {
        this.$router.push({path: '/videoIndex'})
      },
      toGetDeviceType() {
        this.$router.push({path: '/getDeviceType'})
      },
      toSomeCss() {
        this.$router.push({path: '/someCss'})
      },

      text1() {
        const data = {
          name: 'tom',
          age: 12
        }
        const proxy = new Proxy(data, {
          get(target, key = this.key, receiver) {
            try {
//              if (key in target) throw new Error ('asd')
              console.log(target, 1)
              console.log(key, 2)
              console.log(receiver, 3)
            }
            catch (err) {
              console.log(err)
            }
          }
        })
        console.log(proxy.name, 99)

      },
    },
  }
</script>
<!--onent only &ndash;&gt;-->
<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this comp-->
<style scoped lang="scss">
  /*.hello {*/
    /*width: 200px;*/
    /*height: 100px;*/
    /*background: blue;*/
    /*margin: 0 auto;*/
    /*img {*/
      /*display: block;*/
      /*width: 100%;*/
      /*height: 100%;*/
    /*}*/
  /*}*/
</style>
