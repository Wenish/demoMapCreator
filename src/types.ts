export enum FloorBlockTypes {
    GRASS = 'Grass',
    DIRT = 'Dirt',
    SNOW = 'Snow',
    BRIDGE = 'Bridge'
}

export type Position = {
    x: number
    y: number
    z: number
}


export type FloorBlock = {
    type: FloorBlockTypes
    position: Position
}

export type CapturePoint = {
    id: string
    position: Position
    radius: number
}

export type CaptureFlag = {
    id: string
    position: Position
    teamId: string
}

export type Map = {
    name: string
    floorBlocks: FloorBlock[]
    capturePoints: CapturePoint[]
    captureFlags: CaptureFlag[]
}

export type Team = {
    id: string
    color: string
}

export type MapData = {
    map: Map
    teams: Team[]
}