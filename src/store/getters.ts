import { GetterTree } from "vuex";
import { state, State } from "./state";

export type Getters = {
    getTest(state: State): string
    getCounter(state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
    getTest(state) {
        return state.test
    },
    getCounter(state) {
        return state.counter
    }
}