<template>
  <LayoutFull>
    <template #header>
      <h1>Editor</h1>
    </template>
    <template #left>
      <TheTools></TheTools>
    </template>
    <Editor />
    <template #right>Space for data</template>
    <template #footer></template>
  </LayoutFull>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Editor from "../components/Editor.vue";
import TheTools from "../components/TheTools.vue"
import LayoutFull from "../layouts/LayoutFull.vue";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";

export default defineComponent({
  name: "PageHome",
  components: {
    Editor,
    LayoutFull,
    TheTools
  },
  setup: () => {
    const store = useStore();
    const mapName = computed({
      get(): string {
        return store.getters.getMapName;
      },
      set(value: string) {
        store.commit(MutationType.SetMapName, value);
      },
    });

    const saveMapDataToFile = () => store.dispatch(ActionTypes.SaveToJson);
    return { mapName, saveMapDataToFile };
  },
});
</script>
