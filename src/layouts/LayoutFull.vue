<template>
  <div class="layout">
    <header>
      <slot name="header">header</slot>
    </header>
    <div class="left-side">
      <slot name="left">left</slot>
    </div>
    <main>
      <slot>default</slot>
    </main>
    <div class="right-side">
      <slot name="right">right</slot>
    </div>
    <footer>
      <slot name="footer">footer</slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutFull",
});
</script>

<style scoped>
.layout {
  display: grid;
  grid-template: auto 1f auto / auto 1f auto;
}

header {
  grid-column: 1 / 4;
}

.left-side {
  grid-column: 1 / 2;
}

.main {
  grid-column: 2 / 3;
}

.right-side {
  grid-column: 3 / 4;
}

footer {
  grid-column: 1 / 4;
}
</style>