import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
    SetMapName = 'SET_MAP_NAME'
}

export type Mutations = {
    [MutationType.SetMapName](state: State, value: string): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetMapName](state: State, value: string) {
        state.data.map.name = value
    }
}