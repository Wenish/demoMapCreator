import { GetterTree } from "vuex";
import { FloorBlock, FloorBlockTypes, FileData, CapturePoint, CaptureFlag, Spawn } from "../types";
import { State } from "./state";

export type Getters = {
    getFileData(state: State): FileData
    getFloorBlockType(state: State): (key: string) => FloorBlockTypes,
    getSelectedAxis(state: State): { x: number; z: number } | null,
    getAxisFromIndex(state: State): (index: number) => { x: number; z: number }
    getPlacedFloorBlocksCount(state: State): number
    getCapturePoints(state: State):  { [key: string]: CapturePoint; }
    getCaptureFlags(state: State):  { [key: string]: CaptureFlag; }
    getSpawns(state: State):  { [key: string]: Spawn; }
}

export const getters: GetterTree<State, State> & Getters = {
    getFileData(state) {
        return {
            map: {
                name: state.data.map.name,
                captureFlags: state.data.map.captureFlags,
                capturePoints: state.data.map.capturePoints,
                spawns: state.data.map.spawns,
                floorBlocks: state.data.map.floorBlocks
            },
            grid: {
                width: state.grid.width,
                height: state.grid.height,
                cellSize: state.grid.cellSize
            }
        }
    },
    getFloorBlockType(state) {
        return (key: string) => {
            return state.data.map.floorBlocks[key]?.type
        }
    },
    getSelectedAxis(state: State) {
        const width = state.grid.width
        const index = state.grid.selectedIndex
        if (index) {
            const x = Math.ceil(index / width);
            const z = ((index - 1) % width) + 1;
            const axis = {
                x,
                z
            }
            return axis
        }
        return null
    },
    getAxisFromIndex(state: State) {
        return (index: number) => {
            const width = state.grid.width
            const x = Math.ceil(index / width);
            const z = ((index - 1) % width) + 1;
            const axis = {
                x,
                z
            }
            return axis
        }
    },
    getPlacedFloorBlocksCount(state: State) {
        return Object.keys(state.data.map.floorBlocks).length
    },
    getCapturePoints(state: State) {
        return state.data.map.capturePoints
    },
    getCaptureFlags(state: State) {
        return state.data.map.captureFlags
    },
    getSpawns(state) {
        return state.data.map.spawns
    }
}