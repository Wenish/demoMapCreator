import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
    SetTest = 'SET_TEST',
    CounterIncrease = 'COUNTER_INCREASE'
}

export type Mutations = {
    [MutationType.SetTest](state: State, value: string): void
    [MutationType.CounterIncrease](state: State, value: number): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetTest](state, value) {
        state.test = value
    },
    [MutationType.CounterIncrease](state: State, value: number) {
        state.counter = state.counter + value
    }
}