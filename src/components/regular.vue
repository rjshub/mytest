<template>
    <div>
      <form action="" name="regularText">
        正则编写： <input type="text" name="regular">
        测试内容：<input type="text" name="message"/>
      </form>
      <button @click="someTest">点击测试</button>
      <p>{{`测试结果：${resoult}`}}</p>
    </div>
</template>

<script>
    export default {
        name: "regular",
      data () {
          return {
            resoult: '',
            message: ''
          }
      },
      methods: {
        someTest() {
          const reg = eval(document.regularText.regular.value.trim())
          const str = document.regularText.message.value
          this.resoult = str.match(reg)
          // test1
          // const str = 'a12sdas123wwqe4554'
          // const reg = /[0-9]+/
          // this.resoult = str.match(reg)

          //test2
          // const str = '878123abc'
          // const reg = /^[0-9]+abc$/
          // this.resoult = str.match(reg)

          // test3
          // const str = "Is is the cost of of gasoline going up up"
          // const reg = /\b([a-z]+) \1\b/ig
          // this.resoult = str.match(reg)

          //test4
          // const str = "http://www.runoob.com:80/html/html-tutorial.html"
          // const reg = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/
          // console.log(str.match(reg), 12)
          // this.resoult = str.match(reg)

          // test5
          // const reg = /d(b+)d/g
          // const reg = new RegExp('d(b+)d','g')
          // const str = 'cdbbdbsbz'
          // console.log(reg.exec(str), 12)

          // this.resoult = JSON.stringify(reg.exec(str))
        }
      }
    }
</script>

<style scoped>

</style>
