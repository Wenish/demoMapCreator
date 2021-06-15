import { MutationTree } from "vuex";
import { FloorBlock, State } from "./state";

export enum MutationType {
    FloorBlockSet = 'FLOOR_BLOCK_SET',
    FLoorBlockAdd = 'FLOOR_BLOCK_ADD',
    FloorBlockRemove = 'FLOOR_BLOCK_REMOVE',
    SetMapName = 'SET_MAP_NAME'
}

export type Mutations = {
    [MutationType.FloorBlockSet](state: State, payload: FloorBlock[]): void
    [MutationType.FLoorBlockAdd](state: State, payload: FloorBlock[]): void
    [MutationType.FloorBlockRemove](state: State, payload: string[]): void
    [MutationType.SetMapName](state: State, value: string): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.FloorBlockSet](state, payload) {
        state.floorBlocks = payload.reduce((result: { [key: string]: FloorBlock }, floorBlock) => {
            const key = `${floorBlock.position.x}${floorBlock.position.y}${floorBlock.position.z}`
            result[key] = floorBlock;
            return result;
        }, {});
    },
    [MutationType.FLoorBlockAdd](state, payload) {
        const newFloorBlocks = payload.reduce((result: { [key: string]: FloorBlock }, floorBlock) => {
            const key = `${floorBlock.position.x}${floorBlock.position.y}${floorBlock.position.z}`
            result[key] = floorBlock;
            return result;
          }, {});
        state.floorBlocks = {
            ...state.floorBlocks,
            ...newFloorBlocks
        }
    },

    [MutationType.FloorBlockRemove](state, payload) {
        payload.forEach((value) => {
            delete state.floorBlocks[value]
        })
    },
    [MutationType.SetMapName](state: State, value: string) {
        state.data.map.name = value
    }
}