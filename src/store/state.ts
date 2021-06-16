import { FloorBlock, FloorBlockTypes, Map, Team, ToolTypes } from "../types"

export type State = {
    tools: {
        toolSelected: ToolTypes
        toolOptions: ToolTypes[]
        floorBlockSelected: FloorBlockTypes
        floorBlockOptions: FloorBlockTypes[]
    },
    floorBlocks: { [key: string]: FloorBlock; }
    data: {
        map: Map
        teams: Team[]
    }
}

export const state: State = {
    tools: {
        toolSelected: ToolTypes.BRUSH,
        toolOptions: [ToolTypes.ERASER, ToolTypes.BRUSH],
        floorBlockSelected: FloorBlockTypes.GRASS,
        floorBlockOptions: [FloorBlockTypes.GRASS, FloorBlockTypes.DIRT, FloorBlockTypes.SNOW, FloorBlockTypes.BRIDGE]
    },
    floorBlocks: {
    },
    data: {
        map: {
            name: 'default',
            floorBlocks: [],
            capturePoints: [],
            captureFlags: []
        },
        teams: [
            {
                id: "1",
                color: "red"
            },
            {
                id: "2",
                color: "blue"
            }
        ]
    }
}