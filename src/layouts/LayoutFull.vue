<template>
  <el-container>
    <el-header
      ><slot name="header"><TheHeader /></slot
    ></el-header>
    <el-container>
      <el-aside width="280px" class="left-side"
        ><slot name="left"></slot
      ></el-aside>
      <el-container>
        <el-main class="main"><slot>default</slot></el-main>
      </el-container>
    </el-container>
    <el-footer height="21px"
      ><slot name="footer"><TheFooter /></slot
    ></el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";

export default defineComponent({
  name: "LayoutFull",
  components: {
    TheHeader,
    TheFooter,
  },
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
  height: calc(100vh - 81px);
  display: grid;
}

footer {
  border-top: 1px solid #dcdfe6;
  font-size: 13px;
}
</style>