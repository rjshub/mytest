<template>
  <div class="alloyFingerMain">
    <!--AlloyFinger-->
    <button @click="showPopup">点击查看</button>
    <van-popup v-model="show">
      <div class="popupPicture">
        <img id="touchImg" :src="picture" :preview="preview" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
  import picture from '../../static/img/64.png'
  import AlloyFinger from 'alloyfinger'

  export default {
    name: "alloyFinger",
    data() {
      return {
        show: false,
        picture: picture,
        preview: 1
      }
    },
    methods: {
      showPopup() {
        this.show = true
        this.$nextTick(() => {
          this.imgTouch()
        })
      },
      //   事件处理
      imgTouch() {
        const dom = document.getElementById('touchImg')
        const self = this
        var AF = new AlloyFinger(dom, {
          pointStart: function () {
            //手指触摸屏幕触发
          },
          multipointStart: function () {
            //一个手指以上触摸屏幕触发
          },
          rotate: function (evt) {
            //evt.angle代表两个手指旋转的角度
            console.log(evt.angle);
          },
          pinch: function (evt) {
            //evt.scale代表两个手指缩放的比例
            self.Touch_PinchEvent(evt)
            console.log(evt.scale);
          },
          multipointEnd: function () {
            //当手指离开，屏幕只剩一个手指或零个手指触发
          },
          pressMove: function (evt) {
            //evt.deltaX和evt.deltaY代表在屏幕上移动的距离
            console.log(evt.deltaX);
            console.log(evt.deltaY);
          },
          tap: function (evt) {
            //点按触发
          },
          doubleTap: function (evt) {
            self.Touch_DoubleTapEvent(evt)
            //双击屏幕触发
          },
          longTap: function (evt) {
            self.Touch_longTap(evt)
            //长按屏幕750ms触发
          },
          swipe: function (evt) {
            //evt.direction代表滑动的方向
            console.log("swipe" + evt.direction);
          },
          singleTap: function (evt) {
            self.Touch_StartEvent(evt)
            //单击
          }
        })
      },
      Touch_StartEvent (e) {
        console.log(e, 2)
      },
      Touch_PinchEvent(e) {
        console.log(e, 3)
      },
      Touch_DoubleTapEvent(e) {
        this.preview = 2
        console.log(e, 4)
      },
      Touch_longTap(e) {
        console.log(e)
      },
    },
    mounted() {
      // this.imgTouch()
    }
  }
</script>

<style scoped lang="scss">
  .alloyFingerMain {
    .popupPicture {
      height: 200px;
      width: 300px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
