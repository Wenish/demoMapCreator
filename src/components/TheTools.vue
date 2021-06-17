<template>
  <div class="container">
    <div class="label">Name</div>
    <el-input placeholder="Name" v-model="mapName"></el-input>
    <div class="label">Width</div>
    <el-input-number class="input" v-model="width" :min="1" :max="100" size="mini"></el-input-number>
    <div class="label">Height</div>
    <el-input-number class="input" v-model="height" :min="1" :max="100" size="mini"></el-input-number>
    <div class="label">Cell Size</div>
    <el-input-number class="input" v-model="cellSize" :min="5" :max="50" size="mini"></el-input-number>
    
    <el-select class="input" v-model="toolSelected" placeholder="Select Tool">
      <el-option
        v-for="item in toolOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <el-select class="input" v-model="floorBlockSelected" placeholder="Select Floor Block">
      <el-option
        v-for="item in floorBlockOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
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
        store.state.grid.width = value;
      },
    });

    const height = computed({
      get(): number {
        return store.state.grid.height;
      },
      set(value: number) {
        store.state.grid.height = value;
      },
    });

    const cellSize = computed({
      get(): number {
        return store.state.grid.cellSize;
      },
      set(value: number) {
        store.commit(MutationType.SetGridCellSize, value)
      },
    });

    return {
      mapName,
      toolSelected,
      toolOptions,
      floorBlockSelected,
      floorBlockOptions,
      width,
      height,
      cellSize
    };
  },
});
</script>

<style scoped>
.container {
  text-align: left;
  padding: 20px;
}

.container > div{
  margin-top: 10px;
}

.input {
  width: 100%;
}

.label {
  font-size: 13px;
}
</style>
