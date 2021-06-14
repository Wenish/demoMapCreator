import { GetterTree } from "vuex";
import { state, State } from "./state";

export type Getters = {
    getMapName(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
    getMapName(state) {
        return state.data.map.name
    }
}