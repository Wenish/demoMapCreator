<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "PageHome",
  components: {
    HelloWorld,
  },
});
</script>
