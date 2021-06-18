<template>
  <div
    class="container"
    :style="gridStyle"
    :class="[toolSelected]"
    @mousedown.left="isLeftMouseButtonPressed = true"
    @mouseup.left="isLeftMouseButtonPressed = false"
    @mouseleave="onMouseLeave()"
  >
    <div
      v-for="index in gridItemsCount"
      :key="index"
      :class="['grid-item', getGridItemClasses(index)]"
      :style="getGridItemStyles(index)"
      @click.left="paintToIndex(index)"
      @mousemove="isLeftMouseButtonPressed && paintToIndex(index)"
      @mouseenter="onMouseEnter(index)"
    ></div>

    <div
      v-for="(spawn, index) in spawns"
      :key="index"
      :style="{
        gridColumn: spawn.position.z,
        gridRow: spawn.position.x,
      }"
      class="spawn"
    ></div>

    <div
      v-for="(capturePoint, index) in capturePoints"
      :key="index"
      :style="{
        gridColumn: capturePoint.position.z,
        gridRow: capturePoint.position.x,
      }"
      class="capture-point"
    ></div>

    <div
      v-for="(captureFlag, index) in captureFlags"
      :key="index"
      :style="{
        gridColumn: captureFlag.position.z,
        gridRow: captureFlag.position.x,
      }"
      class="capture-flag"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";
export default defineComponent({
  name: "Editor",
  setup: () => {
    const store = useStore();
    const isLeftMouseButtonPressed = ref(false);
    const gridItemSize = computed(() => store.state.grid.cellSize);
    const width = computed(() => store.state.grid.width);
    const height = computed(() => store.state.grid.height);
    const gridItemsCount = computed(() => height.value * width.value);
    const gridStyle = computed(() => {
      return {
        width: `${width.value * gridItemSize.value}px`,
        gridTemplateColumns: `repeat(${width.value}, ${gridItemSize.value}px)`,
        gridTemplateRows: `repeat(${height.value}, ${gridItemSize.value}px)`,
      };
    });

    const toolSelected = computed(() => store.state.tools.toolSelected);

    const getGridItemClasses = (index: number) => {
      const axis = store.getters.getAxisFromIndex(index);
      const key = `${axis.x}0${axis.z}`;
      return !!store.getters.getFloorBlockType(key)
        ? store.getters.getFloorBlockType(key).toLowerCase()
        : "";
    };

    const getGridItemStyles = (index: number) => {
      const axis = store.getters.getAxisFromIndex(index);
      return {
        gridColumn: axis.z,
        gridRow: axis.x,
      };
    };

    const paintToIndex = (index: number) => {
      store.dispatch(ActionTypes.PaintToIndex, index);
    };

    const onMouseEnter = (index: number) => {
      store.commit(MutationType.SetSelectedGridIndex, index);
    };

    const onMouseLeave = () => {
      store.commit(MutationType.SetSelectedGridIndex, null);
    };

    const capturePoints = computed(() => store.getters.getCapturePoints);
    const captureFlags = computed(() => store.getters.getCaptureFlags);
    const spawns = computed(() => store.getters.getSpawns);
    return {
      gridItemsCount,
      gridStyle,
      paintToIndex,
      getGridItemClasses,
      isLeftMouseButtonPressed,
      toolSelected,
      onMouseEnter,
      onMouseLeave,
      getGridItemStyles,
      capturePoints,
      captureFlags,
      spawns,
    };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin: auto;
  user-select: none;
}

.container.Eraser {
  cursor: url("../assets/cursors/eraser.png"), auto;
}

.container.Blocks {
  cursor: url("../assets/cursors/paintbrush.png"), auto;
}

.grid-item {
  font-size: 11px;
  background: #bceaff;
  border: 0.5px solid black;
  overflow: hidden;
  color: black;
}

.grid-item.grass {
  background: green;
}

.grid-item.dirt {
  background: saddlebrown;
}

.grid-item.snow {
  background: mintcream;
}

.grid-item.bridge {
  background: burlywood;
}

.grid-item:hover {
  opacity: 0.7;
}

.spawn {
  background-image: url(/src/assets/spawn.svg);
  background-size: contain;
  pointer-events: none;
}

.capture-point {
  background-image: url(/src/assets/capturePoint.svg);
  background-size: contain;
  pointer-events: none;
}

.capture-flag {
  background-image: url(/src/assets/captureFlag.svg);
  background-size: contain;
  pointer-events: none;
}
</style>
