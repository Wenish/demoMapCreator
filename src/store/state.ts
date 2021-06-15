import { FloorBlock, Map, Team } from "../types"

export type State = {
    floorBlocks: { [key: string]: FloorBlock; }
    data: {
        map: Map
        teams: Team[]
    }
}

export const state: State = {
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