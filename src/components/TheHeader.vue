<template>
  <div class="container">
    <div class="left">
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-download"
          @click="saveMapDataToFile"
        ></el-button>
        <el-button type="primary" icon="el-icon-upload2"></el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="resetState"
        ></el-button>
      </el-button-group>
    </div>
    <div class="center">Grid Map Editor</div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";

export default defineComponent({
  name: "TheHeader",
  setup: () => {
    const store = useStore();
    const resetState = () => store.commit(MutationType.ResetState, null);

    const saveMapDataToFile = () => store.dispatch(ActionTypes.SaveToJson);
    return { saveMapDataToFile, resetState };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 60px;
  place-items: center;
}
</style>
