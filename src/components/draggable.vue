<template>
  <div>
    <vuedraggable v-model="dataList" :options="{disabled: noDrag}">
      <transition-group>
        <van-collapse v-model="activeNames" v-for="(item, index) in dataList" :key="index" accordion>
          <van-collapse-item :title="item.label" :name="item.id" >
            <van-cell-group style="position: relative" v-for="(child, index) in item.children" :key="index" :id="item.id+child.field">
              <van-cell value="内容" @touchstart.native="showDeleteButton(item, child)" @touchend.native="clearLoop(item, child)">
                <template slot="title">{{child.name}}</template>
              </van-cell>
              <div class="touchDialog" @click="addPageHome">添加至主页</div>
            </van-cell-group>
          </van-collapse-item>
        </van-collapse>
      </transition-group>
    </vuedraggable>

    <button @click="back">返回</button>
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  import { Dialog } from 'vant';

  import AlloyFinger from 'alloyfinger'

  export default {
    name: "draggable",
    components: { vuedraggable },
    data() {
      return {
        activeNames: [],
        noDrag: false,
        dataList: [
          {
            id: '1',
            label: '一次风机',
            children: [
              {
                field: 'a',
                name: '频率'
              },
              {
                field: 'ab',
                name: '压力'
              },
              {
                field: 'ac',
                name: '温度'
              }
            ]
          },
          {
            id: '2',
            label: '锅炉本体',
            children: [
              {
                field: 'a',
                name: '左负压'
              },
              {
                field: 'ab',
                name: '右负压'
              },
              {
                field: 'ac',
                name: '上负压'
              },
              {
                field: 'aa',
                name: '下负压'
              },
              {
                field: 'aw',
                name: '中负压'
              },
            ]
          },
          {
            id: '3',
            label: '油烟机',
            children: [
              {
                field: 'a',
                name: '左负压'
              },
              {
                field: 'aw',
                name: '右负压'
              },
              {
                field: 'aa',
                name: '上负压'
              },
              {
                field: 'ar',
                name: '下负压'
              },
              {
                field: 'av',
                name: '中负压'
              },
            ]
          },
          {
            id: '4',
            label: '煤气灶',
            children: [
              {
                field: 'a',
                name: '左负压'
              },
              {
                field: 'aa',
                name: '右负压'
              },
              {
                field: 'aw',
                name: '上负压'
              },
              {
                field: 'aq',
                name: '下负压'
              },
              {
                field: 'agv',
                name: '中负压'
              },
            ]
          },
        ],
        dataMessage: {},
        handle: '',
        lastDomId: ''
      }
    },
    methods: {
      back() {
        this.$router.push({path: '/'})
      },

      showDeleteButton(param1, param2) {
        const domId = param1.id+param2.field
        if (this.lastDomId) {
          let LastDOM = document.getElementById(this.lastDomId)
          LastDOM.querySelector('.touchDialog').style.display = 'none'
        }
        clearTimeout(this.handle)
        this.handle = setTimeout(() => {
          let DOM = document.getElementById(domId)
          DOM.querySelector('.touchDialog').style.display = 'block'
        },750)
      },
      clearLoop(param1, param2) {
        this.lastDomId = param1.id+param2.field
        clearTimeout(this.handle)
      },
      addPageHome() {
        if (this.lastDomId) {
          let LastDOM = document.getElementById(this.lastDomId)
          LastDOM.querySelector('.touchDialog').style.display = 'none'
        }
      }

      // dataDetail(param) {
      //   this.dataMessage = param
      // },
      // touch_longTap() {
      //   const dom = document.getElementById('aaa')
      //   console.log(dom,1 )
      //   var AF = new AlloyFinger(dom, {
      //     longTap: (e)=> {
      //       console.log(e, 88)
      //       console.log(this.dataMessage, 999)
      //     }
      //   })
      // }
    },
    updated() {
      console.log(this.dataList)
    },
    mounted() {
      // this.touch_longTap()
    }
  }
</script>

<style scoped>
  .touchDialog {
    width: 90px;
    height: 30px;
    background: #000;
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: none;
    transition: all 1.5s;
  }
</style>
