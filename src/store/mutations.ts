import { MutationTree } from "vuex";
import { FloorBlock, FloorBlockTypes, ToolTypes } from "../types";
import { State } from "./state";

export enum MutationType {
    ResetState = 'RESET_STATE',
    FloorBlockSet = 'FLOOR_BLOCK_SET',
    FLoorBlockAdd = 'FLOOR_BLOCK_ADD',
    FloorBlockRemove = 'FLOOR_BLOCK_REMOVE',
    SetMapName = 'SET_MAP_NAME',
    SetSelectedTool = 'SET_SELECTED_TOOL',
    SetSelectedFloorBlock = 'SET_SELECTED_FLOOR_BLOCK',
    SetSelectedGridIndex = 'SET_SELECTED_GRID_INDEX'
}

export type Mutations = {
    [MutationType.ResetState](state: State, payload: null): void
    [MutationType.FloorBlockSet](state: State, payload: FloorBlock[]): void
    [MutationType.FLoorBlockAdd](state: State, payload: FloorBlock[]): void
    [MutationType.FloorBlockRemove](state: State, payload: string[]): void
    [MutationType.SetMapName](state: State, value: string): void
    [MutationType.SetSelectedTool](state: State, value: ToolTypes): void
    [MutationType.SetSelectedFloorBlock](state: State, value: FloorBlockTypes): void
    [MutationType.SetSelectedGridIndex](state: State, value: number | null): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.ResetState](state, payload) {
        state.floorBlocks = {}
        state.data.map.name = 'default'
        state.tools.toolSelected = ToolTypes.BRUSH
        state.tools.floorBlockSelected = FloorBlockTypes.GRASS
        state.grid.width = 30
        state.grid.height = 20
    },
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
    [MutationType.SetMapName](state, value) {
        state.data.map.name = value
    },
    [MutationType.SetSelectedTool](state, value) {
        state.tools.toolSelected = value
    },
    [MutationType.SetSelectedFloorBlock](state, value) {
        state.tools.floorBlockSelected = value
    },
    [MutationType.SetSelectedGridIndex](state, value) {
        state.grid.selectedIndex = value
    }
}