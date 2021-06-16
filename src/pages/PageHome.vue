<template>
  <LayoutFull>
    <template #left>
      <TheTools></TheTools>
    </template>
    <Editor />
    <template #right>Space for data</template>
  </LayoutFull>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "../components/Editor.vue";
import TheTools from "../components/TheTools.vue";
import LayoutFull from "../layouts/LayoutFull.vue";

export default defineComponent({
  name: "PageHome",
  components: {
    Editor,
    LayoutFull,
    TheTools,
  }
});
</script>