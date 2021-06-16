<template>
  <div class="container">
    <el-input placeholder="Name" v-model="mapName"></el-input>
    <el-select v-model="toolSelected" placeholder="Select Tool">
      <el-option
        v-for="item in toolOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <el-select v-model="floorBlockSelected" placeholder="Select Floor Block">
      <el-option
        v-for="item in floorBlockOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-input-number v-model="width" :min="1" :max="100"></el-input-number>
    <el-input-number v-model="height" :min="1" :max="100"></el-input-number>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store";
import { MutationType } from "../store/mutations";
import { FloorBlockTypes, ToolTypes } from "../types";

export default defineComponent({
  name: "TheTools",
  setup: () => {
    const store = useStore();
    const mapName = computed({
      get(): string {
        return store.state.data.map.name;
      },
      set(value: string) {
        store.commit(MutationType.SetMapName, value);
      },
    });

    const toolSelected = computed({
      get(): ToolTypes {
        return store.state.tools.toolSelected;
      },
      set(value: ToolTypes) {
        store.commit(MutationType.SetSelectedTool, value);
      },
    });

    const toolOptions = computed(() => store.state.tools.toolOptions);

    const floorBlockSelected = computed({
      get(): FloorBlockTypes {
        return store.state.tools.floorBlockSelected;
      },
      set(value: FloorBlockTypes) {
        store.commit(MutationType.SetSelectedFloorBlock, value);
      },
    });

    const floorBlockOptions = computed(
      () => store.state.tools.floorBlockOptions
    );

    const width = computed({
      get(): number {
        return store.state.grid.width;
      },
      set(value: number) {
          store.state.grid.width = value
      },
    });

    const height = computed({
      get(): number {
        return store.state.grid.height;
      },
      set(value: number) {
          store.state.grid.height = value
      },
    });

    return {
      mapName,
      toolSelected,
      toolOptions,
      floorBlockSelected,
      floorBlockOptions,
      width,
      height
    };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
