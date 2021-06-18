import { MutationTree } from "vuex";
import { CaptureFlag, CapturePoint, FileData, FloorBlock, FloorBlockTypes, TeamSpawn, ToolTypes } from "../types";
import { State } from "./state";

export enum MutationType {
    ResetState = 'RESET_STATE',
    LoadFileData = 'LOAD_MAP_DATA',
    FloorBlockSet = 'FLOOR_BLOCK_SET',
    FLoorBlockAdd = 'FLOOR_BLOCK_ADD',
    FloorBlockRemove = 'FLOOR_BLOCK_REMOVE',
    SetMapName = 'SET_MAP_NAME',
    SetSelectedTool = 'SET_SELECTED_TOOL',
    SetSelectedFloorBlock = 'SET_SELECTED_FLOOR_BLOCK',
    SetSelectedGridIndex = 'SET_SELECTED_GRID_INDEX',
    SetGridCellSize = 'SET_GRID_CELL_SIZE',
    CapturePointsSet = 'CAPTURE_POINTS_SET',
    CapturePointsAdd = 'CAPTURE_POINTS_ADD',
    CapturePointsRemove = 'CAPTURE_POINTS_REMOVE',
    CaptureFlagsSet = 'CAPTURE_FLAGS_SET',
    CaptureFlagsAdd = 'CAPTURE_FLAGS_ADD',
    CaptureFlagsRemove = 'CAPTURE_FLAGS_REMOVE',
    TeamSpawnsSet = 'TEAM_SPAWNS_SET',
    TeamSpawnsAdd = 'TEAM_SPAWNS_ADD',
    TeamSpawnsRemove = 'TEAM_SPAWNS_REMOVE'
}

export type Mutations = {
    [MutationType.ResetState](state: State, payload: null): void
    [MutationType.LoadFileData](state: State, payload: FileData): void
    [MutationType.FloorBlockSet](state: State, payload: FloorBlock[]): void
    [MutationType.FLoorBlockAdd](state: State, payload: FloorBlock[]): void
    [MutationType.FloorBlockRemove](state: State, payload: string[]): void
    [MutationType.SetMapName](state: State, value: string): void
    [MutationType.SetSelectedTool](state: State, value: ToolTypes): void
    [MutationType.SetSelectedFloorBlock](state: State, value: FloorBlockTypes): void
    [MutationType.SetSelectedGridIndex](state: State, value: number | null): void
    [MutationType.SetGridCellSize](state: State, value: number): void
    [MutationType.CapturePointsSet](state: State, payload: CapturePoint[]): void
    [MutationType.CapturePointsAdd](state: State, payload: CapturePoint[]): void
    [MutationType.CapturePointsRemove](state: State, payload: string[]): void
    [MutationType.CaptureFlagsSet](state: State, payload: CaptureFlag[]): void
    [MutationType.CaptureFlagsAdd](state: State, payload: CaptureFlag[]): void
    [MutationType.CaptureFlagsRemove](state: State, payload: string[]): void
    [MutationType.TeamSpawnsSet](state: State, payload: TeamSpawn[]): void
    [MutationType.TeamSpawnsAdd](state: State, payload: TeamSpawn[]): void
    [MutationType.TeamSpawnsRemove](state: State, payload: string[]): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.ResetState](state, payload) {
        state.floorBlocks = {}
        state.data.map.name = 'default'
        state.tools.toolSelected = ToolTypes.BLOCKS
        state.tools.floorBlockSelected = FloorBlockTypes.GRASS
        state.grid.width = 30
        state.grid.height = 20
        state.grid.cellSize = 30
    },
    [MutationType.LoadFileData](state, payload) {
        state.data.map.name = payload.map.name
        state.data.map.captureFlags = payload.map.captureFlags
        state.data.map.capturePoints = payload.map.capturePoints
        state.data.map.teamSpawns = payload.map.teamSpawns
        const newFloorBlocks = payload.map.floorBlocks.reduce((result: { [key: string]: FloorBlock }, floorBlock) => {
            const key = `${floorBlock.position.x}${floorBlock.position.y}${floorBlock.position.z}`
            result[key] = floorBlock;
            return result;
        }, {});
        state.floorBlocks = {
            ...state.floorBlocks,
            ...newFloorBlocks
        }
        state.grid.width = payload.grid.width
        state.grid.height = payload.grid.height
        state.grid.cellSize = payload.grid.cellSize
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
    },
    [MutationType.SetGridCellSize](state, value) {
        state.grid.cellSize = value
    },
    [MutationType.CapturePointsSet](state, payload) {
        state.data.map.capturePoints = payload.reduce((result: { [key: string]: CapturePoint }, capturePoint) => {
            const key = `${capturePoint.position.x}${capturePoint.position.y}${capturePoint.position.z}`
            result[key] = capturePoint;
            return result;
        }, {});
    },
    [MutationType.CapturePointsAdd](state, payload) {
        const newCapturePoints = payload.reduce((result: { [key: string]: CapturePoint }, capturePoint) => {
            const key = `${capturePoint.position.x}${capturePoint.position.y}${capturePoint.position.z}`
            result[key] = capturePoint;
            return result;
        }, {});
        state.data.map.capturePoints = {
            ...state.data.map.capturePoints,
            ...newCapturePoints
        }
    },
    [MutationType.CapturePointsRemove](state, payload) {
        payload.forEach((value) => {
            delete state.data.map.capturePoints[value]
        })
    },
    [MutationType.CaptureFlagsSet](state: State, payload: CaptureFlag[]) {
        state.data.map.captureFlags = payload.reduce((result: { [key: string]: CaptureFlag }, captureFlag) => {
            const key = `${captureFlag.position.x}${captureFlag.position.y}${captureFlag.position.z}`
            result[key] = captureFlag;
            return result;
        }, {});
    },
    [MutationType.CaptureFlagsAdd](state: State, payload: CaptureFlag[]){
        const newCaptureFlags = payload.reduce((result: { [key: string]: CaptureFlag }, captureFlag) => {
            const key = `${captureFlag.position.x}${captureFlag.position.y}${captureFlag.position.z}`
            result[key] = captureFlag;
            return result;
        }, {});
        state.data.map.captureFlags = {
            ...state.data.map.captureFlags,
            ...newCaptureFlags
        }
    },
    [MutationType.CaptureFlagsRemove](state: State, payload: string[]){
        payload.forEach((value) => {
            delete state.data.map.captureFlags[value]
        })
    },
    [MutationType.TeamSpawnsSet](state: State, payload: TeamSpawn[]) {
        state.data.map.teamSpawns = payload.reduce((result: { [key: string]: TeamSpawn }, teamSpawn) => {
            const key = `${teamSpawn.position.x}${teamSpawn.position.y}${teamSpawn.position.z}`
            result[key] = teamSpawn;
            return result;
        }, {});
    },
    [MutationType.TeamSpawnsAdd](state: State, payload: TeamSpawn[]){
        const newTeamSpawns = payload.reduce((result: { [key: string]: TeamSpawn }, teamSpawn) => {
            const key = `${teamSpawn.position.x}${teamSpawn.position.y}${teamSpawn.position.z}`
            result[key] = teamSpawn;
            return result;
        }, {});
        state.data.map.teamSpawns = {
            ...state.data.map.teamSpawns,
            ...newTeamSpawns
        }
    },
    [MutationType.TeamSpawnsRemove](state: State, payload: string[]){
        payload.forEach((value) => {
            delete state.data.map.teamSpawns[value]
        })
    }
}