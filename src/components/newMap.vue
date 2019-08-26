<template>
  <div class="mapIndex">
    <button style="margin-right: 15px" v-for="(item, index) in valueList" :key="index" @click="someMapTest(item)">按钮{{item.status}}</button>
    <p>{{resoult}}</p>
  </div>
</template>

<script>
  export default {
    name: "newMap",
    data() {
      return {
        valueList: [
          {status: 1, identity:'guest'},
          {status: 2, identity:'guest'},
          {status: 3, identity:'guest'},
          {status: 4, identity:'guest'},
          {status: 5, identity:'master'},
          {status: 6, identity:'master'},
          {status: '', identity:'master'},
        ],
        resoult: '',
      }
    },
    methods: {
      someMapTest(param) {
        // const actions = new Map([
        //   [1, ['a1', 'a2']],
        //   [2, ['b1', 'b2']],
        //   [3, ['c1', 'c2']],
        //   [4, ['d1', 'd2']],
        //   [5, ['e1', 'e2']],
        //   [6, ['f1', 'f2']],
        //   ['default', ['g1', 'g2']]
        // ])
        // let action = actions.get(param.status) || actions.get('default')
        // this.resoult = `结果是${action[0]}和${action[1]}`

        const actions = new Map([
          ['guest_1', ['a1', 'a2']],
          ['guest_2', ['b1', 'b2']],
          ['guest_3', ['c1', 'c2']],
          ['guest_4', ['44', '44']],
          ['master_1', ['d1', 'd2']],
          ['master_2', ['e1', 'e2']],
          ['master_3', ['f1', 'f2']],
          ['default', ['g1', 'g2']]
        ])
        let action = actions.get(`${param.identity}_${param.status}`) || actions.get('default')
        this.resoult = `结果是${param.identity}_${param.status},子结果是${action[0]}和${action[1]}`
      }
    }
  }
</script>

<style scoped>

</style>
