<template>
  <div class="receiverContainer">
    <header class="header">
      <van-nav-bar
        title="选择受理人"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-search background="#EFEFF4" placeholder="搜索" @search="onSearch" v-model="filterStr"/>
    </header>
    <main class="receiverMain">
      <div class="firstOrgan">
        <div class="qiyePic">
          <img :src="qiye" alt="">
        </div>
        <span v-for="(item,index) in titleList" :key="item.id">
          <van-icon v-if="item.child" name="arrow"/>
          <div class="childTitle" :style="index === titleList.length - 1 ? 'color:rgba(0,0,0,0.85)':'color: #1890FF;'"
               @click="findFather(item)">{{item.title}}</div>
        </span>
      </div>
      <!-- 组织-->
      <van-checkbox-group style="margin-bottom: 10px" v-if="personalList.length" v-model="receiverGroupResult">
        <van-cell-group>
          <div class="groupList">
            <van-cell class="receiverCell" v-for="(item, index) in personalList[0].groupList"
                      :title="item.label" :key="index" @click="GroupToggle(item)">
              <div slot="icon" style="display: flex;align-items: center">
                <!--<van-checkbox style="margin-right: 20px" ref="groupCheckboxes" :name="item.id"></van-checkbox>-->
                <div class="checkState"
                     :class="receiverGroupResult.includes(item.id) || item.partCheck? 'activeColor':''">
                  <van-icon name="success" style="color: #fff" v-if="item.allCheck"/>
                  <img :src="hengxian" alt="" v-if="item.partCheck">
                </div>
              </div>
              <div class="handleItem" @click.stop="findChild(item.id)">
                <van-icon name="arrow" />
              </div>
            </van-cell>
          </div>
        </van-cell-group>
      </van-checkbox-group>
      <!--成员-->
      <van-checkbox-group class="prosonGroup" v-model="receiverResult" v-if="personalList.length">
        <van-cell-group>
          <van-cell class="receiverCell" clickable @click="MemberToggle(index, item)"
                    v-for="(item,index) in personalList[0].peopleList" :key="item.id">
            <div slot="title" class="titleSlot">
              <div class="personImg">
                <img :src="person" alt="">
              </div>
              <span class="personLabel">{{item.label}}</span>
              <van-tag plain type="primary" class="memberRoleTag" v-show="item.memberRole === 1">负责人</van-tag>
            </div>
            <div slot="right-icon" class="iconSlot">
              <van-checkbox ref="checkboxes" :name="item.id"/>
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div v-if="personalList.length">
        <div v-if="!personalList[0].children && !personalList[0].peopleNum" class="noPeople">
          <img :src="listEmpty" alt="">
          <span>数据为空</span>
        </div>
      </div>
    </main>
    <footer class="receiverFooter">
      <div class="personNum" @click="resoultListShow">
        已选 <span style="font-size: 20px;margin: 0 5px">{{actionPeopleList.length}}</span> 人
        <van-icon v-show="!ListShow" name="arrow-up" />
        <van-icon v-show="ListShow"name="arrow-down" />
      </div>
      <van-button size="small" @click="handleNext" type="primary">确 定</van-button>
    </footer>
    <van-actionsheet class="actionList" v-model="ListShow">
      <van-checkbox-group class="prosonGroup" v-model="receiverResult ">
        <van-cell-group>
          <van-cell class="receiverCell" clickable @click="actionToggle(index, item)"
                    v-for="(item,index) in actionPeopleList" :key="item.id">
            <div slot="title" class="titleSlot">
              <div class="personImg">
                <img :src="person" alt="">
              </div>
              <span class="personLabel">{{item.label}}</span>
              <van-tag plain type="primary" class="memberRoleTag" v-show="item.memberRole === 1">负责人
              </van-tag>
            </div>
            <div slot="right-icon" class="iconSlot">
              <van-checkbox ref="actionCheckboxes" :name="item.id"/>
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-actionsheet>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {Toast} from 'vant'
  import treeConfig from './treeConfig'
  import receiverSelect from './mixin/receiverSelect'
  import baseFormat from './service/base'
  import person from './static/img/person.png'
  import listEmpty from './static/img/empty.png'
  import qiye from './static/img/qiye.png'
  import duihao from './static/img/duihao.png'
  import hengxian from './static/img/hengxian.png'

  export default {
    name: 'receiver-list',
    mixins: [receiverSelect],
    data() {
      return {
        person: person,
        listEmpty: listEmpty,
        qiye: qiye,
        duihao: duihao,
        hengxian: hengxian,
        id: '',
        filterStr: '',
        pid: 1,
        personalList: [],
        organization: [],
        receiverGroupResult: [],
        receiverResult: [],
        userIds: [],
        titleList: [],
        fatherId: [],
        allPerUserList: [],
        allGroupList: [],
        errorMessage: '',
        handleType: null,
        sessionPeople: [],
        ListShow: false
      }
    },
    methods: {
      // 获取组织
      getOrganization() {
        const config = treeConfig.config
        this.organization = baseFormat.formatOrganization(config)
        this.personalList = baseFormat.formatOrganization(config)
        this.sessionPeople = _.cloneDeep(this.organization)
        this.formatList(this.organization)
        this.formatTree(this.organization[0])
        if (this.receiverResult.length) {
          this.deleteMemberGroup(this.organization[0])
        }
        this.titleList[0] = {title: this.organization[0].label, id: this.organization[0].id, child: false}
      },
      formatList(arr) {
        arr.map(item => {
          if (item.user) {
            this.allPerUserList.push(item)
          } else {
            this.allGroupList.push(item)
            if (item.children) {
              this.formatList(item.children)
            }
          }
        })
      },
      //  导航方法
      onClickLeft() {
        if (this.titleList.length === 1) {
          this.fatherId = []
          alert('返回上一级')
          // this.toDetail()
        } else {
          const obj = this.titleList[this.titleList.length - 2]
          this.findFather(obj)
        }
      },
      // 搜索
      onSearch() {
        let allList = this.allGroupList.concat(this.allPerUserList)
        if (this.filterStr) {
          let tmpPeople = []
          this.personalList = []
          for (let i = 0; i < allList.length; i++) {
            if (allList[i].label.indexOf(this.filterStr) > -1) {
              if (allList[i].user) {
                tmpPeople.push(allList[i])
              } else {
                let group = allList[i]
                if (group.children.length) {
                  for (let j = 0; j < group.children.length; j++) {
                    if (group.children[j].user) {
                      tmpPeople.push(group.children[j])
                    }
                  }
                }
              }
            } else {
              this.errorMessage = '没有找到此用户或此分组下用户！'
            }
          }
          this.personalList.push({peopleList: tmpPeople})
        } else {
          this.personalList = this.sessionPeople
        }
      },
      //  列表方法
      findChild(id) {
        this.filterChild(this.personalList[0].children, id)
      },
      filterChild(group, id) {
        let tmpGroup = []
        group.forEach(item => {
          if (item.id === id && !item.user) {
            tmpGroup[0] = item
            this.titleList.push({title: tmpGroup[0].label, id: tmpGroup[0].id, child: true})
          }
        })
        this.personalList = tmpGroup
        this.sessionPeople = tmpGroup
      },
      findFather(param) {
        this.filterFather(this.organization, param)
      },
      filterFather(group, param) {
        if (param.id === group[0].id) {
          this.titleList = []
          this.titleList[0] = {title: this.organization[0].label, id: this.organization[0].id, child: false}
          this.personalList = []
          this.personalList = group
        } else {
          group[0].children.forEach(item => {
            if (item.id === param.id && !item.user) {
              this.personalList = []
              this.personalList[0] = item
              const index = this.titleList.indexOf(param)
              this.titleList = this.titleList.slice(0, index + 1)
            } else {
              if (item.children) {
                this.filterFather([item], param)
              }
            }
          })
        }
      },
      //   已选结果查看
      resoultListShow() {
        if (this.receiverResult.length) {
          this.ListShow = !this.ListShow
        }
      },
      //  下一步/完成
      handleNext() {
        // if (this.receiverGroupResult.length) {
        //   const tmpResult = this.formatCheck(this.receiverGroupResult, this.allGroupList)
        //   this.userIds = tmpResult
        // }
        if (this.receiverResult.length) {
          const tmpResult = this.formatCheck(this.receiverResult, this.allPerUserList)
          this.userIds = tmpResult
          alert('进行下一步！')
        } else {
          Toast('请先选择受理人，再进行下一步！')
        }
      },
      // 过滤复选结果
      formatCheck(checkResult, allList) {
        let arr = []
        checkResult.forEach(item => {
          allList.forEach(child => {
            if (item === child.id) {
              arr.push({
                id: child.id,
                label: child.label,
                peopleNum: child.peopleNum,
                memberRole: child.memberRole
              })
            }
          })
        })
        return arr
      },
      init() {
        this.getOrganization()
      }
    },
    computed: {
      actionPeopleList() {
        const group = this.formatCheck(this.receiverResult, this.allPerUserList)
        return group
      }
    },
    watch: {
      filterStr: function (newStr, oldStr) {
        if (newStr.length === 0) {
          this.personalList = this.sessionPeople
        }
      },
      receiverResult(val) {
        if (!val.length) {
          this.ListShow = false
        }
      }
    },
    created() {
      // this.receiverResult = ["277bc9448004000","279123c60804000","2ee2a103b807000","277c3c4f2404000","2ee2a1e72807000","2ee2a2714407000","2f066be75008000","2f066cb83408000","2f066d3d0c08000","2f0670ccf008000"]
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  .receiverContainer {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    .prosonGroup, .actionList {
      .receiverCell {
        height: 44px;
        position: relative;
        .titleSlot {
          height: 100%;
          display: flex;
          align-items: center;
          .personImg {
            width: 12px;
            height: 14px;
            float: left;
            margin-right: 12px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .personLabel {
            line-height: 24px;
            max-width: calc(100% - 88px);
          }
          .memberRoleTag {
            display: block;
            width: 36px;
            height: 19px;
            margin-left: 8px;
          }
        }
        .iconSlot {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .handleItem {
          width: 40px !important;
          height: 100%;
          z-index: 999;
          /*position: absolute;*/
          /*top: 0;*/
          /*right: 15px;*/
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .receiverMain {
      flex: 1;
      overflow-y: auto ;
      .firstOrgan {
        height: 48px;
        padding: 0 15px;
        overflow-x: scroll;
        overflow-y: hidden;
        background: #fff;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-bottom: 1px solid #ebedf0;
        .qiyePic {
          width: 30px;
          height: 30px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        span {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          .childTitle {
            padding: 0 5px;
            height: 40px;
            width: auto;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            white-space: nowrap;
          }
        }
      }
      .groupList {
        background: #F7FAFC;
        .checkState {
          width: 19px;
          height: 19px;
          margin-right: 15px;
          border: 1px solid #e5e5e5;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          img {
            display: block;
            width: 60%;
            height: 60%;
          }
          .van-icon {
            color: #fff;
          }
        }
        .activeColor {
          background: #1989fa;
        }
      }
      .noPeople {
        width: 100%;
        height: 214px;
        margin-top: 80px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        img {
          display: block;
          width: 100%;
          height: 90%;
        }
        span {
          font-size: 16px;
          color: #666666;
          text-align: center;
        }
      }
    }
    .receiverFooter {
      z-index: 9999;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F1F1F1;;
      /*box-shadow: 0 0 2px 1px #ccc;*/
      .personNum {
        width: 71%;
        height: 100%;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding-left: 15px;
        i {
          font-weight: bold !important;
          margin-left: 5px;
        }
      }
    }
  }

</style>
