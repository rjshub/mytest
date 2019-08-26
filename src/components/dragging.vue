<template>
    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="item.label" :name="item.id" v-for="(item, index) in dataList" :key="index" v-dragging="{ item: item, list: dataList, group: 'item' }">
          <van-cell-group v-for="(child, index) in item.children" :key="index">
            <van-cell value="内容" v-dragging="{ item: child, list: item.children, group: 'child' }">
              <template slot="title">{{child.name}}</template>
            </van-cell>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>

      <button @click="back">返回</button>
    </div>
</template>

<script>
    export default {

      name: "dragging",
      data() {
        return {
          activeNames: ['1'],
          dataList: [
            {
              id: '1',
              label: '一次风机',
              children: [
                {
                  name: '频率'
                },
                {
                  name: '压力'
                },
                {
                  name: '温度'
                }
              ]
            },
            {
              id: '2',
              label: '锅炉本体',
              children: [
                {
                  name: '左负压'
                },
                {
                  name: '右负压'
                },
                {
                  name: '上负压'
                },
                {
                  name: '下负压'
                },
                {
                  name: '中负压'
                },
              ]
            }
          ]
        }
      },
      methods: {
        back() {
          this.$router.push({path: '/'})
        }
      },
      mounted () {
        this.$dragging.$on('dragged', ({ value }) => {
          console.log(value.list)  // 新排序
        })
      }
    }
</script>

<style scoped>

</style>
