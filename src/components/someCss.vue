<template>
    <div class="cssIndex">
      <div class="css_one">
        <h4>瀑布流布局</h4>
        css: <br/>
          ul {  <br/>
        &nbspcolumn-count: 2;         &nbsp&nbsp&nbsp//分成两行   <br/>
        &nbspcolumn-gap: 20px;      &nbsp&nbsp&nbsp//每行间距20px    <br/>
        &nbspli {   <br/>
        &nbsp&nbspbreak-inside: avoid;   <br/>
        &nbsp&nbsp&nbsp}  <br/>
          } <br/>
        <ul style="width: 500px;background: #1890FF">
          <li style="height: 50px;background: antiquewhite">01</li>
          <li style="height: 230px;background: burlywood">02</li>
          <li style="height: 150px;background: blueviolet">03</li>
          <li style="height: 100px;background: aquamarine">04</li>
        </ul>
      </div>
      <div class="css_two">
        <h4>纯数字、英文进行文本换行</h4>
        css: <br/>
        p{  <br/>
        &nbspword-wrap: break-word;   <br/>
        }
        <h5>不加样式</h5>
        <p class="no">12312123121231231231231212312123123123123121231212312312312312123121231231231231212312123123123</p>
        <h5>添加样式</h5>
        <p class="yes">12312123121231231231231212312123123123123121231212312312312312123121231231231231212312123123123</p>
      </div>
      <div class="caa-three">
        <h4>显示省略号</h4>
        css  <br/>
        p{ <br/>
        &nbsp&nbspoverflow: hidden;  <br/>
        &nbsp&nbsptext-overflow: ellipsis;  //显示省略号<br/>
        &nbsp&nbspdisplay: -webkit-box;   <br/>
        &nbsp&nbsp-webkit-line-clamp: 2;   //显示两行 <br/>
        &nbsp&nbsp-webkit-box-orient: vertical;   <br/>
        }
        <h5>不添加样式</h5>
        <p class="no">
          我曾一度认为，最有意义的远行是背着背包去 自己想去的地方。
          直到遇见你，我才深切的明白，是与你手牵手走过的距离。
          我曾一度认为，最富有深情的陪伴是一起去 爱情海的徜徉。
          直到遇见你，我才深切明白，是与你相伴渡过的每一个夜晚。
        </p>
        <h5>添加样式</h5>
        <p class="yes">
          我曾一度认为，最有意义的远行是背着背包去 自己想去的地方。
          直到遇见你，我才深切的明白，是与你手牵手走过的距离。
          我曾一度认为，最富有深情的陪伴是一起去 爱情海的徜徉。
          直到遇见你，我才深切明白，是与你相伴渡过的每一个夜晚。
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "someCss"
    }
</script>

<style scoped lang="scss">
  .cssIndex {
    padding: 20px;
    div{
      margin-bottom: 40px;
    }
    .css_one {
      ul {
        overflow-y: auto;
        column-count: 2;  // 分成两行
        column-gap: 20px;   // 每行间距20px
        li {
          break-inside: avoid;
          margin-bottom: 20px;
        }
      }
    }
    .css_two {
      width: 200px;
      p {
        margin-bottom: 10px;
      }
      p.yes {
        word-break: break-word;
      }
    }
    .caa-three {
      width: 260px;
      p {
        margin-bottom: 10px;
      }
      p.yes{
        overflow: hidden;
        text-overflow: ellipsis; //显示省略号
        display: -webkit-box;
        -webkit-line-clamp: 2; //显示两行
        -webkit-box-orient: vertical;
      }
    }
  }
</style>
