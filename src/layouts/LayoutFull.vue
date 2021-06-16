<template>
  <el-container>
    <el-header><slot name="header">header</slot></el-header>
    <el-container>
      <el-aside width="280px" class="left-side"
        ><slot name="left"></slot
      ></el-aside>
      <el-container>
        <el-main class="main"><slot>default</slot></el-main>
      </el-container>
    </el-container>
    <el-footer height="20px"><slot name="footer">© Copyright 2021 Jonas Voland</slot></el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutFull",
});
</script>

<style scoped>
header {
  border-bottom: 1px solid #dcdfe6;
}

.left-side {
  grid-column: 1 / 2;
  border-right: 1px solid #dcdfe6;
}

.main {
  min-height: calc(100vh - 80px);
}

footer {
  border-top: 1px solid #dcdfe6;
  font-size: 13px;
  line-height: 20px;
}
</style>