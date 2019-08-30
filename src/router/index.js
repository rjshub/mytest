import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dragging from '@/components/dragging'   //  拖动
import Draggable from '@/components/draggable'   //  拖动
import mapIndex from '@/components/newMap'  //  map练习
import regular from '@/components/regular'   //  正则
import flexIndex from '@/components/flex'   //flex布局
import countdown from '@/components/countdown'   //  倒计时
import receiverList from '@/components/receiverList/ReceiverList.vue'  //  移动端，仿钉钉组织架构并结合elementUI树型组件复选框
import sortList from '@/components/sortList'   //  数字，字母，中文，特殊字符，按序排列
import alloyFinger from '@/components/alloyFinger'  //  AlloyFinger
import requestIndex from '@/components/requestIndex'    // mock.js http请求
import videoIndex from '@/components/videoIndex'   //  视频播放
import getDeviceType from '@/components/getDeviceType'   //  获取设备类型（移动端）
import someCss from '@/components/someCss'  // 一些CSS

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Dragging',
      name: 'Dragging',
      component: Dragging
    },
    {
      path: '/Draggable',
      name: 'Draggable',
      component: Draggable
    },
    {
      path: '/mapIndex',
      name: 'mapIndex',
      component: mapIndex
    },
    {
      path: '/RegularIndex',
      name: 'RegularIndex',
      component: regular
    },
    {
      path: '/flexIndex',
      name: 'flexIndex',
      component: flexIndex
    },
    {
      path: '/countdown',
      name: 'countdown',
      component: countdown
    },
    {
      path: '/receiverList',
      name: 'receiverList',
      component: receiverList
    },
    {
      path: '/sortList',
      name: 'sortList',
      component: sortList
    },
    {
      path: '/alloyFinger',
      name: 'alloyFinger',
      component: alloyFinger
    },
    {
      path: '/requestIndex',
      name: 'requestIndex',
      component: requestIndex
    },
    {
      path: '/videoIndex',
      name: 'videoIndex',
      component: videoIndex
    },
    {
      path: '/getDeviceType',
      name: 'getDeviceType',
      component: getDeviceType
    },
    {
      path: '/someCss',
      name: 'someCss',
      component: someCss
    },
  ]
})
