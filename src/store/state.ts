import { FloorBlock, FloorBlockTypes, Map, ToolTypes } from "../types"

export type State = {
    tools: {
        toolSelected: ToolTypes
        toolOptions: ToolTypes[]
        floorBlockSelected: FloorBlockTypes
        floorBlockOptions: FloorBlockTypes[]
    }
    grid: {
        width: number
        height: number
        cellSize: number
        selectedIndex: number | null
    }
    floorBlocks: { [key: string]: FloorBlock; }
    data: {
        map: Map
    }
}

export const state: State = {
    tools: {
        toolSelected: ToolTypes.BLOCKS,
        toolOptions: [ToolTypes.ERASER, ToolTypes.BLOCKS, ToolTypes.TEAM_SPAWNS, ToolTypes.CAPTURE_POINTS, ToolTypes.CAPTURE_FLAGS],
        floorBlockSelected: FloorBlockTypes.GRASS,
        floorBlockOptions: [FloorBlockTypes.GRASS, FloorBlockTypes.DIRT, FloorBlockTypes.SNOW, FloorBlockTypes.BRIDGE]
    },
    grid: {
        width: 30,
        height: 20,
        cellSize: 30,
        selectedIndex: null
    },
    floorBlocks: {
    },
    data: {
        map: {
            name: 'default',
            floorBlocks: [],
            capturePoints: {},
            captureFlags: {},
            teamSpawns: {}
        }
    }
}