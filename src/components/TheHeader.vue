<template>
  <div class="container">
    <div class="left">
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="saveMapDataToFile"
      ></el-button>
      <el-upload
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        :multiple="false"
        :accept="'application/JSON'"
        :on-change="onFileChange"
      >
        <template #trigger>
          <el-button type="primary" icon="el-icon-upload2"></el-button>
        </template>
        <div></div>
      </el-upload>
      <el-button
        type="primary"
        icon="el-icon-delete"
        @click="resetState"
      ></el-button>
    </div>
    <div class="center">Grid Map Editor v0.1.0</div>
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

    const onFileChange = (file: any, fileList: FileList) => {
      store.dispatch(ActionTypes.LoadFromJsonFile, file.raw)
    }
    return { saveMapDataToFile, resetState, onFileChange };
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

.left {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
}
</style>
