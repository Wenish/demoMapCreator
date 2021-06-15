<template>
  <Editor />
  <button type="button" @click="saveMapDataToFile">Save Data To File</button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Editor from "../components/Editor.vue"; // @ is an alias to /src
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";

export default defineComponent({
  name: "PageHome",
  components: {
    Editor,
  },
  setup: () => {
    document.title = 'Home'
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
