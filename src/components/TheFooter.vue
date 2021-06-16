<template>
  <div class="container">
    <div class="left">Size: {{ width }} x {{ height }} | Blocks: {{ placedBlocks }}</div>
    <div class="center">© Copyright 2021 Jonas Voland</div>
    <div class="right">
      <span v-if="showAxis">({{ selectedAxis.x }},{{ selectedAxis.z }})</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  name: "TheFooter",
  setup: () => {
    const store = useStore();
    const width = computed(() => store.state.grid.width);
    const height = computed(() => store.state.grid.height);
    const selectedAxis = computed(() => store.getters.getSelectedAxis);
    const showAxis = computed(() => !!selectedAxis.value);
    const placedBlocks = computed(
      () => store.getters.getPlacedFloorBlocksCount
    );
    return { width, height, selectedAxis, showAxis, placedBlocks };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 1fr 50px;
  grid-template-rows: 20px;
  place-items: center;
}
</style>
