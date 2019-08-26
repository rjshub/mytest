<template>
  <div class="listContainer">
    <ul class="originalList">
      <span>原始顺序排列</span>
      <li v-for="(item, index) in dataList" :key="index">{{item.label + ' ( ' + item.name + ' )'}}</li>
    </ul>
    <div >
      <button @click="handleSort">进行排序</button>
      <button @click="handleRecall">撤回</button>
    </div>
    <ul class="originalList">
      <span>需求顺序排列</span>
      <li v-for="(item, index) in resultDataList" :key="index">{{item.label + ' ( ' + item.name + ' )'}}</li>
    </ul>
  </div>
</template>

<script>
  import pinyin from 'js-pinyin'

  export default {
    name: "sortList",
    data() {
      return {
        dataList: [
          {unit:"",dataType:"STRING",name:"location",label:"a位置"},
          {unit:"",dataType:"STRING",name:"location",label:"r位置12"},
          {unit:"",dataType:"STRING",name:"state",label:"状态"},
          {unit:"",dataType:"TIME_STAMP",name:"timestamp",label:"b时间"},
          {unit:"",dataType:"STRING",name:"uid",label:"设备唯一标识"},
          {unit:"",dataType:"STRING",name:"label",label:"设备别名"},
          {unit:"",dataType:"STRING",name:"description",label:"%设备描述"},
          {unit:"",dataType:"STRING",name:"description",label:"&备描述12"},
          {unit:"",dataType:"STRING",name:"corpId",label:"@设备商户标识"},
          {unit:"",dataType:"STRING",name:"type",label:"类型信息"},
          {unit:"",dataType:"STRING",name:"type",label:"7类型信息1"},
          {unit:"",dataType:"STRING",name:"type",label:"8类型信息2"},
          {unit:"",dataType:"STRING",name:"type",label:"5类型信息3"},
          {unit:"",dataType:"STRING",name:"type",label:"qw"},
          {unit:"",dataType:"STRING",name:"type",label:"wer"},
          {unit:"",dataType:"STRING",name:"type",label:"as"},
          {unit:"MPa",dataType:"DOUBLE",name:"pressure",label:"压力"}
        ],
        resultDataList: []
      }
    },
    methods: {
      handleSort() {
        this.resultDataList = this.listSort(this.dataList)
      },
      handleRecall() {
        this.resultDataList = []
      },
      //  排序规范
      listSort(arr) {
        if(!String.prototype.localeCompare) return null
        let [arrList,numList,chineseList,charList,otherList] = [[],[],[],[],[]]
        for (let i=0;i<arr.length;i++) {
          arrList.push(arr[i].label)
        }
        for(let k =0;k<arrList.length;k++){
          let ini = arrList[k].charAt(0);           //截取第一个字符
          if (this.isChar(ini)) {
            charList.push(arrList[k])
          } else if (this.isChinese(ini)) {
            chineseList.push(pinyin.getFullChars(arrList[k]))
          } else if (this.isNumber(ini)) {
            numList.push(arrList[k])
          } else {
            otherList.push(arrList[k])
          }
        }
        charList = charList.sort()
        chineseList = chineseList.sort()
        numList = numList.sort()
        otherList = otherList.sort()
        const [resoult,sortList] = [numList.concat(charList).concat(chineseList).concat(otherList),[]]   // 中文，数字，拼音，特殊字符优先级排序
        resoult.forEach((item1) => {
          arr.forEach((item2) => {
            if (item1 === item2.label || item1 === pinyin.getFullChars(item2.label)) {
              sortList.push(item2)
            }
          })
        })
        return sortList
      },
      isChinese(temp){
        var reg=/[^\u4E00-\u9FA5]/
        if (reg.test(temp)){return false }
        return true
      },
      isChar(char){
        var reg = /[A-Za-z]/;
        if (!reg.test(char)){return false}
        return true
      },
      isNumber(num) {
        var reg = /[0-9]/
        if (reg.test(num)) {return true}
        return false
      },
      sort(list) {
        for (var i=0;i<list.length-1;i++) {
          for (var j=i+1;j<list.length;j++) {
            if (list[i].num - list[j].num > 0) {
              const tmp = list[i]
              list[i] = list[j]
              list[j] = tmp
            }
          }
        }
        return list
      },
    },
  }
</script>

<style scoped lang="scss">
  .listContainer {
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .originalList {
      height: 375px;
      width: 200px;
      padding: 16px;
      border: 1px solid #000;
      span {
        font-size: 18px;
        font-weight: bold;
        color: red;
      }
    }
    div {
      height: 70px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }
  }
</style>
