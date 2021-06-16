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
      :class="['grid-item', getGridItemFloorBlockClass(index)]"
      @click.left="paintToIndex(index)"
      @mousemove="isLeftMouseButtonPressed && paintToIndex(index)"
      @mouseenter="onMouseEnter(index)"
    >
      {{ getGridItemFloorBlockClass(index) }}
    </div>
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

    const getGridItemFloorBlockClass = (index: number) => {
      const axis = store.getters.getAxisFromIndex(index);
      const key = `${axis.x}0${axis.z}`;
      return !!store.getters.getFloorBlockType(key)
        ? store.getters.getFloorBlockType(key).toLowerCase()
        : "";
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
    return {
      gridItemsCount,
      gridStyle,
      paintToIndex,
      getGridItemFloorBlockClass,
      isLeftMouseButtonPressed,
      toolSelected,
      onMouseEnter,
      onMouseLeave,
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

.container.Brush {
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
</style>
