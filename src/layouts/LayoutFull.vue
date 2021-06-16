<template>
  <div class="layout">
    <header>
      <slot name="header">header</slot>
    </header>
    <div class="left-side">
      <slot name="left"></slot>
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
  grid-template-columns: minmax(200px, 250px) 1fr auto;
  grid-template-rows: auto 1fr auto;
}

header {
  grid-column: 1 / 4;
  border-bottom: 1px solid gray;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);
  height: 50px;
}

.left-side {
  grid-column: 1 / 2;
  border-right: 1px solid gray;
  box-shadow: 3px 0px 3px 0px rgba(0, 0, 0, 0.5);
}

.main {
  grid-column: 2 / 3;
}

.right-side {
  grid-column: 3 / 4;
}

footer {
  border-top: 1px solid grey;
  grid-column: 1 / 4;
}
</style>