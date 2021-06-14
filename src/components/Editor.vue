<template>
  <h1>Editor</h1>
  <div class="container" :style="gridStyle">
    <div v-for="index in gridItemsCount" :key="index" class="grid-item" @click="onGridItemClick(index)">{{index}}</div>
  </div>
  <input v-model="mapName" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import { MutationType } from "../store/mutations";
export default defineComponent({
  name: "Editor",
  setup: () => {
    const store = useStore();
    const gridItemSize = ref(20);
    const height = ref(5);
    const width = ref(4);
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

    const onGridItemClick = (index: number) => {
      const x = ((index / width.value)%height.value) + 1;
      const z = ((index-1) % width.value) + 1
      console.log(index)
      console.log({
        x,
        z
      })
      console.log("grid item clicked");
    };

    return {
      mapName,
      height,
      length,
      gridItemsCount,
      gridStyle,
      onGridItemClick,
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
  background: gray;
  border: 0.5px solid black;
}

.grid-item:hover {
  opacity: 0.7;
}
</style>
