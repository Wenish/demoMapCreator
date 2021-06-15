import { GetterTree } from "vuex";
import { FloorBlock, FloorBlockTypes, MapData } from "../types";
import { State } from "./state";

export type Getters = {
    getMapData(state: State): MapData
    getFloorBlockType(state: State): (key: string) => FloorBlockTypes,
    getMapName(state: State): string,
}

export const getters: GetterTree<State, State> & Getters = {
    getMapData(state) {
        const floorBlocks = Object.keys(state.floorBlocks).map((key): FloorBlock => {
            console.log(key)
            return state.floorBlocks[key]
        })
        return {
            map: {
                name: state.data.map.name,
                captureFlags: state.data.map.captureFlags,
                capturePoints: state.data.map.capturePoints,
                floorBlocks: floorBlocks
            },
            teams: state.data.teams
        }
    },
    getFloorBlockType(state) {
        return (key: string) => {
            return state.floorBlocks[key]?.type
        }
    },
    getMapName(state) {
        return state.data.map.name
    }
}