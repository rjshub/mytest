<template>
    <div class="box-container">
      <div class="boxList">
        <div class="listItem_1"></div>
        <div class="listItem_2"></div>
        <div class="listItem_3"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "flex"
    }
</script>

<style scoped lang="scss">
  .box-container {
    .boxList {
      display: flex;
      width: 900px;
      /*flex-direction: row-reverse;*/
      background: antiquewhite;
      div {
        flex: 1;
        width: 200px;
        height: 200px;
      }
      .listItem_1 {
        order: 2;
        background: aquamarine;
      }
      .listItem_2 {
        flex: 2;
        order: 1;
        background: blueviolet;
      }
      .listItem_3 {
        flex: 3;
        order: 3;
        background: burlywood;
      }
    }
  }
</style>
