<template>
  <div class="container">
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="saveMapDataToFile"
      ></el-button>
      <el-button type="primary" icon="el-icon-upload2"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
    <el-input placeholder="Name" v-model="mapName"></el-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";

export default defineComponent({
  name: "TheTools",
  setup: () => {
    const store = useStore();
    const mapName = computed({
      get(): string {
        return store.getters.getMapName;
      },
      set(value: string) {
        store.commit(MutationType.SetMapName, value);
      },
    });

    const saveMapDataToFile = () => store.dispatch(ActionTypes.SaveToJson);
    return { mapName, saveMapDataToFile };
  },
});
</script>

<style scoped>
.container {
    padding: 20px;
}
</style>
