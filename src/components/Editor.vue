<template>
  <h1>Editor</h1>
  <div class="container" :style="gridStyle">
    <div
      v-for="index in gridItemsCount"
      :key="index"
      :class="['grid-item', getGridItemFloorBlockClass(index)]"
      @click="onGridItemClick(index)"
    >
      {{ getGridItemFloorBlockClass(index) }}
    </div>
  </div>
  <input v-model="mapName" />
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
    const gridItemSize = ref(50);
    const width = ref(20);
    const height = ref(30);
    const gridItemsCount = computed(() => height.value * width.value);
    const gridStyle = ref({
      width: `${width.value * gridItemSize.value}px`,
      gridTemplateColumns: `repeat(${width.value}, ${gridItemSize.value}px)`,
      gridTemplateRows: `repeat(${height.value}, ${gridItemSize.value}px)`,
    });
    const mapName = computed({
      get(): string {
        return store.getters.getMapName;
      },
      set(value: string) {
        store.commit(MutationType.SetMapName, value);
      },
    });

    const indexToAxis = (index: number): { x: number; z: number } => {
      const x = Math.ceil(index / width.value) 
      const z = ((index - 1) % width.value) + 1;
      return {
        x,
        z,
      }
    };

    const getGridItemFloorBlockClass = (index: number) => {
      const axis = indexToAxis(index);
      const key = `${axis.x}0${axis.z}`
      return !!store.getters.getFloorBlockType(key) ? store.getters.getFloorBlockType(key).toLowerCase() : ''
    }

    const onGridItemClick = (index: number) => {
      const floorBlock: FloorBlock = {
        type: FloorBlockTypes.DIRT,
        position: {
          y: 0,
          ...indexToAxis(index)
        }
      }
      store.commit(MutationType.FLoorBlockAdd, [floorBlock])
    };

    return {
      mapName,
      height,
      length,
      gridItemsCount,
      gridStyle,
      onGridItemClick,
      getGridItemFloorBlockClass
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
}
.grid-item {
  font-size: 11px;
  background: gray;
  border: 0.5px solid black;
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
