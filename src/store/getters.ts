import { GetterTree } from "vuex";
import { FloorBlockTypes, State } from "./state";

export type Getters = {
    getFloorBlockType(state: State): (key: string) => FloorBlockTypes,
    getMapName(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
    getFloorBlockType(state) {
        return (key: string) => {
           return state.floorBlocks[key]?.type
        }
    },
    getMapName(state) {
        return state.data.map.name
    }
}