<template>
  <h1>Editor</h1>
  <input v-model="mapName" />
  <label>Choose a FloorBlockType:</label>
  <select v-model="floorBlockTypeSelected">
    <option value="">Empty</option>
    <option v-for="option in floorBlockTypes" :value="option" :key="option">
      {{ option }}
    </option>
  </select>
  <div
    class="container"
    :style="gridStyle"
    :class="cursor"
    @mousedown.left="isLeftMouseButtonPressed = true"
    @mouseup.left="isLeftMouseButtonPressed = false"
  >
    <div
      v-for="index in gridItemsCount"
      :key="index"
      :class="['grid-item', getGridItemFloorBlockClass(index)]"
      @click.left="paintToIndex(index)"
      @mousemove="isLeftMouseButtonPressed && paintToIndex(index)"
    >
      {{ getGridItemFloorBlockClass(index) }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import { MutationType } from "../store/mutations";
import { FloorBlock, FloorBlockTypes } from "../store/state";
export default defineComponent({
  name: "Editor",
  setup: () => {
    const store = useStore();
    const isLeftMouseButtonPressed = ref(false);
    const floorBlockTypes = [
      FloorBlockTypes.GRASS,
      FloorBlockTypes.DIRT,
      FloorBlockTypes.SNOW,
      FloorBlockTypes.BRIDGE,
    ];
    const floorBlockTypeSelected = ref(FloorBlockTypes.GRASS);
    const gridItemSize = ref(30);
    const width = ref(30);
    const height = ref(20);
    const gridItemsCount = computed(() => height.value * width.value);
    const gridStyle = ref({
      width: `${width.value * gridItemSize.value}px`,
      gridTemplateColumns: `repeat(${width.value}, ${gridItemSize.value}px)`,
      gridTemplateRows: `repeat(${height.value}, ${gridItemSize.value}px)`,
    });

    const cursor = computed(() => !!floorBlockTypeSelected.value ? 'paintbrush' : 'eraser')

    const indexToAxis = (index: number): { x: number; z: number } => {
      const x = Math.ceil(index / width.value);
      const z = ((index - 1) % width.value) + 1;
      return {
        x,
        z,
      };
    };

    const getGridItemFloorBlockClass = (index: number) => {
      const axis = indexToAxis(index);
      const key = `${axis.x}0${axis.z}`;
      return !!store.getters.getFloorBlockType(key)
        ? store.getters.getFloorBlockType(key).toLowerCase()
        : "";
    };

    const paintToIndex = (index: number) => {
      const floorBlockType: FloorBlockTypes =
        floorBlockTypeSelected.value as FloorBlockTypes;
      const axis = indexToAxis(index);
      const key = `${axis.x}0${axis.z}`;
      if (!floorBlockType) {
        store.commit(MutationType.FloorBlockRemove, [key]);
        return;
      }
      const floorBlock: FloorBlock = {
        type: floorBlockType,
        position: {
          x: axis.x,
          y: 0,
          z: axis.z
        },
      };
      store.commit(MutationType.FLoorBlockAdd, [floorBlock]);
    };

    const mapName = computed({
      get(): string {
        return store.getters.getMapName;
      },
      set(value: string) {
        store.commit(MutationType.SetMapName, value);
      },
    });

    const onMouseEvent = (index: number, event: any) => {
      console.log(event);
      paintToIndex(index);
    };
    return {
      mapName,
      height,
      length,
      gridItemsCount,
      gridStyle,
      paintToIndex,
      getGridItemFloorBlockClass,
      floorBlockTypes,
      floorBlockTypeSelected,
      onMouseEvent,
      isLeftMouseButtonPressed,
      cursor
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

.container.eraser {
  cursor: url('../assets/cursors/eraser.png'), auto;	
}

.container.paintbrush {
  cursor: url('../assets/cursors/paintbrush.png'), auto;	
}

.grid-item {
  font-size: 11px;
  background: #bceaff;
  border: 0.5px solid black;
  overflow: hidden;
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
